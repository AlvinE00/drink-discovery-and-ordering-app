import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cardTags } from "@/lib/drink-display";
import type { Drink } from "@/types/drink";
import { AlcoholBadge } from "./alcohol-badge";
import { DrinkSwatch } from "./drink-swatch";

export function DrinkCard({ drink, href }: { drink: Drink; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-3xl min-[380px]:gap-4 border border-border bg-surface/80 p-3.5 pr-3 transition-colors hover:border-foreground/25 hover:bg-surface-raised/80 active:scale-[0.99] focus-visible:outline-offset-2"
    >
      <DrinkSwatch drink={drink} className="size-16 min-[380px]:size-[5.25rem]" />
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="font-display text-[1.3rem] leading-tight font-medium tracking-tight text-balance">
          {drink.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[0.95rem] leading-snug text-muted-foreground">{drink.description}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <AlcoholBadge status={drink.alcoholStatus} />
          <span className="text-xs font-medium text-foreground/75">{cardTags(drink).join(" · ")}</span>
        </div>
      </div>
      <ChevronRight aria-hidden className="mt-6 -mr-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
