# Scroll Image Reveal Sequence — Clip-Path Wipe Cross-Dissolve + Zoom-to-3×
## Goal
Build a long, quiet vertical-scroll story on a black page. Seven giant centered word-headers ("VACCUM", "EMBER", "SCRATCH", "AZURE", "SYNTHESIS", "EUPHORIA", "THE END") are spaced far apart and scroll up the screen. Fixed dead-center sits a single 500×700 portrait "window". As each header approaches, its matching editorial photo **wipes up into view** through a `clip-path` reveal, and while it holds the frame its inner image **continuously zooms from scale 1 to scale 3**; then, as the next header arrives, the old photo **wipes up and out the top** while the next photo wipes up from the bottom — a seamless upward cross-dissolve of six images driven entirely by GSAP ScrollTrigger scrub. A small fixed line of intro copy sits behind the window and is only visible in the gaps.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`ScrollTrigger`**. Register with `gsap.registerPlugin(ScrollTrigger)`. **No Lenis, no SplitText, no CustomEase, no Three.js, no canvas** — native browser scroll only. No build framework; Claude will scaffold Vite + npm.
## Layout / HTML
Class names and IDs are load-bearing — the JS/CSS query them. One outer `.container` holds three stacked layers:
```
<div class="container">
  <!-- Layer A: fixed intro copy, sits BEHIND the image window -->
  <div class="intro-copy">
    <p>This message stays right here,</p>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
