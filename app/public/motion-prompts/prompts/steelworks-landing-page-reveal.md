# Landing Page Reveal — Progress-Bar Preloader to Gliding-Image-Row Hero
## Goal
Build a full-screen editorial landing hero with a cinematic **preloader-to-hero reveal** that plays automatically once on page load (~7.5 seconds total). First a thin white **progress bar** draws itself left-to-right across the top of a solid dark overlay, then retracts to the right; the dark overlay then **wipes upward** via an animated clip-path. Underneath, **five small tilted image thumbnails** — pre-parked far off-screen to the left — **glide in with a custom ease to form a centered horizontal row**. The row then **splits apart**: the two left thumbnails fly off-screen left, the two right thumbnails fly off-screen right, while the **center thumbnail simultaneously scales up, un-rotates and un-rounds into a full-bleed hero background**. Finally, masked **SplitText** lines finish the sequence: the nav, the big headline paragraph and the footer contact links all **rise up line by line** from behind masks. One single GSAP timeline drives the entire sequence.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`SplitText`** and **`CustomEase`**. No smooth-scroll library — the page does not scroll during the intro; it is a pure load-triggered timeline. Register the plugins with `gsap.registerPlugin(CustomEase, SplitText)`. Run everything inside `document.addEventListener("DOMContentLoaded", …)` **wrapped in `document.fonts.ready.then(…)`** so the geometry math and SplitText run only after the web font has loaded.
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```html
<div class="preloader-overlay">
  <div class="preloader"></div>
</div>
<nav>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
