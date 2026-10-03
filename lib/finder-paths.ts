import { drinksById } from "@/data/drinks";
import { resolve } from "@/lib/recommendation";
import type { Answer, Resolution } from "@/types/recommendation";

export interface FinderPath {
  answers: Answer[];
  /** Drink IDs in the order a guest would see them by tapping Try Another until exhausted. */
  sequence: string[];
}

/** Walks every possible answer sequence through the guided finder. Used by tests and QA. */
export function enumerateFinderPaths(): FinderPath[] {
  const paths: FinderPath[] = [];

  function walk(answers: Answer[]) {
    const resolution = resolve(answers);
    if (resolution.kind === "question") {
      for (const option of resolution.question.options) {
        walk([...answers, { questionId: resolution.question.id, value: option.value }]);
      }
      return;
    }
    const sequence: string[] = [];
    let next: Resolution = resolution;
    while (next.kind === "recommendation") {
      if (!drinksById[next.drinkId] || sequence.includes(next.drinkId)) {
        throw new Error(`Invalid or repeated drink ${next.drinkId}`);
      }
      sequence.push(next.drinkId);
      next = resolve(answers, sequence);
    }
    paths.push({ answers, sequence });
  }

  walk([]);
  return paths;
}
