import {
  Citrus,
  Compass,
  Flame,
  Gauge,
  Grape,
  Leaf,
  type LucideIcon,
  Martini,
  Mountain,
  Sparkles,
  Star,
  Sun,
  Waves,
  Wine,
  Candy,
  Droplets,
  Shuffle,
  GlassWater,
  Wind,
} from "lucide-react";
import type { QuestionId } from "@/types/recommendation";

/** Icon + accent color per answer option. Purely presentational. */
const OPTION_STYLES: Partial<Record<QuestionId, Record<string, { icon: LucideIcon; color: string }>>> = {
  alcohol: {
    alcoholic: { icon: Martini, color: "#ff6a47" },
    "non-alcoholic": { icon: Leaf, color: "#a7afff" },
  },
  flavor: {
    "bright-citrusy": { icon: Citrus, color: "#f2d24b" },
    "fruity-juicy": { icon: Grape, color: "#a7afff" },
    "sweet-easy": { icon: Candy, color: "#f5a8c0" },
    "crisp-refreshing": { icon: Wind, color: "#8fe0c8" },
    bittersweet: { icon: Compass, color: "#ff8a4c" },
    "bold-strong": { icon: Flame, color: "#e0a458" },
  },
  carbonation: {
    still: { icon: GlassWater, color: "#e8d9b8" },
    sparkling: { icon: Sparkles, color: "#a7afff" },
  },
  strength: {
    easy: { icon: Waves, color: "#8fe0c8" },
    balanced: { icon: Gauge, color: "#f2d24b" },
    bold: { icon: Flame, color: "#ff6a47" },
  },
  style: {
    classic: { icon: Star, color: "#f2d24b" },
    adventurous: { icon: Shuffle, color: "#a7afff" },
  },
  smoke: {
    clean: { icon: Sun, color: "#f2d24b" },
    smoky: { icon: Mountain, color: "#c9a27e" },
  },
};

const SPIRIT_COLORS: Record<string, string> = {
  bourbon: "#e0a458",
  tequila: "#c8e07a",
  mezcal: "#c9a27e",
  cognac: "#d98b4f",
  gin: "#8fe0c8",
  vodka: "#e8e4dc",
  rum: "#f0b46a",
  aperitif: "#ff7a3d",
  "no-preference": "#a7afff",
};

export function optionStyle(questionId: QuestionId, value: string): { icon: LucideIcon; color: string } {
  if (questionId === "spirit") {
    return { icon: value === "no-preference" ? Shuffle : value === "aperitif" ? Wine : Droplets, color: SPIRIT_COLORS[value] ?? "#a7afff" };
  }
  return OPTION_STYLES[questionId]?.[value] ?? { icon: Sparkles, color: "#a7afff" };
}
