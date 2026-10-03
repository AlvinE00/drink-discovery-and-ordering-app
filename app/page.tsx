import Link from "next/link";
import { ArrowRight, BookOpen, ChefHat, WandSparkles } from "lucide-react";
import { drinks, drinksById } from "@/data/drinks";
import { GlassIllustration } from "@/components/drinks/glass-illustration";

const SHELF = ["blood-orange-margarita", "aperol-spritz", "hennessy-blueberry-lemonade", "paper-plane", "french-75"];

export default function HomePage() {
  const naCount = drinks.filter((d) => d.alcoholStatus === "non-alcoholic").length;

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 pt-[max(env(safe-area-inset-top),1.75rem)] pb-[max(env(safe-area-inset-bottom),1.5rem)] sm:px-8">
      <p className="eyebrow animate-rise flex items-center gap-2">
        <span aria-hidden className="inline-block size-1.5 rounded-full bg-coral" />
        Midnight Citrus Social Club
      </p>

      <div className="mt-[clamp(2rem,9vh,5rem)]">
        <h1 className="animate-rise font-display text-[clamp(2.75rem,12vw,4.25rem)] leading-[0.95] font-medium tracking-tight [animation-delay:60ms]">
          What are you <em className="font-normal text-coral italic">drinking?</em>
        </h1>
        <p className="animate-rise mt-4 max-w-sm text-lg text-muted-foreground [animation-delay:120ms]">
          {drinks.length} drinks, made fresh tonight. {naCount} are alcohol-free.
        </p>
      </div>

      <div aria-hidden className="animate-rise mt-8 flex items-end gap-1 [animation-delay:160ms]">
        {SHELF.map((id) => (
          <GlassIllustration key={id} drink={drinksById[id]} idSuffix="-shelf" className="h-16 w-auto sm:h-20" pour />
        ))}
      </div>

      <nav aria-label="Choose how to find a drink" className="mt-6 grid gap-3">
        <Link
          href="/find"
          className="group animate-rise relative overflow-hidden rounded-[1.75rem] bg-coral p-6 text-primary-foreground shadow-[0_24px_60px_-24px_rgb(255_106_71/0.7)] transition-transform active:scale-[0.99] [animation-delay:220ms]"
        >
          <span
            aria-hidden
            className="absolute -top-16 -right-10 size-48 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.35),transparent_65%)]"
          />
          <WandSparkles aria-hidden className="size-7" />
          <span className="mt-5 block font-display text-[2rem] leading-none font-medium tracking-tight">
            Help Me Choose
          </span>
          <span className="mt-2 flex items-center justify-between gap-3 text-base font-medium text-primary-foreground/80">
            Answer a couple quick questions.
            <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/menu"
          className="group animate-rise rounded-[1.75rem] border border-border bg-surface/85 p-6 transition-colors hover:border-foreground/25 active:scale-[0.99] [animation-delay:280ms]"
        >
          <BookOpen aria-hidden className="size-7 text-periwinkle" />
          <span className="mt-5 block font-display text-[2rem] leading-none font-medium tracking-tight">
            I Know What I Want
          </span>
          <span className="mt-2 flex items-center justify-between gap-3 text-base font-medium text-muted-foreground">
            Browse the menu.
            <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </nav>

      <footer className="mt-auto flex items-center justify-between pt-10 text-sm text-muted-foreground">
        <span>Please drink responsibly.</span>
        <Link
          href="/host"
          className="-mr-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 font-medium hover:text-foreground"
        >
          <ChefHat aria-hidden className="size-4" />
          Host
        </Link>
      </footer>
    </main>
  );
}
