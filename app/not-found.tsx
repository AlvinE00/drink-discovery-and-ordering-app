import Link from "next/link";
import { BookOpen, House } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-16 sm:px-8">
      <p className="eyebrow">Not on the menu</p>
      <h1 className="mt-2 font-display text-5xl leading-none font-medium tracking-tight">
        We can&apos;t find <em className="text-coral italic">that one.</em>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">The link may be old, or that drink isn&apos;t being served tonight.</p>
      <div className="mt-8 grid gap-3">
        <Button asChild size="xl">
          <Link href="/menu">
            <BookOpen aria-hidden />
            Browse the Menu
          </Link>
        </Button>
        <Button asChild size="xl" variant="outline">
          <Link href="/">
            <House aria-hidden />
            Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
