# Landing Page Reveal — Counter Preloader + Clip-Path Hero Unmask
## Goal
Build a full-screen editorial landing hero with a cinematic **preloader-to-hero reveal** that plays automatically once on page load (~8.5 seconds total). A giant number in the lower-left ticks `0 → 100` while it scales up and a thin horizontal progress bar draws itself across the screen. When the count finishes, the number wipes out digit by digit; then a hidden hero background image is unmasked by an animated **clip-path polygon** — collapsed to a single center point, opening to a small centered rectangle, then expanding to the full viewport — with a custom `hop` ease, while the image itself de-zooms from `2x` to `1x`. Masked **SplitText** finishes the sequence: the huge hero headline slides in character by character from the right, and the nav links and footer labels rise up from behind masks. One single GSAP timeline drives everything.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`CustomEase`** and **`SplitText`**. No smooth-scroll library — the page does not scroll during the intro; it is a pure load-triggered timeline. Register the plugins with `gsap.registerPlugin(CustomEase, SplitText)` and fire the whole sequence on `DOMContentLoaded`.
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```
<div class="preloader-counter">
  <h1>0</h1>
</div>
<nav>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
