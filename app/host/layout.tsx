import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HostNav } from "@/components/host/host-nav";
import { TopBar } from "@/components/shared/top-bar";

export const metadata: Metadata = {
  title: { default: "Host", template: "%s · Host · Midnight Citrus" },
  robots: { index: false },
};

export default function HostLayout({ children }: LayoutProps<"/host">) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-5 pb-[max(env(safe-area-inset-bottom),2.5rem)] sm:px-8">
      <TopBar
        left={
          <Button asChild variant="ghost" className="-ml-3">
            <Link href="/">
              <ArrowLeft aria-hidden />
              Guest view
            </Link>
          </Button>
        }
        right={<span className="eyebrow">Host mode</span>}
      />
      <div className="sticky top-0 z-20 -mx-5 bg-background/85 px-5 pt-2 pb-3 backdrop-blur-lg sm:-mx-8 sm:px-8">
        <HostNav />
      </div>
      <main className="flex-1 pt-4">{children}</main>
    </div>
  );
}
