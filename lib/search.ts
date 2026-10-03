import { drinks as allDrinks } from "@/data/drinks";
import { ingredientsById } from "@/data/ingredients";
import { SPIRIT_LABELS } from "@/lib/labels";
import type { AlcoholStatus, Drink, FlavorTag } from "@/types/drink";

export type MenuFilter = "all" | AlcoholStatus;

/** Quick-filter chips on the menu. Each maps directly to a flavor tag. */
export const QUICK_FILTERS: FlavorTag[] = [
  "Refreshing",
  "Fruity",
  "Citrusy",
  "Bubbly",
  "Strong",
  "Smoky",
  "Bittersweet",
];

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Everything a guest might type to find this drink. */
function searchText(drink: Drink): string {
  const ingredientNames = drink.recipe.flatMap(({ ingredientId }) => {
    const ingredient = ingredientsById[ingredientId];
    return ingredient ? [ingredient.name, ingredient.guestName ?? ""] : [];
  });
  return normalize(
    [
      drink.name,
      ...SPIRIT_LABELS[drink.baseSpirit].searchTerms,
      ...ingredientNames,
      ...drink.flavorTags,
      ...drink.searchAliases,
    ].join(" "),
  );
}

const searchIndex = new Map(allDrinks.map((drink) => [drink.id, ` ${searchText(drink)} `]));
const vocabulary = new Set([...searchIndex.values()].flatMap((text) => text.split(" ")));

/**
 * Every query word must match a word in the drink's search text.
 * Complete words match exactly ("gin" ≠ "ginger"); partial words match
 * as prefixes so results update while typing ("vod" → vodka).
 */
export function matchesQuery(drink: Drink, query: string): boolean {
  const words = normalize(query).split(" ").filter(Boolean);
  if (words.length === 0) return true;
  const haystack = searchIndex.get(drink.id) ?? ` ${searchText(drink)} `;
  return words.every((word) =>
    vocabulary.has(word) ? haystack.includes(` ${word} `) : haystack.includes(` ${word}`),
  );
}

export function filterDrinks(
  { query = "", filter = "all", tags = [] }: { query?: string; filter?: MenuFilter; tags?: FlavorTag[] },
  drinks: Drink[] = allDrinks,
): Drink[] {
  return drinks.filter(
    (drink) =>
      (filter === "all" || drink.alcoholStatus === filter) &&
      tags.every((tag) => drink.flavorTags.includes(tag)) &&
      matchesQuery(drink, query),
  );
}
