import type { Unit } from "./ingredient";

export type AlcoholStatus = "alcoholic" | "non-alcoholic";

/**
 * What kind of beverage this is. Phase 1 only serves the first three;
 * later phases can add e.g. "coffee" or "tea" without touching existing drinks.
 */
export type BeverageType = "cocktail" | "spirit-pour" | "zero-proof";

export type BaseSpirit =
  | "bourbon"
  | "tequila"
  | "mezcal"
  | "cognac"
  | "gin"
  | "vodka"
  | "rum"
  | "aperitif"
  | "none";

export type Strength = "zero" | "light" | "balanced" | "strong";
export type Carbonation = "still" | "sparkling";
export type DrinkStyle = "classic" | "modern-classic" | "house";
export type GlassType = "rocks" | "coupe" | "highball" | "flute" | "wine";

export const FLAVOR_TAGS = [
  "Refreshing",
  "Citrusy",
  "Fruity",
  "Sweet",
  "Tart",
  "Bittersweet",
  "Herbal",
  "Spicy",
  "Smoky",
  "Bubbly",
  "Smooth",
  "Spirit-Forward",
  "Light",
  "Strong",
  "Classic",
  "Adventurous",
] as const;

export type FlavorTag = (typeof FLAVOR_TAGS)[number];

/** 1 (none) to 5 (very). Internal only — guests never see these numbers. */
export interface TasteProfile {
  sweetness: number;
  tartness: number;
  bitterness: number;
  spiritForward: number;
}

export interface RecipeItem {
  ingredientId: string;
  amount: number;
  unit: Unit;
}

export interface Drink {
  /** Permanent kebab-case ID, e.g. `moscow-mule`. Used in URLs. */
  id: string;
  name: string;
  alcoholStatus: AlcoholStatus;
  beverageType: BeverageType;
  baseSpirit: BaseSpirit;
  /** Menu section heading this drink is listed under. */
  menuSection: MenuSection;
  /** One short guest-facing taste description. */
  description: string;
  recipe: RecipeItem[];
  /** Step-by-step instructions for the host. */
  method: string[];
  glass: GlassType;
  /** Garnishes (each is one `garnish`/`rim` use per serving for shopping). */
  garnishIngredientIds: string[];
  /** Ordered most-important first; the first 3 appear on menu cards. */
  flavorTags: FlavorTag[];
  tasteProfile: TasteProfile;
  strength: Strength;
  carbonation: Carbonation;
  style: DrinkStyle;
  naAlternativeId?: string;
  /** Extra search terms (nicknames, misspellings). */
  searchAliases: string[];
  /** Final tie-break only. Higher wins. 1–10. */
  recommendationPriority: number;
  /** Liquid color for the glass illustration. */
  color: string;
}

export const MENU_SECTIONS = [
  "Whiskey",
  "Tequila & Mezcal",
  "Cognac",
  "Gin",
  "Vodka",
  "Rum",
  "Aperitif",
  "Non-Alcoholic",
] as const;

export type MenuSection = (typeof MENU_SECTIONS)[number];
