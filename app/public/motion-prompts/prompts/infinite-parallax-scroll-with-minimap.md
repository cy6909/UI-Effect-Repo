# Build: Infinite Parallax Scroll with Synchronized Minimap
## Goal
A full-screen, **infinitely looping vertical scroll** through editorial project images, with a **centered floating minimap** that mirrors the exact same scroll at miniature scale. The star effect: a hand-rolled `requestAnimationFrame` engine that lerps a virtual scroll position driven by wheel + touch, recycles a small window of DOM slides for endless looping, applies **per-image parallax**, and **magnetically snaps to the nearest project** after the user stops scrolling. The big slides and the tiny minimap move in perfect proportional lockstep.
## Tech
Vanilla HTML/CSS/JS with ES module imports (Vite/npm project). **No GSAP, no ScrollTrigger, no Lenis, no animation library at all** — the entire motion system is a single custom `requestAnimationFrame` loop with a manual `lerp()` helper and custom `wheel`/`touch` listeners. Everything is driven by imperative `element.style.transform` writes. Desktop uses wheel; mobile uses touch drag.
## Layout / HTML
Minimal shell — JS generates all repeating content dynamically:
```html
<div class="container">
  <ul class="project-list"></ul>          <!-- full-screen slides injected here -->
  <div class="minimap">
    <div class="minimap-wrapper">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
