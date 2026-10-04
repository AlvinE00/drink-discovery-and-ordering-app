# Party Drink Discovery App
## Phase 1 Specification v1.1

**Target party:** Sunday, October 4, 2026  
**Phase 1:** Mobile drink-discovery web app  
**Main users:** Party guests  
**Host users:** Me and my wife

---

# 1. Product objective

Build a simple, polished mobile web app that helps party guests choose a drink.

Guests should have two clear options:

### Help Me Choose

The guest answers a few simple questions.

The app recommends **one drink at a time**.

If they do not want that drink, they can tap **Try Another** and get the next-best match without starting over.

### I Know What I Want

The guest browses or searches the full menu directly.

The goal is to make choosing a drink easy for:

- people who know exactly what they like;
- people who know very little about cocktails;
- people who want to try something new;
- people who get overwhelmed by large menus;
- people who do not want alcohol.

Phase 1 is only for choosing drinks and helping the host prepare them.

It does **not** include ordering yet.

---

# 2. Phase 1 scope

Phase 1 includes:

### Guest experience

- Home screen
- Help Me Choose
- Drink recommendation
- Try Another
- Browse Full Menu
- Search
- Simple filters
- Drink details
- Non-alcoholic alternatives

### Host experience

- Full recipe list
- Prep instructions
- Ingredient list
- Shopping calculator
- Garnish/prep checklist

All Phase 1 drink and ingredient data should live inside the app.

No backend or database is needed.

---

# 3. Explicitly deferred functionality

Do not build these yet:

- drink ordering;
- guest names;
- order queue;
- preparing / ready / served status;
- refrigerator tablet order screen;
- inventory tracking;
- ingredient availability;
- automatic unavailable-drink detection;
- custom drink modifications;
- user accounts;
- host login;
- cloud sync;
- payments;
- coffee ordering;
- tea ordering;
- commercial multi-household system.

These belong to later phases.

---

# 4. Complete proposed drink menu

Phase 1 should have **24 drinks**:

- 18 alcoholic
- 6 non-alcoholic

The menu should feel large and varied to guests without requiring a huge number of unrelated ingredients.

## Whiskey

### 1. Whiskey on the Rocks
Strong, simple, spirit-forward.

### 2. Paper Plane
Citrusy, bittersweet and herbal.

### 3. Whiskey Sour
Tart, smooth and classic.

### 4. Gold Rush
Honeyed, citrusy and smooth.

## Tequila and mezcal

### 5. Classic Margarita
Bright, tart and familiar.

### 6. Blood Orange Margarita
Fruity, citrusy and refreshing.

### 7. Smoky Margarita
A Margarita-style drink using mezcal for a smoky character.

### 8. Mezcal Paloma
Smoky, citrusy and refreshing.

## Cognac

### 9. Hennessy Blueberry Lemonade
Fruity, smooth and easy to drink.

### 10. Hennessy Ginger Beer
Cognac, lime and spicy ginger beer.

## Gin

### 11. Gin Collins
Crisp, lemony and refreshing.

### 12. French 75 — Prosecco Party Version
Citrusy, dry and bubbly.

## Vodka

### 13. Lemon Drop
Sweet-tart, citrusy and familiar.

### 14. Blueberry Vodka Lemonade
Fruity and easy-drinking.

### 15. Moscow Mule
Vodka, lime and ginger beer.

## Rum

### 16. Classic Daiquiri
Rum, lime and sugar.

### 17. Rum Mule
Rum, lime and ginger beer.

## Aperitif

### 18. Aperol Spritz
Light, bubbly and bittersweet.

## Non-alcoholic

### 19. House Lemonade
Classic sweet-tart lemonade.

### 20. Blueberry Lemonade
Fruity lemonade.

### 21. Blood Orange Limeade
Juicy, tart and sparkling.

### 22. Ginger Lime Fizz
Spicy ginger beer, lime and soda.

### 23. Bitter Orange Spritz
Bittersweet, citrusy and bubbly.

### 24. Honey Ginger Sour
Lemon, honey and ginger with a more cocktail-like sweet/tart profile.

---

# 5. Drink recipes and NA alternatives

Recipes below are the standard Phase 1 builds.

Host Mode should show exact amounts.

The normal guest menu only needs to show the important ingredients.

