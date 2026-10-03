import { cn } from "@/lib/utils";
import type { Drink, GlassType } from "@/types/drink";

/*
 * Line-art glass filled with the drink's color. Shapes share one 80×100 viewBox.
 * `interior` clips the liquid; `liquidTop` is where the pour line sits.
 */
const GLASSES: Record<
  GlassType,
  { interior: string; extra?: string; liquidTop: number; rim: [number, number]; ice: [number, number, number][] }
> = {
  rocks: {
    interior: "M14 36 L18 88 Q18 92 22 92 L58 92 Q62 92 62 88 L66 36 Z",
    liquidTop: 50,
    rim: [63, 37],
    ice: [[26, 50, -8], [40, 62, 10]],
  },
  highball: {
    interior: "M22 12 L24 90 Q24 94 28 94 L52 94 Q56 94 56 90 L58 12 Z",
    liquidTop: 24,
    rim: [56, 13],
    ice: [[29, 28, -6], [36, 48, 8], [28, 68, -4]],
  },
  coupe: {
    interior: "M8 30 Q10 58 40 60 Q70 58 72 30 Z",
    extra: "M40 60 L40 90 M26 93 Q40 87 54 93",
    liquidTop: 36,
    rim: [69, 31],
    ice: [],
  },
  flute: {
    interior: "M28 6 L52 6 Q53 38 47 54 Q40 62 33 54 Q27 38 28 6 Z",
    extra: "M40 59 L40 90 M28 93 Q40 88 52 93",
    liquidTop: 16,
    rim: [51, 7],
    ice: [],
  },
  wine: {
    interior: "M18 14 Q13 56 40 60 Q67 56 62 14 Z",
    extra: "M40 60 L40 90 M26 93 Q40 87 54 93",
    liquidTop: 30,
    rim: [61, 16],
    ice: [[30, 34, -10], [42, 40, 12]],
  },
};

const CITRUS_COLORS: Record<string, string> = {
  lemon: "#F5D547",
  lime: "#9CCB4C",
  orange: "#F39A33",
};

interface GlassIllustrationProps {
  drink: Pick<Drink, "id" | "glass" | "color" | "carbonation" | "garnishIngredientIds">;
  className?: string;
  /** Animate the liquid pouring in (result screens). */
  pour?: boolean;
  /** Distinguishes SVG ids when the same drink renders twice on a page. */
  idSuffix?: string;
}

export function GlassIllustration({ drink, className, pour = false, idSuffix = "" }: GlassIllustrationProps) {
  const glass = GLASSES[drink.glass];
  const clipId = `glass-${drink.id}${idSuffix}`;
  const shineId = `shine-${drink.id}${idSuffix}`;
  const citrus = drink.garnishIngredientIds.find((id) => id in CITRUS_COLORS);
  const hasBlueberries = drink.garnishIngredientIds.includes("blueberries");
  const [rimX, rimY] = glass.rim;

  return (
    <svg viewBox="0 0 80 100" aria-hidden="true" className={cn("overflow-visible", className)}>
      <defs>
        <clipPath id={clipId}>
          <path d={glass.interior} />
        </clipPath>
        <linearGradient id={shineId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <g
          className={pour ? "animate-pour" : undefined}
          style={pour ? { transformBox: "fill-box", animationDelay: "120ms" } : undefined}
        >
          <rect x="0" y={glass.liquidTop} width="80" height={100 - glass.liquidTop} fill={drink.color} opacity="0.92" />
          <rect x="0" y={glass.liquidTop} width="80" height="2.5" fill="#fff" opacity="0.28" />
          {glass.ice.map(([x, y, rotate], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="15"
              height="15"
              rx="3"
              transform={`rotate(${rotate} ${x + 7.5} ${y + 7.5})`}
              fill="#fff"
              fillOpacity="0.16"
              stroke="#fff"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          ))}
          {drink.carbonation === "sparkling" &&
            [
              [34, 80, 1.6],
              [44, 70, 1.2],
              [38, 60, 1.4],
              [48, 86, 1.1],
              [30, 68, 1],
              [42, glass.liquidTop + 8, 1.2],
            ].map(([cx, cy, r], i) =>
              cy > glass.liquidTop + 3 ? (
                <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" fillOpacity="0.55" />
              ) : null,
            )}
        </g>
        <rect x="0" y="0" width="80" height="100" fill={`url(#${shineId})`} />
      </g>

      <path
        d={glass.interior}
        fill="none"
        stroke="var(--foreground)"
        strokeOpacity="0.62"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {glass.extra && (
        <path d={glass.extra} fill="none" stroke="var(--foreground)" strokeOpacity="0.62" strokeWidth="1.6" strokeLinecap="round" />
      )}

      {citrus && (
        <g transform={`translate(${rimX} ${rimY})`}>
          <circle r="9" fill={CITRUS_COLORS[citrus]} />
          <circle r="7" fill={CITRUS_COLORS[citrus]} stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
          {[0, 60, 120].map((angle) => (
            <line
              key={angle}
              x1="-6.5"
              x2="6.5"
              transform={`rotate(${angle})`}
              stroke="#fff"
              strokeOpacity="0.6"
              strokeWidth="0.8"
            />
          ))}
        </g>
      )}
      {hasBlueberries && (
        <g transform={`translate(${rimX - (citrus ? 16 : 4)} ${rimY - 6}) rotate(-28)`}>
          <line x1="0" y1="-4" x2="0" y2="22" stroke="var(--foreground)" strokeOpacity="0.7" strokeWidth="1" />
          {[2, 8.5, 15].map((y) => (
            <circle key={y} cx="0" cy={y} r="3.4" fill="#4E5BC4" stroke="#C9CEFF" strokeOpacity="0.5" strokeWidth="0.6" />
          ))}
        </g>
      )}
    </svg>
  );
}
