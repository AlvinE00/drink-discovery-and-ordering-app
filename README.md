# Midnight Citrus — Party Drink Discovery App (Phase 1)

A mobile web app that helps party guests pick a drink, and helps the hosts prep the bar.
Built for Sunday, October 4, 2026. The full spec is in [phase-1.md/phase-1-specification-v1.1.md](phase-1.md/phase-1-specification-v1.1.md).

- **Help Me Choose** (`/find`): 2–4 quick questions, then one drink at a time, with Try Another.
- **I Know What I Want** (`/menu`): the full menu with search and filters.
- **Drink details** (`/drink/[id]`): ingredients, flavor and NA alternative.
- **Host Mode** (`/host`): recipes, prep, shopping calculator and checklist. There's no login; it's linked from the home-page footer.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Vitest.
There's no backend, database or auth. Every page is prerendered as a static file.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # data, recommendation, search, shopping and finder-state tests
npm run paths        # print every Help Me Choose path and its Try Another order
npm run check        # lint + tests + production build (run before deploying)
```

To try it on your phone, run `npm run dev -- -H 0.0.0.0` and open `http://<your-computer's-IP>:3000` on the same Wi-Fi.

## How the code is organized

```text
data/          ← edit these to change the menu
  drinks.ts            24 drinks: recipe, method, glass, tags, taste, NA pairing
  ingredients.ts       normalized ingredients and purchase units
  shopping-config.ts   party defaults, drink popularity, bar supplies
  prep.ts              prep tasks, checklist items, syrup recipes
lib/           ← pure logic, no React
  recommendation.ts    scoring, tie detection, follow-up questions
  finder-state.ts      Help Me Choose session (answer/back/edit/try another/restart)
  search.ts            menu search and filters
  shopping.ts          servings → combined ingredients → whole purchase units
types/         drink, ingredient, recommendation
components/    finder/, menu/, drinks/, host/, shared/, ui/ (shadcn)
app/           routes
tests/         Vitest
```

One data source powers the menu, search, recommendations, host recipes and shopping math.
The recommender only ever returns a `drinkId`.

### Drink data

Each drink in `data/drinks.ts` has a permanent `id` (used in URLs, so don't rename it), plus:

- `alcoholStatus`, `beverageType`, `baseSpirit`, `menuSection`
- `recipe`: lines of `{ ingredientId, amount, unit }` that must point at IDs in `ingredients.ts`
- `method`, `glass`, `garnishIngredientIds`
- `flavorTags` (most important first; the first three show on menu cards)
- `tasteProfile` (sweetness, tartness, bitterness, spiritForward, each 1–5), `strength`, `carbonation`, `style`
- `naAlternativeId` (optional), `searchAliases`, `recommendationPriority` (tie-break only; higher wins), `color` (for the glass illustration)

## Adding a drink

1. Add any new ingredients to `data/ingredients.ts`. Use a generic ID like `ginger_beer`, not a brand.
2. Add the drink to `data/drinks.ts` (copy a similar one).
3. Add its popularity to `DEMAND_WEIGHTS` in `data/shopping-config.ts`.
4. Run `npm test`. The data tests check ingredient references, units, tag consistency and NA pairings. `tests/data.test.ts` also pins the 24 spec recipes, so add the new drink to `SPEC_RECIPES` (and to `SPEC_NA_PAIRS` if it has an NA pairing) and update the expected counts.
5. Run `npm run paths` to see where the new drink shows up in Help Me Choose.

## Editing recommendation tags

Recommendations come from tags, so most tuning is just editing data:

- **Change a drink's tags** in `data/drinks.ts`. For example, adding `"Refreshing"` makes it a stronger match for Crisp & Refreshing.
- **Change what each flavor choice looks for** in `FLAVOR_TAG_WEIGHTS` in `lib/recommendation.ts`.
- **Break a tie** between two equal drinks with `recommendationPriority`.
- `TIE_MARGIN` sets how close two scores must be before a follow-up question is asked. `MAX_FOLLOW_UPS` caps those questions at 2.

Two rules are enforced by tests:

- `Bubbly` must be tagged exactly when `carbonation` is `sparkling`.
- `Strong` must be tagged exactly when `strength` is `strong`.

After any change, run `npm test && npm run paths` and read through the results.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repo. It detects Next.js; leave the defaults (build `next build`, no environment variables).
3. Deploy, then open the URL on two phones. Test once on Wi-Fi and once on cellular.
4. Bookmark `/host/shopping` and `/host/checklist` on the hosts' phones. Make a QR code of the home URL for guests.

Or from the terminal: `npx vercel` (preview), then `npx vercel --prod`.

Host Mode saves its data (shopping inputs, checklist) in each phone's browser, not a server. So each host's phone keeps its own copy.

## Deferred to Phase 2+

Not built on purpose: ordering, guest names, order queue and statuses, the fridge tablet screen, inventory and ingredient availability, drink customization, accounts and host login, cloud sync, payments, coffee and tea, and multi-household support.

The data model leaves room for these:

- Recipes reference stable ingredient IDs, so "ingredient unavailable → drink unavailable" can be added later.
- `beverageType` can be extended with coffee or tea.
- The recommender returns only a `drinkId`, ready for a later "recommend → customize → order" step.
