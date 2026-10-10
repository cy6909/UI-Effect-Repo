# Products Lightbox Gallery
## Goal
Build an **explorable product wall**: a huge fixed-size canvas (a 12×12 grid of 144 product tiles) that the user **pans around by click-dragging with the mouse**, where the drag follows the cursor with an eased, slightly inertial lag. **Clicking a single tile** (as opposed to dragging) **fades in a full-screen lightbox modal** that shows that product's image, name and info plus a "users also bought" panel. The two star effects are (1) the **GSAP-smoothed drag-to-pan** of the oversized grid and (2) the **opacity cross-fade of the lightbox** on open/close, with a precise **drag-vs-click disambiguation** so panning never accidentally opens a product.
## Tech
Vanilla HTML/CSS/JS with ES module imports, bundled by Vite. Use `gsap` (npm) **only** — **no GSAP plugins**, no ScrollTrigger, no SplitText, no CustomEase, no smooth-scroll library, no `requestAnimationFrame`/lerp loop, no Three.js. Every motion is a plain `gsap.to()` / `gsap.set()` / `gsap.getProperty()` call driven by native mouse events. Import:
```js
import gsap from "gsap";
```
The modal close button uses the **Ionicons** web component (`<ion-icon name="close-outline">`), loaded as two classic `<script>` tags — see **Icons** below for the exact version and where to get it (`type="module"` + `nomodule` fallback pair in `<head>`). If you'd rather not add Ionicons, put a plain "×" glyph inside the close button — the animation only needs a clickable circle.
Wrap all JS in `document.addEventListener("DOMContentLoaded", () => { … })`.
## Layout / HTML
Two independent pieces at the top level of `<body>`: an **empty `#container`** (the grid is generated entirely in JS) and a **`.modal`** authored statically in HTML (populated on click).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
