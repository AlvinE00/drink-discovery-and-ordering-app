# Phase 4 — Standalone Drink Discovery App Workflow

## Objective

Create a standalone drink-discovery app for people who:
- do not know much about drinks
- do not drink often
- want to try something new
- feel overwhelmed by drink menus
- experience choice paralysis at bars, clubs, restaurants, parties, and other social settings

The app's job is to make the decision for the user.

## Core Product Promise

> Tell me what sounds good. I’ll tell you what to order.

The app must return exactly **one** drink recommendation at a time.

Do not show a list of 3, 5, or 10 options.

After the result, the user can choose:
- Try Another
- Change My Answers
- Start Over

## Core Recommendation Rule

Conceptually:

User answers
→ hard-exclusion filtering
→ preference scoring
→ context weighting
→ confidence check
→ one final drink

If top candidates are effectively tied, do not show both. Ask one additional discriminating question, recalculate, and return one drink.

Example:

Margarita: 91
Daiquiri: 90

Ask:
“Which sounds better right now?”
- Tequila and a little punchier
- Rum and a little softer

Then return one final result.

## Try Another Behavior

Try Another should:
1. preserve the user's existing preference profile
2. exclude drinks already shown in the current session
3. calculate the next-best match
4. return one new drink

It should not restart the questionnaire.

Change My Answers is the separate control for revising preferences.

## Product Positioning

This is not primarily:
- a recipe app
- a home inventory system
- a bartender tool
- an ordering platform
- a giant cocktail encyclopedia
- a static flowchart

It is a decision-assistance and drink-discovery app.

## Relationship to the Home Hospitality Project

The home app asks:
> What can I order here?

The standalone app asks:
> What should I drink?

Shared concepts may include:
- drink schema
- flavor taxonomy
- recommendation logic
- ingredient knowledge
- recommendation tests

But Phase 4 should ultimately become its own project/repository.

## Recommended Technical Direction

Recommended starting stack:
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Initially avoid:
- Redux unless needed
- separate Express backend unless needed
- ORM until persistent data requires one
- database if a local curated catalog is sufficient for MVP

A database becomes useful later for:
- accounts
- favorites
- saved preferences
- recommendation history
- personalization
- analytics
- centrally managed drink content

## Shared Recommendation Core

Do not extract a shared package immediately.

First prove which logic is genuinely reusable.

Potential future shared structure:

```text
drink-core/
├── drink schema
├── flavor taxonomy
├── recommendation attributes
├── scoring rules
├── preference model
└── recommendation tests
```

## Recommendation Philosophy

Ask human questions, not bartender questions.

Avoid requiring terms like:
- spirit-forward
- aperitif
- digestif
- botanical
- amaro
- Collins-style
- sour family

Prefer plain-language prompts such as:
- What sounds good right now?
- Do you want alcohol today?
- How noticeable do you want the alcohol to taste?
- Do you want something refreshing or richer?
- Sweet, tart, fruity, bitter, smooth, or bold?
- Do you have a liquor you already know you like?
- Are you feeling adventurous?
- Where are you ordering?

## Mood / Vibe

Interpret “feeling” mainly as taste, occasion, vibe, and adventurousness.

Possible vibe options:
- Date night
- Celebrating
- Dancing / night out
- Dinner
- Relaxing
- Trying something new
- Hot day
- Cold night
- Fancy
- Casual

Do not frame alcohol as something that predictably changes emotional or mental state.

## Alcohol Preference

Early question:

### What are you looking for?
- Alcoholic
- Alcohol-free
- Either is fine

If the user chooses alcohol-free, do not ask about preferred liquor.

## Beginner-Friendly Taste Questions

Possible options:
- Refreshing
- Fruity
- Tart
- Sweet
- Smooth & cozy
- Bold
- Bitter / herbal
- Creamy
- Bubbly
- Surprise me

Do not show too many at once. Use progressive disclosure.

## Alcohol Intensity

Instead of “spirit-forward,” ask:

