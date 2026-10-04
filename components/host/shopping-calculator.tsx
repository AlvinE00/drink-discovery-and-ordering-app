"use client";

import { ChevronDown, Info, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SYRUP_RECIPES } from "@/data/prep";
import { BAR_SUPPLIES } from "@/data/shopping-config";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  calculateShoppingPlan,
  defaultShoppingInputs,
  groupLinesByCategory,
  weightFor,
  type ShoppingInputs,
  type ShoppingLine,
} from "@/lib/shopping";
import { readStored, STORAGE_KEYS, writeStored } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { Unit } from "@/types/ingredient";
import { Stepper } from "./stepper";

interface SavedShopping {
  inputs: ShoppingInputs;
  /** Ingredient ID → purchase units already on hand. */
  have: Record<string, number>;
}

function defaults(): SavedShopping {
  return { inputs: defaultShoppingInputs(), have: {} };
}

function isNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

function restore(saved: unknown): SavedShopping {
  const fallback = defaults();
  if (!saved || typeof saved !== "object") return fallback;
  const raw = saved as Partial<SavedShopping>;
  const inputs = (raw.inputs ?? {}) as Partial<ShoppingInputs>;
  const numbers = (obj: unknown) =>
    Object.fromEntries(Object.entries(obj && typeof obj === "object" ? obj : {}).filter(([, v]) => isNumber(v) && v >= 0));
  return {
    inputs: {
      ...fallback.inputs,
      ...(isNumber(inputs.guests) && { guests: inputs.guests }),
      ...(isNumber(inputs.drinksPerGuest) && { drinksPerGuest: inputs.drinksPerGuest }),
      ...(isNumber(inputs.bufferRate) && { bufferRate: inputs.bufferRate }),
      ...(isNumber(inputs.alcoholicShare) && { alcoholicShare: inputs.alcoholicShare }),
      demandWeights: { ...fallback.inputs.demandWeights, ...numbers(inputs.demandWeights) },
    },
    have: numbers(raw.have),
  };
}

const UNIT_WORDS: Record<Unit, [string, string]> = {
  oz: ["oz", "oz"],
  garnish: ["garnish", "garnishes"],
  rim: ["salt rim", "salt rims"],
  dash: ["dash", "dashes"],
  lb: ["lb", "lb"],
};

function formatNeed(amount: number, unit: Unit): string {
  const rounded = unit === "oz" ? Math.round(amount * 10) / 10 : Math.ceil(amount);
  const [one, many] = UNIT_WORDS[unit];
  return `${rounded.toLocaleString()} ${rounded === 1 ? one : many}`;
}

export function ShoppingCalculator() {
  // Server-render the defaults; once hydrated, remount with this device's saved inputs.
  const hydrated = useHydrated();
  return <ShoppingCalculatorInner key={hydrated ? "restored" : "initial"} restoreSaved={hydrated} />;
}

