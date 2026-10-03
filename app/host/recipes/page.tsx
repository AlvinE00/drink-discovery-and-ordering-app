import type { Metadata } from "next";
import { PageHeading } from "@/components/host/page-heading";
import { RecipeBrowser } from "@/components/host/recipe-browser";

export const metadata: Metadata = { title: "Recipes" };

export default function RecipesPage() {
  return (
    <>
      <PageHeading title="Recipes">Exact builds for all 24 drinks. One serving each.</PageHeading>
      <RecipeBrowser />
    </>
  );
}