### How noticeable do you want the alcohol to taste?
- Barely
- Somewhat
- I like tasting it
- No preference

## Spirit Preference

Ask only when useful:
- Tequila
- Rum
- Whiskey
- Gin
- Vodka
- Brandy / Cognac
- Something else
- No preference
- I don't know

## Context Awareness

Possible venue question:

### Where are you?
- Regular bar
- Cocktail bar
- Restaurant
- Club / lounge
- Party
- Home
- Just exploring

Venue should affect recommendation realism.

## Availability Tiers

Every drink should eventually have an availability tier.

### Tier 1 — Common
Likely available at most full-service bars.

### Tier 2 — Standard Cocktail Bar
Likely available where bartenders regularly make cocktails.

### Tier 3 — Specialty
Requires less-common ingredients, equipment, or preparation.

### Tier 4 — Home / Custom
Do not assume a typical venue can make it.

Venue context should influence recommendation weight.

## Drink Result Screen

The result should prioritize clarity.

Example:

# Whiskey Sour

Tart, citrusy, lightly sweet, with enough whiskey flavor to feel substantial without being extremely boozy.

### Why this fits you
A brief explanation based on the user's actual answers.

### What it tastes like
Plain-language description.

### What's usually in it
Key ingredients only.

### What to say
“Can I get a whiskey sour?”

### Optional: Know Before You Order
Examples:
- may contain egg white depending on the bar
- typically served over ice or up
- slightly stronger than a long mixed drink

### Actions
- Try Another
- Change My Answers
- Start Over

## Education Layer

Teach without getting in the way.

Default result should be:
- simple
- brief
- beginner-friendly

Optional Learn More can explain:
- drink family
- usual ingredients
- common variations
- base spirit
- strength
- history
- bartender terminology

## Drink Data Model

Potential fields:

```text
id
name
shortDescription
alcoholic
baseSpirit
secondarySpirits
flavorTags
strength
alcoholTaste
sweetness
acidity
bitterness
fruitiness
richness
refreshingScore
sparkling
temperature
classicOrAdventurous
availabilityTier
commonVenueTypes
keyIngredients
allergensOrCommonConsiderations
orderingPhrase
educationalDescription
zeroProof
recommendationTags
```

Only keep fields that the product actually uses.

## Recommendation Scoring Model

Start with explainable rules, not machine learning.

Possible scoring inputs:
- alcoholic/NA compatibility
- flavor compatibility
- base-spirit compatibility
- alcohol-intensity preference
- refreshing/rich preference
- sweet/tart/bitter preference
- occasion/vibe
- venue availability
- adventurousness
- exclusions
- previously shown drinks

Conceptually:

```text
score =
  tasteMatch
+ strengthMatch
+ spiritMatch
+ contextMatch
+ availabilityMatch
+ vibeMatch
- conflicts
- alreadyShownPenalty
```

Weights should remain understandable and testable.

## Recommendation Safety / Constraints

Allow users to exclude:
- ingredients they dislike
- allergens
- specific spirits
- caffeine
- dairy/cream
- egg
- carbonation
- alcohol

The app should not claim that a drink will:
- make someone happier
- reduce anxiety
- increase confidence
- help them socialize
- predictably change their mental state

## Workflow Overview

Product Definition → Drink Catalog → Taxonomy → Recommendation Engine → UX → Prototype → Testing → Independent QA → Pilot → Standalone Launch

# Stage 1 — Product Brief

## Goal
Define the standalone product independently from the home ordering system.

## Tool
ChatGPT Chat
- Model: GPT-5.6 Sol
- Effort: High
- Deep Research: Off
- Work: Not necessary initially

## Inputs
- this Phase 4 workflow
- Phase 1 recommendation specification
- current drink catalog
- lessons from the house-party version
- target users

## Output
Authoritative Phase 4 Product Brief.

