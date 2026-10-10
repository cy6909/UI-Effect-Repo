# Landing Page Reveal — Slot-Machine Counter Preloader + Sparkle Wipe + 3D Headline Swing
## Goal
Build a full-screen, black editorial landing intro with a cinematic **preloader-to-hero reveal** that plays automatically once on page load (~10 seconds total). A giant two-digit number counts up like a slot machine (`00 → 24 → 47 → 79 → 85 → 99`) in the lower-left while the whole two-digit block slides across the bottom of the screen from left to right. Then three stacked four-point **sparkle/star SVGs** scale up from nothing to fill the screen in sequence — white, then lime, then black — wiping the loader away. Finally the loader is removed and the hero appears: the huge brand word **swings in with a 3D `rotateY` "page-turn"** while fading in, a white circular toggle button pops into place, and two small masked info lines slide up from behind their clips. Everything is plain GSAP (no plugins), driven by one timeline for the counter plus a few standalone tweens.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) **only** — no GSAP plugins (no ScrollTrigger, no SplitText, no CustomEase), no smooth-scroll library. The page never scrolls during the intro; it is a pure load-triggered sequence. Fire everything inside a `DOMContentLoaded` listener. `import gsap from "gsap";`.
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them). There is a fixed full-screen `.loader` overlay that sits on top of the `.container` hero and is `.remove()`d from the DOM at the very end.
```html
<div class="loader">
  <!-- TENS column: 6 stacked digits inside a clipped 180px window -->
  <div class="count-wrapper">
    <div class="count">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
