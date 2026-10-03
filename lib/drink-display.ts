import { drinksById } from "@/data/drinks";
import { ingredientsById } from "@/data/ingredients";
import type { Drink } from "@/types/drink";

/** Guest-facing ingredient names, e.g. ["Tequila", "Cointreau", "Blood Orange", "Lime"]. */
export function guestIngredients(drink: Drink): string[] {
  const names = drink.recipe
    .map((item) => ingredientsById[item.ingredientId]?.guestName)
    .filter((name): name is string => Boolean(name));
  return [...new Set(names)];
}

const GARNISH_LABELS: Record<string, string> = {
  lemon: "Lemon",
  lime: "Lime",
  orange: "Orange",
  blueberries: "Blueberries",
  kosher_salt: "Salt rim (optional)",
};

export function garnishLabels(drink: Drink): string[] {
  return drink.garnishIngredientIds.map((id) => GARNISH_LABELS[id] ?? ingredientsById[id]?.name ?? id);
}

export function naAlternative(drink: Drink): Drink | undefined {
  return drink.naAlternativeId ? drinksById[drink.naAlternativeId] : undefined;
}

export function cardTags(drink: Drink, count = 3) {
  return drink.flavorTags.slice(0, count);
}