| Drink | Recipe |
|---|---|
| Whiskey on the Rocks | 2 oz bourbon, ice |
| Paper Plane | .75 oz bourbon, .75 oz Aperol, .75 oz Amaro Nonino, .75 oz lemon |
| Whiskey Sour | 2 oz bourbon, .75 oz lemon, .5 oz simple syrup |
| Gold Rush | 2 oz bourbon, .75 oz lemon, .75 oz honey syrup |
| Classic Margarita | 2 oz tequila, 1 oz Cointreau, 1 oz lime |
| Blood Orange Margarita | 2 oz tequila, 1 oz Cointreau, 1 oz lime, 1 oz blood-orange juice |
| Smoky Margarita | 2 oz mezcal, 1 oz Cointreau, 1 oz lime |
| Mezcal Paloma | 1.5 oz mezcal, .5 oz lime, 3 oz grapefruit soda |
| Hennessy Blueberry Lemonade | 1.5 oz Hennessy, 1 oz lemon, .75 oz blueberry syrup, 3 oz water |
| Hennessy Ginger Beer | 1.5 oz Hennessy, .5 oz lime, 4 oz ginger beer |
| Gin Collins | 1.5 oz gin, 1 oz lemon, .5 oz simple syrup, 2 oz club soda |
| French 75 | 1 oz gin, .5 oz lemon, .5 oz simple syrup, 2 oz Prosecco |
| Lemon Drop | 2 oz vodka, .5 oz Cointreau, .75 oz lemon, .5 oz simple syrup |
| Blueberry Vodka Lemonade | 1.5 oz vodka, 1 oz lemon, .75 oz blueberry syrup, 3 oz water |
| Moscow Mule | 2 oz vodka, .5 oz lime, 4 oz ginger beer |
| Classic Daiquiri | 2 oz rum, 1 oz lime, .75 oz simple syrup |
| Rum Mule | 2 oz rum, .5 oz lime, 4 oz ginger beer |
| Aperol Spritz | 3 oz Prosecco, 2 oz Aperol, 1 oz club soda |
| House Lemonade | 1 oz lemon, .75 oz simple syrup, 4 oz water |
| Blueberry Lemonade | 1 oz lemon, .75 oz blueberry syrup, 4 oz water |
| Blood Orange Limeade | 2 oz blood-orange juice, 1 oz lime, .5 oz simple syrup, 2 oz club soda |
| Ginger Lime Fizz | 4 oz ginger beer, .5 oz lime, 1 oz club soda |
| Bitter Orange Spritz | 2 oz NA bitter aperitif, 2 oz blood-orange juice, 2 oz club soda |
| Honey Ginger Sour | 1 oz lemon, .75 oz honey syrup, 2 oz ginger beer, 1 oz chilled water |

## Intentional NA pairings

Do not pretend every alcoholic cocktail has an exact alcohol-free copy.

Use the closest intentional alternative when useful.

| Alcoholic drink | Suggested NA alternative |
|---|---|
| Whiskey Sour | Honey Ginger Sour |
| Gold Rush | Honey Ginger Sour |
| Classic Margarita | Blood Orange Limeade |
| Blood Orange Margarita | Blood Orange Limeade |
| Smoky Margarita | Blood Orange Limeade |
| Mezcal Paloma | Ginger Lime Fizz |
| Hennessy Blueberry Lemonade | Blueberry Lemonade |
| Hennessy Ginger Beer | Ginger Lime Fizz |
| Gin Collins | Ginger Lime Fizz or Lemonade |
| French 75 | Bitter Orange Spritz |
| Lemon Drop | House Lemonade |
| Blueberry Vodka Lemonade | Blueberry Lemonade |
| Moscow Mule | Ginger Lime Fizz |
| Rum Mule | Ginger Lime Fizz |
| Aperol Spritz | Bitter Orange Spritz |

Whiskey on the Rocks, Paper Plane and Classic Daiquiri do not need fake one-to-one NA copies.

---

# 6. Flavor and recommendation taxonomy

The app needs simple attributes so it can compare drinks.

Guests should see understandable words, not numbers.

## Guest-facing tags

Use tags such as:

**Refreshing · Citrusy · Fruity · Sweet · Tart · Bittersweet · Herbal · Spicy · Smoky · Bubbly · Smooth · Spirit-Forward · Light · Strong · Classic · Adventurous**

## Internal drink attributes

Each drink should store:

### Alcohol status
- alcoholic
- non-alcoholic

### Base spirit
- bourbon
- tequila
- mezcal
- cognac
- gin
- vodka
- rum
- none

