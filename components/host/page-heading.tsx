import type { ReactNode } from "react";

export function PageHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="mb-6">
      <h1 className="font-display text-[2.4rem] leading-none font-medium tracking-tight">{title}</h1>
      {children && <p className="mt-2 text-muted-foreground">{children}</p>}
    </header>
  );
}