## Checklist
- [ ] Define target users
- [ ] Define core problem
- [ ] Define product promise
- [ ] Preserve exactly-one-drink rule
- [ ] Define Try Another
- [ ] Define Change My Answers
- [ ] Define social contexts
- [ ] Define alcoholic/NA treatment
- [ ] Define exclusions/allergens
- [ ] Define scope
- [ ] Define deferred functionality
- [ ] Define success metrics
- [ ] Define acceptance criteria

## Prompt

```text
Act as a senior consumer-product strategist and product architect.

I am creating a standalone drink-discovery application that branches from an existing home hospitality project.

The app is for people who:
- do not know much about drinks
- do not drink often
- want to try something new
- feel overwhelmed by drink menus
- experience choice paralysis at bars, clubs, restaurants, parties, and other social settings

CORE PRODUCT RULE

The app must recommend exactly ONE drink at a time.

Do not return multiple recommendations.

If the recommendation engine cannot confidently distinguish between top candidates, ask one additional useful question and then select one drink.

After receiving a recommendation, the user can:
- Try Another
- Change My Answers
- Start Over

TRY ANOTHER

Try Another should preserve the current preference profile, exclude drinks already shown in that session, and return the next-best individual recommendation.

PRODUCT PROMISE

“Tell me what sounds good. I’ll tell you what to order.”

DESIGN PRINCIPLES

- beginner friendly
- plain language
- low cognitive load
- fast enough to use while standing at a bar
- educational without requiring cocktail knowledge
- alcoholic and non-alcoholic drinks are first-class options
- contextual recommendations based on venue
- no giant recommendation list
- no bartender jargon required

OUTPUT

Create an authoritative Phase 4 Product Brief containing:

1. Product vision
2. Problem
3. Target users
4. Jobs to be done
5. Core product promise
6. Core interaction loop
7. Exactly-one-recommendation rule
8. Try Another behavior
9. Recommendation inputs
10. Venue/context behavior
11. Alcoholic/NA behavior
12. Exclusions and preferences
13. Drink result experience
14. Education layer
15. MVP scope
16. Explicitly deferred scope
17. Success metrics
18. Acceptance criteria
19. Relationship to the home hospitality project
20. Handoff requirements for UX specification

Do not design the full technical architecture yet.
```

# Stage 2 — Drink Catalog & Taxonomy

## Goal
Create a broad but curated catalog that can power useful recommendations.

## Tool
ChatGPT
- Model: GPT-5.6 Sol
- Effort: High
- Web research: On

## Checklist
- [ ] Classic cocktails
- [ ] Easy highballs
- [ ] Fruity drinks
- [ ] Sour/tart drinks
- [ ] Sweet drinks
- [ ] Bitter/herbal drinks
- [ ] Strong/spirit-forward drinks
- [ ] Refreshing drinks
- [ ] Bubbly drinks
- [ ] Creamy/dessert drinks
- [ ] Common club/bar orders
- [ ] Cocktail-bar options
- [ ] Intentional NA drinks
- [ ] Venue availability tier
- [ ] Beginner-readable descriptions
- [ ] Recommendation tags
- [ ] Common considerations/allergens

# Stage 3 — Recommendation System Specification

## Goal
Define an explainable recommendation engine that always produces one result.

## Tool
ChatGPT
- Model: GPT-5.6 Sol
- Effort: High

## Checklist
- [ ] Adaptive questions
- [ ] No unnecessary questions
- [ ] Hard-exclusion filtering
- [ ] Weighted scoring
- [ ] Context weighting
- [ ] Venue availability weighting
- [ ] Tie detection
- [ ] Tie-breaker question
- [ ] Exactly one winner
- [ ] Try Another exclusion
- [ ] Session recommendation history
- [ ] Explainable result reasoning
- [ ] Test matrix

# Stage 4 — UX Specification

## Goal
Translate product requirements and recommendation logic into complete interaction behavior.

## Tool
Use one AI only.

Recommended:
ChatGPT GPT-5.6 Sol
- Effort: High

