import { drinks as allDrinks } from "@/data/drinks";
import { ingredients as allIngredients } from "@/data/ingredients";
import {
  ALWAYS_STOCK_INGREDIENT_IDS,
  DEFAULT_DEMAND_WEIGHT,
  DEMAND_WEIGHTS,
  SHOPPING_DEFAULTS,
} from "@/data/shopping-config";
import type { Drink } from "@/types/drink";
import type { Ingredient, IngredientCategory } from "@/types/ingredient";

export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  spirits: "Spirits",
  liqueurs: "Liqueurs / Amari",
  wine: "Wine",
  "na-modifiers": "NA modifiers",
  "citrus-juice": "Citrus / Juice",
  produce: "Produce",
  syrups: "Syrups",
  mixers: "Mixers",
  other: "Other",
};

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as IngredientCategory[];

export interface ShoppingInputs {
  guests: number;
  drinksPerGuest: number;
  /** 0.2 = 20% extra. */
  bufferRate: number;
  /** 0.8 = 80% of servings are alcoholic. */
  alcoholicShare: number;
  /** Drink ID → popularity weight (0 = not serving). */
  demandWeights: Record<string, number>;
  iceLbPerServing?: number;
}

export interface DrinkPlan {
  drink: Drink;
  weight: number;
  servings: number;
}

export interface ShoppingLine {
  ingredient: Ingredient;
  /** Total needed in the ingredient's default unit. */
  needed: number;
  /** Whole purchase units to buy (always rounded up). */
  purchaseUnits: number;
  /** Drinks that use this ingredient. */
  usedByDrinkIds: string[];
}

export interface ShoppingPlan {
  plannedServings: number;
  alcoholicServings: number;
  nonAlcoholicServings: number;
  drinkPlans: DrinkPlan[];
  lines: ShoppingLine[];
}

export function defaultShoppingInputs(): ShoppingInputs {
  return {
    guests: SHOPPING_DEFAULTS.guests,
    drinksPerGuest: SHOPPING_DEFAULTS.drinksPerGuest,
    bufferRate: SHOPPING_DEFAULTS.bufferRate,
    alcoholicShare: SHOPPING_DEFAULTS.alcoholicShare,
    demandWeights: { ...DEMAND_WEIGHTS },
    iceLbPerServing: SHOPPING_DEFAULTS.iceLbPerServing,
  };
}

export function weightFor(inputs: ShoppingInputs, drinkId: string): number {
  return Math.max(0, inputs.demandWeights[drinkId] ?? DEFAULT_DEMAND_WEIGHT);
}

/** Round up, ignoring floating-point noise (e.g. 50.8 / 25.4 = 2.0000000001). */
function ceilUnits(value: number): number {
  return Math.max(0, Math.ceil(value - 1e-9));
}

/** Split planned servings across drinks by popularity weight within each alcohol group. */
export function planServings(inputs: ShoppingInputs, drinks: Drink[] = allDrinks) {
  const plannedServings =
    Math.max(0, inputs.guests) * Math.max(0, inputs.drinksPerGuest) * (1 + Math.max(0, inputs.bufferRate));
  const share = Math.min(1, Math.max(0, inputs.alcoholicShare));
  const groupTotals = {
    alcoholic: plannedServings * share,
    "non-alcoholic": plannedServings * (1 - share),
  };

  const weightSums = { alcoholic: 0, "non-alcoholic": 0 };
  for (const drink of drinks) weightSums[drink.alcoholStatus] += weightFor(inputs, drink.id);

  const drinkPlans: DrinkPlan[] = drinks.map((drink) => {
    const weight = weightFor(inputs, drink.id);
    const sum = weightSums[drink.alcoholStatus];
    const servings = sum > 0 ? (groupTotals[drink.alcoholStatus] * weight) / sum : 0;
    return { drink, weight, servings };
  });

  return {
    plannedServings,
    alcoholicServings: groupTotals.alcoholic,
    nonAlcoholicServings: groupTotals["non-alcoholic"],
    drinkPlans,
  };
}

export function calculateShoppingPlan(
  inputs: ShoppingInputs,
  drinks: Drink[] = allDrinks,
  ingredients: Ingredient[] = allIngredients,
): ShoppingPlan {
  const servingPlan = planServings(inputs, drinks);
  const needed = new Map<string, number>();
  const usedBy = new Map<string, Set<string>>();

  function add(ingredientId: string, amount: number, drinkId?: string) {
    needed.set(ingredientId, (needed.get(ingredientId) ?? 0) + amount);
    if (drinkId) {
      if (!usedBy.has(ingredientId)) usedBy.set(ingredientId, new Set());
      usedBy.get(ingredientId)!.add(drinkId);
    }
  }

  for (const { drink, servings } of servingPlan.drinkPlans) {
    if (servings <= 0) continue;
    for (const item of drink.recipe) add(item.ingredientId, servings * item.amount, drink.id);
    // Each garnish is one use per serving.
    for (const garnishId of drink.garnishIngredientIds) add(garnishId, servings, drink.id);
  }

  // Ice is consumed by every drink (shaking + serving), so it is planned per serving.
  const iceLb = servingPlan.plannedServings * (inputs.iceLbPerServing ?? SHOPPING_DEFAULTS.iceLbPerServing);
  if (iceLb > 0) add("ice", iceLb);

  const lines: ShoppingLine[] = [];
  for (const ingredient of ingredients) {
    const amount = needed.get(ingredient.id) ?? 0;
    const alwaysStock = ALWAYS_STOCK_INGREDIENT_IDS.includes(ingredient.id);
    if (amount <= 0 && !alwaysStock) continue;
    const units = ceilUnits(amount / ingredient.typicalPurchaseQuantity);
    lines.push({
      ingredient,
      needed: amount,
      purchaseUnits: alwaysStock ? Math.max(1, units) : units,
      usedByDrinkIds: [...(usedBy.get(ingredient.id) ?? [])],
    });
  }

  lines.sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.ingredient.category) - CATEGORY_ORDER.indexOf(b.ingredient.category),
  );

  return { ...servingPlan, lines };
}

/** Lines grouped by shopping section, in display order. */
export function groupLinesByCategory(lines: ShoppingLine[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    lines: lines.filter((line) => line.ingredient.category === category),
  })).filter((group) => group.lines.length > 0);
}
