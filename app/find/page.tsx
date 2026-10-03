import type { Metadata } from "next";
import { Finder } from "@/components/finder/finder";

export const metadata: Metadata = { title: "Help Me Choose" };

export default function FindPage() {
  return <Finder />;
}
