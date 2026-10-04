import { describe, expect, test } from "vitest";
import { drinks, drinksById } from "@/data/drinks";
import { enumerateFinderPaths } from "@/lib/finder-paths";
import {
  FLAVOR_OPTIONS,
  isGoodMatch,
  MAX_FOLLOW_UPS,
  matchedAnswerLabels,
  rankDrinks,
  resolve,
  sanitizeAnswers,
} from "@/lib/recommendation";
import type { Answer } from "@/types/recommendation";

const a = (questionId: Answer["questionId"], value: string): Answer => ({ questionId, value });
const paths = enumerateFinderPaths();

describe("question flow", () => {
  test("always asks alcohol vs non-alcoholic first", () => {
    const first = resolve([]);
    expect(first.kind).toBe("question");
    if (first.kind === "question") {
      expect(first.question.id).toBe("alcohol");
      expect(first.question.options.map((o) => o.value)).toEqual(["alcoholic", "non-alcoholic"]);
    }
  });

  test("asks main flavor second; Bold & Strong is hidden for non-alcoholic", () => {
    const cocktail = resolve([a("alcohol", "alcoholic")]);
    const na = resolve([a("alcohol", "non-alcoholic")]);
    expect(cocktail.kind === "question" && cocktail.question.id).toBe("flavor");
    expect(cocktail.kind === "question" && cocktail.question.options).toHaveLength(FLAVOR_OPTIONS.length);
    expect(na.kind === "question" && na.question.options.map((o) => o.value)).not.toContain("bold-strong");
  });

  test("every path starts alcohol → flavor and needs at most 2 follow-ups", () => {
    for (const path of paths) {
      expect(path.answers[0].questionId).toBe("alcohol");
      expect(path.answers[1].questionId).toBe("flavor");
      expect(path.answers.length).toBeLessThanOrEqual(2 + MAX_FOLLOW_UPS);
      expect(new Set(path.answers.map((x) => x.questionId)).size).toBe(path.answers.length);
    }
  });

  test("most paths finish within 3 questions", () => {
    const short = paths.filter((p) => p.answers.length <= 3).length;
    expect(short / paths.length).toBeGreaterThanOrEqual(0.7);
  });
});

describe("recommendations", () => {
  test("every path resolves to exactly one drink that respects the alcohol choice", () => {
    expect(paths.length).toBeGreaterThan(20);
    for (const path of paths) {
      const result = resolve(path.answers);
      expect(result.kind).toBe("recommendation");
      if (result.kind !== "recommendation") continue;
      expect(typeof result.drinkId).toBe("string");
      expect(drinksById[result.drinkId].alcoholStatus).toBe(path.answers[0].value);
      expect(path.sequence[0]).toBe(result.drinkId);
    }
  });

  test("every drink in every Try Another sequence matches the alcohol choice and never repeats", () => {
    for (const path of paths) {
      expect(new Set(path.sequence).size).toBe(path.sequence.length);
      for (const id of path.sequence) expect(drinksById[id].alcoholStatus).toBe(path.answers[0].value);
    }
  });

  test("Try Another returns the next-best unseen drink in rank order", () => {
    for (const path of paths) {
      const ranked = rankDrinks(path.answers).map((r) => r.drink.id);
      const expectedOrder = ranked.filter((id) => path.sequence.includes(id));
      expect(path.sequence).toEqual(expectedOrder);
    }
  });

  test("Try Another keeps answers and does not ask new questions", () => {
    for (const path of paths) {
      if (path.sequence.length < 2) continue;
      expect(resolve(path.answers, path.sequence.slice(0, 1))).toEqual({
        kind: "recommendation",
        drinkId: path.sequence[1],
      });
    }
  });

  test("shows the exhausted state once the good matches are used up", () => {
    for (const path of paths) expect(resolve(path.answers, path.sequence)).toEqual({ kind: "exhausted" });
  });

  test("non-alcoholic Try Another reaches every NA drink, closest matches first", () => {
    const naDrinks = drinks.filter((d) => d.alcoholStatus === "non-alcoholic").map((d) => d.id).sort();
    for (const path of paths.filter((p) => p.answers[0].value === "non-alcoholic")) {
      expect([...path.sequence].sort()).toEqual(naDrinks);
      const good = path.sequence.map((id) => isGoodMatch(id, path.answers));
      // Every good match comes before every "a little different" pick.
      expect(good.indexOf(false)).toBeGreaterThan(0);
      expect(good.slice(good.indexOf(false))).not.toContain(true);
    }
  });

  test("cocktail Try Another still stops at the best matches", () => {
    for (const path of paths.filter((p) => p.answers[0].value === "alcoholic")) {
      for (const id of path.sequence) expect(isGoodMatch(id, path.answers)).toBe(true);
    }
    const bittersweet = paths.find((p) => p.answers.map((a) => a.value).join() === "alcoholic,bittersweet,still");
    expect(bittersweet?.sequence).toEqual(["paper-plane", "aperol-spritz"]);
  });

  test("the obvious picks come first", () => {
    const pick = (...answers: Answer[]) => {
      const r = resolve(answers);
      return r.kind === "recommendation" ? r.drinkId : r.kind;
    };
    expect(pick(a("alcohol", "alcoholic"), a("flavor", "bold-strong"))).toBe("whiskey-on-the-rocks");
    expect(pick(a("alcohol", "alcoholic"), a("flavor", "sweet-easy"))).toBe("hennessy-blueberry-lemonade");
    expect(pick(a("alcohol", "alcoholic"), a("flavor", "bittersweet"), a("carbonation", "still"))).toBe("paper-plane");
    expect(pick(a("alcohol", "alcoholic"), a("flavor", "bittersweet"), a("carbonation", "sparkling"))).toBe("aperol-spritz");
    expect(pick(a("alcohol", "alcoholic"), a("flavor", "fruity-juicy"), a("spirit", "tequila"))).toBe("blood-orange-margarita");
    expect(pick(a("alcohol", "alcoholic"), a("flavor", "bright-citrusy"), a("spirit", "bourbon"))).toBe("whiskey-sour");
    expect(pick(a("alcohol", "non-alcoholic"), a("flavor", "sweet-easy"))).toBe("blueberry-lemonade");
    expect(pick(a("alcohol", "non-alcoholic"), a("flavor", "bittersweet"))).toBe("bitter-orange-spritz");
  });

  test("most drinks can be reached as a first or Try Another pick", () => {
    const reachable = new Set(paths.flatMap((p) => p.sequence));
    expect(reachable.size).toBe(drinks.length);
  });
});