### Strength
- zero
- light
- balanced
- strong

### Carbonation
- still
- sparkling

### Style
- classic
- modern-classic
- house

### Taste scores

Use simple values from 1–5 for:

- sweetness;
- tartness;
- bitterness;
- spirit-forwardness.

---

# 7. Guided recommendation decision logic

The recommendation system should be short and adaptive.

Most guests should answer only **2–3 questions**.

## Question 1

### What are we drinking?

**Cocktail**

or

**Non-Alcoholic**

This must always be asked first.

## Question 2

### What sounds good right now?

Use large cards.

Recommended options:

### Bright & Citrusy
Good for Margaritas, Whiskey Sour, Daiquiri, Collins and similar drinks.

### Fruity & Juicy
Good for Blood Orange Margarita, Blueberry Lemonades and other fruit-forward drinks.

### Sweet & Easy
Good for Hennessy Blueberry Lemonade, Gold Rush and approachable drinks.

### Crisp & Refreshing
Good for Collinses, Mules, Paloma and spritzes.

### Bittersweet & Interesting
Good for Paper Plane, Aperol Spritz and Bitter Orange Spritz.

### Bold & Strong
Good for Whiskey on the Rocks and stronger spirit-forward drinks.

## Question 3

Only ask another question if the app still has two or more very close matches.

The app should automatically choose the question that best separates them.

Possible questions:

### Which spirit?

Only show relevant choices.

Examples:

Whiskey  
Tequila  
Mezcal  
Vodka  
Gin  
Rum  
Cognac  
No preference

### Still or bubbly?

Still  
Bubbly

### Easy or bold?

Easy & refreshing  
Balanced  
Bold & strong

### Familiar or adventurous?

Classic  
Something different

### Clean or smoky?

Clean & bright  
Smoky & adventurous

This last question is especially useful for tequila vs mezcal drinks.

## Recommendation rule

Every answer adds points to matching drinks.

The exact numbers do not need to be complicated.

Recommended weighting:

| Answer | Importance |
|---|---:|
| Alcohol choice | Required filter |
| Main flavor | Highest |
| Spirit preference | High |
| Strength | Medium |
| Still/bubbly | Medium |
| Classic/adventurous | Lower |
| Extra flavor tags | Lower |

The important rule is:

> Return one strongest match.

Do not return a ranked list.

## Ties

If the two strongest drinks are basically tied, ask one more question.

Do not randomly choose one unless all useful preference questions have already been answered.

A hidden `recommendationPriority` can be used as the final technical tie-breaker.

## Try Another

When the guest taps **Try Another**:

1. Keep their answers.
2. Remember the drink already shown.
3. Remove previously shown drinks from consideration.
4. Recommend the next-best unseen drink.

If there are no good unseen matches left, show:

**You've seen the best matches for those choices.**

Then offer:

**Change an Answer**

**Start Over**

**Browse Full Menu**

---

# 8. Direct-menu experience

Guests who choose **I Know What I Want** should go directly to the full menu.

## Search

Search should work for:

- drink name;
- spirit;
- important ingredients;
- flavor tags.

Examples:

Searching **vodka** should find:

- Lemon Drop
- Blueberry Vodka Lemonade
- Moscow Mule

Searching **ginger** should find:

- Hennessy Ginger Beer
- Moscow Mule
- Rum Mule
- Ginger Lime Fizz
- Honey Ginger Sour

## Main filter

Use:

**All | Cocktails | Non-Alcoholic**

## Optional quick filters

Keep these simple:

**Refreshing**

**Fruity**

**Citrusy**

**Bubbly**

**Strong**

**Smoky**

**Bittersweet**

## Drink cards

Each drink card should show:

- name;
- short taste description;
- Alcoholic or Non-Alcoholic;
- 2–3 useful tags.

The entire card should be tappable.

## Drink details

Show:

- drink name;
- short taste description;
- main ingredients;
- flavor tags;
- NA alternative when available;
- Back to Menu.

Exact recipe measurements should mainly live in Host Mode.

---

# 9. Screen map

```text
Home

├── Help Me Choose
│   ├── Alcohol or Non-Alcoholic
│   ├── Flavor Choice
│   ├── Optional Extra Question
│   └── Recommendation
│       ├── View Drink
│       ├── Try Another
│       ├── Change Answers
│       ├── Start Over
│       └── Full Menu
│
├── I Know What I Want
│   └── Full Menu
│       ├── Search
│       ├── Filters
│       └── Drink Details
│
└── Host
    ├── Recipes
    ├── Prep
    ├── Shopping
    └── Checklist
```

