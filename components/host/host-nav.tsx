"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, ListChecks, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/host/recipes", label: "Recipes", icon: BookOpen },
  { href: "/host/prep", label: "Prep", icon: ClipboardList },
  { href: "/host/shopping", label: "Shopping", icon: ShoppingCart },
  { href: "/host/checklist", label: "Checklist", icon: ListChecks },
];

export function HostNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Host sections" className="grid grid-cols-4 gap-1 rounded-2xl border border-border bg-surface/90 p-1">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm",
              active ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground",
            )}
          >
            <Icon aria-hidden className="size-[1.1rem]" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
