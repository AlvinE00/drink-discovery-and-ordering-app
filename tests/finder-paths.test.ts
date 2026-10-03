import { expect, test } from "vitest";
import { enumerateFinderPaths } from "@/lib/finder-paths";

// Run `npm run paths` to print every decision path (useful after editing tags).
test("finder path report", () => {
  const paths = enumerateFinderPaths();
  expect(paths.length).toBeGreaterThan(0);
  if (!process.env.PRINT_PATHS) return;
  const rows = paths.map(
    (p) => `${p.answers.map((a) => a.value).join(" › ").padEnd(64)} → ${p.sequence.join(", ")}`,
  );
  console.log(`\n${rows.join("\n")}\n\n${paths.length} paths`);
});
