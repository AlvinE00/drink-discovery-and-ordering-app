import type { Ingredient } from "@/types/ingredient";

const BOTTLE_750 = { purchaseUnitName: "750 mL bottle", typicalPurchaseQuantity: 25.4 };

export const ingredients: Ingredient[] = [
  // Spirits
  { id: "bourbon", name: "Bourbon", guestName: "Bourbon", category: "spirits", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "tequila_blanco", name: "Blanco tequila", guestName: "Tequila", category: "spirits", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "mezcal", name: "Mezcal", guestName: "Mezcal", category: "spirits", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "hennessy_vs", name: "Hennessy V.S", guestName: "Hennessy", category: "spirits", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "gin", name: "Gin", guestName: "Gin", category: "spirits", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "vodka", name: "Vodka", guestName: "Vodka", category: "spirits", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "rum", name: "Rum", guestName: "Rum", category: "spirits", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },

  // Liqueurs and amari
  { id: "cointreau", name: "Cointreau", guestName: "Cointreau", category: "liqueurs", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "aperol", name: "Aperol", guestName: "Aperol", category: "liqueurs", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },
  { id: "amaro_nonino", name: "Amaro Nonino", guestName: "Amaro Nonino", category: "liqueurs", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },

  // Wine
  { id: "brut_prosecco", name: "Brut Prosecco", guestName: "Prosecco", category: "wine", measurementType: "volume", defaultUnit: "oz", ...BOTTLE_750, isAlcoholic: true },

  // Non-alcoholic modifiers
  { id: "na_bitter_aperitif", name: "NA bitter aperitif", guestName: "Zero-Proof Bitter Aperitif", category: "na-modifiers", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "700 mL bottle", typicalPurchaseQuantity: 23.7, isAlcoholic: false },

  // Citrus and juice — juiced fresh, so the purchase unit is the fruit
  { id: "lemon_juice", name: "Fresh lemon juice", guestName: "Lemon", category: "citrus-juice", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "lemon (≈1 oz juice each)", typicalPurchaseQuantity: 1, isAlcoholic: false },
  { id: "lime_juice", name: "Fresh lime juice", guestName: "Lime", category: "citrus-juice", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "lime (≈0.75 oz juice each)", typicalPurchaseQuantity: 0.75, isAlcoholic: false },
  { id: "blood_orange_juice", name: "Blood-orange juice", guestName: "Blood Orange", category: "citrus-juice", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "1 L bottle", typicalPurchaseQuantity: 33.8, isAlcoholic: false },

  // Syrups — make at home or buy; purchase unit is a 16 oz bottle/batch
  { id: "simple_syrup", name: "Simple syrup (1:1)", guestName: "Simple Syrup", category: "syrups", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "16 oz bottle or batch", typicalPurchaseQuantity: 16, isAlcoholic: false },
  { id: "blueberry_syrup", name: "Blueberry syrup", guestName: "Blueberry", category: "syrups", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "16 oz bottle or batch", typicalPurchaseQuantity: 16, isAlcoholic: false },
  { id: "honey_syrup", name: "Honey syrup (1:1)", guestName: "Honey", category: "syrups", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "16 oz bottle or batch", typicalPurchaseQuantity: 16, isAlcoholic: false },

  // Mixers
  { id: "ginger_beer", name: "Ginger beer", guestName: "Ginger Beer", category: "mixers", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "12 oz can", typicalPurchaseQuantity: 12, isAlcoholic: false },
  { id: "grapefruit_soda", name: "Grapefruit soda", guestName: "Grapefruit Soda", category: "mixers", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "12 oz can", typicalPurchaseQuantity: 12, isAlcoholic: false },
  { id: "club_soda", name: "Club soda", guestName: "Soda Water", category: "mixers", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "1 L bottle", typicalPurchaseQuantity: 33.8, isAlcoholic: false },
  { id: "chilled_water", name: "Chilled filtered water", category: "mixers", measurementType: "volume", defaultUnit: "oz", purchaseUnitName: "gallon", typicalPurchaseQuantity: 128, isAlcoholic: false },

  // Produce / garnish — counted per garnish
  { id: "lemon", name: "Lemons (garnish)", category: "produce", measurementType: "count", defaultUnit: "garnish", purchaseUnitName: "lemon (≈8 wheels)", typicalPurchaseQuantity: 8, isAlcoholic: false },
  { id: "lime", name: "Limes (garnish)", category: "produce", measurementType: "count", defaultUnit: "garnish", purchaseUnitName: "lime (≈8 wedges)", typicalPurchaseQuantity: 8, isAlcoholic: false },
  { id: "orange", name: "Oranges (garnish)", category: "produce", measurementType: "count", defaultUnit: "garnish", purchaseUnitName: "orange (≈8 slices)", typicalPurchaseQuantity: 8, isAlcoholic: false },
  { id: "blueberries", name: "Blueberries (garnish)", category: "produce", measurementType: "count", defaultUnit: "garnish", purchaseUnitName: "6 oz container (≈20 picks)", typicalPurchaseQuantity: 20, isAlcoholic: false },

  // Other
  { id: "angostura_bitters", name: "Angostura bitters", category: "other", measurementType: "count", defaultUnit: "dash", purchaseUnitName: "4 oz bottle", typicalPurchaseQuantity: 120, isAlcoholic: true },
  { id: "kosher_salt", name: "Kosher salt (for rims)", category: "other", measurementType: "count", defaultUnit: "rim", purchaseUnitName: "box", typicalPurchaseQuantity: 150, isAlcoholic: false },
  { id: "ice", name: "Ice", category: "other", measurementType: "weight", defaultUnit: "lb", purchaseUnitName: "10 lb bag", typicalPurchaseQuantity: 10, isAlcoholic: false },
];

export const ingredientsById: Record<string, Ingredient> = Object.fromEntries(
  ingredients.map((ingredient) => [ingredient.id, ingredient]),
);

export function getIngredient(id: string): Ingredient {
  const ingredient = ingredientsById[id];
  if (!ingredient) throw new Error(`Unknown ingredient: ${id}`);
  return ingredient;
}
