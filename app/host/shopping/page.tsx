import type { Metadata } from "next";
import { PageHeading } from "@/components/host/page-heading";
import { ShoppingCalculator } from "@/components/host/shopping-calculator";

export const metadata: Metadata = { title: "Shopping" };

export default function ShoppingPage() {
  return (
    <>
      <PageHeading title="Shopping">
        Combined amounts for every drink, rounded up to whole bottles. Saved on this device.
      </PageHeading>
      <ShoppingCalculator />
    </>
  );
}
