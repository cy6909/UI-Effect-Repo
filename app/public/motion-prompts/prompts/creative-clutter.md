# Creative Clutter — Flip Layout Switch
## Goal
Build a full-viewport, light "messy desk" hero: **11 cut-out desk objects** (music player card, CD, error dialog, folder icon, mini computer, ruled paper, passport, portrait poster, app icon, lighter, cursor) float at scattered positions and angles around a **centered display headline block**. Three small icon buttons at the bottom switch between **three named arrangements** — `chaos` (a random-looking scatter), `cleanup` (a tidier, un-rotated spread with the header pushed to the right), and `notebook` (a tight cluster). The star effect: on each button press, **GSAP Flip** captures the current layout and smoothly morphs every object AND the header from its old position/size/rotation to the new one, with a slow `power3.inOut` ease and a center-out stagger, so the whole desk re-organizes itself in one fluid choreographed move.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`Flip`** (imported from `gsap/all` and registered with `gsap.registerPlugin(Flip)`). No smooth-scroll, no other libraries. Ship one `index.html` (`<link rel="stylesheet" href="./styles.css">` and `<script type="module" src="./script.js">`), one `styles.css`, one ES-module `script.js`. Must run in a fresh Vite + npm project.
## Layout / HTML
```html
<section class="desk">
  <div class="header">
    <h1>Creative Clutter</h1>
    <p>The best ideas live somewhere between a coffee stain and a half-open
       folder, scattered things have a way of finding others when you stop
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