## Core Screens
- [ ] Welcome
- [ ] Alcohol/NA preference
- [ ] Taste/vibe questions
- [ ] Optional spirit preference
- [ ] Context/venue
- [ ] Adaptive tie-breaker
- [ ] Loading/transition
- [ ] One-drink result
- [ ] Learn More
- [ ] Try Another
- [ ] Change My Answers
- [ ] Start Over

# Stage 5 — Visual Direction

## Goal
Create a consumer-facing visual identity distinct from the home ordering system.

The app should feel:
- modern
- social
- confident
- approachable
- fun
- premium enough for nightlife
- fast
- not corporate
- not intimidating

Avoid:
- bartender POS aesthetics
- encyclopedic cocktail-library layouts
- huge forms
- cheesy party graphics
- dense dashboards

# Stage 6 — Prototype / MVP Implementation

## Tool
Claude Code
- Model: Claude Sonnet 5.5
- Effort: High

## Recommended Stack
- Next.js
- React
- TypeScript
- Tailwind
- shadcn/ui
- local structured catalog initially

## MVP Checklist

### Recommendation Engine
- [ ] Hard-exclusion filtering
- [ ] Weighted scoring
- [ ] Context weighting
- [ ] Availability-tier weighting
- [ ] Tie detection
- [ ] Adaptive tie-breaker
- [ ] Exactly one final result
- [ ] Previously shown exclusion
- [ ] Try Another logic

### User Experience
- [ ] Short onboarding
- [ ] Adaptive flow
- [ ] Back navigation
- [ ] One-result screen
- [ ] Learn More
- [ ] Try Another
- [ ] Change My Answers
- [ ] Start Over
- [ ] Mobile-first design

### Quality
- [ ] Accessibility
- [ ] Reduced-motion support
- [ ] Clear touch targets
- [ ] No dead ends
- [ ] Production build passes
- [ ] Recommendation logic testable independently of UI

# Stage 7 — Recommendation Testing

Create test personas and expected behavior.

## Beginner at a Regular Bar

```text
Alcoholic
Refreshing
Barely taste alcohol
Fruity
No spirit preference
Regular bar
```

Expected:
- one approachable drink
- realistic availability
- no obscure ingredients
- not overly strong

## Whiskey Curious

```text
Alcoholic
Tart
Somewhat noticeable alcohol
Whiskey
Trying something new
Cocktail bar
```

Expected:
- one whiskey-based recommendation
- explanation tied to answers

## Club

```text
Alcoholic
Refreshing
Simple
Vodka
Club/lounge
```

Expected:
- prioritize realistic club availability

## Non-Alcoholic

```text
Alcohol-free
Tart
Refreshing
Restaurant
```

Expected:
- never ask spirit-preference questions
- return one intentional NA recommendation

# Stage 8 — Independent QA

## Tool
Gemini
- Model: Gemini 3.1 Pro / current Pro model
- Thinking: High

## QA Areas
- [ ] Exactly-one-result rule
- [ ] Tie handling
- [ ] Try Another behavior
- [ ] Duplicate recommendations
- [ ] Dead ends
- [ ] Beginner language
- [ ] Venue realism
- [ ] NA parity
- [ ] Exclusion handling
- [ ] Allergen handling
- [ ] Recommendation consistency
- [ ] Result explanation
- [ ] Mobile usability
- [ ] Accessibility

## QA Prompt

```text
Act as an independent product QA reviewer and recommendation-system auditor.

You did not design or build this application.

INPUTS

1. Phase 4 Product Brief
2. Recommendation System Specification
3. Drink Catalog / Taxonomy
4. UX Specification
5. Current application implementation
6. Available screenshots or deployed URL

CORE RULE

The system must return exactly ONE drink recommendation at a time.

Audit:
1. whether any path returns multiple recommendations
2. whether tie conditions are handled with a useful discriminating question
3. whether Try Another preserves preferences
4. whether Try Another excludes already shown drinks
5. whether Change My Answers behaves differently from Try Another
6. whether venue context changes availability appropriately
7. whether beginner users are forced to understand cocktail terminology
8. whether alcohol-free users receive first-class recommendations
9. whether hard exclusions are respected
10. whether recommendation explanations actually match the user's answers
11. whether recommendation outcomes become repetitive
12. whether the system has dead ends
13. whether mobile UX is fast enough for use in a live social setting

OUTPUT

Organize findings as:
BLOCKER
HIGH
MEDIUM
LOW

For every finding include:
- problem
- evidence
- expected behavior
- recommended correction

Then provide an acceptance-criteria checklist using:
PASS
PARTIAL
FAIL
NOT VERIFIED

Do not give a numerical score.
```

