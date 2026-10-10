# Magnetic Cards — Cursor-Reactive Physics Fan
## Goal
Build a single full-viewport dark section holding a **fanned stack of four square image cards centered on screen**. The star effect: the cards react **magnetically to cursor velocity**. When the mouse moves quickly near the stack, the cards nearest the pointer are shoved and tilted in the direction of the swipe; slower/farther motion barely nudges them. Neighboring cards get dragged along a little, and when the cursor stops or leaves, every card springs back to its resting fan layout with an elastic, slightly-bouncy settle. There is **no GSAP tween or timeline** — the whole thing is a hand-rolled spring-and-friction physics integrator run every frame by `gsap.ticker`, with `gsap.set` writing the transforms.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm) only** — **no GSAP plugins, no Lenis, no Three.js, no smooth scroll**. GSAP is used purely for `gsap.set()` (write transforms) and `gsap.ticker.add()` (the per-frame loop). Ship one `index.html` (`<link rel="stylesheet" href="./styles.css">` and `<script type="module" src="./script.js">`), one `styles.css`, one ES-module `script.js`. Must run in a fresh Vite + npm project.
## Layout / HTML
```html
<section class="spotlight">
  <div class="cards">
    <div class="card"><img src="<card image 1>" alt="" /></div>
    <div class="card"><img src="<card image 2>" alt="" /></div>
    <div class="card"><img src="<card image 3>" alt="" /></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
