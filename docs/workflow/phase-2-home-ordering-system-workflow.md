# Phase 2 — Permanent Home Ordering System Workflow

## Objective

Turn the Phase 1 drink-discovery app into a permanent home hospitality ordering system.

Guests should be able to browse, discover, customize, and order drinks from their own phones.

You and your wife should have a private host/admin interface for:

- incoming orders
- order status
- drink/menu availability
- ingredients
- inventory
- coffee
- tea
- non-alcoholic mixed drinks
- household service management

A tablet mounted near the refrigerator should act as a live order queue.

---

# Phase 2 Success Criteria

Phase 2 is complete when:

- [ ] Guests can submit real orders.
- [ ] Orders appear immediately on the host/admin side.
- [ ] Hosts can update order status.
- [ ] Guests can see useful order status.
- [ ] Inventory is stored persistently.
- [ ] Ingredients map to drinks.
- [ ] Unavailable ingredients affect menu availability.
- [ ] Coffee, tea, cocktails, and NA drinks share one coherent system.
- [ ] Host/admin features are protected.
- [ ] The fridge tablet has a dedicated display mode.
- [ ] The system works reliably across phones/tablets.
- [ ] Phase 1 recommendation logic still works.
- [ ] Data migrations are safe.
- [ ] Basic privacy/security controls are implemented.
- [ ] The product is still simple enough for household use.

---

# Recommended Phase 2 Architecture

## Frontend / Application

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend / Data

Recommended initial direction:

- Supabase
- Postgres
- Supabase Auth
- Realtime features where they add meaningful value

Do not automatically introduce a separate Express API.

Prefer using the Next.js application and database/backend services directly unless a dedicated API provides a concrete benefit.

## State Management

Start with:

- React state
- server state/data fetching patterns
- route-level state

Introduce Redux only if the application develops genuinely complex client-side state that cannot be managed cleanly otherwise.

## ORM

Do not choose Sequelize solely because it is familiar.

Evaluate whether:

- Supabase client
- SQL
- Prisma
- Drizzle
- Sequelize

best fits the final architecture.

Use the simplest option that preserves clarity and migrations.

---

# Core Phase 2 User Roles

## Guest

Can:

- Browse drinks
- Use drink finder
- View drinks
- Select options
- Add guest name
- Customize drink where allowed
- Place order
- See order state

## Host/Admin

Can:

- View new orders
- Move orders through status
- Manage ingredients
- Manage inventory
- Mark items unavailable
- Manage menu visibility
- Edit drinks
- Manage coffee/tea/NA options
- View current service queue

## Fridge Tablet

Dedicated operational view:

- New
- Making
- Ready
- Served

Designed for glanceable use.

---

# Recommended Order States

Start simple:

1. New
2. Making
3. Ready
4. Served
5. Cancelled

Avoid excessive workflow states until real use proves they are necessary.

---

# Recommended Data Domains

Potential entities:

- Household
- User/Admin
- Guest
- Drink
- Ingredient
- RecipeIngredient
- InventoryItem
- Order
- OrderItem
- OrderStatusHistory
- MenuCategory
- Availability
- CustomizationOption

Only add entities that are justified by actual workflows.

---

# Workflow Overview

**Requirements → Architecture → Data Model → UX → Implementation → Migration → Security Review → QA → Household Pilot → Iteration**

---

# Stage 1 — Phase 2 Product Specification

## Goal

Turn the Phase 1 experience into a complete ordering product specification.

## Tool

**ChatGPT Chat**

- Model: GPT-5.6 Sol
- Effort: High
- Deep Research: Off unless a specific integration requires current research

## Inputs

Provide:

- Phase 1 code/repo
- Phase 1 specification
- Party feedback
- Problems observed during real use
- Features you actually want to keep
- Host workflow preferences
- Tablet placement/use
- Coffee/tea menu ideas
- Order customization requirements
- Authentication preferences