---

# 10. Detailed UX behavior

## Home screen

The two main actions should be immediately obvious.

Suggested text:

### What are you drinking?

**Help Me Choose**  
Answer a couple quick questions.

**I Know What I Want**  
Browse the menu.

Do not add onboarding.

Do not require login.

## Back

Back should return to the previous recommendation question.

If an earlier answer changes, later answers that no longer make sense should be cleared.

## Restart

Restart should clear:

- all answers;
- shown drinks;
- current recommendation.

Return to the first question.

## Recommendation screen

Example:

### Your drink is…

# Blood Orange Margarita

Bright blood orange, tart lime and crisp tequila.

**Fruity · Citrusy · Tart**

Tequila · Cointreau · Blood Orange · Lime

**View Drink**

**Try Another**

**Change Answers**

If available:

**Want it without alcohol? Try the Blood Orange Limeade**

---

# 11. Visual direction

## Direction: Midnight Citrus Social Club

The app should feel:

- modern;
- premium;
- fun;
- social;
- slightly nightlife-inspired;
- easy to use on a phone.

It should not feel like restaurant POS software.

## Colors

Main background:

**Very dark charcoal**

Main text:

**Warm cream**

Main accent:

**Blood orange / coral**

Secondary accent:

**Blueberry / periwinkle**

Use color carefully.

The app should still feel clean.

## Typography

Use:

### Main UI font
A clean modern sans-serif such as Manrope or Inter.

### Drink names
A modern serif such as Fraunces.

This gives drink results more personality.

## Buttons

Buttons should be:

- large;
- easy to tap;
- rounded;
- high contrast.

Primary buttons should generally be at least about 48px tall.

## Question cards

Questions should use large visual choices instead of small radio buttons.

Example:

### Crisp & Refreshing
Light, bright and easy to drink.

## Motion

Keep animation subtle.

Use short fades or slides between questions.

Recommendation results can have a slightly stronger entrance animation.

Respect reduced-motion settings.

---

# 12. Structured drink schema

Each drink should use a simple TypeScript/JSON structure.

Required fields:

| Field | Purpose |
|---|---|
| `id` | Permanent drink ID |
| `name` | Display name |
| `alcoholStatus` | Alcoholic or non-alcoholic |
| `baseSpirit` | Main spirit |
| `description` | Short taste description |
| `recipe` | Ingredients and quantities |
| `method` | How the host makes it |
| `garnishIngredientIds` | Garnishes |
| `flavorTags` | Search and recommendation |
| `tasteProfile` | Taste numbers |
| `strength` | Zero/light/balanced/strong |
| `carbonation` | Still/sparkling |
| `style` | Classic/modern-classic/house |
| `naAlternativeId` | Optional NA pairing |
| `searchAliases` | Extra search terms |
| `recommendationPriority` | Final tie-break only |

Do not add ordering or inventory fields yet.

---

# 13. Ingredient schema

Each ingredient needs one permanent ID.

Required fields:

| Field | Purpose |
|---|---|
| `id` | Permanent ingredient ID |
| `name` | Display name |
| `category` | Shopping section |
| `measurementType` | Volume/count/etc. |
| `defaultUnit` | oz, each, etc. |
| `purchaseUnitName` | Bottle, carton, bag, fruit, etc. |
| `typicalPurchaseQuantity` | Helps shopping calculations |
| `isAlcoholic` | Yes/no |

Use generic IDs.

Good:

`vodka`

`rum`

`ginger_beer`

Bad:

`titos_750ml`

`bacardi_bottle`

Specific brands can be added later as inventory records if needed.

---

# 14. Complete normalized ingredient matrix

## Spirits

- `bourbon`
- `tequila_blanco`
- `mezcal`
- `hennessy_vs`
- `gin`
- `vodka`
- `rum`

## Liqueurs and amari

- `cointreau`
- `aperol`
- `amaro_nonino`

## Wine

- `brut_prosecco`

## Non-alcoholic modifiers

- `na_bitter_aperitif`

## Citrus and juice

- `lemon_juice`
- `lime_juice`
- `blood_orange_juice`

## Syrups and sweeteners

- `simple_syrup`
- `blueberry_syrup`
- `honey_syrup`

