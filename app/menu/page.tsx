import type { Metadata } from "next";
import { Menu } from "@/components/menu/menu";

export const metadata: Metadata = { title: "The Menu" };

export default function MenuPage() {
  return <Menu />;
}
