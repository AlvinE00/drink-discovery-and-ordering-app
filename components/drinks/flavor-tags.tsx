import { cn } from "@/lib/utils";
import type { FlavorTag } from "@/types/drink";

export function FlavorTags({ tags, className }: { tags: FlavorTag[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Flavor">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-border bg-foreground/[0.04] px-2.5 py-1 text-xs font-medium text-foreground/85"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
