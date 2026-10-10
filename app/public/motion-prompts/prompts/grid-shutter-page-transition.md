# Grid Shutter Page Transition (scaleX row-shutter cover-and-reveal)
## Goal
Build a client-side "fake router" for a small three-page site where **navigating between pages plays a full-screen 4×16 grid of cream blocks that scale open horizontally to shutter the viewport closed, swaps the page content underneath while covered, then scales the same blocks back down to reveal the new page**. The star effect is the two-phase `scaleX` shutter: a fixed grid of blocks whose rows animate concurrently but with **alternating sweep direction** — even rows grow anchored to the left edge sweeping left→right, odd rows grow anchored to the right edge sweeping right→left — each row carrying its own per-block stagger. Trigger is a click on the fixed top navbar links.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins, no ScrollTrigger, no SplitText, no Lenis**. There is no scroll interaction at all. Import as:
```js
import gsap from "gsap";
```
No `gsap.registerPlugin` call is needed.
## Layout / HTML
```
.transition-grid                          (fixed full-viewport overlay; JS fills it with blocks — starts EMPTY)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
