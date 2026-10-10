# Stacked Alternating Marquees — rows that run opposite ways and lean into the scroll
## Goal
Build a block of **four full-width marquee rows stacked with no gap**, running continuously in
**alternating directions**, with the palette inverting row to row — and with the whole block
**leaning into the scroll**: scrolling speeds each row up in its own direction, and the push
decays when you stop.
Use it for a list of categories or claims that are read at a glance. If the reader has to
actually read and compare the items, this is the wrong mechanic and a list is the right one.
## Tech
Vanilla HTML/CSS/JS with ES modules: `gsap` + `ScrollTrigger`, and `lenis`.
Wire Lenis to ScrollTrigger — this is not optional:
```js
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
