/** Shopping sections, in the order they appear on the shopping list. */
export type IngredientCategory =
  | "spirits"
  | "liqueurs"
  | "wine"
  | "na-modifiers"
  | "citrus-juice"
  | "produce"
  | "syrups"
  | "mixers"
  | "other";

/**
 * How an ingredient is measured in recipes.
 * - volume: liquids, measured in oz
 * - count: garnishes and pinches, measured per use
 * - weight: bulk items like ice
 */
export type MeasurementType = "volume" | "count" | "weight";

export type Unit = "oz" | "garnish" | "rim" | "dash" | "lb";

export interface Ingredient {
  /** Permanent generic ID, e.g. `ginger_beer`. Never a brand or package size. */
  id: string;
  /** Display name for the host (recipes, shopping). */
  name: string;
  /** Short guest-facing name, e.g. "Lime". Omit to hide from guest ingredient lists. */
  guestName?: string;
  category: IngredientCategory;
  measurementType: MeasurementType;
  /** Unit used in recipes. Recipe lines must use this unit. */
  defaultUnit: Unit;
  /** What you actually buy, e.g. "750 mL bottle", "lemon", "12-oz can". */
  purchaseUnitName: string;
  /** How many `defaultUnit`s one purchase unit provides (e.g. 25.4 oz per 750 mL bottle). */
  typicalPurchaseQuantity: number;
  isAlcoholic: boolean;
}
