# Kinetic Type Scroll — pinned horizontal title reel + 3D fly-through cards
## Goal
Build a full-page scroll experience: a pinned section where four giant italic uppercase project titles scroll horizontally as a 400vw reel while ten rounded image cards fly toward the camera from extremely deep `translateZ`. Each title is three stacked color copies, and the two top copies jitter horizontally based on live scroll velocity — a kinetic-typography "ink offset" effect.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) with the `ScrollTrigger` plugin, plus `lenis` for smooth scrolling. No other libraries.
Wire Lenis to GSAP exactly like this: create `new Lenis()`, call `ScrollTrigger.update` on its `scroll` event, drive it from GSAP's ticker with `lenis.raf(time * 1000)`, and call `gsap.ticker.lagSmoothing(0)`. Run everything inside a `DOMContentLoaded` handler.
## Layout / HTML
- `<nav>` — fixed, top-left, full width, `z-index: 2`, padding `2em`, flex with `gap: 4em`. Three children:
  - `.logo` (`flex: 3`) containing `.logo-img` (width `120px`) with an `<img>` logo.
  - `.tagline` (`flex: 1`): a `<p>` reading "Your go-to creative powerhouse for" then a line break and a `<span>` "design, branding, and motion." (span in gray).
  - `.about` (`flex: 1`): two `<p>`: "Headquartered in Toronto" and a `<span>` "Collaborating worldwide" (gray).
- `<section class="hero">` — 100vw × 100vh, centered `<h1>(Scroll if you dare)</h1>`.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
