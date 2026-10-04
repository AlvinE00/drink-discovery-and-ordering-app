"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Compass, Leaf, Pencil, RotateCcw, Shuffle, Sparkles } from "lucide-react";
import type { Ref } from "react";
import { Button } from "@/components/ui/button";
import { AlcoholBadge } from "@/components/drinks/alcohol-badge";
import { GlassIllustration } from "@/components/drinks/glass-illustration";
import { drinksById } from "@/data/drinks";
import { guestIngredients, naAlternative } from "@/lib/drink-display";
import { isGoodMatch, matchedAnswerLabels } from "@/lib/recommendation";
import type { Answer } from "@/types/recommendation";

interface ResultViewProps {
  drinkId: string;
  answers: Answer[];
  /** 0-based position of this drink among the guest's picks. */
  pickIndex: number;
  pickCount: number;
  onShowPick: (index: number) => void;
  headingRef: Ref<HTMLHeadingElement>;
  onTryAnother: () => void;
  onChangeAnswers: () => void;
  onRestart: () => void;
}

export function ResultView({
  drinkId,
  answers,
  pickIndex,
  pickCount,
  onShowPick,
  headingRef,
  onTryAnother,
  onChangeAnswers,
  onRestart,
}: ResultViewProps) {
  const drink = drinksById[drinkId];
  if (!drink) return null;
  const na = naAlternative(drink);
  const reasons = matchedAnswerLabels(drink, answers);
  // Past the closest matches (non-alcoholic Try Another keeps going): say so plainly.
  const goodMatch = isGoodMatch(drink.id, answers);

  return (
    <section aria-labelledby="result-heading" className="flex flex-col">
      {pickCount > 1 && (
        <nav aria-label="Your picks" className="mb-1 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 h-11"
            disabled={pickIndex === 0}
            onClick={() => onShowPick(pickIndex - 1)}
          >
            <ChevronLeft aria-hidden />
            Previous pick
          </Button>
          <span aria-live="polite" className="text-sm font-medium text-muted-foreground tabular-nums">
            Pick {pickIndex + 1} of {pickCount}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="-mr-2 h-11"
            disabled={pickIndex === pickCount - 1}
            onClick={() => onShowPick(pickIndex + 1)}
          >
            Next pick
            <ChevronRight aria-hidden />
          </Button>
        </nav>
      )}
      <div className="relative -mx-5 flex justify-center pt-2 pb-4 sm:mx-0">
        <div
          aria-hidden
          className="animate-reveal absolute inset-x-0 top-0 bottom-0 mx-auto max-w-sm rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${drink.color}55, transparent)` }}
        />
        <GlassIllustration
          key={drink.id}
          drink={drink}
          pour
          idSuffix="-result"
          className="animate-reveal relative h-44 w-auto drop-shadow-[0_20px_40px_rgb(0_0_0/0.45)] sm:h-52"
        />
      </div>

      <p className="eyebrow animate-rise text-center [animation-delay:150ms]">
        {pickIndex === 0 ? "Your drink is…" : `Pick #${pickIndex + 1} · ${goodMatch ? "Try this instead…" : "A little different"}`}
      </p>
      <h1
        id="result-heading"
        ref={headingRef}
        tabIndex={-1}
        className="animate-reveal mt-2 text-center font-display text-[clamp(2.4rem,11vw,3.6rem)] leading-[0.98] font-medium tracking-tight text-balance [animation-delay:200ms] focus:outline-none"
      >
        {drink.name}
      </h1>
      <p className="animate-rise mx-auto mt-3 max-w-md text-center text-lg text-foreground/85 text-pretty [animation-delay:280ms]">
        {drink.description}
      </p>

      <div className="animate-rise mt-5 flex flex-col items-center gap-2.5 text-center [animation-delay:340ms]">
        <p className="text-sm font-semibold tracking-wide text-coral">{drink.flavorTags.slice(0, 3).join(" · ")}</p>
        <p className="text-[0.95rem] text-muted-foreground">{guestIngredients(drink).join(" · ")}</p>
        <AlcoholBadge status={drink.alcoholStatus} />
      </div>

      {!goodMatch ? (
        <p className="animate-rise mx-auto mt-5 inline-flex max-w-md items-start gap-2 self-center rounded-2xl border border-border bg-surface/80 px-3.5 py-2 text-sm text-foreground/80 [animation-delay:380ms]">
          <Compass aria-hidden className="mt-0.5 size-4 shrink-0 text-periwinkle" />
          <span>You&apos;ve seen the closest matches. This one is a little different from what you picked.</span>
        </p>
      ) : reasons.length > 0 && (
        <p className="animate-rise mx-auto mt-5 inline-flex max-w-full items-center gap-2 self-center rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-sm text-foreground/80 [animation-delay:380ms]">
          <Sparkles aria-hidden className="size-4 shrink-0 text-periwinkle" />
          <span>
            <span className="sr-only">Why this drink: </span>
            Matches {reasons.join(" · ")}
          </span>
        </p>
      )}

      <div className="animate-rise mt-7 grid gap-3 [animation-delay:420ms]">
        <Button asChild size="xl">
          <Link href={`/drink/${drink.id}?from=find`}>
            View Drink
            <ArrowRight aria-hidden />
          </Link>
        </Button>
        <Button size="xl" variant="outline" onClick={onTryAnother}>
          <Shuffle aria-hidden />
          Try Another
        </Button>
      </div>

      {na && (
        <Link
          href={`/drink/${na.id}?from=find`}
          className="animate-rise mt-4 flex items-center gap-3 rounded-2xl border border-periwinkle/30 bg-periwinkle/[0.07] p-4 transition-colors hover:bg-periwinkle/[0.12] [animation-delay:460ms]"
        >
          <Leaf aria-hidden className="size-5 shrink-0 text-periwinkle" />
          <span className="flex-1 text-[0.95rem]">
            Want it without alcohol? Try the <strong className="font-semibold text-foreground">{na.name}</strong>
          </span>
          <ArrowRight aria-hidden className="size-4 shrink-0 text-periwinkle" />
        </Link>
      )}

      <div className="animate-rise mt-6 flex flex-wrap justify-center gap-1 [animation-delay:500ms]">
        <Button variant="ghost" onClick={onChangeAnswers}>
          <Pencil aria-hidden />
          Change Answers
        </Button>
        <Button variant="ghost" onClick={onRestart}>
          <RotateCcw aria-hidden />
          Start Over
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/menu">
            <BookOpen aria-hidden />
            Full Menu
          </Link>
        </Button>
      </div>
    </section>
  );
}
