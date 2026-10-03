"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { filterDrinks, type MenuFilter } from "@/lib/search";
import { cn } from "@/lib/utils";
import { RecipeCard } from "./recipe-card";

const FILTERS: { value: MenuFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "alcoholic", label: "Cocktails" },
  { value: "non-alcoholic", label: "Non-Alcoholic" },
];

export function RecipeBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MenuFilter>("all");
  const results = filterDrinks({ query, filter });

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a recipe…"
            aria-label="Find a recipe"
            autoComplete="off"
            enterKeyHint="search"
            className="h-12 w-full rounded-2xl border border-input bg-surface/90 pr-12 pl-12 text-base placeholder:text-muted-foreground/80 focus:border-coral focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground hover:text-foreground"
            >
              <X aria-hidden className="size-5" />
            </button>
          )}
        </div>
        <div role="group" aria-label="Drink type" className="flex gap-1 rounded-2xl border border-border bg-surface/70 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "min-h-10 flex-auto rounded-xl px-3 text-sm font-semibold whitespace-nowrap",
                filter === f.value ? "bg-foreground text-background" : "text-foreground/75 hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-4 mb-3 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "recipe" : "recipes"}
      </p>

      {results.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border px-6 py-10 text-center text-muted-foreground">
          No recipes match that search.
        </p>
      ) : (
        <div className="grid gap-4">
          {results.map((drink) => (
            <RecipeCard key={drink.id} drink={drink} />
          ))}
        </div>
      )}
    </>
  );
}
