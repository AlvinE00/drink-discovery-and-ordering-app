import type { Metadata } from "next";
import { Checklist } from "@/components/host/checklist";
import { PageHeading } from "@/components/host/page-heading";

export const metadata: Metadata = { title: "Checklist" };

export default function ChecklistPage() {
  return (
    <>
      <PageHeading title="Checklist">Prep, garnishes and bar setup. Saved on this device.</PageHeading>
      <Checklist />
    </>
  );
}
