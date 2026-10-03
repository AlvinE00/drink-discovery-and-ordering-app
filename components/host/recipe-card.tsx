import { Leaf } from "lucide-react";
import { AlcoholBadge } from "@/components/drinks/alcohol-badge";
import { DrinkSwatch } from "@/components/drinks/drink-swatch";
import { ingredientsById } from "@/data/ingredients";
import { garnishLabels, naAlternative } from "@/lib/drink-display";
import { formatAmount, GLASS_LABELS } from "@/lib/labels";
import type { Drink } from "@/types/drink";

export function RecipeCard({ drink }: { drink: Drink }) {
  const na = naAlternative(drink);
  const garnishes = garnishLabels(drink);

  return (
    <article id={drink.id} aria-labelledby={`${drink.id}-name`} className="scroll-mt-32 rounded-3xl border border-border bg-surface/85 p-5">
      <header className="flex items-center gap-4">
        <DrinkSwatch drink={drink} className="size-16" idSuffix="-recipe" />
        <div className="min-w-0">
          <h2 id={`${drink.id}-name`} className="font-display text-2xl leading-tight font-medium tracking-tight">
            {drink.name}
          </h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <AlcoholBadge status={drink.alcoholStatus} />
            <span className="text-sm text-muted-foreground">{GLASS_LABELS[drink.glass]}</span>
          </div>
        </div>
      </header>

      <h3 className="sr-only">Ingredients</h3>
      <ul className="mt-5 divide-y divide-border rounded-2xl border border-border bg-background/40">
        {drink.recipe.map((item) => (
          <li key={item.ingredientId} className="flex items-baseline gap-4 px-4 py-2.5">
            <span className="w-16 shrink-0 text-right font-display text-xl font-medium tabular-nums text-coral">
              {formatAmount(item.amount)}
              <span className="ml-1 font-sans text-sm text-muted-foreground">{item.unit}</span>
            </span>
            <span className="text-[1.02rem] font-medium">{ingredientsById[item.ingredientId]?.name}</span>
          </li>
        ))}
      </ul>

      <h3 className="eyebrow mt-5">Method</h3>
      <ol className="mt-2 space-y-1.5">
        {drink.method.map((step, i) => (
          <li key={i} className="flex gap-3 text-[0.98rem] leading-snug">
            <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-foreground/10 text-xs font-bold">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <dl className="mt-5 grid gap-2 text-[0.95rem] sm:grid-cols-2">
        <div>
          <dt className="inline font-semibold">Garnish: </dt>
          <dd className="inline text-muted-foreground">{garnishes.length ? garnishes.join(", ") : "None"}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">NA alternative: </dt>
          <dd className="inline">
            {na ? (
              <a href={`#${na.id}`} className="-my-2 inline-flex min-h-10 items-center gap-1 font-medium text-periwinkle underline-offset-4 hover:underline">
                <Leaf aria-hidden className="size-3.5" />
                {na.name}
              </a>
            ) : (
              <span className="text-muted-foreground">{drink.alcoholStatus === "non-alcoholic" ? "Already alcohol-free" : "None"}</span>
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}
