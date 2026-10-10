# Sticky Stacked Cards Scroll Reveal (GSAP + Lenis)
## Goal
Build a scroll-driven "sticky stacked cards" section: five full-size image cards sit stacked in a centered rounded container inside a pinned section. As the user scrolls, each front card shrinks and rotates away while its image zooms in, and the next card slides up from below to cover it — one card swap per viewport-height of scroll, fully scrubbed to the scrollbar.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scrolling. Register ScrollTrigger with `gsap.registerPlugin(ScrollTrigger)`. Run everything inside a `DOMContentLoaded` listener.
## Layout / HTML
Three full-viewport `<section>` elements, in order:
1. `<section class="intro">` — a single `<h1>` with a long editorial sentence about art and motion, e.g. "Art is not what you see. It's what you *feel* in the blur, the chaos, the motion — every pulse captured in color and form."
2. `<section class="sticky-cards">` — contains one `<div class="cards-container">` holding exactly **5** `<div class="card">` elements. Each card contains:
   - `<div class="tag"><p>LABEL</p></div>` — short uppercase labels, one per card, in this order: "Raw Emotion", "Inner Conflict", "Fury & Flow", "Rebellion", "Liberation".
   - `<img src="...">` — one image per card (see Assets).
3. `<section class="outro">` — another `<h1>` with a closing sentence, e.g. "This isn't just motion. It's meaning in movement. In every blurred edge and amplified hue, we trace the shape of something deeper — truth in abstraction."
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
