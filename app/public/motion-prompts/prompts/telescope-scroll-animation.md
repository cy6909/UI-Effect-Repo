# Telescope Scroll Animation
## Goal
Build a pinned, scroll-driven "spotlight" gallery section. As the user scrolls, two intro words ("Beneath" / "Beyond") split apart horizontally while a full-bleed background image scales up from zero behind them; then a diamond-shaped `clip-path` "telescope viewfinder" takes over: a vertical column of 10 project titles scrolls up through the viewfinder while small thumbnail images fly across the right half of the screen along a quadratic bezier arc. The title closest to the vertical center of the viewport is highlighted (full opacity) and **swaps the full-bleed background image** to its matching photo. Everything is driven by a **single ScrollTrigger** (pin + scrub over 10× viewport height, Lenis-smoothed) whose `onUpdate` maps `self.progress` across phased ranges using `gsap.set` — there is no timeline.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, plus **`lenis`** for smooth scrolling:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
Wire Lenis to GSAP exactly like this:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
