# Landing Page Reveal — Random-Tick Counter Preloader + Clip-Path Hero Unmask
## Goal
Build a full-viewport editorial studio landing hero with a **preloader-to-hero reveal** that plays automatically once on page load (~7 seconds total). A tiny centered number, masked inside a small clipping window, slides up into view and rapidly ticks `0 → 100` with irregular random jumps. The instant it hits 100 it slides up and out of its window, and that same moment fires the reveal: a scaled-down (`0.7`), clip-path-collapsed hero opens from its bottom edge upward while scaling up to full size; the dark overlay covering it wipes upward off the top; the bottom hero image strip de-zooms from `2x` to `1x`; and the giant `38.5vw` headline's per-character `<span>`s rise up from far below into place with a stagger. Everything is driven by chained standalone GSAP tweens (no master timeline), stitched together with `onComplete` / `onStart` callbacks, using a `CustomEase` named `hop` plus `power3`/`power4` eases.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`CustomEase`** (`import { CustomEase } from "gsap/CustomEase"`). No smooth-scroll library — the page does not scroll (`.container` is `overflow: hidden`, exactly one viewport). Register the plugin with `gsap.registerPlugin(CustomEase)` and run the whole sequence inside a `DOMContentLoaded` listener.
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```
<div class="container">
  <div class="counter">
    <p>0</p>
  </div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