## Mixers

- `ginger_beer`
- `grapefruit_soda`
- `club_soda`
- `chilled_water`

## Produce/garnish

- `lemon`
- `lime`
- `orange`
- `blueberries`

## Other

- `angostura_bitters`
- `kosher_salt`
- `ice`

---

# 15. Shopping-list calculation approach

The host will enter:

`NUMBER_OF_GUESTS`

and:

`EXPECTED_DRINKS_PER_GUEST`

The app calculates:

`guest count × expected drinks`

Then add a default **20% buffer**.

Example:

20 guests × 3 drinks = 60 drinks

60 × 1.20 = 72 planned servings

## Drink popularity

Do not assume every drink will be ordered equally.

Each drink should have a simple estimated demand weight.

Higher expected demand can include drinks such as:

- Blood Orange Margarita
- Classic Margarita
- Moscow Mule
- Hennessy Blueberry Lemonade
- Whiskey Sour
- Lemonade
- Blueberry Lemonade

More adventurous drinks can use lower expected demand.

These values must be easy to change before the party.

## Alcohol vs non-alcoholic

The calculator should also accept an expected split.

If no better information is available, use:

**80% alcoholic**

**20% non-alcoholic**

as a temporary planning default.

## Ingredient calculation

For every drink:

`expected servings × ingredient amount`

Then combine every use of the same ingredient ID.

Example:

`ginger_beer`

must combine the amount required for:

- Hennessy Ginger Beer;
- Moscow Mule;
- Rum Mule;
- Ginger Lime Fizz;
- Honey Ginger Sour.

The final shopping list should show ginger beer only once.

## Bottle conversion

A standard 750 mL bottle contains about 25.4 fl oz.

Calculate:

`total ounces required ÷ 25.4`

Then always round up to whole bottles.

Use the same idea for mixers and other packaged ingredients.

## Recommended shopping sections

### Spirits
Bourbon  
Blanco tequila  
Mezcal  
Hennessy V.S  
Gin  
Vodka  
Rum

### Liqueurs / Amari
Cointreau  
Aperol  
Amaro Nonino

### Wine
Brut Prosecco

### NA modifiers
NA bitter aperitif

### Citrus / Juice
Lemons  
Limes  
Blood-orange juice

### Produce
Oranges  
Blueberries

### Syrups
Simple syrup  
Blueberry syrup  
Honey syrup

### Mixers
Ginger beer  
Grapefruit soda  
Club soda

### Other
Angostura bitters  
Salt  
Ice

### Bar supplies
Napkins  
Cocktail picks if desired  
Straws if desired

---

# 16. Host prep experience

Host Mode should be simple.

Use four sections:

**Recipes**

**Prep**

**Shopping**

**Checklist**

## Recipes

Each recipe shows:

- exact quantities;
- preparation method;
- garnish;
- glass;
- NA alternative.

## Prep

Group work by what the host needs to do.

### Before party day

Prepare or buy:

- simple syrup;
- honey syrup;
- blueberry syrup.

Chill:

- Prosecco;
- ginger beer;
- grapefruit soda;
- club soda;
- juices.

### Party day

Prepare:

- lemon juice;
- lime juice;
- garnishes;
- ice;
- labeled bottles/containers.

## Bar setup

Have ready:

- spirits;
- liqueurs;
- juices;
- syrups;
- mixers;
- ice;
- shaker;
- jigger;
- strainer;
- glasses/cups;
- towels.

---

# 17. Accessibility and responsive requirements

The app is primarily for phones.

It should work especially well around modern iPhone and Android phone sizes.

Important requirements:

- large touch targets;
- body text around 16px or larger;
- strong text contrast;
- no information communicated only through color;
- keyboard support on desktop;
- screen-reader-friendly buttons and headings;
- reduced-motion support;
- good layouts from about 320px phone width upward.

Do not make desktop look like a complicated dashboard.

Keep the same simple experience at larger sizes.

---

# 18. Phase 2 compatibility decisions

Phase 1 should make a few choices now that will make Phase 2 easier later.

## Stable drink IDs

Use IDs like:

`moscow-mule`

rather than using the displayed name as the system identity.

## Stable ingredient IDs

Recipes should reference ingredient IDs.

Later, Phase 2 can determine:

`ingredient unavailable → drink unavailable`

without rewriting recipes.

## Keep data separate from UI

Do not put recipes directly inside React components.

One source of drink data should power:

