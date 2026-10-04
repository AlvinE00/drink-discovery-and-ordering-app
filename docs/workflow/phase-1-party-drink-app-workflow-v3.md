# Phase 1 — Party Drink Discovery App Workflow

## Objective

Build a polished, responsive drink-discovery web app for the house party on Sunday, October 4, 2026.

The app should let guests either:

1. **I Know What I Want** — browse/search the full available menu.
2. **Help Me Choose** — answer a short guided series of questions and receive exactly one strongest drink recommendation.

Phase 1 should be fully usable for the party, but intentionally avoid backend complexity that belongs in Phase 2.

---

## Phase 1 Success Criteria

Phase 1 is complete when:

- [ ] Guests can browse the full drink menu.
- [ ] Guests can use a guided recommendation flow that returns exactly one drink at a time.
- [ ] Every recommendation path ends in useful drink results.
- [ ] Guests can go back or restart the flow.
- [ ] Required drinks are present.
- [ ] Intentional non-alcoholic alternatives are supported.
- [ ] Hosts can view recipes and prep information.
- [ ] Ingredients are normalized and reusable across recipes.
- [ ] A consolidated shopping list can be generated.
- [ ] The app works well on modern phones.
- [ ] The app is deployed and tested before the party.
- [ ] The code/data structure can evolve into Phase 2 without a rewrite.

---

# Recommended Phase 1 Stack

## Application

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- Local structured TypeScript/JSON data
- Vercel deployment

## Do NOT Add Yet

- Database
- Authentication
- Redux
- Express
- Sequelize / ORM
- External API dependency
- Realtime order system
- Inventory deduction
- Guest accounts
- Admin authentication

The goal is to keep Sunday’s app simple without making it disposable.

---

# Required Drinks

The app must support at minimum:

- [ ] Whiskey on the Rocks
- [ ] Paper Plane
- [ ] Blood Orange Margarita
- [ ] Hennessy with Blueberry Lemonade
- [ ] Whiskey Sour
- [ ] Regular non-alcoholic lemonade
- [ ] Intentional zero-proof / non-alcoholic alternatives where appropriate

Do not treat “virgin” as simply deleting the alcohol from every recipe. Where needed, create an intentional zero-proof recipe that preserves balance and flavor.

---

# Workflow Overview

**Product/Menu Specification → Implementation → Independent QA → Fixes → Human Rehearsal → Shopping & Prep → Deploy**

---

# Stage 1 — Product, Menu, and Recommendation Architecture

## Goal

Create the authoritative Phase 1 specification before coding.

## Tool

**ChatGPT Chat**

- Model: **GPT-5.6 Sol**
- Effort: **High**
- Web research: On when validating established cocktail recipes
- Deep Research: Off
- Work mode: Not necessary
- Persistent conversation/project: Recommended

## Why

This stage combines:

- cocktail/menu design
- recipe normalization
- recommendation logic
- ingredient reuse
- UX structure
- host workflow
- future-proof data modeling

High effort is justified because decisions here affect the entire build.

## Inputs

Provide:

- Required drinks
- Party date
- Any known guest preferences
- Estimated guest count, if known
- Expected drinks per guest, if known
- Any ingredients/liquor already owned
- Desired visual feel

## Output

Produce one authoritative **Phase 1 Build Specification** containing:

- Product objective
- Phase 1 scope
- Deferred features
- Complete drink menu
- Recipes
- NA alternatives
- Recommendation taxonomy
- Guided recommendation logic
- Direct menu experience
- Screen map
- UX behavior
- Visual direction
- Drink schema
- Ingredient schema
- Ingredient matrix
- Shopping-list strategy
- Host prep experience
- Accessibility requirements
- Phase 2 compatibility decisions
- Acceptance criteria
- Claude Code implementation handoff

---

## Stage 1 Checklist

- [ ] Confirm required drinks.
- [ ] Expand the menu without adding excessive one-use ingredients.
- [ ] Define categories such as:
  - [ ] spirit-forward
  - [ ] refreshing
  - [ ] citrusy
  - [ ] fruity
  - [ ] tart
  - [ ] sweet
  - [ ] bitter/herbal
  - [ ] bubbly
  - [ ] light
  - [ ] strong
  - [ ] classic
  - [ ] adventurous
  - [ ] non-alcoholic
