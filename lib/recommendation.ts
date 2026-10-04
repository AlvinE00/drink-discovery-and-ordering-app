import { drinks as allDrinks } from "@/data/drinks";
import { SPIRIT_LABELS } from "@/lib/labels";
import type { AlcoholStatus, BaseSpirit, Drink, FlavorTag } from "@/types/drink";
import type {
  Answer,
  FlavorChoice,
  Question,
  QuestionId,
  QuestionOption,
  Resolution,
} from "@/types/recommendation";

/*
 * Guided drink finder.
 *
 * 1. Alcohol choice is a hard filter. Always asked first.
 * 2. Main flavor is scored from each drink's flavorTags (+ a small tasteProfile nudge).
 * 3. If the top drinks are basically tied, ask the follow-up question that best
 *    splits them (at most MAX_FOLLOW_UPS), then recommend exactly one drink.
 * 4. Try Another re-ranks with the same answers, excluding drinks already shown.
 *
 * Everything here is pure: (answers, shownDrinkIds) → next step.
 */

/** Scores less than this many points behind the leader count as "basically tied". */
export const TIE_MARGIN = 1;
/** Extra questions allowed after the flavor question. */
export const MAX_FOLLOW_UPS = 2;
/** A drink is a "good match" if its flavor score is at least this share of the best. */
const GOOD_MATCH_RATIO = 0.4;
/**
 * The non-alcoholic menu is small, so once its good matches run out, Try Another
 * keeps going through the remaining NA drinks (labelled as "a little different")
 * instead of stopping after one or two.
 */
const CONTINUE_PAST_GOOD_MATCHES: AlcoholStatus[] = ["non-alcoholic"];

const ANSWER_POINTS = {
  spirit: 4,
  smoke: 3,
  carbonation: 2,
  strengthExact: 2,
  strengthAdjacent: 0.5,
  style: 1,
};

// ─── Questions ──────────────────────────────────────────────

export const ALCOHOL_OPTIONS: QuestionOption[] = [
  { value: "alcoholic", label: "Cocktail", description: "Something with a little kick." },
  { value: "non-alcoholic", label: "Non-Alcoholic", description: "Zero-proof, full flavor." },
];

export const FLAVOR_OPTIONS: (QuestionOption & { value: FlavorChoice })[] = [
  { value: "bright-citrusy", label: "Bright & Citrusy", description: "Fresh lemon and lime, tart and zesty." },
  { value: "fruity-juicy", label: "Fruity & Juicy", description: "Berries and blood orange up front." },
  { value: "sweet-easy", label: "Sweet & Easy", description: "Smooth and approachable, nothing too sharp." },
  { value: "crisp-refreshing", label: "Crisp & Refreshing", description: "Light, bright and easy to drink." },
  { value: "bittersweet", label: "Bittersweet & Interesting", description: "A little bitter, a little herbal, very grown-up." },
  { value: "bold-strong", label: "Bold & Strong", description: "Spirit-forward, with backbone." },
];

/** Bold & Strong makes no sense without alcohol. */
const NA_FLAVOR_EXCLUDED: FlavorChoice[] = ["bold-strong"];

interface FollowUpDefinition {
  id: Exclude<QuestionId, "alcohol" | "flavor">;
  title: string;
  subtitle: string;
  options: QuestionOption[];
  /** Which option this drink naturally belongs to (used to measure how well a question splits). */
  groupOf: (drink: Drink) => string;
  /** Points a drink earns for a given answer. */
  points: (drink: Drink, value: string) => number;
  appliesTo: AlcoholStatus[];
}

const STRENGTH_ORDER = ["easy", "balanced", "bold"];

function strengthGroup(drink: Drink): string {
  if (drink.strength === "strong") return "bold";
  if (drink.strength === "balanced") return "balanced";
  return "easy";
}

const NO_PREFERENCE = "no-preference";
const SPIRIT_ORDER: BaseSpirit[] = ["bourbon", "tequila", "mezcal", "cognac", "gin", "vodka", "rum", "aperitif"];

