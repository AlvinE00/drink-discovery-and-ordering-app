import { describe, expect, test } from "vitest";
import { drinks, drinksById } from "@/data/drinks";
import { ingredients, ingredientsById } from "@/data/ingredients";
import { ALWAYS_STOCK_INGREDIENT_IDS, DEMAND_WEIGHTS } from "@/data/shopping-config";
import { PREP_GROUPS, SYRUP_RECIPES } from "@/data/prep";
import { FLAVOR_TAGS } from "@/types/drink";

// Spec §5: standard Phase 1 builds, exactly.
const SPEC_RECIPES: Record<string, [string, number][]> = {
  "whiskey-on-the-rocks": [["bourbon", 2]],
  "paper-plane": [["bourbon", 0.75], ["aperol", 0.75], ["amaro_nonino", 0.75], ["lemon_juice", 0.75]],
  "whiskey-sour": [["bourbon", 2], ["lemon_juice", 0.75], ["simple_syrup", 0.5]],
  "gold-rush": [["bourbon", 2], ["lemon_juice", 0.75], ["honey_syrup", 0.75]],
  "classic-margarita": [["tequila_blanco", 2], ["cointreau", 1], ["lime_juice", 1]],
  "blood-orange-margarita": [["tequila_blanco", 2], ["cointreau", 1], ["lime_juice", 1], ["blood_orange_juice", 1]],
  "smoky-margarita": [["mezcal", 2], ["cointreau", 1], ["lime_juice", 1]],
  "mezcal-paloma": [["mezcal", 1.5], ["lime_juice", 0.5], ["grapefruit_soda", 3]],
  "hennessy-blueberry-lemonade": [["hennessy_vs", 1.5], ["lemon_juice", 1], ["blueberry_syrup", 0.75], ["chilled_water", 3]],
  "hennessy-ginger-beer": [["hennessy_vs", 1.5], ["lime_juice", 0.5], ["ginger_beer", 4]],
  "gin-collins": [["gin", 1.5], ["lemon_juice", 1], ["simple_syrup", 0.5], ["club_soda", 2]],
  "french-75": [["gin", 1], ["lemon_juice", 0.5], ["simple_syrup", 0.5], ["brut_prosecco", 2]],
  "lemon-drop": [["vodka", 2], ["cointreau", 0.5], ["lemon_juice", 0.75], ["simple_syrup", 0.5]],
  "blueberry-vodka-lemonade": [["vodka", 1.5], ["lemon_juice", 1], ["blueberry_syrup", 0.75], ["chilled_water", 3]],
  "moscow-mule": [["vodka", 2], ["lime_juice", 0.5], ["ginger_beer", 4]],
  "classic-daiquiri": [["rum", 2], ["lime_juice", 1], ["simple_syrup", 0.75]],
  "rum-mule": [["rum", 2], ["lime_juice", 0.5], ["ginger_beer", 4]],
  "aperol-spritz": [["brut_prosecco", 3], ["aperol", 2], ["club_soda", 1]],
  "house-lemonade": [["lemon_juice", 1], ["simple_syrup", 0.75], ["chilled_water", 4]],
  "blueberry-lemonade": [["lemon_juice", 1], ["blueberry_syrup", 0.75], ["chilled_water", 4]],
  "blood-orange-limeade": [["blood_orange_juice", 2], ["lime_juice", 1], ["simple_syrup", 0.5], ["club_soda", 2]],
  "ginger-lime-fizz": [["ginger_beer", 4], ["lime_juice", 0.5], ["club_soda", 1]],
  "bitter-orange-spritz": [["na_bitter_aperitif", 2], ["blood_orange_juice", 2], ["club_soda", 2]],
  "honey-ginger-sour": [["lemon_juice", 1], ["honey_syrup", 0.75], ["ginger_beer", 2], ["chilled_water", 1]],
};

// Spec §5: intentional NA pairings.
const SPEC_NA_PAIRS: Record<string, string | undefined> = {
  "whiskey-sour": "honey-ginger-sour",
  "gold-rush": "honey-ginger-sour",
  "classic-margarita": "blood-orange-limeade",
  "blood-orange-margarita": "blood-orange-limeade",
  "smoky-margarita": "blood-orange-limeade",
  "mezcal-paloma": "ginger-lime-fizz",
  "hennessy-blueberry-lemonade": "blueberry-lemonade",
  "hennessy-ginger-beer": "ginger-lime-fizz",
  "gin-collins": "ginger-lime-fizz",
  "french-75": "bitter-orange-spritz",
  "lemon-drop": "house-lemonade",
  "blueberry-vodka-lemonade": "blueberry-lemonade",
  "moscow-mule": "ginger-lime-fizz",
  "rum-mule": "ginger-lime-fizz",
  "aperol-spritz": "bitter-orange-spritz",
  "whiskey-on-the-rocks": undefined,
  "paper-plane": undefined,
  "classic-daiquiri": undefined,
};

// Spec §14: complete normalized ingredient matrix.
const SPEC_INGREDIENT_IDS = [
  "bourbon", "tequila_blanco", "mezcal", "hennessy_vs", "gin", "vodka", "rum",
  "cointreau", "aperol", "amaro_nonino", "brut_prosecco", "na_bitter_aperitif",
  "lemon_juice", "lime_juice", "blood_orange_juice",
  "simple_syrup", "blueberry_syrup", "honey_syrup",
  "ginger_beer", "grapefruit_soda", "club_soda", "chilled_water",
  "lemon", "lime", "orange", "blueberries",
  "angostura_bitters", "kosher_salt", "ice",
];