- [ ] Define the shortest useful recommendation flow.
- [ ] Return exactly one strongest match at a time. If the guest does not want it, **Try Another** should return the next-best unseen match without restarting the flow.
- [ ] Normalize all ingredients.
- [ ] Define drink IDs and ingredient IDs.
- [ ] Define an intentional NA strategy.
- [ ] Define host recipe/prep screens.
- [ ] Define responsive and accessibility requirements.
- [ ] Explicitly defer Phase 2 features.

---

## Recommendation Result Rule

The Phase 1 drink finder should return **exactly one drink at a time**.

## Primary behavior

1. Score/filter all eligible drinks.
2. Return the strongest match.
3. Show a concise explanation of why it fits.
4. Offer:
   - **Try Another**
   - **Change My Answers**
   - **Start Over**

## Try Another

Try Another should:

- keep the current preference answers
- exclude drinks already shown in the current session
- return the next-best unseen drink
- not restart the questionnaire

## Tie handling

If two or more drinks are essentially tied for the strongest match, do not show a ranked list.

Ask one additional discriminating question, then return one final drink.

This keeps the interaction decisive and avoids recreating the same choice paralysis the app is meant to solve.

---

# Recommended Decision Flow

Avoid a giant traditional flowchart.

Use something closer to:

**Alcohol or NA?**  
→ **Preferred base/spirit?**  
→ **Flavor profile?**  
→ **Refreshing or spirit-forward?**  
→ **Light/easy or stronger?**  
→ **Recommended drinks**

Not every user needs every question.

The flow should be adaptive where possible.

---

## Stage 1 Prompt

```text
Act as a senior cocktail-menu architect, beverage researcher, UX product designer, and product architect.

I am building Phase 1 of an interactive home drink system for a party on Sunday, October 4, 2026.

The immediate product is a responsive web app guests can open on their phones.

The long-term product will become a permanent home ordering system where guests can order cocktails, non-alcoholic drinks, coffee, and tea. My wife and I will eventually have an admin interface for inventory and order management, with a tablet mounted near the refrigerator displaying incoming orders.

Eventually I may commercialize this as a service/product for other households.

PHASE 1 OBJECTIVE

Build the authoritative specification for a polished but simple drink-discovery web app.

Guests must have two obvious paths:

1. I Know What I Want
Browse/search the available drink menu directly.

2. Help Me Choose
Answer a short series of attractive questions that leads to drinks matching their preferences.

Do NOT design this as an enormous traditional flowchart.

Design it as a modern guided recommendation experience backed by structured drink attributes.

REQUIRED DRINKS

The menu MUST support:

- Whiskey on the Rocks
- Paper Plane
- Blood Orange Margarita
- Hennessy with Blueberry Lemonade
- Whiskey Sour
- Regular non-alcoholic lemonade

The system should also provide appropriate non-alcoholic/zero-proof alternatives.

Do not assume that simply removing alcohol produces a good non-alcoholic cocktail. Design intentional NA alternatives where necessary.

MENU EXPANSION

Create a party menu large enough that the drink finder feels genuinely useful.

Optimize for:

Variety perceived by guests
×
quality
×
ingredient reuse
÷
number of unique ingredients I have to buy.

Do not create 30 cocktails requiring 30 unrelated specialty bottles.

Include useful categories such as appropriate combinations of:

- spirit-forward
- refreshing
- citrusy
- fruity
- tart
- sweet
- bitter/herbal
- bubbly
- light
- strong
- classic
- adventurous
- non-alcoholic

Research established cocktail recipes using reputable beverage or primary sources where practical.

Clearly distinguish established recipes from variations you design for this party.

DRINK FINDER

Design the decision logic.

Possible questions may include:

Alcoholic or non-alcoholic?
Do you have a preferred spirit?
What flavor sounds good?
Refreshing or spirit-forward?
Light/easy or stronger?
Still or bubbly?
Classic or adventurous?

But do not blindly use all of these.

Find the shortest useful sequence.

The system should return exactly ONE strongest match at a time.

If the top candidates are effectively tied, ask one additional discriminating question rather than showing several drinks.

After a result, the guest should be able to choose **Try Another**, which preserves the current answers, excludes drinks already shown in the session, and returns the next-best unseen match.

Guests should be able to:

- restart
- go back
- view the drink
- see a brief taste description
- see key ingredients
- choose an NA version when available
- return to the full menu

PHASE 1 HOST MODE

Design a simple host/prep area.

It does NOT need authentication for this private Phase 1.

It should contain:

- complete menu
- recipes
- prep instructions
- consolidated ingredient list
- shopping list
- garnish/prep checklist

Do NOT build ordering or inventory management yet.

SHOPPING SYSTEM

Create a normalized master ingredient list.

Every drink must map to ingredients from that master list.

Create a shopping-list calculation strategy that supports:

NUMBER_OF_GUESTS = [I WILL SUPPLY THIS]
EXPECTED_DRINKS_PER_GUEST = [I WILL SUPPLY THIS]

Recommend an appropriate safety/buffer percentage.

Consolidate overlapping ingredients rather than listing the same ingredient repeatedly.

Organize the eventual shopping list into practical grocery-store/liquor-store sections such as:

- spirits
- liqueurs/amari
- NA spirits/modifiers
- juices
- produce
- syrups/sweeteners
- soda/mixers
- bitters
- garnish
- ice
- bar consumables

Specify realistic purchase units where possible.

FUTURE-PROOF DATA

Define a simple structured drink schema suitable for storing each drink in TypeScript/JSON.

Include only fields that provide meaningful value.

Also define normalized ingredient IDs so Phase 2 can later support inventory.

Do not introduce a backend or unnecessary abstraction in Phase 1.

VISUAL DIRECTION

The party interface should feel:

modern
cool
premium
fun
social
easy to use at a party
excellent on modern phones

Avoid:

corporate dashboards
generic Bootstrap styling
overly complicated forms
tiny controls
a giant literal flowchart
bartender-industry software aesthetics

Recommend one coherent visual direction including:

- layout
- typography personality
- color approach
- button/cards
- motion
- progress indicators
- drink result cards

Keep implementation practical.

PHASE 2 COMPATIBILITY

Identify the small decisions Phase 1 should make now so that later we can add:

Guest side:
- browse
- recommendation
- customize
- order drink
- guest name
- order status

Admin side:
- order queue
- preparing / ready / served
- inventory
- mark ingredients unavailable
- automatically determine unavailable drinks
- coffee
- tea
- mixed non-alcoholic drinks
- tablet display

But DO NOT architect or implement Phase 2 fully yet.

OUTPUT

Create one implementation-ready specification with these sections:

1. Product objective
2. Phase 1 scope
3. Explicitly deferred functionality
4. Complete proposed drink menu
5. Drink recipes and intentional NA alternatives
6. Flavor/recommendation taxonomy
7. Guided recommendation decision logic
8. Direct-menu experience
9. Screen map
10. Detailed UX behavior
11. Visual direction
12. Structured drink schema
13. Ingredient schema
14. Complete normalized ingredient matrix
15. Shopping-list calculation approach
16. Host prep experience
17. Accessibility/responsive requirements
18. Phase 2 compatibility decisions
19. Acceptance criteria
20. Implementation handoff for Claude Code

End with:

SHOPPING INPUTS STILL NEEDED

Identify only information that materially affects final purchasing quantities, especially guest count and expected drinks per person.

Do not write application code.
```

