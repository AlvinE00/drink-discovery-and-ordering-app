"use client";

import { Check } from "lucide-react";
import type { Ref } from "react";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/recommendation";
import { optionStyle } from "./option-icons";

interface QuestionStepProps {
  question: Question;
  index: number;
  selected?: string;
  onSelect: (value: string) => void;
  headingRef: Ref<HTMLHeadingElement>;
}

export function QuestionStep({ question, index, selected, onSelect, headingRef }: QuestionStepProps) {
  const isFirst = question.id === "alcohol";
  const isFollowUp = index >= 2;

  return (
    <section aria-labelledby="question-heading">
      <p className="eyebrow">{isFollowUp ? "One more thing" : `Question ${index + 1}`}</p>
      <h1
        id="question-heading"
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 font-display text-[clamp(2.1rem,9vw,3rem)] leading-[1.02] font-medium tracking-tight text-balance focus:outline-none"
      >
        {question.title}
      </h1>
      <p className="mt-3 text-[1.05rem] text-muted-foreground">{question.subtitle}</p>

      <ul
        className={cn(
          "mt-7 grid gap-3",
          isFirst ? "grid-cols-1 min-[400px]:grid-cols-2" : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        {question.options.map((option, i) => {
          const { icon: Icon, color } = optionStyle(question.id, option.value);
          const isSelected = selected === option.value;
          return (
            <li key={option.value} className="animate-rise" style={{ animationDelay: `${60 + i * 45}ms` }}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(option.value)}
                className={cn(
                  "group relative flex w-full items-center gap-4 rounded-3xl border bg-surface/85 text-left transition-all",
                  "hover:border-foreground/30 hover:bg-surface-raised active:scale-[0.985]",
                  isFirst ? "min-h-40 flex-col items-start justify-between p-5" : "min-h-[4.75rem] p-4",
                  isSelected ? "border-coral bg-coral/[0.08] ring-1 ring-coral" : "border-border",
                )}
              >
                <span
                  aria-hidden
                  className={cn("grid shrink-0 place-items-center rounded-2xl", isFirst ? "size-14" : "size-12")}
                  style={{ backgroundColor: `${color}1f`, color }}
                >
                  <Icon className={isFirst ? "size-7" : "size-6"} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block font-semibold text-foreground", isFirst ? "font-display text-2xl font-medium" : "text-[1.05rem]")}>
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-0.5 block text-[0.95rem] leading-snug text-muted-foreground">{option.description}</span>
                  )}
                </span>
                {isSelected && (
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full bg-coral text-primary-foreground",
                      isFirst && "absolute top-4 right-4",
                    )}
                  >
                    <Check aria-hidden className="size-4" strokeWidth={3} />
                    <span className="sr-only">Your current answer</span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