## Output

One authoritative Phase 2 Product Specification containing:

- user roles
- guest flows
- host/admin flows
- tablet flows
- order lifecycle
- menu management
- inventory management
- availability rules
- drink customization rules
- coffee/tea/NA support
- notifications
- security/privacy requirements
- acceptance criteria
- explicitly deferred features

---

## Stage 1 Checklist

- [ ] Review what worked in Phase 1.
- [ ] Identify features guests actually used.
- [ ] Identify host pain points.
- [ ] Decide guest identity model.
- [ ] Decide whether guest orders require name only or more.
- [ ] Define order customization limits.
- [ ] Define status workflow.
- [ ] Define menu availability rules.
- [ ] Define inventory behavior.
- [ ] Define coffee/tea structure.
- [ ] Define tablet behavior.
- [ ] Define admin permissions.
- [ ] Define what NOT to build yet.

---

## Stage 1 Prompt

```text
Act as a senior product architect for the next version of my home hospitality application.

INPUTS:

1. Phase 1 product specification
2. Phase 1 source/repository summary
3. Real-world party feedback
4. Any notes about what guests and hosts liked or disliked

OBJECTIVE

Design Phase 2 as a permanent home ordering system.

Guests should be able to:

- browse drinks
- use the recommendation experience
- customize where allowed
- enter a guest name
- place an order
- see useful order status

Hosts/admins should be able to:

- see incoming orders
- manage order status
- manage menu items
- manage ingredients
- manage inventory
- mark items unavailable
- automatically reflect ingredient availability in the guest menu
- manage cocktails
- manage mixed non-alcoholic drinks
- manage coffee
- manage tea

A tablet near the refrigerator should display a live operational order queue.

Do not redesign Phase 1 unnecessarily.

Preserve working recommendation and menu concepts.

Optimize for:

clarity
×
reliability
×
household usability
×
future commercial potential
÷
unnecessary complexity.

OUTPUT

Create an implementation-ready Phase 2 Product Specification including:

1. Product objective
2. Phase 2 scope
3. Explicitly deferred scope
4. User roles
5. Guest flow
6. Host/admin flow
7. Tablet/display flow
8. Order lifecycle
9. Menu management
10. Inventory behavior
11. Availability logic
12. Coffee/tea/NA model
13. Customization model
14. Error/empty states
15. Notifications
16. Privacy/security requirements
17. Accessibility/responsive requirements
18. Acceptance criteria
19. Open decisions that materially affect architecture

Do not write implementation code.
```

---

# Stage 2 — Technical Architecture

## Goal

Define the backend, database, permissions, realtime behavior, migration strategy, and system boundaries before implementation.

## Tool

**Claude**

- Model: Claude Opus 5.5
- Effort: High

## Why

Phase 2 introduces real architectural concerns:

- persistent data
- authentication
- realtime state
- inventory
- order concurrency
- permissions
- migrations
- transactional behavior

This is the point where a stronger architecture-focused model is justified.

## Inputs

Provide:

- Phase 2 Product Specification
- Phase 1 repository
- Phase 1 data models
- Any hosting constraints

## Output

Architecture document covering:

- overall system architecture
- database choice
- schema
- migrations
- auth
- authorization
- order concurrency
- inventory updates
- menu availability
- realtime strategy
- error handling
- auditability
- logging
- deployment
- test strategy
- Phase 3 extensibility boundaries

---

## Stage 2 Checklist

- [ ] Choose database/backend platform.
- [ ] Choose auth model.
- [ ] Define database schema.
- [ ] Define migrations.
- [ ] Define row-level permissions/authorization.
- [ ] Define order creation transaction.
- [ ] Define inventory update behavior.
- [ ] Define ingredient availability behavior.
- [ ] Define realtime update mechanism.
- [ ] Define tablet subscription/update behavior.
- [ ] Define logging.
- [ ] Define failure/retry behavior.
- [ ] Define backup/restore expectations.
- [ ] Define testing strategy.