---

# Stage 2 — Build the Phase 1 App

## Goal

Turn the approved specification into a complete working web app.

## Tool

**Claude Code in VS Code**

- Model: **Claude Sonnet 5.5**
- Effort: **High**

## Inputs

Paste into Claude:

- Complete Phase 1 Build Specification
- Any final visual preferences
- Any existing project/repo instructions

## Recommended Implementation

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Local/static drink and ingredient data
- No database
- No auth
- No Redux
- No Express
- No ORM

## Stage 2 Checklist

### Project Structure

- [ ] Create Next.js project if one does not already exist.
- [ ] Configure TypeScript.
- [ ] Configure Tailwind.
- [ ] Add shadcn/ui only where useful.
- [ ] Separate data from presentation logic.
- [ ] Create normalized drink data.
- [ ] Create normalized ingredient data.
- [ ] Create recommendation logic.
- [ ] Keep recommendation logic testable.

### Guest Experience

- [ ] Home screen
- [ ] “I Know What I Want”
- [ ] “Help Me Choose”
- [ ] Full menu
- [ ] Drink detail page/card
- [ ] Recommendation flow
- [ ] Back button
- [ ] Restart button
- [ ] Try Another button
- [ ] Change My Answers behavior
- [ ] Previously shown drink exclusion
- [ ] Tie-breaker handling
- [ ] NA options
- [ ] Responsive mobile layout

### Host Experience

- [ ] Host/prep section
- [ ] Recipes
- [ ] Ingredient list
- [ ] Prep instructions
- [ ] Shopping-list information
- [ ] Garnish checklist

