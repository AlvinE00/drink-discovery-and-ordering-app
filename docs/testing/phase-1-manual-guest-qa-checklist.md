# Phase 1 Manual Guest QA Checklist

Use this checklist after the Claude Code implementation and before the
Gemini independent review.

**Testing rule:** Complete a full QA pass and record issues before
fixing them. After fixes, run the checklist again.

------------------------------------------------------------------------

## A. Start Clean

-   [x] Run `npm run dev`
-   [x] Open the app on your computer
-   [x] Open the app on an actual iPhone if possible
-   [x] Refresh the app so you are starting fresh
-   [x] App starts without terminal/runtime errors
-   [x] Home page loads correctly
-   [x] No missing images or icons
-   [x] No strange error messages
-   [ ] No horizontal scrolling on mobile

**Notes / bugs:**

Some horizontal scrolling to see the whole page

## B. Home Screen

-   [x] It is immediately clear that the app helps guests choose a drink
-   [x] **I Know What I Want** is visible
-   [x] **Help Me Choose** is visible
-   [x] Both options clearly look tappable
-   [x] Tap **I Know What I Want** --- correct page opens
-   [x] Go back --- home still works
-   [x] Tap **Help Me Choose** --- correct page opens
-   [x] Go back --- home still works
-   [x] Rapidly tap **I Know What I Want** several times --- nothing
    breaks
-   [x] Rapidly tap **Help Me Choose** several times --- nothing breaks
-   [x] Browser/Safari Back works
-   [x] App Back button works, if present
-   [x] Refreshing the home page works

**Notes / bugs:**

------------------------------------------------------------------------

## C. "I Know What I Want"

### Drink List

-   [x] Expected drinks appear
-   [x] Alcoholic drinks are represented correctly
-   [x] Non-alcoholic drinks are represented correctly
-   [x] Drink names are correct
-   [x] Drink descriptions make sense
-   [x] No duplicate drinks
-   [x] No required drinks are missing

### Required Drinks

-   [x] Whiskey on the Rocks
-   [x] Paper Plane
-   [x] Blood Orange Margarita
-   [x] Hennessy + Blueberry Lemonade
-   [x] Regular non-alcoholic lemonade

### Open Multiple Drinks

Open at least five different drinks and verify each.

-   [x] Correct drink opens
-   [x] Name matches the drink selected
-   [x] Description matches the drink
-   [x] Alcohol/non-alcohol status is correct
-   [x] Strength/flavor information is correct, if shown
-   [x] Ingredients are correct, if shown
-   [x] Page does not overflow
-   [x] Back navigation returns to the drink list

Make sure the sample includes:

-   [x] Whiskey-based drink
-   [x] Tequila/mezcal drink
-   [x] Rum drink
-   [x] Vodka drink
-   [x] Non-alcoholic drink

**Notes / bugs:**

------------------------------------------------------------------------

## D. Search

If Phase 1 includes search:

-   [x] Search `Paper Plane` --- Paper Plane appears
-   [x] Search `paper plane` --- capitalization does not break search
-   [x] Search `paper` --- partial search works if required by the
    specification
-   [x] Search `lemonade` --- relevant lemonade drinks appear
-   [x] Search `Batman` --- app does not crash
-   [x] `Batman` produces a clear no-results state
-   [x] It is easy to recover from no results
-   [x] Clear/delete search --- full drink list returns
-   [x] Search with leading spaces (`Paper Plane`) --- nothing strange
    happens
-   [x] Search random characters (`@#$%`) --- nothing breaks

**Notes / bugs:**

------------------------------------------------------------------------

## E. Help Me Choose --- Normal Test

Answer the questions naturally as yourself.

-   [x] First question appears
-   [x] Options are understandable
-   [x] Selected option visibly changes state
-   [x] Continue/Next works
-   [x] Every question loads correctly
-   [x] Progress indicator works, if implemented
-   [x] Back works
-   [x] Previous answer remains selected after going back
-   [x] Earlier answer can be changed
-   [x] Changed answer is retained
-   [x] Questionnaire reaches the recommendation

### Final Recommendation

