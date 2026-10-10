# Landing Page Reveal — Stacked-Image Preloader to Editorial Hero
## Goal
Build a full-screen fashion-archive landing hero with a cinematic **preloader-to-hero reveal** that plays automatically once on page load (~6 seconds total). On a near-black full-screen panel, **six portrait images stacked dead-center** — each pre-tilted at a different random angle — scale up from nothing and un-clip open one after another, while a giant `ARCHIVE` title reveals character by character in random order and a small `000 → 100` counter ticks beside it. Everything then reverses: the counter and title characters slide up out of view, the six images collapse back to nothing in reverse order, and the whole dark panel wipes upward via an animated clip-path to uncover the pale hero underneath — where the huge `ARCHIVE` headline, the nav links and the three footer labels all rise up into place from behind masks. One single GSAP timeline drives the entire sequence.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`SplitText`** and **`CustomEase`**. No smooth-scroll library — the page does not scroll during the intro; it is a pure load-triggered timeline. Register the plugins with `gsap.registerPlugin(CustomEase, SplitText)` and run the timeline immediately as the module executes (module `import` guarantees the DOM elements exist).
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```html
<div class="preloader">
  <div class="preloader-images">
    <div class="preloader-img"><img src="..." alt="" /></div>
    <div class="preloader-img"><img src="..." alt="" /></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
