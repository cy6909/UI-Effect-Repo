# Block Grid Page Transitions — A 10×11 Grid of Blocks Curtains Over the Viewport to Swap Pages
## Goal
Build a tiny single-page "fake router" site (three virtual pages: **Index / About / Contact**) with a fixed top navbar and one giant centered heading. The star effect is the **page transition**: clicking a nav link fires a two-phase GSAP sequence over a fullscreen **10-row × 11-column grid of solid blocks**. **Cover phase** — a grid of blocks *grows up from the bottom* (`scaleY: 0 → 1`, `transform-origin: bottom`), each block starting on its own per-row random delay, until the whole viewport is blanketed. The heading text is swapped underneath at the exact moment of full coverage. **Reveal phase** — a *second* grid of blocks (already covering) *shrinks up toward the top* (`scaleY: 1 → 0`, `transform-origin: top`) with the same per-block random stagger, uncovering the new page. The same reveal also plays **once on initial load** as a page-in. Every block tween uses a **GSAP `CustomEase` reproduction of the `cubic-bezier(0.22, 1, 0.36, 1)`** snappy ease over a fixed **1s** duration. It is entirely click-driven — no scroll, no autoplay.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the single GSAP plugin **`CustomEase`**. No ScrollTrigger, no SplitText, no Lenis/smooth-scroll, no Three.js.
```js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
```
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
