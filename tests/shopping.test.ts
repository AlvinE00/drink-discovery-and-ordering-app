import { describe, expect, test } from "vitest";
import { drinks, drinksById } from "@/data/drinks";
import { calculateShoppingPlan, defaultShoppingInputs, type ShoppingInputs } from "@/lib/shopping";

const onlyDrink = (drinkId: string, servings: number): ShoppingInputs => ({
  guests: servings,
  drinksPerGuest: 1,
  bufferRate: 0,
  alcoholicShare: drinksById[drinkId].alcoholStatus === "alcoholic" ? 1 : 0,
  demandWeights: Object.fromEntries(drinks.map((d) => [d.id, d.id === drinkId ? 1 : 0])),
  iceLbPerServing: 0,
});

describe("shopping calculator", () => {
  test("20 guests × 3 drinks + 20% buffer = 72 planned servings, split 80/20", () => {
    const plan = calculateShoppingPlan({ ...defaultShoppingInputs(), guests: 20, drinksPerGuest: 3 });
    expect(plan.plannedServings).toBeCloseTo(72);
    expect(plan.alcoholicServings).toBeCloseTo(57.6);
    expect(plan.nonAlcoholicServings).toBeCloseTo(14.4);
    const total = plan.drinkPlans.reduce((sum, p) => sum + p.servings, 0);
    expect(total).toBeCloseTo(72);
  });

  test("shared ingredients are combined into one line", () => {
    const plan = calculateShoppingPlan(defaultShoppingInputs());
    const gingerLines = plan.lines.filter((l) => l.ingredient.id === "ginger_beer");
    expect(gingerLines).toHaveLength(1);
    expect(gingerLines[0].usedByDrinkIds.sort()).toEqual(
      ["ginger-lime-fizz", "hennessy-ginger-beer", "honey-ginger-sour", "moscow-mule", "rum-mule"],
    );
    const expectedOz = plan.drinkPlans.reduce((sum, { drink, servings }) => {
      const item = drink.recipe.find((r) => r.ingredientId === "ginger_beer");
      return sum + (item ? item.amount * servings : 0);
    }, 0);
    expect(gingerLines[0].needed).toBeCloseTo(expectedOz);
    expect(new Set(plan.lines.map((l) => l.ingredient.id)).size).toBe(plan.lines.length);
  });

  test("bottles always round up, without floating-point surprises", () => {
    const at = (servings: number) =>
      calculateShoppingPlan(onlyDrink("whiskey-on-the-rocks", servings)).lines.find((l) => l.ingredient.id === "bourbon")!;
    expect(at(12.7).purchaseUnits).toBe(1); // 25.4 oz = exactly one bottle
    expect(at(13).purchaseUnits).toBe(2); // 26 oz
    expect(at(25.4).purchaseUnits).toBe(2); // 50.8 oz = exactly two
  });

  test("garnishes, ice and always-stock items are included", () => {
    const plan = calculateShoppingPlan(defaultShoppingInputs());
    const line = (id: string) => plan.lines.find((l) => l.ingredient.id === id);
    expect(line("lime")!.purchaseUnits).toBeGreaterThan(0);
    expect(line("ice")!.needed).toBeCloseTo(72 * 0.5);
    expect(line("ice")!.purchaseUnits).toBe(4);
    expect(line("angostura_bitters")!.purchaseUnits).toBe(1);
    expect(line("kosher_salt")!.purchaseUnits).toBe(1);
  });

  test("drinks set to 0 popularity need nothing", () => {
    const plan = calculateShoppingPlan(onlyDrink("house-lemonade", 10));
    expect(plan.lines.map((l) => l.ingredient.id).sort()).toEqual(
      ["angostura_bitters", "chilled_water", "kosher_salt", "lemon", "lemon_juice", "simple_syrup"],
    );
    expect(plan.lines.find((l) => l.ingredient.id === "lemon_juice")!.needed).toBeCloseTo(10);
  });

  test("zero guests or invalid input never produces negative amounts", () => {
    const plan = calculateShoppingPlan({ ...defaultShoppingInputs(), guests: 0 });
    expect(plan.plannedServings).toBe(0);
    for (const l of plan.lines) expect(l.needed).toBeGreaterThanOrEqual(0);
    const weird = calculateShoppingPlan({ ...defaultShoppingInputs(), guests: -5, alcoholicShare: 3 });
    expect(weird.plannedServings).toBe(0);
  });
});