# Stage 9 — Real-World Pilot

## Pilot Environments
- [ ] Regular neighborhood bar
- [ ] Cocktail bar
- [ ] Restaurant
- [ ] Club/lounge
- [ ] House party
- [ ] At-home exploration

## Pilot Questions
- [ ] Can a beginner finish in under a minute?
- [ ] Does the result feel decisive?
- [ ] Do users trust the recommendation?
- [ ] Do they understand the description?
- [ ] Can the venue actually make the recommendation?
- [ ] How often do users tap Try Another?
- [ ] Why do they tap Try Another?
- [ ] Are users learning drink vocabulary over time?
- [ ] Are NA users equally satisfied?
- [ ] Are any questions confusing?
- [ ] Are there questions users repeatedly skip?

# Stage 10 — Metrics

Useful metrics:
- recommendation completion rate
- time to recommendation
- Try Another rate
- Try Another taps per session
- Change My Answers rate
- restart rate
- recommendation acceptance
- drink diversity
- venue mismatch reports
- Learn More expansion rate

Do not optimize solely for engagement.

A short successful session is often better than a long one.

# Stage 11 — Personalization

Defer until the core recommendation model works.

Possible later features:
- favorites
- dislikes
- drinks already tried
- I liked this
- Not for me
- saved taste profile
- personal recommendation history
- learned preferences

Preserve exploration so personalization does not trap users in a narrow set of drinks.

# Stage 12 — Future Features

Possible future additions:
- user accounts
- favorites
- drink journal
- ratings
- bar menu scanning
- camera/menu recognition
- location-aware recommendations
- venue-specific availability
- seasonal recommendations
- bartender education mode
- teach-me-cocktails mode
- group mode
- share recommendation
- friend preference comparison
- personalized taste profile
- recommendations from a photographed menu

Treat these as future hypotheses, not MVP requirements.

# What Not to Do

- Do not show five “best matches.”
- Do not force users to compare several drinks.
- Do not make every user answer every question.
- Do not require cocktail knowledge.
- Do not use a rigid flowchart that must be rebuilt for each new drink.
- Do not start with machine learning when explainable rules are enough.
- Do not recommend obscure cocktails at venues unlikely to make them.
- Do not make NA recommendations feel secondary.
- Do not confuse Try Another with restarting.
- Do not overload the result screen with cocktail history.
- Do not build accounts, social features, or gamification before the core recommendation loop is proven.

# Definition of Done — Phase 4 MVP

Phase 4 MVP is done when:
- [ ] It is a separate project/repository.
- [ ] It has a curated drink catalog.
- [ ] It supports alcoholic and non-alcoholic discovery.
- [ ] It asks adaptive beginner-friendly questions.
- [ ] It incorporates venue/context.
- [ ] It handles exclusions.
- [ ] Every completed recommendation produces exactly one drink.
- [ ] Ties trigger an additional useful question rather than multiple results.
- [ ] Try Another returns the next-best unseen drink without resetting preferences.
- [ ] Change My Answers works independently.
- [ ] Drink descriptions use plain language.
- [ ] Users can optionally Learn More.
- [ ] Recommendation logic has automated tests.
- [ ] Independent QA is complete.
- [ ] Real-world pilot testing is complete.
- [ ] The app works well on modern mobile devices.
- [ ] The experience meaningfully reduces choice paralysis.
