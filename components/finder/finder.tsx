"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useEffect, useReducer, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/shared/top-bar";
import { drinks } from "@/data/drinks";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  finderReducer,
  getFinderView,
  initialFinderState,
  isAtStart,
  restoreFinderState,
  type FinderView,
} from "@/lib/finder-state";
import { answerLabel } from "@/lib/recommendation";
import { readStored, STORAGE_KEYS, writeStored } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { ExhaustedView } from "./exhausted-view";
import { QuestionStep } from "./question-step";
import { ResultView } from "./result-view";

export function Finder() {
  // The server (and hydration) render a fresh session so the page is never blank,
  // even if JavaScript is slow or blocked. Once hydrated, remount with the saved one.
  const hydrated = useHydrated();
  return <FinderSession key={hydrated ? "restored" : "initial"} restore={hydrated} />;
}

function viewKey(view: FinderView): string {
  if (view.kind === "question") return `q-${view.index}-${view.question.id}`;
  if (view.kind === "result") return `r-${view.drinkId}`;
  return "exhausted";
}

function FinderSession({ restore }: { restore: boolean }) {
  const [state, dispatch] = useReducer(finderReducer, undefined, () =>
    restore ? restoreFinderState(readStored("session", STORAGE_KEYS.finder)) : initialFinderState,
  );
  const view = getFinderView(state);
  const key = viewKey(view);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The pre-hydration instance must not overwrite the saved session.
    if (restore) writeStored("session", STORAGE_KEYS.finder, state);
  }, [state, restore]);

  // Move focus and scroll to the new step so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [key]);

  const atStart = isAtStart(state);
  const hasProgress = state.answers.length > 0;
  const currentIndex = view.kind === "question" ? view.index : state.answers.length;
  const answeredTrail = state.answers.slice(0, view.kind === "question" ? view.index : undefined);

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 pb-[max(env(safe-area-inset-bottom),2rem)] sm:px-8">
      <TopBar
        left={
          atStart ? (
            <Button asChild variant="ghost" size="icon" className="-ml-2.5" aria-label="Back to home">
              {/* Leaving from the first question clears the session, so Help Me Choose starts fresh. */}
              <Link href="/" onClick={() => writeStored("session", STORAGE_KEYS.finder, initialFinderState)}>
                <ArrowLeft aria-hidden className="size-5" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="-ml-2.5" aria-label="Back" onClick={() => dispatch({ type: "back" })}>
              <ArrowLeft aria-hidden className="size-5" />
            </Button>
          )
        }
        center={<Progress current={currentIndex} done={view.kind !== "question"} />}
        right={
          hasProgress ? (
            <Button variant="ghost" size="sm" className="-mr-2 h-11" onClick={() => dispatch({ type: "restart" })}>
              <RotateCcw aria-hidden />
              Start Over
            </Button>
          ) : null
        }
      />

      {answeredTrail.length > 0 && view.kind === "question" && (
        <nav aria-label="Your answers so far" className="-mx-1 mt-1 mb-5">
          <ol className="flex flex-wrap items-center gap-1.5">
            {answeredTrail.map((answer, index) => (
              <li key={answer.questionId}>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "edit", index })}
                  className="min-h-9 rounded-full border border-border bg-surface/70 px-3 text-sm font-medium text-foreground/80 hover:border-foreground/30 hover:text-foreground"
                >
                  <span className="sr-only">Change answer: </span>
                  {answerLabel(answer)}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main key={key} className={cn("flex-1", view.kind === "question" ? "animate-rise pt-4" : "pt-2")}>
        {view.kind === "question" && (
          <QuestionStep
            question={view.question}
            index={view.index}
            selected={view.selected}
            headingRef={headingRef}
            onSelect={(value) => dispatch({ type: "answer", index: view.index, value })}
          />
        )}
        {view.kind === "result" && (
          <ResultView
            drinkId={view.drinkId}
            answers={state.answers}
            pickIndex={state.pickIndex}
            pickCount={state.shownDrinkIds.length}
            onShowPick={(index) => dispatch({ type: "showPick", index })}
            headingRef={headingRef}
            onTryAnother={() => dispatch({ type: "tryAnother" })}
            onChangeAnswers={() => dispatch({ type: "edit", index: 1 })}
            onRestart={() => dispatch({ type: "restart" })}
          />
        )}
        {view.kind === "exhausted" && (
          <ExhaustedView
            shownDrinkIds={state.shownDrinkIds}
            seenEverything={
              state.shownDrinkIds.length > 0 &&
              state.shownDrinkIds.length === drinks.filter((d) => d.alcoholStatus === state.answers[0]?.value).length
            }
            headingRef={headingRef}
            onChangeAnswers={() => dispatch({ type: "edit", index: 1 })}
            onRestart={() => dispatch({ type: "restart" })}
            onShowPick={(index) => dispatch({ type: "showPick", index })}
          />
        )}
      </main>
    </div>
  );
}

/** Three-ish segments: the flow is adaptive, so a 4th appears only when needed. */
function Progress({ current, done }: { current: number; done: boolean }) {
  const total = Math.max(3, done ? current : current + 1);
  const filled = done ? total : current + 1;
  return (
    <div
      role="img"
      aria-label={done ? "All questions answered" : `Question ${current + 1}`}
      className="flex items-center gap-1.5"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-500",
            i < filled ? "w-7 bg-coral" : "w-4 bg-foreground/15",
          )}
        />
      ))}
    </div>
  );
}
