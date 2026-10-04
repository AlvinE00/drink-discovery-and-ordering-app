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

-   [ ] Expected drinks appear
-   [ ] Alcoholic drinks are represented correctly
-   [ ] Non-alcoholic drinks are represented correctly
-   [ ] Drink names are correct
-   [ ] Drink descriptions make sense
-   [ ] No duplicate drinks
-   [ ] No required drinks are missing

### Required Drinks

-   [ ] Whiskey on the Rocks
-   [ ] Paper Plane
-   [ ] Blood Orange Margarita
-   [ ] Hennessy + Blueberry Lemonade
-   [ ] Regular non-alcoholic lemonade

### Open Multiple Drinks

Open at least five different drinks and verify each.

-   [ ] Correct drink opens
-   [ ] Name matches the drink selected
-   [ ] Description matches the drink
-   [ ] Alcohol/non-alcohol status is correct
-   [ ] Strength/flavor information is correct, if shown
-   [ ] Ingredients are correct, if shown
-   [ ] Page does not overflow
-   [ ] Back navigation returns to the drink list

Make sure the sample includes:

-   [ ] Whiskey-based drink
-   [ ] Tequila/mezcal drink
-   [ ] Rum drink
-   [ ] Vodka drink
-   [ ] Non-alcoholic drink

**Notes / bugs:**
When I open Help Me Choose and I Know What I Want - it leads to blank pages
------------------------------------------------------------------------

## D. Search

If Phase 1 includes search:

-   [ ] Search `Paper Plane` --- Paper Plane appears
-   [ ] Search `paper plane` --- capitalization does not break search
-   [ ] Search `paper` --- partial search works if required by the
    specification
-   [ ] Search `lemonade` --- relevant lemonade drinks appear
-   [ ] Search `Batman` --- app does not crash
-   [ ] `Batman` produces a clear no-results state
-   [ ] It is easy to recover from no results
-   [ ] Clear/delete search --- full drink list returns
-   [ ] Search with leading spaces (`Paper Plane`) --- nothing strange
    happens
-   [ ] Search random characters (`@#$%`) --- nothing breaks

**Notes / bugs:**

------------------------------------------------------------------------

## E. Help Me Choose --- Normal Test

Answer the questions naturally as yourself.

-   [ ] First question appears
-   [ ] Options are understandable
-   [ ] Selected option visibly changes state
-   [ ] Continue/Next works
-   [ ] Every question loads correctly
-   [ ] Progress indicator works, if implemented
-   [ ] Back works
-   [ ] Previous answer remains selected after going back
-   [ ] Earlier answer can be changed
-   [ ] Changed answer is retained
-   [ ] Questionnaire reaches the recommendation

### Final Recommendation

-   [ ] Exactly one primary recommendation appears
-   [ ] Recommended drink exists in the Phase 1 menu
-   [ ] Recommendation makes sense based on the answers
-   [ ] Drink information is correct
-   [ ] Internal scoring/debug data is not exposed
-   [ ] Recommendation explanation makes sense, if provided

**Recommendation received:**
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Notes / bugs:**

------------------------------------------------------------------------

## F. Recommendation Stress Tests

### Test 1 --- Strong / Spirit-Forward

Choose preferences pointing toward strong, spirit-forward,
whiskey/bourbon drinks.

-   [ ] Appropriate strong drink recommended
-   [ ] Result is not obviously light/fruity unless other answers
    justify it
-   [ ] Result is actually available on the menu

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 2 --- Sweet / Fruity

Choose sweet, fruity, approachable preferences.

-   [ ] Appropriate fruity/approachable drink recommended
-   [ ] Result does not obviously contradict the preferences

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 3 --- Refreshing

Choose refreshing, citrus, lighter/easy-drinking preferences.

-   [ ] Appropriate refreshing drink recommended
-   [ ] Result does not obviously contradict the preferences

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 4 --- Ginger Beer

Choose ginger/spicy/refreshing preferences when possible.

-   [ ] Ginger-beer-based drink can win when it fits the other
    preferences
-   [ ] Recommended ginger-beer drink actually contains ginger beer

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 5 --- Rum

Choose rum plus compatible flavor preferences.

-   [ ] Rum drink recommended
-   [ ] Drink matches the requested flavor direction

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 6 --- Vodka

Choose vodka plus compatible preferences.

-   [ ] Vodka-based recommendation appears
-   [ ] Another base spirit is not substituted when vodka is a hard
    requirement

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### Test 7 --- Tequila / Mezcal

Choose tequila/mezcal plus compatible preferences.

-   [ ] Appropriate tequila/mezcal recommendation appears

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Notes / bugs:**

------------------------------------------------------------------------

## G. Critical Non-Alcoholic Tests

Choose **Non-Alcoholic**, then complete the questionnaire normally.

