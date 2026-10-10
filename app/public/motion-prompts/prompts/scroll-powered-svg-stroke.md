# Scroll-Powered SVG Stroke Draw — Serpentine Line Drawn On Scroll
## Goal
Build an editorial scroll page whose star effect is a **thick orange serpentine SVG stroke that draws itself behind the content as you scroll**. The stroke lives in a background layer (`z-index:-1`) spanning a tall middle section; using the classic `strokeDasharray` / `strokeDashoffset` technique, the whole squiggly path starts fully hidden and is progressively "inked in" from start to finish, scrubbed 1:1 to scroll position across that section. Smooth scrolling via Lenis. Above and below the drawing section sit a full-viewport intro and outro heading.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugin **`ScrollTrigger`**.
- **`lenis`** — smooth scroll (it owns the scroll driving the scrub).
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
