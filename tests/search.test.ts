import { describe, expect, test } from "vitest";
import { drinks } from "@/data/drinks";
import { filterDrinks } from "@/lib/search";

const ids = (query: string) => filterDrinks({ query }).map((d) => d.id).sort();

describe("menu search", () => {
  test("vodka finds the three vodka drinks", () => {
    expect(ids("vodka")).toEqual(["blueberry-vodka-lemonade", "lemon-drop", "moscow-mule"]);
    expect(ids("VODKA")).toEqual(ids("vodka"));
    expect(ids("vod")).toEqual(ids("vodka"));
  });

  test("ginger finds the five ginger beer drinks", () => {
    expect(ids("ginger")).toEqual(
      ["ginger-lime-fizz", "hennessy-ginger-beer", "honey-ginger-sour", "moscow-mule", "rum-mule"],
    );
  });

  test("gin does not match ginger", () => {
    expect(ids("gin")).toEqual(["french-75", "gin-collins"]);
  });

  test("searches spirit names, nicknames and flavor tags", () => {
    expect(ids("whiskey")).toEqual(["gold-rush", "paper-plane", "whiskey-on-the-rocks", "whiskey-sour"]);
    expect(ids("henny")).toEqual(["hennessy-blueberry-lemonade", "hennessy-ginger-beer"]);
    expect(ids("smoky")).toEqual(["mezcal-paloma", "smoky-margarita"]);
    // The NA limeade is aliased as a "virgin margarita" on purpose.
    expect(ids("margarita")).toEqual(["blood-orange-limeade", "blood-orange-margarita", "classic-margarita", "smoky-margarita"]);
    expect(ids("blood orange")).toContain("bitter-orange-spritz");
    expect(ids("  ")).toHaveLength(24);
    expect(ids("xyzzy")).toEqual([]);
  });

  test("main filter and quick filters", () => {
    expect(filterDrinks({ filter: "non-alcoholic" })).toHaveLength(6);
    expect(filterDrinks({ filter: "alcoholic" })).toHaveLength(18);
    expect(filterDrinks({ filter: "all" })).toHaveLength(drinks.length);
    const bubblyNa = filterDrinks({ filter: "non-alcoholic", tags: ["Bubbly"] });
    expect(bubblyNa.every((d) => d.carbonation === "sparkling" && d.alcoholStatus === "non-alcoholic")).toBe(true);
    expect(filterDrinks({ tags: ["Smoky", "Bubbly"] }).map((d) => d.id)).toEqual(["mezcal-paloma"]);
  });
});
