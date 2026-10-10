# Tile Flip Board — full-screen 6×6 grid of 3D tiles, hover spin + board-wide flip reveal
## Goal
Build a full-viewport **6×6 grid of 3D flip tiles**. Each tile shows a slice of one shared poster image (the image is split across the whole grid via `background-position`), so at rest the 36 tiles reconstruct a single full-bleed poster. **Hovering a tile fires a GSAP timeline that spins it a complete 360° turn on `rotateX` while tilting on `rotateY`** (the tilt magnitude/direction depends on the tile's column, so tiles lean away from the board's vertical centreline). A **"Flip Tiles" button** flips the entire board 180° on `rotateX` with a **random-order stagger**, swapping every tile from the front poster to a second (back) poster and back again. A **fixed grid overlay** highlights the single 50×50px cell under the cursor on every `mousemove`, leaving a fading white-outline trail.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins, no ScrollTrigger, no smooth-scroll, no Three.js**. Everything runs after `DOMContentLoaded`. Ship one `index.html` (`<link rel="stylesheet" href="./styles.css">`, `<script type="module" src="./script.js">`), one `styles.css`, one ES-module `script.js`. Must run in a fresh Vite + npm project.
## Layout / HTML
```html
<nav>
  <a href="#">Junni</a>
  <button id="flipButton">Flip Tiles</button>
</nav>
<section class="board"></section>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