function ShoppingCalculatorInner({ restoreSaved }: { restoreSaved: boolean }) {
  const [saved, setSaved] = useState<SavedShopping>(() =>
    restoreSaved ? restore(readStored("local", STORAGE_KEYS.shopping)) : defaults(),
  );
  const { inputs, have } = saved;
  const plan = calculateShoppingPlan(inputs);
  const groups = groupLinesByCategory(plan.lines);

  useEffect(() => {
    if (restoreSaved) writeStored("local", STORAGE_KEYS.shopping, saved);
  }, [saved, restoreSaved]);

  const setInputs = (patch: Partial<ShoppingInputs>) => setSaved((s) => ({ ...s, inputs: { ...s.inputs, ...patch } }));
  const setWeight = (id: string, weight: number) =>
    setSaved((s) => ({ ...s, inputs: { ...s.inputs, demandWeights: { ...s.inputs.demandWeights, [id]: weight } } }));
  const setHave = (id: string, units: number) => setSaved((s) => ({ ...s, have: { ...s.have, [id]: units } }));

  const toBuy = plan.lines.filter((line) => line.purchaseUnits - (have[line.ingredient.id] ?? 0) > 0).length;

  return (
    <div className="space-y-8">
      <section aria-labelledby="party-heading" className="rounded-3xl border border-border bg-surface/85 p-5">
        <h2 id="party-heading" className="font-semibold">
          Party size
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stepper label="Guests" value={inputs.guests} min={0} max={300} onChange={(guests) => setInputs({ guests })} />
          <Stepper
            label="App drinks per guest"
            value={inputs.drinksPerGuest}
            min={0}
            max={12}
            step={0.5}
            onChange={(drinksPerGuest) => setInputs({ drinksPerGuest })}
          />
          <Stepper
            label="Buffer (%)"
            value={Math.round(inputs.bufferRate * 100)}
            min={0}
            max={100}
            step={5}
            onChange={(pct) => setInputs({ bufferRate: pct / 100 })}
          />
          <Stepper
            label="Alcoholic (%)"
            value={Math.round(inputs.alcoholicShare * 100)}
            min={0}
            max={100}
            step={5}
            onChange={(pct) => setInputs({ alcoholicShare: pct / 100 })}
          />
        </div>
        <p className="mt-4 flex gap-2 text-sm text-muted-foreground">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          Count only drinks from this menu. Beer, wine, soda and water served on the side shouldn&apos;t be included.
        </p>

        <dl className="mt-5 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background/40 text-center">
          <Stat label="Planned servings" value={Math.round(plan.plannedServings)} />
          <Stat label="Alcoholic" value={Math.round(plan.alcoholicServings)} />
          <Stat label="Non-alcoholic" value={Math.round(plan.nonAlcoholicServings)} />
        </dl>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {inputs.guests} guests × {inputs.drinksPerGuest} drinks + {Math.round(inputs.bufferRate * 100)}% buffer
        </p>
      </section>

      <details className="group rounded-3xl border border-border bg-surface/85">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-semibold [&::-webkit-details-marker]:hidden">
          <span>
            Drink popularity
            <span className="block text-sm font-normal text-muted-foreground">0 = not serving · 5 = crowd favorite</span>
          </span>
          <ChevronDown aria-hidden className="size-5 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-5 px-5 pb-5">
          {(["alcoholic", "non-alcoholic"] as const).map((status) => (
            <div key={status}>
              <h3 className="eyebrow">{status === "alcoholic" ? "Cocktails" : "Non-alcoholic"}</h3>
              <ul className="mt-2 divide-y divide-border">
                {plan.drinkPlans
                  .filter((p) => p.drink.alcoholStatus === status)
                  .map(({ drink, servings }) => (
                    <li key={drink.id} className="flex items-center gap-3 py-2">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{drink.name}</span>
                        <span className="text-sm text-muted-foreground">≈ {Math.round(servings)} servings</span>
                      </span>
                      <div className="w-36 shrink-0">
                        <Stepper
                          label={`${drink.name} popularity`}
                          hideLabel
                          size="sm"
                          value={weightFor(inputs, drink.id)}
                          min={0}
                          max={5}
                          onChange={(w) => setWeight(drink.id, w)}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      <section aria-labelledby="list-heading">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 id="list-heading" className="font-display text-2xl font-medium">
              Shopping list
            </h2>
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {toBuy} {toBuy === 1 ? "item" : "items"} to buy · enter what you already have
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-6">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="eyebrow mb-2">{group.label}</h3>
              <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface/85">
                {group.lines.map((line) => (
                  <ShoppingRow
                    key={line.ingredient.id}
                    line={line}
                    have={have[line.ingredient.id] ?? 0}
                    onHaveChange={(n) => setHave(line.ingredient.id, n)}
                  />
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow mb-2">Bar supplies</h3>
            <ul className="space-y-1.5 rounded-3xl border border-border bg-surface/85 p-5">
              {BAR_SUPPLIES.map((item) => (
                <li key={item} className="text-[0.97rem]">
                  <span aria-hidden className="mr-2 text-coral">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => {
          if (window.confirm("Reset guests, popularity and on-hand amounts to the defaults?")) setSaved(defaults());
        }}
      >
        <RotateCcw aria-hidden />
        Reset to defaults
      </Button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-2 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-display text-2xl font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function ShoppingRow({ line, have, onHaveChange }: { line: ShoppingLine; have: number; onHaveChange: (n: number) => void }) {
  const { ingredient } = line;
  const buy = Math.max(0, line.purchaseUnits - have);
  const syrup = SYRUP_RECIPES.find((s) => s.ingredientId === ingredient.id);
  const batches = syrup ? Math.ceil(line.needed / syrup.batchYieldOz - 1e-9) : 0;
  const usedBy = line.usedByDrinkIds.length;

  return (
    <li className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold">{ingredient.name}</p>
          <p className="text-sm text-muted-foreground">
            Need {formatNeed(line.needed, ingredient.defaultUnit)}
            {usedBy > 0 && ` · ${usedBy} ${usedBy === 1 ? "drink" : "drinks"}`}
          </p>
          {syrup && batches > 0 && (
            <p className="mt-1 text-sm text-periwinkle">
              Or make {batches} {batches === 1 ? "batch" : "batches"} ({syrup.batch})
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className={cn("font-display text-3xl leading-none font-medium tabular-nums", buy === 0 ? "text-muted-foreground" : "text-coral")}>
            {buy}
          </p>
          <p className="mt-1 max-w-36 text-xs text-muted-foreground">{buy === 0 ? "Covered" : `to buy · ${ingredient.purchaseUnitName}`}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          Need {line.purchaseUnits} · Have
        </span>
        <div className="w-36">
          <Stepper label={`${ingredient.name} on hand`} hideLabel size="sm" value={have} min={0} max={99} onChange={onHaveChange} />
        </div>
      </div>
    </li>
  );
}
