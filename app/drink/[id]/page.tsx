import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { AlcoholBadge } from "@/components/drinks/alcohol-badge";
import { BackLink, BackLinkButton, FromAwareLink } from "@/components/drinks/back-link";
import { FlavorTags } from "@/components/drinks/flavor-tags";
import { GlassIllustration } from "@/components/drinks/glass-illustration";
import { TopBar } from "@/components/shared/top-bar";
import { drinks, getDrink } from "@/data/drinks";
import { guestIngredients, naAlternative } from "@/lib/drink-display";
import { GLASS_LABELS, STRENGTH_LABELS } from "@/lib/labels";
import type { Drink } from "@/types/drink";

export const dynamicParams = false;

export function generateStaticParams() {
  return drinks.map((drink) => ({ id: drink.id }));
}

export async function generateMetadata({ params }: PageProps<"/drink/[id]">): Promise<Metadata> {
  const drink = getDrink((await params).id);
  return drink ? { title: drink.name, description: drink.description } : {};
}

export default async function DrinkPage({ params }: PageProps<"/drink/[id]">) {
  const drink = getDrink((await params).id);
  if (!drink) notFound();
  const na = naAlternative(drink);
  const facts = [
    { label: "Served in", value: GLASS_LABELS[drink.glass] },
    { label: "Strength", value: STRENGTH_LABELS[drink.strength] },
    { label: "Texture", value: drink.carbonation === "sparkling" ? "Bubbly" : "Still" },
  ];

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 pb-[max(env(safe-area-inset-bottom),2.5rem)] sm:px-8">
      <TopBar
        left={
          <Suspense fallback={<BackLinkButton fromFinder={false} />}>
            <BackLink />
          </Suspense>
        }
      />

      <main className="flex flex-1 flex-col">
        <div className="relative flex justify-center pt-2 pb-6">
          <div
            aria-hidden
            className="absolute inset-0 mx-auto max-w-xs rounded-full blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${drink.color}50, transparent)` }}
          />
          <GlassIllustration drink={drink} pour className="relative h-44 w-auto sm:h-52" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <AlcoholBadge status={drink.alcoholStatus} />
          <span className="text-sm text-muted-foreground">{drink.menuSection}</span>
        </div>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,10vw,3.4rem)] leading-[1] font-medium tracking-tight text-balance">
          {drink.name}
        </h1>
        <p className="mt-3 text-lg text-foreground/85 text-pretty">{drink.description}</p>

        <section aria-labelledby="ingredients-heading" className="mt-8">
          <h2 id="ingredients-heading" className="eyebrow">
            What&apos;s in it
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {guestIngredients(drink).map((name) => (
              <li key={name} className="rounded-xl border border-border bg-surface/80 px-3.5 py-2 text-[0.95rem] font-medium">
                {name}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="flavor-heading" className="mt-7">
          <h2 id="flavor-heading" className="eyebrow">
            Tastes
          </h2>
          <FlavorTags tags={drink.flavorTags} className="mt-3" />
        </section>

        <dl className="mt-7 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-surface/70">
          {facts.map((fact) => (
            <div key={fact.label} className="px-3 py-3.5 text-center">
              <dt className="text-xs font-medium text-muted-foreground">{fact.label}</dt>
              <dd className="mt-0.5 text-[0.95rem] font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {na && (
          <Suspense fallback={<NaCard na={na} href={`/drink/${na.id}`} />}>
            <NaCard na={na} href={`/drink/${na.id}`} preserveFrom />
          </Suspense>
        )}

        <div className="mt-auto pt-10">
          <Suspense fallback={<BackLinkButton fromFinder={false} variant="outline" />}>
            <BackLink variant="outline" />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function NaCard({ na, href, preserveFrom = false }: { na: Drink; href: string; preserveFrom?: boolean }) {
  const LinkComponent = preserveFrom ? FromAwareLink : Link;
  return (
    <LinkComponent
      href={href}
      className="mt-7 flex items-center gap-3 rounded-2xl border border-periwinkle/30 bg-periwinkle/[0.07] p-4 transition-colors hover:bg-periwinkle/[0.12]"
    >
      <Leaf aria-hidden className="size-5 shrink-0 text-periwinkle" />
      <span className="flex-1">
        <span className="block text-sm text-muted-foreground">Want it without alcohol?</span>
        <span className="font-display text-xl">{na.name}</span>
      </span>
      <ArrowRight aria-hidden className="size-5 shrink-0 text-periwinkle" />
    </LinkComponent>
  );
}
