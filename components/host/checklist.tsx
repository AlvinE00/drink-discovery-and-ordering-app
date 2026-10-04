"use client";

import { Check, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PREP_GROUPS } from "@/data/prep";
import { useHydrated } from "@/hooks/use-hydrated";
import { readStored, STORAGE_KEYS, writeStored } from "@/lib/storage";
import { cn } from "@/lib/utils";

const ALL_IDS = PREP_GROUPS.flatMap((g) => g.items.map((i) => i.id));

function restore(saved: unknown): string[] {
  return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string" && ALL_IDS.includes(id)) : [];
}

export function Checklist() {
  // Server-render an unchecked list; once hydrated, remount with this device's saved progress.
  const hydrated = useHydrated();
  return <ChecklistInner key={hydrated ? "restored" : "initial"} restoreSaved={hydrated} />;
}

function ChecklistInner({ restoreSaved }: { restoreSaved: boolean }) {
  const [done, setDone] = useState<string[]>(() =>
    restoreSaved ? restore(readStored("local", STORAGE_KEYS.checklist)) : [],
  );
  const doneSet = new Set(done);

  useEffect(() => {
    if (restoreSaved) writeStored("local", STORAGE_KEYS.checklist, done);
  }, [done, restoreSaved]);

  const toggle = (id: string) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  const percent = Math.round((done.length / ALL_IDS.length) * 100);

  return (
    <div className="space-y-7">
      <div className="rounded-3xl border border-border bg-surface/85 p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-semibold">
            {done.length} of {ALL_IDS.length} done
          </p>
          <p className="font-display text-2xl tabular-nums">{percent}%</p>
        </div>
        <div
          role="progressbar"
          aria-label="Checklist progress"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-3 h-2 overflow-hidden rounded-full bg-foreground/10"
        >
          <div className="h-full rounded-full bg-coral transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>
        {percent === 100 && <p className="mt-3 text-sm font-medium text-periwinkle">Bar is ready. Have a great party!</p>}
      </div>

      {PREP_GROUPS.map((group) => {
        const groupDone = group.items.filter((i) => doneSet.has(i.id)).length;
        return (
          <section key={group.id} aria-labelledby={`check-${group.id}`}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h2 id={`check-${group.id}`} className="font-display text-xl font-medium">
                {group.title}
                <span className="ml-2 font-sans text-sm text-muted-foreground">{group.when}</span>
              </h2>
              <span className="text-sm text-muted-foreground tabular-nums">
                {groupDone}/{group.items.length}
              </span>
            </div>
            <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface/85">
              {group.items.map((item) => {
                const checked = doneSet.has(item.id);
                return (
                  <li key={item.id}>
                    <label className="flex min-h-14 cursor-pointer items-center gap-4 px-4 py-3 hover:bg-surface-raised/60">
                      <input type="checkbox" checked={checked} onChange={() => toggle(item.id)} className="peer sr-only" />
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-lg border-2 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
                          checked ? "border-coral bg-coral text-primary-foreground" : "border-foreground/30",
                        )}
                      >
                        {checked && <Check className="size-4" strokeWidth={3} />}
                      </span>
                      <span className="min-w-0">
                        <span className={cn("block font-medium", checked && "text-muted-foreground line-through decoration-coral/60")}>
                          {item.label}
                        </span>
                        {item.detail && <span className="block text-sm text-muted-foreground">{item.detail}</span>}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <Button
        variant="outline"
        size="lg"
        className="w-full"
        disabled={done.length === 0}
        onClick={() => {
          if (window.confirm("Uncheck everything?")) setDone([]);
        }}
      >
        <RotateCcw aria-hidden />
        Reset checklist
      </Button>
    </div>
  );
}
