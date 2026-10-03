import { Leaf, Martini } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlcoholStatus } from "@/types/drink";

/** Always text + icon, never color alone. */
export function AlcoholBadge({ status, className }: { status: AlcoholStatus; className?: string }) {
  const isNa = status === "non-alcoholic";
  const Icon = isNa ? Leaf : Martini;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        isNa ? "border-periwinkle/40 bg-periwinkle/10 text-periwinkle" : "border-coral/35 bg-coral/10 text-[#ff9a80]",
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      {isNa ? "Non-Alcoholic" : "Alcoholic"}
    </span>
  );
}
