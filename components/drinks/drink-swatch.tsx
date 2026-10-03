import { cn } from "@/lib/utils";
import type { Drink } from "@/types/drink";
import { GlassIllustration } from "./glass-illustration";

/** The drink's glass on a softly tinted tile. */
export function DrinkSwatch({ drink, className, idSuffix }: { drink: Drink; className?: string; idSuffix?: string }) {
  return (
    <div
      className={cn("grid shrink-0 place-items-center rounded-2xl border border-border", className)}
      style={{
        background: `radial-gradient(circle at 50% 70%, ${drink.color}38, transparent 70%), var(--surface-raised)`,
      }}
    >
      <GlassIllustration drink={drink} idSuffix={idSuffix} className="h-[72%] w-auto" />
    </div>
  );
}
