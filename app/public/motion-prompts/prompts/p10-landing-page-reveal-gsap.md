# Landing Page Reveal — Typographic Preloader with Split-Screen Unveil
## Goal
Build a full-screen landing intro that plays automatically once on page load (~7.5s). On a dark preloader, the studio name "Nullspace Studio" drops in character by character through masks while three small grey corner tags flip in; every character except the leading "N" then exits downward, a large "10" drops in beside it, the "N" and the "10" slide toward each other and morph into a logo lockup (the "N" shrinks and goes extra-bold, the "10" blows up to 14rem). Then the dark screen **splits in half along a horizontal seam**: the top half slides up, the bottom half slides down, and the page content (full-bleed hero image, nav, footer, and a white center card whose title rises per character) is revealed through an expanding clip-path letterbox. One GSAP timeline, one custom `hop` ease.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`CustomEase`** and **`SplitText`**. No smooth-scroll library. Register with `gsap.registerPlugin(CustomEase, SplitText)` and run everything inside `DOMContentLoaded`.
## Layout / HTML
Class names are load-bearing — the JS/CSS query them:
```
<div class="preloader">
  <div class="intro-title"><h1>Nullspace Studio</h1></div>
  <div class="outro-title"><h1>10</h1></div>
</div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
