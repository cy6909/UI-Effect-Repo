# Landing Page Reveal — Portrait-Strip Preloader Wipe-Up
## Goal
Build a full-screen editorial landing hero with a cinematic **preloader-to-hero reveal** that plays automatically once on page load (~6.5 seconds total). A black full-screen loader holds a horizontal strip of **seven tall portrait images** (six photos plus a centered white monogram logo). On load the seven images **rise up from below** and stagger in, then the whole strip **slides sideways**; the six photos (but not the center logo) **wipe away upward** one after another via an animated `clip-path`; the entire black loader panel then **wipes upward** the same way, uncovering the page beneath; finally the nav links, the three-line hero headline, and the four footer thumbnails all **slide up and fade in**. Everything is driven by one single GSAP timeline using `power3.inOut` easing.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no** GSAP plugins and **no** smooth-scroll library (the page never scrolls; `body` is `overflow:hidden`). Import the default export (`import gsap from "gsap"`) and fire the whole sequence inside a `DOMContentLoaded` listener.
## Layout / HTML
Semantic structure (class names / the `#loader-logo` id are load-bearing — the JS/CSS query them):
```
<div class="container">
  <!-- fixed black preloader on top of everything -->
  <div class="loader">
    <div class="loader-imgs">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