const FOLLOW_UPS: FollowUpDefinition[] = [
  {
    id: "smoke",
    title: "Clean or smoky?",
    subtitle: "Mezcal brings a campfire edge. Tequila keeps it crisp.",
    options: [
      { value: "clean", label: "Clean & bright", description: "Crisp, fresh, no smoke." },
      { value: "smoky", label: "Smoky & adventurous", description: "A little campfire in the glass." },
    ],
    groupOf: (drink) => (drink.flavorTags.includes("Smoky") ? "smoky" : "clean"),
    points: (drink, value) => {
      const smoky = drink.flavorTags.includes("Smoky");
      return (value === "smoky") === smoky ? ANSWER_POINTS.smoke : 0;
    },
    appliesTo: ["alcoholic"],
  },
  {
    id: "carbonation",
    title: "Still or bubbly?",
    subtitle: "Smooth and silky, or a little sparkle?",
    options: [
      { value: "still", label: "Still", description: "Smooth, no fizz." },
      { value: "sparkling", label: "Bubbly", description: "Light and sparkling." },
    ],
    groupOf: (drink) => drink.carbonation,
    points: (drink, value) => (drink.carbonation === value ? ANSWER_POINTS.carbonation : 0),
    appliesTo: ["alcoholic", "non-alcoholic"],
  },
  {
    id: "spirit",
    title: "Got a favorite spirit?",
    subtitle: "A few great options fit. Pick one, or let us decide.",
    options: [
      ...SPIRIT_ORDER.map((spirit): QuestionOption => ({ value: spirit, label: SPIRIT_LABELS[spirit].label })),
      { value: NO_PREFERENCE, label: "No preference", description: "Surprise me." },
    ],
    groupOf: (drink) => drink.baseSpirit,
    points: (drink, value) => (drink.baseSpirit === value ? ANSWER_POINTS.spirit : 0),
    appliesTo: ["alcoholic"],
  },
  {
    id: "strength",
    title: "Easy or bold?",
    subtitle: "How much do you want to taste the spirit?",
    options: [
      { value: "easy", label: "Easy & refreshing", description: "A lighter pour." },
      { value: "balanced", label: "Balanced", description: "Right down the middle." },
      { value: "bold", label: "Bold & strong", description: "Bring the spirit forward." },
    ],
    groupOf: strengthGroup,
    points: (drink, value) => {
      const distance = Math.abs(STRENGTH_ORDER.indexOf(strengthGroup(drink)) - STRENGTH_ORDER.indexOf(value));
      if (distance === 0) return ANSWER_POINTS.strengthExact;
      return distance === 1 ? ANSWER_POINTS.strengthAdjacent : 0;
    },
    appliesTo: ["alcoholic"],
  },
  {
    id: "style",
    title: "Familiar or adventurous?",
    subtitle: "Stick with a classic, or try something new?",
    options: [
      { value: "classic", label: "Classic", description: "A drink you know and love." },
      { value: "adventurous", label: "Something different", description: "Surprise me a little." },
    ],
    groupOf: (drink) => (drink.style === "classic" ? "classic" : "adventurous"),
    points: (drink, value) => {
      const isClassic = drink.style === "classic";
      return (value === "classic") === isClassic ? ANSWER_POINTS.style : 0;
    },
    appliesTo: ["alcoholic", "non-alcoholic"],
  },
];

const ALCOHOL_QUESTION: Question = {
  id: "alcohol",
  title: "What are we drinking?",
  subtitle: "Every drink on the menu is made fresh tonight.",
  options: ALCOHOL_OPTIONS,
};

function flavorQuestion(alcohol: string): Question {
  return {
    id: "flavor",
    title: "What sounds good right now?",
    subtitle: "Go with your gut. You can always try another.",
    options:
      alcohol === "non-alcoholic"
        ? FLAVOR_OPTIONS.filter((option) => !NA_FLAVOR_EXCLUDED.includes(option.value))
        : FLAVOR_OPTIONS,
  };
}

// ─── Scoring ────────────────────────────────────────────────

/** Tag weights per flavor choice. Edit these (or a drink's flavorTags) to tune results. */
export const FLAVOR_TAG_WEIGHTS: Record<FlavorChoice, Partial<Record<FlavorTag, number>>> = {
  "bright-citrusy": { Citrusy: 3, Tart: 2, Refreshing: 1 },
  "fruity-juicy": { Fruity: 4, Sweet: 1, Refreshing: 1 },
  "sweet-easy": { Sweet: 3, Smooth: 2, Light: 1 },
  "crisp-refreshing": { Refreshing: 3, Bubbly: 2, Light: 1 },
  bittersweet: { Bittersweet: 4 },
  "bold-strong": { "Spirit-Forward": 4, Strong: 3, Smoky: 1 },
};

