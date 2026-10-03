import { drinksById } from "@/data/drinks";
import { questionAt, resolve, sanitizeAnswers } from "@/lib/recommendation";
import type { Answer, Question } from "@/types/recommendation";

/**
 * Guided-finder session state. Pure reducer so it can be tested and
 * persisted to sessionStorage as plain JSON.
 */
export interface FinderState {
  /** Answers in the order they were asked. */
  answers: Answer[];
  /** Drinks shown this session; the last one is the current recommendation. */
  shownDrinkIds: string[];
  /** When set, the guest is revisiting the question at this index. */
  editingIndex: number | null;
  /** Try Another found no good unseen matches. */
  exhausted: boolean;
}

export type FinderAction =
  | { type: "answer"; index: number; value: string }
  | { type: "tryAnother" }
  | { type: "back" }
  | { type: "edit"; index: number }
  | { type: "restart" };

export type FinderView =
  | { kind: "question"; index: number; question: Question; selected?: string }
  | { kind: "result"; drinkId: string }
  | { kind: "exhausted" };

export const initialFinderState: FinderState = {
  answers: [],
  shownDrinkIds: [],
  editingIndex: null,
  exhausted: false,
};

/** If all questions are answered and nothing is shown yet, pick the first drink. */
function settle(state: FinderState): FinderState {
  if (state.editingIndex !== null || state.shownDrinkIds.length > 0 || state.exhausted) return state;
  const resolution = resolve(state.answers);
  if (resolution.kind === "recommendation") return { ...state, shownDrinkIds: [resolution.drinkId] };
  if (resolution.kind === "exhausted") return { ...state, exhausted: true };
  return state;
}

export function getFinderView(state: FinderState): FinderView {
  if (state.editingIndex !== null) {
    const question = questionAt(state.answers, state.editingIndex);
    if (question) {
      return {
        kind: "question",
        index: state.editingIndex,
        question,
        selected: state.answers[state.editingIndex]?.value,
      };
    }
  }
  if (state.exhausted) return { kind: "exhausted" };
  const current = state.shownDrinkIds.at(-1);
  if (current) return { kind: "result", drinkId: current };

  const resolution = resolve(state.answers);
  if (resolution.kind === "question") {
    return { kind: "question", index: state.answers.length, question: resolution.question };
  }
  return resolution.kind === "recommendation"
    ? { kind: "result", drinkId: resolution.drinkId }
    : { kind: "exhausted" };
}

export function finderReducer(state: FinderState, action: FinderAction): FinderState {
  switch (action.type) {
    case "answer": {
      const view = getFinderView(state);
      // Ignore stale taps (e.g. double-tap during a transition).
      if (view.kind !== "question" || view.index !== action.index) return state;
      if (!view.question.options.some((option) => option.value === action.value)) return state;

      const existing = state.answers[action.index];
      if (existing?.questionId === view.question.id && existing.value === action.value) {
        // Same answer as before: keep everything after it and step forward.
        const next = action.index + 1;
        return settle({ ...state, editingIndex: next < state.answers.length ? next : null });
      }

      // New or changed answer: later answers and shown drinks no longer apply.
      const answers = [...state.answers.slice(0, action.index), { questionId: view.question.id, value: action.value }];
      return settle({ answers, shownDrinkIds: [], editingIndex: null, exhausted: false });
    }

    case "tryAnother": {
      if (state.editingIndex !== null || state.exhausted || state.shownDrinkIds.length === 0) return state;
      const resolution = resolve(state.answers, state.shownDrinkIds);
      if (resolution.kind === "recommendation") {
        return { ...state, shownDrinkIds: [...state.shownDrinkIds, resolution.drinkId] };
      }
      return { ...state, exhausted: true };
    }

    case "back": {
      const view = getFinderView(state);
      if (view.kind === "exhausted") return { ...state, exhausted: false };
      if (view.kind === "result") {
        return state.answers.length > 0 ? { ...state, editingIndex: state.answers.length - 1 } : state;
      }
      return view.index > 0 ? { ...state, editingIndex: view.index - 1 } : state;
    }

    case "edit":
      if (action.index < 0 || action.index >= state.answers.length) return state;
      return { ...state, editingIndex: action.index };

    case "restart":
      return initialFinderState;
  }
}

/** True when Back should leave the finder instead of stepping back a question. */
export function isAtStart(state: FinderState): boolean {
  const view = getFinderView(state);
  return view.kind === "question" && view.index === 0;
}

/** Rebuilds a trustworthy state from untrusted saved JSON. */
export function restoreFinderState(saved: unknown): FinderState {
  if (!saved || typeof saved !== "object") return initialFinderState;
  const raw = saved as Partial<FinderState>;
  if (!Array.isArray(raw.answers) || !Array.isArray(raw.shownDrinkIds)) return initialFinderState;

  const answers = sanitizeAnswers(
    raw.answers.filter(
      (a): a is Answer => !!a && typeof a.questionId === "string" && typeof a.value === "string",
    ),
  );
  const answersIntact = answers.length === raw.answers.length;
  const alcohol = answers.find((a) => a.questionId === "alcohol")?.value;
  const shownDrinkIds = answersIntact
    ? raw.shownDrinkIds.filter(
        (id): id is string => typeof id === "string" && drinksById[id]?.alcoholStatus === alcohol,
      )
    : [];
  const editingIndex =
    answersIntact && typeof raw.editingIndex === "number" && raw.editingIndex >= 0 && raw.editingIndex < answers.length
      ? raw.editingIndex
      : null;

  return settle({
    answers,
    shownDrinkIds,
    editingIndex,
    exhausted: answersIntact && shownDrinkIds.length > 0 && raw.exhausted === true,
  });
}