-   [ ] Recommendation contains ZERO alcohol
-   [ ] No alcoholic ingredient/addition slips into the result
-   [ ] Description correctly identifies it as non-alcoholic
-   [ ] Non-alcoholic path feels like a complete experience

### Try Another --- Non-Alcoholic

Request another recommendation about five times.

-   [ ] Alternative #1 is non-alcoholic
-   [ ] Alternative #2 is non-alcoholic
-   [ ] Alternative #3 is non-alcoholic
-   [ ] Alternative #4 is non-alcoholic
-   [ ] Alternative #5 is non-alcoholic
-   [ ] Every result actually exists on the menu
-   [ ] Results continue to respect the user's preferences

**Any alcoholic recommendation in this test is a critical bug.**

**Recommendations received:**

1.  

    ------------------------------------------------------------------------

2.  

    ------------------------------------------------------------------------

3.  

    ------------------------------------------------------------------------

4.  

    ------------------------------------------------------------------------

5.  

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

-   [ ] App does not crash
-   [ ] Another reasonable drink appears
-   [ ] Original preferences remain respected
-   [ ] Same drink is not immediately repeated when alternatives exist

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

-   [ ] Go Back
-   [ ] Go Forward
-   [ ] Change an answer
-   [ ] Go Back twice
-   [ ] Continue again
-   [ ] Use browser/Safari Back
-   [ ] Use browser/Safari Forward
-   [ ] No blank screens appear
-   [ ] No impossible states appear
-   [ ] Questions do not duplicate
-   [ ] Answers do not unexpectedly change
-   [ ] Final recommendation reflects the final answers

Halfway through another questionnaire:

-   [ ] Refresh the browser
-   [ ] Resulting behavior is sensible
-   [ ] No broken page appears

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

-   [ ] Old preferences do not contaminate the new session
-   [ ] Second result is non-alcoholic
-   [ ] Recommendation reflects the new answers

**Recommendation:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Notes / bugs:**

------------------------------------------------------------------------

## L. Refresh Important Screens

Individually refresh:

-   [ ] Home
-   [ ] Drink browser
-   [ ] Search
-   [ ] Drink details
-   [ ] Help Me Choose
-   [ ] Recommendation

Verify none produce:

-   [ ] 404
-   [ ] 500
-   [ ] Application Error
-   [ ] Unhandled Runtime Error
-   [ ] Blank screen

**Notes / bugs:**

------------------------------------------------------------------------

## M. Mobile Testing

Preferably test on an actual iPhone.

### Portrait

-   [ ] Home fits correctly
-   [ ] Browse fits correctly
-   [ ] Search fits correctly
-   [ ] Questionnaire fits correctly
-   [ ] Recommendation fits correctly

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

-   [ ] Buttons are easy to tap
-   [ ] Options are not packed too tightly
-   [ ] Neighboring options are not accidentally selected
-   [ ] Back is accessible
-   [ ] Next/Continue is accessible
-   [ ] Try Another is accessible
-   [ ] No important action requires precision tapping

**Notes / bugs:**

------------------------------------------------------------------------

## O. Speed / Simplicity Test

### Help Me Choose

Go from:

**Home → Help Me Choose → Questions → Recommendation**

-   [ ] Experience feels quick
-   [ ] Questions do not feel repetitive
-   [ ] No unnecessary typing
-   [ ] No confusing cocktail terminology
-   [ ] No unnecessary screens
-   [ ] Final recommendation is obvious

### I Know What I Want

Go from:

**Home → I Know What I Want → Find a Drink**

-   [ ] Experience feels fast
-   [ ] Navigation is obvious
-   [ ] No unnecessary steps

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

-   [ ] They can find a known drink
-   [ ] They can start Help Me Choose
-   [ ] They understand the questions
-   [ ] They reach a recommendation
-   [ ] They understand the recommendation
-   [ ] They can request another recommendation

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
-   [ ] Drink information is correct

### Guest 2 --- Sweet Drink

Scenario: **"I don't know cocktails. I want something sweet."**

-   [ ] Can use Help Me Choose without assistance
-   [ ] Gets a sensible sweet recommendation

### Guest 3 --- Strong Drink

Scenario: **"I want something strong."**

-   [ ] Gets an appropriately strong recommendation

### Guest 4 --- No Alcohol

Scenario: **"I don't drink alcohol."**

-   [ ] Gets only a non-alcoholic recommendation
-   [ ] Try Another continues to return only non-alcoholic drinks

### Guest 5 --- Rum + Refreshing

Scenario: **"I like rum and refreshing drinks."**

-   [ ] Gets a sensible rum recommendation

### Guest 6 --- Doesn't Like First Result

Scenario: **"I don't like that recommendation."**

-   [ ] Try Another works
-   [ ] New result still respects preferences

### Guest 7 --- Knows Nothing About Drinks

Scenario: **"I have absolutely no idea what I want."**

-   [ ] Can complete Help Me Choose without cocktail knowledge
-   [ ] Gets one clear recommendation

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
