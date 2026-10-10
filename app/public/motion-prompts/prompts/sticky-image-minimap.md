# Sticky Image Minimap — Scroll-Synced Thumbnail Highlight
## Goal
Build a tall, dark editorial travel gallery: a wide column of big full-size images that you scroll past, paired with a **sticky vertical minimap** of small thumbnails pinned to the left that stays centered on screen the whole time. The star effect: as each full-size image passes through the vertical center of the viewport, its matching thumbnail in the minimap **lights up** — it pops to `scale 1.3`, goes fully opaque, gains a white border and jumps above its neighbors — then softly reverts once the image leaves the center band. The result reads like a live "you are here" indicator tracking your scroll position through the gallery. Driven by one GSAP `ScrollTrigger` per image using its `onToggle` callback (no scrubbing).
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`ScrollTrigger`**. No smooth-scroll library, no canvas/WebGL. Import and register as:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```
Run everything inside a `DOMContentLoaded` handler.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