-   [x] Exactly one primary recommendation appears
-   [x] Recommended drink exists in the Phase 1 menu
-   [x] Recommendation makes sense based on the answers
-   [x] Drink information is correct
-   [x] Internal scoring/debug data is not exposed
-   [x] Recommendation explanation makes sense, if provided

**Recommendation received:**
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Notes / bugs:**
When pressing back until the start menu, your choices for the flow chart should reset
When I get a final drink and want to get another recommendation, I cannot back to previous picks. Like i get drink #2 and i cannot go back to pick #1
------------------------------------------------------------------------

## F. Recommendation Stress Tests

### Test 1 --- Strong / Spirit-Forward

Choose preferences pointing toward strong, spirit-forward,
whiskey/bourbon drinks.

-   [x] Appropriate strong drink recommended
-   [x] Result is not obviously light/fruity unless other answers
    justify it
-   [x] Result is actually available on the menu

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 2 --- Sweet / Fruity

Choose sweet, fruity, approachable preferences.

-   [x] Appropriate fruity/approachable drink recommended
-   [x] Result does not obviously contradict the preferences

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 3 --- Refreshing

Choose refreshing, citrus, lighter/easy-drinking preferences.

-   [x] Appropriate refreshing drink recommended
-   [x] Result does not obviously contradict the preferences

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 4 --- Ginger Beer

Choose ginger/spicy/refreshing preferences when possible.

-   [x] Ginger-beer-based drink can win when it fits the other
    preferences
-   [x] Recommended ginger-beer drink actually contains ginger beer

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 5 --- Rum

Choose rum plus compatible flavor preferences.

-   [x] Rum drink recommended
-   [x] Drink matches the requested flavor direction

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 6 --- Vodka

Choose vodka plus compatible preferences.

-   [x] Vodka-based recommendation appears
-   [x] Another base spirit is not substituted when vodka is a hard requirement

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 7 --- Tequila / Mezcal

Choose tequila/mezcal plus compatible preferences.

-   [x] Appropriate tequila/mezcal recommendation appears

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Notes / bugs:**

------------------------------------------------------------------------

## G. Critical Non-Alcoholic Tests

Choose **Non-Alcoholic**, then complete the questionnaire normally.

-   [x] Recommendation contains ZERO alcohol
-   [x] No alcoholic ingredient/addition slips into the result
-   [x] Description correctly identifies it as non-alcoholic
-   [x] Non-alcoholic path feels like a complete experience

### Try Another --- Non-Alcoholic

Request another recommendation about five times.

-   [x] Alternative #1 is non-alcoholic
-   [x] Alternative #2 is non-alcoholic
-   [x] Alternative #3 is non-alcoholic
-   [x] Alternative #4 is non-alcoholic
-   [x] Alternative #5 is non-alcoholic
-   [x] Every result actually exists on the menu
-   [x] Results continue to respect the user's preferences

**Any alcoholic recommendation in this test is a critical bug.**

**Recommendations received:**

With the options I selected it only gave me 2 drink options, and then it told me to change my answers for other drinks.

    ------------------------------------------------------------------------
**Notes / bugs:**

------------------------------------------------------------------------

## H. "Try Another"

Complete a normal alcoholic recommendation flow.

**Recommendation #1:**
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Tap **Try Another**.

**Recommendation #2:**
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

-   [x] App does not crash
-   [x] Another reasonable drink appears
-   [x] Original preferences remain respected
-   [x] Same drink is not immediately repeated when alternatives exist

Tap **Try Another** again.

**Recommendation #3:**
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

-   [ ] Third result remains appropriate

Continue several times and check:

-   [ ] No endless repetition
-   [ ] Recommendations do not become nonsensical
-   [ ] Results do not violate previous answers
-   [ ] Results are real menu drinks
-   [ ] Alcohol/non-alcohol rules remain correct

**Notes / bugs:**

------------------------------------------------------------------------

## I. Contradictory Answers

Try unusual combinations such as **strong + sweet + refreshing** or
other conflicting preferences.

-   [ ] App still produces a recommendation
-   [ ] App does not crash
-   [ ] Result is a reasonable compromise
-   [ ] App does not get stuck because no perfect match exists
-   [ ] Best available match appears sensible

