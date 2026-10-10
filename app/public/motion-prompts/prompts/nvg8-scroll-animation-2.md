# Icon-to-Text Pinned Scroll Story (GSAP + Lenis)
## Goal
Build a full-screen pinned hero section driven by a single scrubbed ScrollTrigger: a bottom row of five app icons rises with a staggered catch-up motion, gathers and shrinks to the viewport center while the background flips from dark to light, then the icons are cloned and fly one-by-one along an L-shaped path (vertical, then horizontal) into inline placeholder slots inside a big headline, whose text segments finally fade in one at a time in a shuffled random order.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` for smooth scrolling. No other libraries. Wrap all JS in a `DOMContentLoaded` listener and call `gsap.registerPlugin(ScrollTrigger)`.
## Layout / HTML
- `<section class="hero">` containing:
  - `<div class="hero-header">` with an `<h1>` "MotionpromptsPRO" and a `<p>` "One subscription, endless web design."
  - `<div class="animated-icons">` with five children `<div class="animated-icon icon-1">` … `icon-5`, each wrapping an `<img>` (the five icon images).
  - `<h1 class="animated-text">` containing an interleaved sequence of inline elements, in this exact order:
    1. `<div class="placeholder-icon"></div>`
    2. `<span class="text-segment">Delve into coding</span>`
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
