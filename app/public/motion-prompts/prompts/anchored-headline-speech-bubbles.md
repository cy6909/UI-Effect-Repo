# Anchored Headline with Speech Bubbles — testimonials that arrive around a pinned statement
## Goal
Build a testimonial section where **a short, loud headline pins itself to the middle of the
screen** and **individual quotes arrive around it, one at a time, out of the left and right
margins**, as you scroll through a deliberately over-tall track. Scroll back up and the field
empties again.
No carousel, no arrows, no dots. Nothing to click. The reader gets the statement, the voices
accumulate around it while they read it, and then it is over.
## Tech
Vanilla HTML/CSS/JS with ES module imports: `gsap` plus the `ScrollTrigger` plugin, and `lenis`
for smooth scroll. No other plugins, no framework.
```js
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
