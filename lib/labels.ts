import type { BaseSpirit, GlassType, Strength } from "@/types/drink";

export const SPIRIT_LABELS: Record<BaseSpirit, { label: string; searchTerms: string[] }> = {
  bourbon: { label: "Whiskey", searchTerms: ["whiskey", "whisky", "bourbon"] },
  tequila: { label: "Tequila", searchTerms: ["tequila"] },
  mezcal: { label: "Mezcal", searchTerms: ["mezcal", "mescal"] },
  cognac: { label: "Cognac", searchTerms: ["cognac", "brandy", "hennessy"] },
  gin: { label: "Gin", searchTerms: ["gin"] },
  vodka: { label: "Vodka", searchTerms: ["vodka"] },
  rum: { label: "Rum", searchTerms: ["rum"] },
  aperitif: { label: "Aperitif", searchTerms: ["aperitif", "aperitivo"] },
  none: { label: "Zero-proof", searchTerms: ["non-alcoholic", "na", "zero proof", "alcohol free", "no alcohol"] },
};

export const STRENGTH_LABELS: Record<Strength, string> = {
  zero: "Alcohol-free",
  light: "Light",
  balanced: "Balanced",
  strong: "Strong",
};

export const GLASS_LABELS: Record<GlassType, string> = {
  rocks: "Rocks glass",
  coupe: "Coupe",
  highball: "Highball",
  flute: "Flute",
  wine: "Wine glass",
};

export function formatAmount(amount: number): string {
  const whole = Math.floor(amount);
  const fraction = Math.round((amount - whole) * 100) / 100;
  const fractions: Record<number, string> = { 0.25: "¼", 0.5: "½", 0.75: "¾" };
  if (fraction === 0) return String(whole);
  if (fractions[fraction]) return whole ? `${whole}${fractions[fraction]}` : fractions[fraction];
  return String(Math.round(amount * 100) / 100);
}
