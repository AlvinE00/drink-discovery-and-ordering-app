import { describe, expect, test } from "vitest";
import {
  finderReducer,
  getFinderView,
  initialFinderState,
  isAtStart,
  restoreFinderState,
  type FinderAction,
  type FinderState,
} from "@/lib/finder-state";

const run = (...actions: FinderAction[]) => actions.reduce(finderReducer, initialFinderState);
const answer = (index: number, value: string): FinderAction => ({ type: "answer", index, value });

describe("finder state", () => {
  test("starts on the alcohol question", () => {
    const view = getFinderView(initialFinderState);
    expect(view.kind === "question" && view.question.id).toBe("alcohol");
    expect(isAtStart(initialFinderState)).toBe(true);
  });

  test("reaches exactly one recommendation", () => {
    const state = run(answer(0, "alcoholic"), answer(1, "bold-strong"));
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: "whiskey-on-the-rocks" });
    expect(state.shownDrinkIds).toEqual(["whiskey-on-the-rocks"]);
  });

  test("Try Another keeps answers and excludes shown drinks, then exhausts", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bittersweet"), answer(2, "still"));
    const answers = state.answers;
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: "paper-plane" });
    state = finderReducer(state, { type: "tryAnother" });
    expect(state.answers).toBe(answers);
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: "aperol-spritz" });
    state = finderReducer(state, { type: "tryAnother" });
    expect(getFinderView(state)).toEqual({ kind: "exhausted" });
    // Back from exhausted returns to the last drink.
    state = finderReducer(state, { type: "back" });
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: "aperol-spritz" });
  });

  test("Back steps through questions with previous answers selected", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bittersweet"), answer(2, "still"));
    state = finderReducer(state, { type: "back" });
    const view = getFinderView(state);
    expect(view.kind === "question" && [view.index, view.selected]).toEqual([2, "still"]);
    state = finderReducer(state, { type: "back" });
    const flavor = getFinderView(state);
    expect(flavor.kind === "question" && [flavor.index, flavor.selected]).toEqual([1, "bittersweet"]);
  });

  test("Back onto the first question resets every choice", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bold-strong"), { type: "tryAnother" });
    state = finderReducer(state, { type: "back" }); // pick 2 → pick 1
    state = finderReducer(state, { type: "back" }); // pick 1 → flavor question
    state = finderReducer(state, { type: "back" }); // flavor → start
    expect(state).toEqual(initialFinderState);
    const view = getFinderView(state);
    expect(view.kind === "question" && view.selected).toBeUndefined();
    expect(isAtStart(state)).toBe(true);
  });

  test("Back and showPick move between earlier picks", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bold-strong"), { type: "tryAnother" }, { type: "tryAnother" });
    const [first, second, third] = state.shownDrinkIds;
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: third });
    state = finderReducer(state, { type: "back" });
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: second });
    state = finderReducer(state, { type: "back" });
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: first });
    state = finderReducer(state, { type: "showPick", index: 2 });
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: third });
    expect(finderReducer(state, { type: "showPick", index: 9 })).toBe(state);
  });

  test("Try Another from an earlier pick adds a new unseen drink", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bold-strong"), { type: "tryAnother" });
    state = finderReducer(state, { type: "showPick", index: 0 });
    state = finderReducer(state, { type: "tryAnother" });
    expect(state.shownDrinkIds).toHaveLength(3);
    expect(new Set(state.shownDrinkIds).size).toBe(3);
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: state.shownDrinkIds[2] });
  });

  test("picks from the exhausted screen reopen that drink", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bittersweet"), answer(2, "still"), { type: "tryAnother" }, { type: "tryAnother" });
    expect(getFinderView(state)).toEqual({ kind: "exhausted" });
    state = finderReducer(state, { type: "showPick", index: 0 });
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: "paper-plane" });
  });

  test("re-choosing the same answer keeps later answers and the current drink", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bittersweet"), answer(2, "still"), { type: "tryAnother" });
    const before = state;
    state = finderReducer(state, { type: "edit", index: 1 });
    state = finderReducer(state, answer(1, "bittersweet"));
    state = finderReducer(state, answer(2, "still"));
    expect(state.answers).toEqual(before.answers);
    expect(state.shownDrinkIds).toEqual(before.shownDrinkIds);
    expect(getFinderView(state)).toEqual({ kind: "result", drinkId: "aperol-spritz" });
  });

  test("changing an earlier answer clears later answers and shown drinks", () => {
    let state = run(answer(0, "alcoholic"), answer(1, "bittersweet"), answer(2, "still"));
    state = finderReducer(state, { type: "edit", index: 0 });
    state = finderReducer(state, answer(0, "non-alcoholic"));
    expect(state.answers).toEqual([{ questionId: "alcohol", value: "non-alcoholic" }]);
    expect(state.shownDrinkIds).toEqual([]);
    const view = getFinderView(state);
    expect(view.kind === "question" && view.question.id).toBe("flavor");
  });

  test("restart clears answers, shown drinks and the current recommendation", () => {
    const state = run(answer(0, "alcoholic"), answer(1, "bold-strong"), { type: "tryAnother" }, { type: "restart" });
    expect(state).toEqual(initialFinderState);
  });

  test("ignores stale or invalid taps", () => {
    const state = run(answer(0, "alcoholic"));
    expect(finderReducer(state, answer(0, "alcoholic"))).toBe(state);
    expect(finderReducer(state, answer(1, "not-a-flavor"))).toBe(state);
  });

  test("restores saved sessions safely", () => {
    const saved = run(answer(0, "alcoholic"), answer(1, "bold-strong"), { type: "tryAnother" });
    expect(restoreFinderState(JSON.parse(JSON.stringify(saved)))).toEqual(saved);
    expect(restoreFinderState(null)).toEqual(initialFinderState);
    expect(restoreFinderState({ answers: "x" })).toEqual(initialFinderState);
    const corrupt = { ...saved, shownDrinkIds: ["not-a-drink", "house-lemonade"] } as FinderState;
    // Unknown and wrong-alcohol drinks are dropped, then a fresh pick is made.
    expect(restoreFinderState(corrupt).shownDrinkIds).toEqual(["whiskey-on-the-rocks"]);
    expect(restoreFinderState(corrupt).pickIndex).toBe(0);
    // Sessions saved before pick history existed open on the latest pick.
    const legacy = { ...saved } as Partial<FinderState>;
    delete legacy.pickIndex;
    expect(restoreFinderState(legacy).pickIndex).toBe(saved.shownDrinkIds.length - 1);
  });
});
