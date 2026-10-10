# SVG Scribble Draw-On Image Hover — Self-Drawing Strokes Over a Card Grid
## Goal
Build a page with a **3-row × 2-column grid of square image cards**. Each card is overlaid by **two oversized, scribbled SVG paths** (a colored one + a light-grey one) that are invisible at rest. On **mouseenter**, both scribbles **draw themselves on** (classic `strokeDasharray`/`strokeDashoffset` line-drawing trick, offset animated from full path length → 0) while simultaneously **swelling their stroke-width from 200 → 700**, and the card's title **rises in word-by-word** from behind a mask. On **mouseleave** everything reverses: the scribbles un-draw and thin back to 200, and the title drops back down word-by-word (reversed order). Smooth scroll via Lenis. The star effect is the pair of thick scribbles drawing on over the photo plus the masked word-rise on the title.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite + npm project. Install and import from npm:
- **`gsap`** (3.x) plus the plugin **`SplitText`** (used for the title word-mask reveal).
- **`lenis`** — smooth scroll, stepped by its own `requestAnimationFrame` loop.
```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
gsap.registerPlugin(SplitText);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
