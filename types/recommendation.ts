export type QuestionId =
  | "alcohol"
  | "flavor"
  | "spirit"
  | "smoke"
  | "carbonation"
  | "strength"
  | "style";

export type FlavorChoice =
  | "bright-citrusy"
  | "fruity-juicy"
  | "sweet-easy"
  | "crisp-refreshing"
  | "bittersweet"
  | "bold-strong";

export interface Answer {
  questionId: QuestionId;
  value: string;
}

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  id: QuestionId;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

/** What the guided finder should do next. Recommendations only ever carry a drink ID. */
export type Resolution =
  | { kind: "question"; question: Question }
  | { kind: "recommendation"; drinkId: string }
  | { kind: "exhausted" };
