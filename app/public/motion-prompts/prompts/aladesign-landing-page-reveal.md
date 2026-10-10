# Landing Page Reveal — Preloader-to-Hero Intro
## Goal
Build a full-screen fashion/editorial landing hero with a cinematic **preloader-to-hero reveal** that plays automatically once on page load (~7 seconds). A dark overlay counts `0 → 100` while a small masked label steps through three words; five portrait images rise from below, collapse their gap and scale up; the four side images wipe away upward with a clip-path while the center image scales to fill the screen; finally the dark overlay wipes upward to reveal a giant hero name that slides in word by word. Everything is driven by three parallel GSAP timelines sharing one custom ease called `hop`.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`CustomEase`** and **`SplitText`**. No smooth-scroll library (the page does not scroll during the intro). Register the plugins with `gsap.registerPlugin(CustomEase, SplitText)`. Fire the whole sequence on `DOMContentLoaded`.
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```
<nav>
  <div class="nav-logo"><a href="#">Elara Vandenberg</a></div>
  <div class="nav-items">
    <a>Runway</a><a>Lookbook</a><a>Campaigns</a><a>Biography</a>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
