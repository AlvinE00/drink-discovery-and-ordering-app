"use client";

import Link from "next/link";
import { BookOpen, Pencil, RotateCcw } from "lucide-react";
import type { Ref } from "react";
import { Button } from "@/components/ui/button";
import { DrinkSwatch } from "@/components/drinks/drink-swatch";
import { drinksById } from "@/data/drinks";

interface ExhaustedViewProps {
  shownDrinkIds: string[];
  /** True when the guest has seen every drink in their group (non-alcoholic). */
  seenEverything: boolean;
  headingRef: Ref<HTMLHeadingElement>;
  onChangeAnswers: () => void;
  onRestart: () => void;
  onShowPick: (index: number) => void;
}

export function ExhaustedView({ shownDrinkIds, seenEverything, headingRef, onChangeAnswers, onRestart, onShowPick }: ExhaustedViewProps) {
  return (
    <section aria-labelledby="exhausted-heading" className="flex flex-col">
      <h1
        id="exhausted-heading"
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-display text-[clamp(2rem,8.5vw,2.8rem)] leading-[1.05] font-medium tracking-tight text-balance focus:outline-none"
      >
        {seenEverything ? "You've seen every non-alcoholic drink." : "You've seen the best matches for those choices."}
      </h1>
      <p className="mt-3 text-[1.05rem] text-muted-foreground">
        {seenEverything
          ? "Pick one of your favorites below, or browse the full menu."
          : "Change an answer for fresh ideas, or browse everything on the menu."}
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

      {shownDrinkIds.length > 0 && (
        <div className="mt-10">
          <h2 className="eyebrow">Your picks so far</h2>
          <ul className="mt-3 grid gap-2">
            {shownDrinkIds.map((id, index) => {
              const drink = drinksById[id];
              if (!drink) return null;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onShowPick(index)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-border bg-surface/80 p-2 pr-4 text-left hover:bg-surface-raised"
                  >
                    <DrinkSwatch drink={drink} className="size-12 rounded-xl" idSuffix="-seen" />
                    <span className="flex-1 font-display text-lg">{drink.name}</span>
                    <span className="text-sm text-muted-foreground">Pick {index + 1}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
