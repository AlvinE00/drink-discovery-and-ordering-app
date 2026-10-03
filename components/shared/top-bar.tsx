import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Slim header row: back control on the left, optional center and right content. */
export function TopBar({ left, center, right, className }: { left?: ReactNode; center?: ReactNode; right?: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 pt-[env(safe-area-inset-top)]",
        className,
      )}
    >
      <div className="flex justify-start">{left}</div>
      <div className="flex justify-center">{center}</div>
      <div className="flex justify-end">{right}</div>
    </div>
  );
}