/** Small taste-profile nudges so "how much" matters, not just "whether". */
function tasteNudge(drink: Drink, flavor: FlavorChoice): number {
  const t = drink.tasteProfile;
  switch (flavor) {
    case "bright-citrusy":
      return (t.tartness - 3) * 0.5 - (t.bitterness - 1) * 0.5;
    case "sweet-easy":
      return (t.sweetness - 3) - (t.bitterness - 1) * 0.5 - (t.spiritForward - 2) * 0.5;
    case "bittersweet":
      return (t.bitterness - 3) * 0.5;
    case "bold-strong":
      return t.spiritForward - 2;
    default:
      return 0;
  }
}

export function flavorScore(drink: Drink, flavor: FlavorChoice): number {
  const weights = FLAVOR_TAG_WEIGHTS[flavor];
  const tagPoints = drink.flavorTags.reduce((sum, tag) => sum + (weights[tag] ?? 0), 0);
  return tagPoints + tasteNudge(drink, flavor);
}

function getAnswer(answers: Answer[], id: QuestionId): string | undefined {
  return answers.find((answer) => answer.questionId === id)?.value;
}

export interface RankedDrink {
  drink: Drink;
  flavorScore: number;
  score: number;
}

function compareRanked(a: RankedDrink, b: RankedDrink): number {
  return (
    b.score - a.score ||
    b.drink.recommendationPriority - a.drink.recommendationPriority ||
    a.drink.id.localeCompare(b.drink.id)
  );
}

/** Ranks eligible drinks for the given answers. Requires alcohol + flavor answers. */
export function rankDrinks(answers: Answer[], drinks: Drink[] = allDrinks): RankedDrink[] {
  const alcohol = getAnswer(answers, "alcohol");
  const flavor = getAnswer(answers, "flavor") as FlavorChoice | undefined;
  if (!alcohol || !flavor) return [];

  return drinks
    .filter((drink) => drink.alcoholStatus === alcohol)
    .map((drink) => {
      const base = flavorScore(drink, flavor);
      const extra = answers.reduce((sum, answer) => {
        const followUp = FOLLOW_UPS.find((f) => f.id === answer.questionId);
        return followUp ? sum + followUp.points(drink, answer.value) : sum;
      }, 0);
      return { drink, flavorScore: base, score: base + extra };
    })
    .sort(compareRanked);
}

/** Drinks whose main-flavor score is strong enough to be worth recommending. */
function goodMatches(ranked: RankedDrink[]): RankedDrink[] {
  const best = Math.max(0, ...ranked.map((r) => r.flavorScore));
  if (best <= 0) return [];
  return ranked.filter((r) => r.flavorScore > 0 && r.flavorScore >= best * GOOD_MATCH_RATIO);
}

/** Picks the unasked follow-up that best splits the tied drinks (fewest expected left). */
function pickFollowUp(
  close: Drink[],
  good: Drink[],
  answers: Answer[],
  alcohol: AlcoholStatus,
): Question | null {
  const asked = new Set(answers.map((a) => a.questionId));
  let best: { question: Question; expected: number } | null = null;

  for (const followUp of FOLLOW_UPS) {
    if (asked.has(followUp.id) || !followUp.appliesTo.includes(alcohol)) continue;

    const groups = new Map<string, number>();
    for (const drink of close) {
      const group = followUp.groupOf(drink);
      groups.set(group, (groups.get(group) ?? 0) + 1);
    }
    if (groups.size < 2) continue;

    // Expected candidates remaining after the answer (lower = better split).
    const expected = [...groups.values()].reduce((sum, n) => sum + n * n, 0) / close.length;
    // FOLLOW_UPS order breaks ties: strict "<" keeps the earlier question.
    if (!best || expected < best.expected) {
      // Offer every option that leads to at least one good match, not just the tied ones.
      const available = new Set(good.map(followUp.groupOf));
      const options = followUp.options.filter(
        (option) => option.value === NO_PREFERENCE || available.has(option.value),
      );
      best = {
        question: { id: followUp.id, title: followUp.title, subtitle: followUp.subtitle, options },
        expected,
      };
    }
  }
  return best?.question ?? null;
}

