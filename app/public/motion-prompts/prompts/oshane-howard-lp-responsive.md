# Editorial Portfolio Preloader → Stacked Clip-Path Hero Reveal
## Goal
Build a full-screen photographer/creative-director **landing-page intro**. On load, a bottom-right **odometer counter** made of four stacked digit reels rolls from `000%` up to `100%` while a thin black **progress bar** fills, all sitting on a flat **chrome-yellow** page. When the "load" completes, a stack of **7 full-bleed editorial photos wipe in one-by-one** via a staggered `clip-path` reveal (right edge → left), the whole hero **scales up to 1.3**, the top nav **drops down** into place, and a giant surname **headline rises letter-by-letter** out of a clip mask. Everything plays automatically once on page load — no scroll, no hover, no click. Total run ≈ 12.5 s.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) only — no GSAP plugins, no smooth-scroll library. Import `import gsap from "gsap";`. The whole thing is a set of independent load-triggered `gsap.to` / `gsap.set` tweens (not one master timeline); each is scheduled by an explicit `delay`. Wrap the logic in a `DOMContentLoaded` listener. The per-character text split of the headline is done with a small **hand-rolled function** (wrap each character in a `<span>`) — NOT the SplitText plugin.
## Layout / HTML
Two stacked layers over a `.hero` section. Class/tag names are load-bearing — the JS queries them.
```html
<section class="hero">
  <div class="pre-loader">
    <p>Loading</p>
    <div class="counter">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
