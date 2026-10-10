# Landing Page Reveal — Stepped-Square Preloader + Clip-Path Unmask
## Goal
Build a full-screen editorial landing hero fronted by a cinematic **preloader-to-hero reveal** that plays automatically once on page load (~5.5 seconds). A black full-screen preloader panel holds two columns of small mono copy and a two-digit counter; the masked copy lines and the counter slide up into view, the counter ticks randomly from `00 → 100`, and a centered olive-khaki square scales up from nothing to full-viewport in **five discrete stepped increments** (each with its own duration/ease so it grows in visible pulses rather than one smooth zoom). Then the whole black preloader wipes **upward** via an animated `clip-path` polygon while — in perfect sync — the nav bar, the hero background image, and the hero content caption all slide up from `35svh` below into their final positions. One single GSAP timeline drives the whole thing; the counter is a separate randomized JS ticker.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`SplitText`** (the only plugin). No smooth-scroll library — the page does not scroll during the intro; it is a pure load-triggered timeline. Register with `gsap.registerPlugin(SplitText)` and fire everything on `DOMContentLoaded`.
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```
<div class="preloader">
  <div class="preloader-revealer"></div>
  <div class="preloader-copy">
    <div class="preloader-copy-col">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
