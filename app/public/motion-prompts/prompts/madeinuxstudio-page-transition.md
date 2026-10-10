# Silhouette Page Transition — Block Wipe + SVG Logo Draw
## Goal
Build a minimal editorial multi-page demo ("Silhouette") with a cinematic **full-page route transition**: clicking a nav link makes 20 vertical dark blocks wipe across the screen left→right (staggered `scaleX`), then a full-screen dark overlay appears where a line-art logo **draws itself** via `strokeDashoffset` and fills in; the overlay fades, the new page is swapped in underneath, and the blocks wipe away right→left to reveal it. Page headings animate in with a **SplitText masked character reveal**, and the archive route scrolls with **Lenis** smooth scroll. There is no real navigation — a tiny fake client-side router swaps innerHTML.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`SplitText`** and **`ScrollTrigger`**, and **`lenis`** (npm) for smooth scroll on one route. Register with `gsap.registerPlugin(SplitText, ScrollTrigger)`. Initialize on `DOMContentLoaded` (or immediately if the document is already ready).
## Layout / HTML
Class names and ids are load-bearing — the JS/CSS query them:
```
<nav>
  <div class="nav-logo"><a href="/">Silhouette</a></div>
  <div class="nav-links">
    <a href="/">Index</a>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