---

## Stage 2 Prompt

```text
Act as the senior architecture owner for Phase 2 of my home hospitality ordering system.

INPUTS:

1. Approved Phase 2 Product Specification
2. Current Phase 1 repository/code structure
3. Existing Phase 1 drink and ingredient schemas

OBJECTIVE

Create an implementation-ready architecture for a permanent household ordering system.

The system must support:

- guest ordering
- drink discovery
- host/admin order queue
- inventory
- ingredient-driven availability
- coffee
- tea
- non-alcoholic mixed drinks
- a live fridge-tablet operational display

PREFERRED APPLICATION STACK

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Evaluate Supabase/Postgres as the default backend direction, but do not force it if another architecture is materially better.

Do not introduce a separate Express backend unless it has a concrete architectural benefit.

Do not introduce Redux unless client-side state genuinely requires it.

ARCHITECTURE MUST RESOLVE

- database
- schema
- migrations
- authentication
- authorization
- realtime
- order creation
- order status updates
- concurrent updates
- ingredient availability
- inventory changes
- menu availability
- tablet display behavior
- error handling
- logging
- deployment
- testing
- backup/restore expectations
- migration path from Phase 1 local data

Optimize for:

reliability
×
clarity
×
maintainability
×
future product potential
÷
premature complexity.

OUTPUT

Create:

1. Architecture summary
2. Technology decisions
3. System diagram
4. Database schema
5. Entity relationships
6. Order transaction behavior
7. Inventory rules
8. Availability rules
9. Auth/authorization model
10. Realtime architecture
11. Error handling
12. Logging/observability
13. Data migration plan
14. Deployment strategy
15. Test strategy
16. Security/privacy review
17. Phase 3 extensibility boundaries
18. Implementation sequence
19. Acceptance criteria
```

---

# Stage 3 — UX and Screen Specification

## Goal

Translate Phase 2 product requirements into concrete screens and interactions.

## Tool

Use **ChatGPT or Claude**, but only one.

Recommended:

**ChatGPT GPT-5.6 Sol**
- Effort: Medium or High

## Required Screens

### Guest

- [ ] Home
- [ ] Menu
- [ ] Drink finder
- [ ] Drink detail
- [ ] Customization
- [ ] Cart/order summary
- [ ] Guest name
- [ ] Confirmation
- [ ] Order status

### Admin

- [ ] Dashboard
- [ ] Order queue
- [ ] Order detail
- [ ] Inventory
- [ ] Ingredients
- [ ] Menu management
- [ ] Drink editor
- [ ] Availability controls
- [ ] Settings

### Tablet

- [ ] New
- [ ] Making
- [ ] Ready
- [ ] Served

---

# Stage 4 — Implementation

## Tool

**Claude Code**

- Model: Claude Sonnet 5.5
- Effort: High

## Implementation Order

### Foundation

- [ ] Create backend/database project.
- [ ] Configure environment variables.
- [ ] Create migrations.
- [ ] Seed Phase 1 data.
- [ ] Configure auth.
- [ ] Configure authorization.

### Guest Ordering

- [ ] Preserve Phase 1 browsing.
- [ ] Preserve Phase 1 recommendation.
- [ ] Add order creation.
- [ ] Add guest name.
- [ ] Add allowed customizations.
- [ ] Add order confirmation.
- [ ] Add order status.

### Admin

- [ ] Order queue.
- [ ] Status updates.
- [ ] Menu management.
- [ ] Ingredient management.
- [ ] Inventory management.
- [ ] Availability management.

### Tablet

- [ ] Dedicated display route.
- [ ] Realtime updates.
- [ ] Large touch targets.
- [ ] High-glanceability layout.
- [ ] Auto-refresh/reconnect behavior.

### Quality