**Combination tested:**
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Notes / bugs:**

------------------------------------------------------------------------

## J. Navigation Abuse

Start **Help Me Choose**, answer 2--3 questions, then:

-   [x] Go Back
-   [x] Go Forward
-   [x] Change an answer
-   [x] Go Back twice
-   [x] Continue again
-   [x] Use browser/Safari Back
-   [x] Use browser/Safari Forward
-   [x] No blank screens appear
-   [x] No impossible states appear
-   [x] Questions do not duplicate
-   [x] Answers do not unexpectedly change
-   [x] Final recommendation reflects the final answers

Halfway through another questionnaire:

-   [x] Refresh the browser
-   [x] Resulting behavior is sensible
-   [x] No broken page appears

**Notes / bugs:**

------------------------------------------------------------------------

## K. Restart Recommendation

### Session 1

Use preferences such as:

-   Whiskey
-   Strong
-   Spirit-forward

Complete the flow.

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Session 2

Start **Help Me Choose** again and choose something very different:

-   Non-alcoholic
-   Sweet
-   Fruity

Then verify:

-   [x] Old preferences do not contaminate the new session
-   [x] Second result is non-alcoholic
-   [x] Recommendation reflects the new answers

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Notes / bugs:**

------------------------------------------------------------------------

## L. Refresh Important Screens

Individually refresh:

-   [x] Home
-   [x] Drink browser
-   [x] Search
-   [x] Drink details
-   [x] Help Me Choose
-   [x] Recommendation

Verify none produce:

-   [x] 404
-   [x] 500
-   [x] Application Error
-   [x] Unhandled Runtime Error
-   [x] Blank screen

**Notes / bugs:**

------------------------------------------------------------------------

## M. Mobile Testing

Preferably test on an actual iPhone.

### Portrait

-   [x] Home fits correctly
-   [x] Browse fits correctly
-   [x] Search fits correctly
-   [x] Questionnaire fits correctly
-   [x] Recommendation fits correctly

### Landscape

Rotate the phone.

-   [ ] Nothing becomes unusable
-   [ ] Important buttons remain accessible

Rotate back.

-   [ ] App returns correctly

### Larger Text

Increase browser/system text size if practical.

-   [ ] Important text remains readable
-   [ ] Buttons do not overlap
-   [ ] Content is not cut off

**Notes / bugs:**

------------------------------------------------------------------------

## N. Touch Targets / One-Handed Use

Use the app one-handed with your thumb.

-   [x] Buttons are easy to tap
-   [x] Options are not packed too tightly
-   [x] Neighboring options are not accidentally selected
-   [x] Back is accessible
-   [x] Next/Continue is accessible
-   [x] Try Another is accessible
-   [x] No important action requires precision tapping

**Notes / bugs:**

------------------------------------------------------------------------

## O. Speed / Simplicity Test

### Help Me Choose

Go from:

**Home → Help Me Choose → Questions → Recommendation**

-   [x] Experience feels quick
-   [x] Questions do not feel repetitive
-   [x] No unnecessary typing
-   [x] No confusing cocktail terminology
-   [x] No unnecessary screens
-   [x] Final recommendation is obvious

### I Know What I Want

Go from:

**Home → I Know What I Want → Find a Drink**

-   [x] Experience feels fast
-   [x] Navigation is obvious
-   [x] No unnecessary steps

**Notes / bugs:**

------------------------------------------------------------------------

## P. Two-Person Usability Test

Give the app to someone who has not been involved in building it. Do not
explain the interface.

Ask:

> Find a drink you already know you want.

Then:

> Pretend you don't know what you want and have the app choose something
> for you.

Observe without helping unless they are genuinely stuck.

-   [x] They can find a known drink
-   [x] They can start Help Me Choose
-   [x] They understand the questions
-   [x] They reach a recommendation
-   [x] They understand the recommendation
-   [x] They can request another recommendation

### Observation Notes

**Where did they hesitate?**

------------------------------------------------------------------------

**What did they misunderstand?**

------------------------------------------------------------------------

**What did they expect to happen?**

------------------------------------------------------------------------

**What was difficult to tap/find?**

------------------------------------------------------------------------

