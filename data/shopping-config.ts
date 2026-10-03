/**
 * Party-planning defaults. Edit these before the party — the host Shopping
 * screen also lets you override guests, drinks, split and popularity live.
 */

export const SHOPPING_DEFAULTS = {
  guests: 20,
  drinksPerGuest: 3,
  /** Extra servings planned on top of the estimate. 0.2 = 20%. */
  bufferRate: 0.2,
  /** Share of app drinks expected to be alcoholic. 0.8 = 80%. */
  alcoholicShare: 0.8,
  /** Ice per planned serving (shaking + serving), in lb. */
  iceLbPerServing: 0.5,
};

/**
 * Expected popularity of each drink, 1 (rarely ordered) to 5 (crowd favorite).
 * Servings are split proportionally within the alcoholic and non-alcoholic groups.
 * Drinks missing from this list default to 3.
 */
export const DEMAND_WEIGHTS: Record<string, number> = {
  "whiskey-on-the-rocks": 2,
  "paper-plane": 1,
  "whiskey-sour": 4,
  "gold-rush": 2,
  "classic-margarita": 4,
  "blood-orange-margarita": 5,
  "smoky-margarita": 2,
  "mezcal-paloma": 2,
  "hennessy-blueberry-lemonade": 5,
  "hennessy-ginger-beer": 3,
  "gin-collins": 2,
  "french-75": 2,
  "lemon-drop": 3,
  "blueberry-vodka-lemonade": 3,
  "moscow-mule": 4,
  "classic-daiquiri": 2,
  "rum-mule": 2,
  "aperol-spritz": 3,
  "house-lemonade": 5,
  "blueberry-lemonade": 5,
  "blood-orange-limeade": 3,
  "ginger-lime-fizz": 2,
  "bitter-orange-spritz": 1,
  "honey-ginger-sour": 2,
};

export const DEFAULT_DEMAND_WEIGHT = 3;

/** Bought regardless of calculated need (minimum 1 purchase unit). */
export const ALWAYS_STOCK_INGREDIENT_IDS = ["angostura_bitters", "kosher_salt"];

/** Non-ingredient items shown at the end of the shopping list. */
export const BAR_SUPPLIES = [
  "Napkins",
  "Cups or glasses (rocks, highball, coupe, flute, wine)",
  "Cocktail picks (optional, for blueberry garnish)",
  "Straws (optional)",
];
