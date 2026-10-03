"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Visually hide the label (it stays available to screen readers). */
  hideLabel?: boolean;
  size?: "default" | "sm";
}

/** Number input with large − / + buttons. Typing works too. */
export function Stepper({ label, value, onChange, min = 0, max = 999, step = 1, hideLabel, size = "default" }: StepperProps) {
  const id = useId();
  // While typing, show exactly what was typed (even an empty field); commit valid numbers live.
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n / step) * step));
  const small = size === "sm";

  return (
    <div className={cn(!hideLabel && "space-y-1.5")}>
      <label htmlFor={id} className={cn("block text-sm font-medium text-muted-foreground", hideLabel && "sr-only")}>
        {label}
      </label>
      <div className={cn("flex items-center rounded-2xl border border-input bg-surface/90", small ? "h-11" : "h-12")}>
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className={cn("grid h-full shrink-0 place-items-center rounded-l-2xl text-foreground/80 hover:bg-surface-raised disabled:opacity-35", small ? "w-10" : "w-12")}
        >
          <Minus aria-hidden className="size-4" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={draft ?? String(value)}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = Number(e.target.value);
            if (e.target.value !== "" && Number.isFinite(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          onBlur={() => setDraft(null)}
          className="h-full w-full min-w-0 flex-1 bg-transparent text-center text-base font-semibold tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + step))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className={cn("grid h-full shrink-0 place-items-center rounded-r-2xl text-foreground/80 hover:bg-surface-raised disabled:opacity-35", small ? "w-10" : "w-12")}
        >
          <Plus aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
