# 3D Product Scroll Showcase — pinned scrub section with rotating GLTF model
## Goal
Build a full-page scroll experience for a fictional fitness shaker brand called "GRND". The star of the show is a pinned, scrub-driven section where a Three.js GLTF shaker-bottle model spins on its Y axis in sync with scroll progress while, mapped to the same progress value, two giant headlines slide horizontally across the screen, a dark circular clip-path mask expands to swallow the background, and two feature tooltips reveal with masked, staggered SplitText line animations.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins `ScrollTrigger` and `SplitText`, `lenis` for smooth scrolling, and `three` (npm) with `GLTFLoader` from `three/examples/jsm/loaders/GLTFLoader.js` for the 3D model. Icons are Ionicons v7 web components served from your own origin (`/vendor/ionicons/ionicons.esm.js` as a module script plus the `nomodule` fallback `ionicons.js`); get them with `npm i ionicons@7.1.0` and copy the whole `node_modules/ionicons/dist/ionicons/` folder, since the loader fetches its chunks and one SVG per icon relative to the script's own URL.
All JS runs inside a `DOMContentLoaded` listener. Register `ScrollTrigger` and `SplitText` with `gsap.registerPlugin`.
## Layout / HTML
Three stacked full-viewport sections:
1. `<section class="intro">` — a single `<h1>` with the copy "GRND doesn't shake. It performs."
2. `<section class="product-overview">` — the pinned showcase, containing in this order:
   - `<div class="header-1"><h1>Every Rep Starts With</h1></div>`
   - `<div class="header-2"><h1>GRND Shaker</h1></div>`
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
