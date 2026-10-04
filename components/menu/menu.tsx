"use client";

import Link from "next/link";
import { ArrowLeft, Check, Search, SearchX, WandSparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DrinkCard } from "@/components/drinks/drink-card";
import { TopBar } from "@/components/shared/top-bar";
import { drinks } from "@/data/drinks";
import { useHydrated } from "@/hooks/use-hydrated";
import { filterDrinks, QUICK_FILTERS, type MenuFilter } from "@/lib/search";
import { readStored, STORAGE_KEYS, writeStored } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { FLAVOR_TAGS, MENU_SECTIONS, type FlavorTag } from "@/types/drink";

interface MenuState {
  query: string;
  filter: MenuFilter;
  tags: FlavorTag[];
}

const EMPTY: MenuState = { query: "", filter: "all", tags: [] };

const FILTERS: { value: MenuFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "alcoholic", label: "Cocktails" },
  { value: "non-alcoholic", label: "Non-Alcoholic" },
];

function restoreMenuState(saved: unknown): MenuState {
  if (!saved || typeof saved !== "object") return EMPTY;
  const raw = saved as Partial<MenuState>;
  return {
    query: typeof raw.query === "string" ? raw.query.slice(0, 80) : "",
    filter: FILTERS.some((f) => f.value === raw.filter) ? (raw.filter as MenuFilter) : "all",
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t): t is FlavorTag => FLAVOR_TAGS.includes(t)) : [],
  };
}

export function Menu() {
  const hydrated = useHydrated();
  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-5 pb-[max(env(safe-area-inset-bottom),2.5rem)] sm:px-8">
      <TopBar
        left={
          <Button asChild variant="ghost" size="icon" className="-ml-2.5" aria-label="Back to home">
            <Link href="/">
              <ArrowLeft aria-hidden className="size-5" />
            </Link>
          </Button>
        }
        right={
          <Button asChild variant="ghost" size="sm" className="-mr-2 h-11">
            <Link href="/find">
              <WandSparkles aria-hidden />
              Help Me Choose
            </Link>
          </Button>
        }
      />
      <header className="mt-2">
        <p className="eyebrow">Tonight&apos;s menu</p>
        <h1 className="mt-1 font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-none font-medium tracking-tight">
          The Menu
        </h1>
      </header>
      {/* Server-render the full menu; once hydrated, remount with the guest's saved filters. */}
      <MenuBody key={hydrated ? "restored" : "initial"} restore={hydrated} />
    </div>
  );
}

function MenuBody({ restore }: { restore: boolean }) {
  const [state, setState] = useState<MenuState>(() =>
    restore ? restoreMenuState(readStored("session", STORAGE_KEYS.menu)) : EMPTY,
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const results = filterDrinks(state);
  const counts = {
    all: drinks.length,
    alcoholic: drinks.filter((d) => d.alcoholStatus === "alcoholic").length,
    "non-alcoholic": drinks.filter((d) => d.alcoholStatus === "non-alcoholic").length,
  };
  const hasFilters = state.query.trim() !== "" || state.filter !== "all" || state.tags.length > 0;

  useEffect(() => {
    if (restore) writeStored("session", STORAGE_KEYS.menu, state);
  }, [state, restore]);

  const update = (patch: Partial<MenuState>) => setState((s) => ({ ...s, ...patch }));
  const toggleTag = (tag: FlavorTag) =>
    setState((s) => ({ ...s, tags: s.tags.includes(tag) ? s.tags.filter((t) => t !== tag) : [...s.tags, tag] }));

  return (
    <>
      <div className="mt-6 space-y-4">
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchRef}
            type="search"
            value={state.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Search drinks or flavors"
            aria-label="Search drinks"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
            className="h-14 w-full rounded-2xl border border-input bg-surface/90 pr-12 pl-12 text-base text-foreground placeholder:text-muted-foreground/80 focus:border-coral focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {state.query && (
            <button
              type="button"
              onClick={() => {
                update({ query: "" });
                searchRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground hover:bg-surface-raised hover:text-foreground"
            >
              <X aria-hidden className="size-5" />
            </button>
          )}
        </div>

        <div role="group" aria-label="Drink type" className="flex gap-1 rounded-2xl border border-border bg-surface/70 p-1">
          {FILTERS.map((f) => {
            const active = state.filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => update({ filter: f.value })}
                className={cn(
                  "min-h-11 flex-auto rounded-xl px-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                  active ? "bg-foreground text-background" : "text-foreground/75 hover:text-foreground",
                )}
              >
                {f.label}
                <span className={cn("ml-1 hidden font-medium min-[380px]:inline", active ? "text-background/60" : "text-muted-foreground")}>
                  {counts[f.value]}
                </span>
              </button>
            );
          })}
        </div>

        <div role="group" aria-label="Quick filters" className="flex flex-wrap gap-2">
          {QUICK_FILTERS.map((tag) => {
            const active = state.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={active}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors",
                  active
                    ? "border-coral bg-coral/15 text-foreground"
                    : "border-border bg-surface/60 text-foreground/80 hover:border-foreground/30",
                )}
              >
                {active && <Check aria-hidden className="size-3.5 text-coral" strokeWidth={3} />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex min-h-10 items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {results.length === drinks.length ? `All ${drinks.length} drinks` : `${results.length} of ${drinks.length} drinks`}
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" className="-mr-2" onClick={() => setState(EMPTY)}>
            Clear filters
          </Button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-border px-6 py-12 text-center">
          <SearchX aria-hidden className="size-9 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl font-medium">Nothing matches that</h2>
          <p className="mt-2 max-w-xs text-muted-foreground">
            {state.query.trim() ? <>No drinks match “{state.query.trim()}”. </> : null}
            Try fewer filters, or let us pick for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="outline" onClick={() => setState(EMPTY)}>
              Clear filters
            </Button>
            <Button asChild>
              <Link href="/find">
                <WandSparkles aria-hidden />
                Help Me Choose
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-2 space-y-9">
          {MENU_SECTIONS.map((section) => {
            const sectionDrinks = results.filter((d) => d.menuSection === section);
            if (sectionDrinks.length === 0) return null;
            return (
              <section key={section} aria-labelledby={`section-${section}`}>
                <h2
                  id={`section-${section}`}
                  className="mb-3 flex items-baseline gap-3 font-display text-2xl font-medium tracking-tight"
                >
                  {section}
                  <span className="h-px flex-1 translate-y-[-0.3em] bg-border" aria-hidden />
                </h2>
                <ul className="grid gap-3 md:grid-cols-2">
                  {sectionDrinks.map((drink) => (
                    <li key={drink.id}>
                      <DrinkCard drink={drink} href={`/drink/${drink.id}?from=menu`} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