### Quality

- [ ] Semantic HTML
- [ ] Good contrast
- [ ] Large touch targets
- [ ] Keyboard support where practical
- [ ] Reduced-motion support
- [ ] No console errors
- [ ] Production build succeeds

---

## Stage 2 Prompt

```text
Act as the senior frontend engineer and product designer responsible for implementing Phase 1 of my interactive home drink system.

You are working in VS Code using Claude Code.

PASTE INTO THIS PROMPT:

[PASTE THE COMPLETE PHASE 1 BUILD SPECIFICATION PRODUCED BY CHATGPT]

OBJECTIVE

Build the complete Phase 1 application described in the specification.

This application must be ready for actual guests to use at a house party on Sunday, October 4, 2026.

IMPLEMENTATION PHILOSOPHY

Optimize for:

polish
×
reliability
×
mobile usability
×
code clarity
÷
unnecessary complexity.

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Keep Phase 1 entirely client/local-data based unless server functionality provides a concrete benefit.

Do not add:

- database
- authentication
- Redux
- Express
- ORM
- realtime infrastructure
- Phase 2 placeholder features

Organize domain data and UI boundaries so the existing application can evolve into Phase 2 without a rewrite.

USER EXPERIENCE

Implement both primary paths prominently:

I Know What I Want

and

Help Me Choose

The guided recommender should feel interactive rather than like filling out a survey.

It must support:

- forward navigation
- back
- restart
- responsive transitions
- exactly one strongest recommendation at a time
- Try Another behavior that preserves preferences and excludes already shown drinks
- direct navigation to the drink
- NA alternatives

Create polished drink cards and result screens.

HOST EXPERIENCE

Implement the Phase 1 host/preparation area specified in the source document.

Do not create real authentication.

VISUAL QUALITY

Treat visual quality as a first-class requirement.

The application should look intentional and premium on current iPhones and Android phones, while also working on tablets and desktop browsers.

Avoid a generic AI-generated landing-page appearance.

Pay particular attention to:

- typography hierarchy
- touch target size
- spacing
- card composition
- visual progress through drink discovery
- subtle animation
- useful icons
- readable contrast
- empty/error states

ACCESSIBILITY

Use semantic HTML.

Support keyboard navigation where applicable.

Use proper labels and sufficient contrast.

Respect reduced-motion preferences.

CODE QUALITY

Keep components understandable.

Avoid abstraction unless it removes meaningful duplication.

Do not introduce a state-management library unless actually necessary.

TESTING

Before declaring the build complete:

1. run the application
2. inspect every primary route
3. test both direct browsing and recommendation paths
4. verify every decision-tree path resolves to exactly one drink
5. verify Try Another preserves answers and returns the next-best unseen drink
6. verify ties trigger a useful additional question rather than multiple results
7. verify every required drink exists
8. verify all NA alternatives
9. verify host recipes
10. verify ingredient references
11. test common mobile viewport sizes
12. fix obvious accessibility problems
13. check browser console/build errors
14. run production build

Create a concise README containing:

- how to run locally
- how the drink data is structured
- how to add a drink
- how to edit recommendation tags
- how to deploy
- what is intentionally deferred to Phase 2

DELIVERABLE

Produce a complete working application, not merely a prototype.

When finished, report:

- files/components created
- architecture
- routes/screens
- testing completed
- outstanding issues
- exact deployment steps

Do not redesign product requirements unless there is a genuine implementation blocker.
```

---

# Stage 3 — Independent QA

## Goal

Use a separate model to find mistakes the builder may have missed.

## Tool

**Gemini**

- Model: **Gemini 3.1 Pro / current Pro model**
- Thinking: **High**

## Inputs

Provide:

- Phase 1 Build Specification
- Claude implementation summary
- App screenshots
- Deployed URL if available
- Repository or source ZIP if practical

## Audit Areas

- [ ] Scope compliance
- [ ] Required drinks
- [ ] Recipe consistency
- [ ] NA alternatives
- [ ] Recommendation-path coverage
- [ ] Dead ends
- [ ] Contradictory recommendations
- [ ] Ingredient references
- [ ] Shopping-list completeness
- [ ] Mobile UX
- [ ] Tablet UX
- [ ] Accessibility
- [ ] Navigation
- [ ] Back/restart behavior
- [ ] Host/prep experience
- [ ] Technical bugs
- [ ] Phase 2 compatibility