**Did the recommendation make sense?**

------------------------------------------------------------------------

**What did you have to explain verbally?**

------------------------------------------------------------------------

------------------------------------------------------------------------

## Q. Final Party Simulation

### Guest 1 --- Knows Exactly What They Want

Scenario: **"I want a Paper Plane."**

-   [ ] Can find Paper Plane quickly
-   [x] Drink information is correct

### Guest 2 --- Sweet Drink

Scenario: **"I don't know cocktails. I want something sweet."**

-   [x] Can use Help Me Choose without assistance
-   [x] Gets a sensible sweet recommendation

### Guest 3 --- Strong Drink

Scenario: **"I want something strong."**

-   [x] Gets an appropriately strong recommendation

### Guest 4 --- No Alcohol

Scenario: **"I don't drink alcohol."**

-   [x] Gets only a non-alcoholic recommendation
-   [x] Try Another continues to return only non-alcoholic drinks

### Guest 5 --- Rum + Refreshing

Scenario: **"I like rum and refreshing drinks."**

-   [x] Gets a sensible rum recommendation

### Guest 6 --- Doesn't Like First Result

Scenario: **"I don't like that recommendation."**

-   [x] Try Another works
-   [x] New result still respects preferences

### Guest 7 --- Knows Nothing About Drinks

Scenario: **"I have absolutely no idea what I want."**

-   [x] Can complete Help Me Choose without cocktail knowledge
-   [x] Gets one clear recommendation

**Notes / bugs:**

------------------------------------------------------------------------

# Bug Log

Record every issue here. Duplicate the template as needed.

## Bug 1

**Title:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Where:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Steps to reproduce:**

1.  
2.  
3.  

**Expected:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Actual:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Severity:** Critical / High / Medium / Low

**Screenshot taken:** \[ \] Yes \[ \] No

**Fixed:** \[ \] Yes \[ \] No

**Retested after fix:** \[ \] Yes \[ \] No

------------------------------------------------------------------------

## Bug 2

**Title:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Where:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Steps to reproduce:**

1.  
2.  
3.  

**Expected:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Actual:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Severity:** Critical / High / Medium / Low

**Screenshot taken:** \[ \] Yes \[ \] No

**Fixed:** \[ \] Yes \[ \] No

**Retested after fix:** \[ \] Yes \[ \] No

------------------------------------------------------------------------

## Bug 3

**Title:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Where:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Steps to reproduce:**

1.  
2.  
3.  

**Expected:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Actual:**\
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Severity:** Critical / High / Medium / Low

**Screenshot taken:** \[ \] Yes \[ \] No

**Fixed:** \[ \] Yes \[ \] No

**Retested after fix:** \[ \] Yes \[ \] No

------------------------------------------------------------------------

# Severity Guide

-   **Critical** --- App cannot be used, crash, alcoholic recommendation
    for a non-alcoholic user, or a major hard constraint is violated.
-   **High** --- Major feature does not work, navigation is broken, Try
    Another fails, or there is a serious mobile usability problem.
-   **Medium** --- Feature works but behaves incorrectly,
    inconsistently, or confusingly.
-   **Low** --- Cosmetic issue, spacing problem, minor wording issue, or
    small visual inconsistency.

------------------------------------------------------------------------

# Final QA Sign-Off

## First Pass

-   [ ] Entire checklist completed
-   [ ] All discovered bugs recorded
-   [ ] Critical bugs identified
-   [ ] High-priority bugs identified
-   [ ] Bug list sent to Claude Code for fixes

**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Post-Fix Pass

-   [ ] Claude Code fixes completed
-   [ ] Critical bugs retested
-   [ ] High bugs retested
-   [ ] Entire core guest flow retested
-   [ ] Non-alcoholic flow retested
-   [ ] Try Another retested
-   [ ] Real iPhone test completed
-   [ ] No known launch-blocking bugs remain

**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Ready for Gemini Review

-   [ ] Phase 1 Build Specification ready
-   [ ] Claude implementation summary ready
-   [ ] App screenshots ready
-   [ ] Deployed URL included, if available
-   [ ] Repository or source ZIP ready
-   [ ] Ready for Gemini independent review