- menu;
- search;
- recommendations;
- recipe pages;
- shopping calculations.

## Recommendation is separate from ordering

The recommendation system should only return a `drinkId`.

Later:

`recommended drink → customize → order`

can be added without changing the recommendation engine.

## Allow more beverage types later

Do not build the whole app around only:

`cocktail`

and

`mocktail`.

The data model should later be able to support:

- cocktails;
- mixed non-alcoholic drinks;
- coffee;
- tea;
- other drinks.

## No backend yet

Do not build Phase 2 infrastructure early.

Phase 1 should stay local and simple.

---

# 19. Acceptance criteria

Phase 1 is ready when:

### Guest side

- Home clearly shows the two main choices.
- All 24 drinks appear in the menu.
- Search works.
- Filters work.
- Every drink has details.
- Alcoholic and non-alcoholic drinks are clearly labeled.

### Drink finder

- Always asks alcohol vs non-alcoholic first.
- Usually reaches a recommendation within 2–3 questions.
- Returns exactly one drink.
- Uses an extra question when necessary to break a close match.
- Try Another keeps previous answers.
- Previously shown drinks are not repeated.
- Back works.
- Restart works.

### Host side

- Every drink has an exact recipe.
- Prep instructions are available.
- Shopping calculator uses normalized ingredients.
- Shared ingredients are combined.
- Shopping quantities can use guest count and drinks per guest.
- Host checklist works.

### Technical

- Drink data is stored separately from UI.
- Ingredient data is normalized.
- Recommendation logic is separate from UI.
- Shopping calculations are separate from UI.
- No backend is required.
- No database is required.
- No authentication is required.
- No ordering system is built.

### Design

- Mobile-first.
- Large controls.
- Easy to use in a party environment.
- Looks intentionally designed.
- Does not resemble restaurant management software.

---

# 20. Implementation handoff for Claude Code

## Recommended technology

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- local TypeScript or JSON drink data
- React state
- `sessionStorage` for recommendation-session progress
- `localStorage` only where useful for Host Mode

Do not add:

- Redux;
- database;
- API;
- authentication;
- CMS;
- unnecessary libraries.

## Suggested project organization

```text
app/
  page
  menu/
  find/
  drink/[id]/
  host/

components/
  finder/
  menu/
  drinks/
  host/
  shared/

data/
  drinks
  ingredients

lib/
  recommendation
  shopping
  search

types/
  drink
  ingredient
  recommendation
```

Keep this simple.

Do not create abstractions unless they solve a real problem.

## Build order

### Stage 1 — Data

Create:

- ingredient data;
- all 24 drinks;
- recipes;
- flavor tags;
- NA relationships.

### Stage 2 — Recommendation engine

Build:

- filtering;
- scoring;
- tie detection;
- dynamic extra questions;
- Try Another;
- previously shown drink exclusion.

Test this logic before building the final visuals.

### Stage 3 — Guest finder

Build:

- home;
- questions;
- result;
- Back;
- Restart;
- Try Another.

### Stage 4 — Full menu

Build:

- menu;
- search;
- filters;
- drink details;
- NA alternative links.

### Stage 5 — Host Mode

Build:

- recipes;
- prep;
- shopping calculator;
- checklist.

### Stage 6 — Visual polish

Apply the Midnight Citrus Social Club design.

Prioritize:

- recommendation result;
- question cards;
- drink cards;
- mobile spacing;
- typography;
- button sizes.

### Stage 7 — Final testing

Before the party, test:

- every recommendation path;
- Try Another;
- Back;
- Restart;
- every menu item;
- search;
- filters;
- Host Mode;
- shopping math;
- iPhone Safari;
- another phone/browser if available.

Do not start building Phase 2 before Phase 1 works reliably.

---

# SHOPPING INPUTS STILL NEEDED

To calculate final shopping quantities, I still need:

**1. Number of guests**

`NUMBER_OF_GUESTS = ?`

**2. Expected app drinks per guest**

`EXPECTED_DRINKS_PER_GUEST = ?`

**3. Expected alcoholic vs non-alcoholic split**

If unknown, use:

`80% alcoholic / 20% non-alcoholic`

**4. What ingredients and bottles you already own**

This lets the calculator produce a true **Buy** list instead of just a **Need** list.

**5. Whether guests will also have beer, wine, soda, water, or other drinks outside this app**

This matters because those drinks should not accidentally be counted as cocktail demand.