// ─── Public API ─────────────────────────────────────────────

/**
 * Decide the next step for a guest.
 * - `answers` are in the order they were asked.
 * - `shownDrinkIds` are excluded (Try Another). Follow-up questions are only
 *   asked for the first recommendation; Try Another reuses the existing answers.
 */
export function resolve(
  answers: Answer[],
  shownDrinkIds: string[] = [],
  drinks: Drink[] = allDrinks,
): Resolution {
  const alcohol = getAnswer(answers, "alcohol") as AlcoholStatus | undefined;
  if (!alcohol) return { kind: "question", question: ALCOHOL_QUESTION };

  const flavor = getAnswer(answers, "flavor");
  if (!flavor) return { kind: "question", question: flavorQuestion(alcohol) };

  const shown = new Set(shownDrinkIds);
  const ranked = rankDrinks(answers, drinks);
  const candidates = goodMatches(ranked).filter((r) => !shown.has(r.drink.id));
  if (candidates.length === 0) {
    // Only reached via Try Another: every alcohol group has at least one good match.
    const next = CONTINUE_PAST_GOOD_MATCHES.includes(alcohol) && ranked.find((r) => !shown.has(r.drink.id));
    return next ? { kind: "recommendation", drinkId: next.drink.id } : { kind: "exhausted" };
  }

  const followUpsAsked = answers.filter((a) => a.questionId !== "alcohol" && a.questionId !== "flavor").length;
  if (shown.size === 0 && followUpsAsked < MAX_FOLLOW_UPS) {
    const leader = candidates[0].score;
    const close = candidates.filter((r) => r.score > leader - TIE_MARGIN).map((r) => r.drink);
    if (close.length >= 2) {
      const question = pickFollowUp(close, candidates.map((r) => r.drink), answers, alcohol);
      if (question) return { kind: "question", question };
    }
  }

  return { kind: "recommendation", drinkId: candidates[0].drink.id };
}

/** The question that was (or would be) shown at `index`, given earlier answers. */
export function questionAt(answers: Answer[], index: number): Question | null {
  const resolution = resolve(answers.slice(0, index));
  return resolution.kind === "question" ? resolution.question : null;
}

/** False for drinks offered after the good matches ran out (shown as "a little different"). */
export function isGoodMatch(drinkId: string, answers: Answer[], drinks: Drink[] = allDrinks): boolean {
  return goodMatches(rankDrinks(answers, drinks)).some((r) => r.drink.id === drinkId);
}

/** Human-readable labels for the answers a drink actually matched. Used for "Why this drink". */
export function matchedAnswerLabels(drink: Drink, answers: Answer[]): string[] {
  const labels: string[] = [];
  for (const answer of answers) {
    if (answer.questionId === "alcohol") continue;
    if (answer.questionId === "flavor") {
      const option = FLAVOR_OPTIONS.find((o) => o.value === answer.value);
      if (option) labels.push(option.label);
      continue;
    }
    const followUp = FOLLOW_UPS.find((f) => f.id === answer.questionId);
    if (followUp && answer.value !== NO_PREFERENCE && followUp.points(drink, answer.value) >= 1) {
      const option = followUp.options.find((o) => o.value === answer.value);
      if (option) labels.push(option.label);
    }
  }
  return labels;
}

/** Label for an answer, for the "your picks" trail. */
export function answerLabel(answer: Answer): string {
  if (answer.questionId === "alcohol") {
    return ALCOHOL_OPTIONS.find((o) => o.value === answer.value)?.label ?? answer.value;
  }
  if (answer.questionId === "flavor") {
    return FLAVOR_OPTIONS.find((o) => o.value === answer.value)?.label ?? answer.value;
  }
  const followUp = FOLLOW_UPS.find((f) => f.id === answer.questionId);
  return followUp?.options.find((o) => o.value === answer.value)?.label ?? answer.value;
}

/**
 * Keeps the longest prefix of `answers` that is still valid for the current
 * question flow (e.g. after a data change or a stale saved session).
 */
export function sanitizeAnswers(answers: Answer[]): Answer[] {
  const valid: Answer[] = [];
  for (const answer of answers) {
    const question = questionAt(valid, valid.length);
    if (!question || question.id !== answer.questionId) break;
    if (!question.options.some((o) => o.value === answer.value)) break;
    valid.push(answer);
  }
  return valid;
}
