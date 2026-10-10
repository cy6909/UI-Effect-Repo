# JS Page Transitions (scaleY split-curtain cover-and-reveal)
## Goal
Build a small single-page site with an **in-page router** where **navigating between "pages" plays a full-screen curtain made of a 2-row × 5-column grid of purple blocks**. The star effect is a two-phase `scaleY` curtain: the top row of blocks grows down from the top edge while the bottom row grows up from the bottom edge — the two halves **meet at the horizontal midline to cover the viewport**, the hero heading is swapped underneath while covered, then the same blocks scale back to zero (top row retracting up, bottom row retracting down) to **part the curtain and reveal the new page**. Every phase sweeps **column by column, left→right**, with a per-column stagger. The reveal half also plays once on initial load, acting as an intro/preloader. Trigger is a click on the fixed top nav links.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins, no ScrollTrigger, no SplitText, no Lenis**. There is no scroll interaction at all. Import as:
```js
import gsap from "gsap";
```
No `gsap.registerPlugin` call is needed. All logic runs inside a `DOMContentLoaded` listener.
## Layout / HTML
```
.transition                               (fixed full-viewport overlay; the curtain)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
