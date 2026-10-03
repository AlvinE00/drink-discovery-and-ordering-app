"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

/** "Back to your pick" when the guest came from the finder, otherwise "Back to Menu". */
export function BackLink({ variant = "ghost" }: { variant?: "ghost" | "outline" }) {
  const fromFinder = useSearchParams().get("from") === "find";
  return <BackLinkButton fromFinder={fromFinder} variant={variant} />;
}

export function BackLinkButton({ fromFinder, variant = "ghost" }: { fromFinder: boolean; variant?: "ghost" | "outline" }) {
  return (
    <Button asChild variant={variant} size={variant === "ghost" ? "default" : "xl"} className={variant === "ghost" ? "-ml-3" : "w-full"}>
      <Link href={fromFinder ? "/find" : "/menu"}>
        <ArrowLeft aria-hidden />
        {fromFinder ? "Back to Your Pick" : "Back to Menu"}
      </Link>
    </Button>
  );
}

/** A link that keeps `?from=find` so "Back to Your Pick" still works one level deeper. */
export function FromAwareLink(props: ComponentProps<typeof Link> & { href: string }) {
  const from = useSearchParams().get("from");
  const href = from === "find" ? `${props.href}?from=find` : props.href;
  return <Link {...props} href={href} />;
}
