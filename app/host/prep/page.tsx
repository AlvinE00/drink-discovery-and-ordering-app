import type { Metadata } from "next";
import { CalendarClock, FlaskConical } from "lucide-react";
import { PageHeading } from "@/components/host/page-heading";
import { PREP_GROUPS, SYRUP_RECIPES } from "@/data/prep";

export const metadata: Metadata = { title: "Prep" };

export default function PrepPage() {
  const whenOrder = [...new Set(PREP_GROUPS.map((g) => g.when))];

  return (
    <>
      <PageHeading title="Prep">What to do, and when. Tick things off on the Checklist tab.</PageHeading>

      <div className="space-y-8">
        {whenOrder.map((when) => (
          <section key={when} aria-labelledby={`when-${when}`}>
            <h2 id={`when-${when}`} className="flex items-center gap-2 font-display text-2xl font-medium">
              <CalendarClock aria-hidden className="size-5 text-coral" />
              {when}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {PREP_GROUPS.filter((g) => g.when === when).map((group) => (
                <div key={group.id} className="rounded-3xl border border-border bg-surface/85 p-5">
                  <h3 className="font-semibold">{group.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {group.items.map((item) => (
                      <li key={item.id} className="text-[0.97rem] leading-snug">
                        <span className="mr-2 text-coral" aria-hidden>•</span>
                        {item.label}
                        {item.detail && <span className="block pl-4 text-sm text-muted-foreground">{item.detail}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="syrups-heading">
          <h2 id="syrups-heading" className="flex items-center gap-2 font-display text-2xl font-medium">
            <FlaskConical aria-hidden className="size-5 text-periwinkle" />
            Syrup recipes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The Shopping tab tells you how many batches you need.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {SYRUP_RECIPES.map((syrup) => (
              <div key={syrup.ingredientId} className="rounded-3xl border border-border bg-surface/85 p-5">
                <h3 className="font-semibold">{syrup.name}</h3>
                <p className="mt-1 text-[0.97rem] font-medium text-coral">{syrup.batch}</p>
                <p className="mt-2 text-sm text-muted-foreground">{syrup.steps}</p>
                <p className="mt-2 text-xs text-muted-foreground">Makes about {syrup.batchYieldOz} oz.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
