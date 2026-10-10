# Circular Image Gallery with Cursor-Proximity Card Flips and Click-to-Preview Zoom
## Goal
Build a full-screen interactive gallery: 25 small photo cards arranged in a perfect circle. As the cursor moves, nearby cards flip over (180° on rotationY), scale up and push radially outward with smooth lerp interpolation, while the whole ring tilts in 3D toward the mouse (parallax). Clicking a card spins and scales the entire ring 5x so the clicked image fills the view like a full-screen preview, and its title animates in word-by-word with SplitText. Clicking anywhere (or pressing Escape) reverses everything back to the ring.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `SplitText` (`import SplitText from "gsap/SplitText"`, then `gsap.registerPlugin(SplitText)`). No ScrollTrigger, no smooth-scroll library — the page never scrolls. Keep the image data in a separate `collection.js` module that default-exports an array of `{ title, img }` objects (20 entries).
## Layout / HTML
- `<nav>`: an `<a>` with the brand text "Silhouette Stock" on the left and a `<p>` "Download Assets" on the right.
- `<div class="container">` wrapping:
  - `<div class="gallery-container">` → `<div class="gallery">` (empty — the 25 `.card` elements are created in JS; each card contains one `<img>`).
  - `<div class="title-container">` (empty — the preview title `<p>` is created/removed in JS).
- `<footer>`: two `<p>` elements, "Experiment 454" and "Made by Motionprompts".
- `<script type="module" src="./script.js">` at the end of `<body>`.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
