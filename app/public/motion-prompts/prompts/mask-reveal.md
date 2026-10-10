# Mask Reveal On Scroll (3×3 clip-path mosaic image reveal)
## Goal
Build a long editorial gallery page where **every image reveals itself as a 3×3 grid of clip-path tiles that unfold cell-by-cell in a diagonal wave when its row scrolls into view**. Each `.img` is layered with nine identical full-cover copies of its picture, each copy clipped to one cell of a 3×3 grid; a ScrollTrigger timeline animates the nine `clip-path` polygons from collapsed zero-area points (each pinned at its cell's top-left corner) out to full cells, cascading top-left → bottom-right along five anti-diagonal waves. The star effect is that per-image mosaic "tile-in" reveal. Trigger is scroll (each image row entering the viewport, one-shot). Lenis provides smooth scrolling synced to ScrollTrigger.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, plus **`lenis`** for smooth scroll:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
No SplitText, no CustomEase, no Three.js, no canvas. Wire Lenis to GSAP's ticker the standard way:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