---

## Stage 3 Prompt

```text
Act as an independent senior QA engineer, product reviewer, UX auditor, and beverage-system auditor.

You did NOT design or build this application.

Your job is not to redesign it according to your preferences.

Your job is to determine whether the implementation faithfully and reliably satisfies its specification and is ready for real guests at a house party.

INPUT 1 — AUTHORITATIVE SPECIFICATION

[PASTE CHATGPT PHASE 1 BUILD SPECIFICATION]

INPUT 2 — IMPLEMENTATION SUMMARY

[PASTE CLAUDE CODE'S FINAL IMPLEMENTATION SUMMARY]

INPUT 3 — IMPLEMENTATION

[ATTACH SOURCE FILES / REPOSITORY OR PROVIDE AVAILABLE APPLICATION MATERIAL]

INPUT 4 — SCREENSHOTS OR DEPLOYED APPLICATION

[ATTACH SCREENSHOTS AND/OR PROVIDE DEPLOYED URL]

AUDIT THE FOLLOWING:

1. Scope compliance
2. Required drinks
3. Cocktail recipe consistency
4. Non-alcoholic alternatives
5. Decision-tree coverage
6. Dead ends
7. Contradictory recommendations
8. Drink taxonomy
9. Ingredient references
10. Shopping-list completeness
11. Mobile UX
12. Tablet UX
13. Accessibility
14. Navigation
15. Back/restart behavior
16. Direct menu browsing
17. Host/prep experience
18. Responsive design
19. Obvious technical bugs
20. Whether Phase 1 choices unnecessarily block Phase 2

For the recommendation system, actively test combinations that could expose missing branches.

For ingredients, cross-check:

Drink recipes
→ ingredient records
→ shopping requirements

No recipe ingredient should be absent from the shopping system.

Do not recommend Phase 2 features merely because they would be nice.

Do not propose broad visual redesigns unless an issue materially harms usability.

OUTPUT ONLY ACTIONABLE FINDINGS.

Organize them as:

BLOCKER — must fix before party
HIGH — strongly recommended before party
MEDIUM — worthwhile if time permits
LOW — cosmetic/future

For every finding include:

- problem
- evidence
- affected screen/code/data
- expected behavior
- recommended correction

Then provide:

PARTY-READINESS CHECK

List each acceptance criterion from the specification as:

PASS
PARTIAL
FAIL
NOT VERIFIED

Do not give a numerical score.
```

---

# Stage 4 — Fix QA Findings

## Tool

**Claude Code**

- Model: Claude Sonnet 5.5
- Effort: Medium
- Raise to High only if QA exposes architectural issues

## Fixing Rule

- [ ] Fix all BLOCKER findings.
- [ ] Fix all HIGH findings.
- [ ] Fix MEDIUM findings only if low-risk and quick.
- [ ] Leave LOW findings unless trivial.
- [ ] Do not expand scope.
- [ ] Re-run tests after fixes.
- [ ] Re-run production build.

## Fix Prompt

```text
Implement all BLOCKER and HIGH findings in the attached Gemini QA report.

Implement MEDIUM findings only where the correction is low-risk, quick, and does not expand scope.

Do not redesign working areas.

Do not add Phase 2 functionality.

After fixes:

1. re-run the production build
2. re-test affected recommendation paths
3. re-check ingredient references
4. re-check mobile behavior
5. summarize exactly what changed
```

---

# Stage 5 — Human Party Rehearsal

This should be manual.

## Test Scenarios

You and your wife should each test:

- [ ] “I already want a Paper Plane.”
- [ ] “I don’t know what I want.”
- [ ] Get one recommendation, tap **Try Another**, and confirm the answers are preserved and the next result is different.
- [ ] “I don’t drink alcohol.”
- [ ] “I want something fruity.”
- [ ] “I want something strong.”
- [ ] “I want whiskey.”
- [ ] Start over.
- [ ] Go backward halfway through.
- [ ] Open a host recipe.
- [ ] Make one real drink using only the app instructions.

## Human Usability Questions

- [ ] Can a guest figure out what to do immediately?
- [ ] Is any screen too text-heavy?
- [ ] Are buttons easy to tap?
- [ ] Are recommendations understandable?
- [ ] Can the host read recipes quickly in a noisy kitchen?
- [ ] Is anything annoying enough that it should be fixed before Sunday?

---

# Stage 6 — Shopping List Finalization

## Tool

