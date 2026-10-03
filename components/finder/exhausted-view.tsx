"use client";

import Link from "next/link";
import { BookOpen, Pencil, RotateCcw } from "lucide-react";
import type { Ref } from "react";
import { Button } from "@/components/ui/button";
import { DrinkSwatch } from "@/components/drinks/drink-swatch";
import { drinksById } from "@/data/drinks";

interface ExhaustedViewProps {
  shownDrinkIds: string[];
  headingRef: Ref<HTMLHeadingElement>;
  onChangeAnswers: () => void;
  onRestart: () => void;
}

export function ExhaustedView({ shownDrinkIds, headingRef, onChangeAnswers, onRestart }: ExhaustedViewProps) {
  const shown = shownDrinkIds.map((id) => drinksById[id]).filter(Boolean);

  return (
    <section aria-labelledby="exhausted-heading" className="flex flex-col">
      <h1
        id="exhausted-heading"
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-display text-[clamp(2rem,8.5vw,2.8rem)] leading-[1.05] font-medium tracking-tight text-balance focus:outline-none"
      >
        You&apos;ve seen the best matches for those choices.
      </h1>
      <p className="mt-3 text-[1.05rem] text-muted-foreground">
        Change an answer for fresh ideas, or browse everything on the menu.
      </p>

      <div className="mt-7 grid gap-3">
        <Button size="xl" onClick={onChangeAnswers}>
          <Pencil aria-hidden />
          Change an Answer
        </Button>
        <Button size="xl" variant="outline" onClick={onRestart}>
          <RotateCcw aria-hidden />
          Start Over
        </Button>
        <Button size="xl" variant="outline" asChild>
          <Link href="/menu">
            <BookOpen aria-hidden />
            Browse Full Menu
          </Link>
        </Button>
      </div>

      {shown.length > 0 && (
        <div className="mt-10">
          <h2 className="eyebrow">Your picks so far</h2>
          <ul className="mt-3 grid gap-2">
            {shown.map((drink) => (
              <li key={drink.id}>
                <Link
                  href={`/drink/${drink.id}?from=find`}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface/80 p-2 pr-4 hover:bg-surface-raised"
                >
                  <DrinkSwatch drink={drink} className="size-12 rounded-xl" idSuffix="-seen" />
                  <span className="font-display text-lg">{drink.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