- [ ] Production build.
- [ ] Type checks.
- [ ] Tests.
- [ ] Empty states.
- [ ] Offline/reconnect handling where practical.
- [ ] Mobile/tablet testing.

---

## Stage 4 Prompt

```text
Act as the senior implementation engineer for Phase 2.

INPUTS:

1. Approved Phase 2 Product Specification
2. Approved Phase 2 Architecture
3. Approved UX/screen specification
4. Current Phase 1 repository

OBJECTIVE

Implement Phase 2 in the existing application without unnecessarily rewriting successful Phase 1 code.

Follow the approved architecture.

PRIORITIES

1. reliability
2. understandable code
3. transactional correctness
4. responsive UX
5. accessibility
6. future maintainability

Do not invent new product requirements.

Do not add speculative Phase 3 features.

IMPLEMENTATION SEQUENCE

1. database/backend setup
2. migrations
3. seed/migrate Phase 1 drink data
4. authentication/authorization
5. guest ordering
6. admin order queue
7. order status
8. inventory
9. availability
10. coffee/tea/NA extensions
11. tablet display
12. testing
13. deployment

Before completion:

- run production build
- run type checks
- test order lifecycle
- test inventory effects
- test realtime updates
- test authorization
- test tablet behavior
- test mobile behavior
- document setup and migrations

DELIVERABLE

Complete working Phase 2 implementation plus:

- README
- migration instructions
- environment setup
- architecture notes
- test summary
- deployment steps
```

---

# Stage 5 — Security and Data Review

## Goal

Verify that admin data and operational actions are protected.

## Review Checklist

- [ ] Guests cannot access admin pages.
- [ ] Guests cannot modify inventory.
- [ ] Guests cannot modify drink definitions.
- [ ] Guests cannot update arbitrary order status.
- [ ] Database permissions are enforced server-side.
- [ ] Sensitive secrets are not shipped to the client.
- [ ] Environment variables are configured correctly.
- [ ] Error messages do not expose secrets.
- [ ] Logs avoid unnecessary personal information.
- [ ] Auth/session expiration behaves correctly.

---

# Stage 6 — Independent QA

## Tool

**Gemini**

- Model: Gemini 3.1 Pro / current Pro
- Thinking: High

## QA Areas

- [ ] Guest ordering
- [ ] Admin permissions
- [ ] Realtime synchronization
- [ ] Concurrent orders
- [ ] Inventory deduction/update
- [ ] Availability rules
- [ ] Tablet experience
- [ ] Responsive design
- [ ] Error states
- [ ] Data persistence
- [ ] Migration correctness
- [ ] Security assumptions
- [ ] Accessibility
- [ ] Phase 1 regression

---

# Stage 7 — Household Pilot

Use the system at home before thinking about commercialization.

## Pilot Questions

- [ ] Do guests actually order through it?
- [ ] Do guests prefer browse or recommendation?
- [ ] How often do hosts need to edit orders?
- [ ] Does inventory tracking save time?
- [ ] Does automatic availability work reliably?
- [ ] Is the fridge tablet useful?
- [ ] Are coffee/tea orders easier or harder than cocktails?
- [ ] Are hosts constantly correcting inventory manually?
- [ ] Which features are ignored?
- [ ] Which features create delight?

---

# Stage 8 — Iterate Based on Real Use

## Prioritize

1. Bugs
2. Friction
3. Repeated manual work
4. Missing high-frequency features
5. Nice-to-haves

Do not add features merely because they sound impressive.

---

# Definition of Done

Phase 2 is complete when:

- [ ] Real guest orders can be placed.
- [ ] Hosts can manage those orders.
- [ ] Tablet view updates reliably.
- [ ] Inventory works.
- [ ] Ingredient availability affects menu availability.
- [ ] Admin functionality is protected.
- [ ] Phase 1 features still work.
- [ ] Household pilot is complete.
- [ ] Major usability issues have been resolved.
- [ ] The product is stable enough to evaluate as a future commercial service.