describe("ties", () => {
  test("a close match triggers one discriminating question instead of multiple results", () => {
    const r = resolve([a("alcohol", "alcoholic"), a("flavor", "bright-citrusy")]);
    expect(r.kind).toBe("question");
    if (r.kind !== "question") return;
    expect(r.question.id).toBe("spirit");
    const values = r.question.options.map((o) => o.value);
    expect(values).toContain("tequila");
    expect(values).toContain("no-preference");
    // Only spirits that lead to a good citrusy match are offered.
    expect(values).not.toContain("cognac");
    expect(values).not.toContain("aperitif");
  });

  test("tequila margaritas tie → asks classic vs something different", () => {
    const r = resolve([a("alcohol", "alcoholic"), a("flavor", "bright-citrusy"), a("spirit", "tequila")]);
    expect(r.kind === "question" && r.question.id).toBe("style");
  });

  test("tequila vs mezcal tie → asks clean vs smoky", () => {
    // Same drink, one made with mezcal: a genuine tie only smoke can split.
    const classic = drinksById["classic-margarita"];
    const smoky = { ...classic, id: "smoky-margarita", baseSpirit: "mezcal" as const, flavorTags: [...classic.flavorTags, "Smoky" as const] };
    const pair = [classic, smoky];
    const answers = [a("alcohol", "alcoholic"), a("flavor", "bright-citrusy")];
    const r = resolve(answers, [], pair);
    expect(r.kind === "question" && r.question.id).toBe("smoke");
    expect(resolve([...answers, a("smoke", "smoky")], [], pair)).toEqual({ kind: "recommendation", drinkId: "smoky-margarita" });
    expect(resolve([...answers, a("smoke", "clean")], [], pair)).toEqual({ kind: "recommendation", drinkId: "classic-margarita" });
  });

  test("identical drinks fall back to recommendationPriority, never a list", () => {
    const twin = { ...drinksById["gin-collins"], id: "twin", recommendationPriority: 1 };
    const r = resolve([a("alcohol", "alcoholic"), a("flavor", "crisp-refreshing")], [], [twin, drinksById["gin-collins"]]);
    expect(r).toEqual({ kind: "recommendation", drinkId: "gin-collins" });
  });
});

describe("helpers", () => {
  test("matched labels explain why a drink was picked", () => {
    const answers = [a("alcohol", "alcoholic"), a("flavor", "bright-citrusy"), a("spirit", "tequila")];
    expect(matchedAnswerLabels(drinksById["classic-margarita"], answers)).toEqual(["Bright & Citrusy", "Tequila"]);
    expect(matchedAnswerLabels(drinksById["whiskey-sour"], answers)).toEqual(["Bright & Citrusy"]);
  });

  test("sanitizeAnswers keeps only the valid prefix", () => {
    const valid = [a("alcohol", "alcoholic"), a("flavor", "bright-citrusy"), a("spirit", "tequila")];
    expect(sanitizeAnswers(valid)).toEqual(valid);
    expect(sanitizeAnswers([a("alcohol", "beer")])).toEqual([]);
    expect(sanitizeAnswers([a("alcohol", "non-alcoholic"), a("flavor", "bold-strong")])).toEqual([a("alcohol", "non-alcoholic")]);
    expect(sanitizeAnswers([a("flavor", "bright-citrusy")])).toEqual([]);
  });
});
