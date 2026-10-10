# Counter Curtain Hero Reveal — Load Counter, Rotating Word, Clip-Path Curtain & Flip-Expanding Frame
## Goal
Build a landing-page intro. A dark preloader shows the brand name top-left and a **rotating word** top-right (Studios → Season → Chamber → Archive → Vision), a **three-digit counter** bottom-left that runs 000 → 100, a caption bottom-right and a thin **iridescent progress line**. During the same 3 seconds a small **glass photo frame** in the hero (hidden under the preloader) **cycles through ten photos** and **travels from the section's left edge to its slot** inside the second headline row. Then: the preloader text **blurs and fades**, the panel **wipes upward** with a custom "hop" ease, the three headline rows **slide their words in from their masks** (row 1 and 3 from the left, row 2 from the right), the caption and nav fade/slide in, and the frame **expands with GSAP Flip until it fills the whole section** behind the type, which is `mix-blend-mode: difference` so it stays readable on any photo.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm) with **`CustomEase`**, **`SplitText`** and **`Flip`**. Font: **Hanken Grotesk** (500).
## Layout / HTML
```html
<div class="cc">
  <div class="cc-preloader" aria-hidden="true">
    <div class="cc-preloader__header">
      <div class="cc-preloader__row"><h1>Underlume</h1></div>
      <div class="cc-preloader__row"><h1 class="cc-preloader__word">Studios</h1></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
