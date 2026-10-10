# Landing Page Reveal with Circular Gallery — Counter Preloader → Flip Ring
## Goal
Build a full-viewport editorial landing intro that plays **once on page load** (≈7 seconds, no scroll). A tiny numeric preloader near the bottom-center counts up `0 → 100`; meanwhile **30 small photo cards** rise from below the fold into a tightly-overlapped, horizontally-centered stack. When the counter finishes it slides away, and the whole stack **morphs — via GSAP Flip — into a rotating circular gallery** (a ring of 30 cards, each rotated tangent to the circle), while the fixed nav labels slide up into view. The star effect is the Flip-driven linear-stack → circle transform where every card simultaneously travels to its slot on the ring **and** spins to its tangent angle, all on a custom `hop` ease.
## Tech
Vanilla HTML/CSS/JS with ES-module imports. Use **`gsap`** (npm) plus the GSAP plugins **`Flip`** and **`CustomEase`** — nothing else (no ScrollTrigger, no Lenis, no SplitText, no Three.js/WebGL/canvas). Register with `gsap.registerPlugin(Flip, CustomEase)`. Fire the whole sequence inside a `DOMContentLoaded` listener. Ship one `index.html` (`<link rel="stylesheet" href="./styles.css">` and `<script type="module" src="./script.js">`), one `styles.css`, one ES-module `script.js`. Must run in a fresh Vite + npm project.
## Layout / HTML
Class names are load-bearing (the JS/CSS query them). The `.gallery` ships **empty** — JS injects all 30 cards.
```html
<div class="container">
  <nav>
    <div class="col">                                  <!-- col 1 (flex 4) -->
      <div class="nav-items"><div class="nav-item"><p>Meridian</p></div></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