**ChatGPT Chat**

- Model: GPT-5.6 Sol
- Effort: Medium

## Inputs Needed

- [ ] Number of guests
- [ ] Expected drinks per person
- [ ] Final approved menu
- [ ] Existing bottles/ingredients on hand
- [ ] Desired buffer

## Output

Shopping list should be grouped as:

### Buy
- Spirits
- Liqueurs/amari
- NA modifiers
- Juices
- Produce
- Syrups
- Soda/mixers
- Bitters
- Garnishes
- Ice
- Bar consumables

### Already Have
- Existing bottles
- Existing mixers
- Existing garnish/prep items

### Prep Ahead
- Juice
- Syrups
- Garnishes
- Batchable ingredients
- Ice plan

---

# Stage 7 — Deployment and Final Check

## Deployment

Recommended: **Vercel**

## Deployment Checklist

- [ ] Production build passes.
- [ ] Environment is dependency-free where possible.
- [ ] Public URL works.
- [ ] Test URL on at least two phones.
- [ ] Test on Wi-Fi and cellular.
- [ ] Verify all required drinks.
- [ ] Verify host mode.
- [ ] Bookmark host route.
- [ ] Create/share QR code if desired.
- [ ] Do not make last-minute feature changes Sunday morning.

---

# Suggested Timeline

## Thursday

- [ ] Complete Stage 1 specification.
- [ ] Approve menu and decision logic.
- [ ] Start implementation.

## Friday

- [ ] Complete main implementation.
- [ ] Deploy first working version.
- [ ] Run independent QA.

## Saturday

- [ ] Fix BLOCKER/HIGH findings.
- [ ] Finalize shopping list.
- [ ] Shop.
- [ ] Prep syrups/juices/garnishes.
- [ ] Run human rehearsal.
- [ ] Freeze features.

## Sunday Morning

- [ ] Confirm deployment.
- [ ] Confirm QR/link.
- [ ] Check ice/garnishes.
- [ ] Open host recipe page on host device.
- [ ] No new feature development.

---

---

# Ongoing Menu Expansion — Drink Intake & AI Review

Use the companion repository file:

`drink-menu-intake-and-ai-review.md`

whenever a new drink is requested.

## Rule

The recommendation system must be flexible enough to evolve with the menu.

Prefer structured drink metadata plus scoring/filtering underneath the interface rather than a permanently rigid branch tree.

For each proposed drink:

- [ ] Verify the recipe if established.
- [ ] Decide whether to add, modify, defer, or reject it.
- [ ] Assign recommendation tags.
- [ ] Identify where it belongs in the current guided flow.
- [ ] Decide whether the flow needs:
  - [ ] no change
  - [ ] tag change only
  - [ ] answer-option change
  - [ ] conditional question
  - [ ] broader flow revision
- [ ] Compare ingredients with the current master ingredient list.
- [ ] Flag every new ingredient that must be purchased.
- [ ] Identify ingredients already covered/on hand.
- [ ] Identify optional ingredients separately.
- [ ] Evaluate whether an intentional zero-proof counterpart is useful.
- [ ] Update recommendation tests after approval.

**Never silently introduce a new ingredient.**

---

# Post-Shopping Deliverable — Alcohol Storage Guide

After the menu and final alcohol shopping list are approved, complete:

`alcohol-bottle-storage-guide.md`

Do this only after the actual purchased bottle list is known.

The final guide should provide bottle-specific guidance for:

- refrigeration after opening
- cabinet/bar storage
- temperature and light exposure
- oxidation
- expected best-quality window
- opened-on dating
- low-fill/headspace management
- quality-decline signs
- producer-specific instructions

This happens after **Shopping List Finalization** and before the final party-prep freeze.


# Definition of Done

Phase 1 is done when:

- [ ] The app is deployed.
- [ ] Guests can browse or discover drinks.
- [ ] Required drinks are available.
- [ ] NA options are intentional and usable.
- [ ] Recipes are correct and readable.
- [ ] Shopping ingredients cover every recipe.
- [ ] No recommendation path dead-ends.
- [ ] Every completed recommendation returns exactly one drink.
- [ ] Try Another returns the next-best unseen drink without restarting preferences.
- [ ] Ties are resolved with an additional discriminating question rather than multiple simultaneous recommendations.
- [ ] Human testing is complete.
- [ ] No BLOCKER/HIGH QA issues remain.
- [ ] The codebase is ready to evolve into Phase 2.
