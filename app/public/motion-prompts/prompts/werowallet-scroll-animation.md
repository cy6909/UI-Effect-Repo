# Spotlight Stroke Draw — Pinned Scroll Section Where Thick Diagonal SVG Strokes Paint Over the Screen and Un-paint
## Goal
Build a three-section scroll page whose star effect is a **pinned "spotlight" section** where **13 thick, parallel, diagonal SVG strokes draw themselves on** — one after another in a scattered, staggered order — until they **completely blanket the viewport**, then, at the moment of full cover, the centered headline **swaps underneath** ("WAIT FOR IT" → "THERE IT IS") and **three cartoon sparkles pop**, after which the same strokes **un-draw in reverse**, wiping themselves off the far end to reveal the new message. The whole sequence is one GSAP timeline **scrubbed** to a pinned `ScrollTrigger` (4 viewport-heights of scroll), with Lenis smooth scrolling. The strokes use the classic `strokeDasharray`/`strokeDashoffset` line-drawing trick, and each stroke is **doubled** into a dark outline + yellow fill for a comic-ink look.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugin **`ScrollTrigger`**.
- **`lenis`** — smooth scroll, wired into GSAP's ticker and `ScrollTrigger.update`.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