describe("drink menu", () => {
  test("has all 24 required drinks: 18 alcoholic, 6 non-alcoholic", () => {
    expect(drinks).toHaveLength(24);
    expect(drinks.filter((d) => d.alcoholStatus === "alcoholic")).toHaveLength(18);
    expect(drinks.filter((d) => d.alcoholStatus === "non-alcoholic")).toHaveLength(6);
    expect(new Set(drinks.map((d) => d.id))).toEqual(new Set(Object.keys(SPEC_RECIPES)));
  });

  test("IDs are unique, stable kebab-case", () => {
    expect(new Set(drinks.map((d) => d.id)).size).toBe(drinks.length);
    for (const drink of drinks) expect(drink.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  test.each(drinks.map((d) => [d.id, d] as const))("%s recipe matches the spec exactly", (id, drink) => {
    expect(drink.recipe.map((r) => [r.ingredientId, r.amount])).toEqual(SPEC_RECIPES[id]);
  });

  test.each(drinks.map((d) => [d.id, d] as const))("%s has valid ingredient references and units", (_id, drink) => {
    for (const item of drink.recipe) {
      const ingredient = ingredientsById[item.ingredientId];
      expect(ingredient, item.ingredientId).toBeDefined();
      expect(item.unit).toBe(ingredient.defaultUnit);
      expect(item.amount).toBeGreaterThan(0);
    }
    for (const garnishId of drink.garnishIngredientIds) {
      const ingredient = ingredientsById[garnishId];
      expect(ingredient, garnishId).toBeDefined();
      expect(ingredient.measurementType).toBe("count");
    }
    expect(drink.method.length).toBeGreaterThan(0);
  });

  test("alcohol status matches the recipe", () => {
    for (const drink of drinks) {
      const hasAlcohol = drink.recipe.some((r) => ingredientsById[r.ingredientId].isAlcoholic);
      expect(hasAlcohol, drink.id).toBe(drink.alcoholStatus === "alcoholic");
      expect(drink.strength === "zero", drink.id).toBe(drink.alcoholStatus === "non-alcoholic");
      expect(drink.baseSpirit === "none", drink.id).toBe(drink.alcoholStatus === "non-alcoholic");
      expect(drink.beverageType === "zero-proof", drink.id).toBe(drink.alcoholStatus === "non-alcoholic");
    }
  });

  test("NA alternatives match the spec pairings and point at NA drinks", () => {
    for (const [drinkId, expected] of Object.entries(SPEC_NA_PAIRS)) {
      expect(drinksById[drinkId].naAlternativeId, drinkId).toBe(expected);
    }
    for (const drink of drinks) {
      if (drink.alcoholStatus === "non-alcoholic") expect(drink.naAlternativeId).toBeUndefined();
      if (drink.naAlternativeId) expect(drinksById[drink.naAlternativeId].alcoholStatus).toBe("non-alcoholic");
    }
  });

  test("flavor tags are valid and consistent with attributes", () => {
    for (const drink of drinks) {
      expect(drink.flavorTags.length, drink.id).toBeGreaterThanOrEqual(3);
      for (const tag of drink.flavorTags) expect(FLAVOR_TAGS).toContain(tag);
      expect(new Set(drink.flavorTags).size).toBe(drink.flavorTags.length);
      expect(drink.flavorTags.includes("Bubbly"), drink.id).toBe(drink.carbonation === "sparkling");
      expect(drink.flavorTags.includes("Strong"), drink.id).toBe(drink.strength === "strong");
      for (const value of Object.values(drink.tasteProfile)) {
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(5);
      }
      expect(drink.recommendationPriority).toBeGreaterThanOrEqual(1);
      expect(drink.recommendationPriority).toBeLessThanOrEqual(10);
    }
  });
});

describe("ingredients", () => {
  test("match the normalized ingredient matrix", () => {
    expect(new Set(ingredients.map((i) => i.id))).toEqual(new Set(SPEC_INGREDIENT_IDS));
    expect(new Set(ingredients.map((i) => i.id)).size).toBe(ingredients.length);
  });

  test("every ingredient is used by a drink or always stocked", () => {
    const used = new Set(drinks.flatMap((d) => [...d.recipe.map((r) => r.ingredientId), ...d.garnishIngredientIds]));
    for (const ingredient of ingredients) {
      const ok = used.has(ingredient.id) || ALWAYS_STOCK_INGREDIENT_IDS.includes(ingredient.id) || ingredient.id === "ice";
      expect(ok, ingredient.id).toBe(true);
    }
  });

  test("purchase quantities are positive and IDs are generic", () => {
    for (const ingredient of ingredients) {
      expect(ingredient.typicalPurchaseQuantity).toBeGreaterThan(0);
      expect(ingredient.id).toMatch(/^[a-z_]+$/);
    }
  });
});

describe("planning data", () => {
  test("every drink has a demand weight and no unknown IDs", () => {
    expect(new Set(Object.keys(DEMAND_WEIGHTS))).toEqual(new Set(drinks.map((d) => d.id)));
  });

  test("syrup recipes reference real syrups and prep IDs are unique", () => {
    for (const syrup of SYRUP_RECIPES) expect(ingredientsById[syrup.ingredientId]?.category).toBe("syrups");
    const ids = PREP_GROUPS.flatMap((g) => g.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
