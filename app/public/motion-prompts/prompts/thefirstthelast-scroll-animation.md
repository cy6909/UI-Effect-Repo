# Pinned Stacking Cards — Scroll-Driven Deck That Deals Up & Flies Off
## Goal
Build a single pinned section where **six rotated product cards** deal up one at a time from the bottom of the viewport as you scroll. Each card slides up to dead center; once the next card starts coming in, the previous cards drift off toward the **top-left corner** — earlier cards flying farther than later ones, so a fanned trail of tilted cards accumulates up-left while a fresh card keeps landing in the middle. The whole thing is driven by ONE pinned, scrubbed `ScrollTrigger` (spanning 8 viewport-heights of scroll, Lenis-smoothed) whose `onUpdate` maps scroll progress to every card's entry `y` and staggered exit `x/y`. A dark hero above and a dark outro below bookend the light-grey pinned stage.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**, and **`lenis`** for smooth scroll. Register with `gsap.registerPlugin(ScrollTrigger)`. Run everything inside a `DOMContentLoaded` handler.
Lenis wiring (standard GSAP integration):
```js
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
