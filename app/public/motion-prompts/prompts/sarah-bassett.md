# Zoomable Image Wall — random-stagger mosaic reveal + click-zoom explosion + drag-to-pan
## Goal
Build a full-viewport, pitch-black **mosaic wall of 1200 tiny image tiles** that fills a canvas larger than the screen. On load, every tile **pops in from `scale:0` to `scale:1` with a random grid stagger** (the mosaic materialises tile-by-tile in no particular order). A floating pill of two buttons (zoom-out / zoom-in) toggles a **2.5s zoom**: clicking zoom-in makes every tile **explode radially outward from the viewport centre and blow up to 5×** (you dive into the wall); clicking zoom-out reverses it. While zoomed, a transparent drag layer lets you **click-drag to pan** the enlarged wall, smoothed by a manual `requestAnimationFrame` lerp loop writing `translate3d`. No scroll, no ScrollTrigger, no GSAP plugins — just core `gsap`, a click state machine, and a rAF pan loop.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm) only** — no plugins (no ScrollTrigger, no SplitText), no Lenis. Import as:
```js
import gsap from "gsap";
```
All logic runs inside a `DOMContentLoaded` listener. The load reveal and the two zoom transitions use `gsap.to` / `gsap.timeline`; the drag-pan uses a plain `lerp` + `requestAnimationFrame` loop (not GSAP).
## Layout / HTML
```html
<body>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
