# Split Column Infinite Slider — Virtual Wheel Scroll, Opposite Clip-Path Reveals & Split Titles
## Goal
Build a fullscreen two-column project slider driven by a **virtual scroll** (wheel or touch drag, lerped). Each project is a **pair of photos**: the **left** one is revealed by a `clip-path` **rising from the bottom**, the **right** one by a `clip-path` **descending from the top**, while their images **drift vertically in opposite directions** (with a fixed zoom to hide the drift) and a single **100vw-wide text block is split across both columns** — half the title in each — that holds still while its slide is centred and drifts a little on the way in and out. Slides are created and removed around the current index with **modulo wrapping**, so the loop is infinite in both directions. A thin **light bar** on the right shows progress through the set. No GSAP: per-frame arithmetic.
## Tech
Vanilla HTML/CSS/JS, one module. No libraries. Font: **Inter** (500–800).
## Layout / HTML
```html
<div class="sc">
  <section class="sc-slider" aria-label="Projects">
    <div class="sc-column sc-column--left"></div>
    <div class="sc-column sc-column--right"></div>
    <div class="sc-progress" aria-hidden="true"><span class="sc-progress__bar"></span></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
