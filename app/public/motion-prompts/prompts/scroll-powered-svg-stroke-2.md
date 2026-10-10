# Draw SVG Stroke On Scroll — Scroll-Scrubbed Self-Drawing Line
## Goal
Build an editorial scroll page whose star effect is a **tall, winding, thick orange stroke that draws itself on from top to bottom as you scroll**. A single inline `<svg>` path — a chunky, rounded, S-shaped ribbon — sits **behind** a centered column of content (image rows and text cards) at `z-index: -1`. Using the classic `strokeDasharray`/`strokeDashoffset` line-drawing trick, one **scrubbed** GSAP `ScrollTrigger` ties the stroke's `strokeDashoffset` directly to scroll progress through the middle section, so the orange line appears to snake into existence behind the content and un-draws when you scroll back up. Smooth scroll via Lenis. That's the whole trick — no timeline, no stagger, one property.
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
