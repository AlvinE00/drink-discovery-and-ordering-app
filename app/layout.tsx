import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: {
    default: "Midnight Citrus",
    template: "%s · Midnight Citrus",
  },
  description: "Find your drink at the party. Browse the menu or answer a couple of quick questions.",
  appleWebApp: { capable: true, title: "Midnight Citrus", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#131114",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="relative min-h-full">
        <div aria-hidden className="ambient pointer-events-none fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
