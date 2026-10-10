# Clayboan Scroll Gallery — Clip-Path Reveal + Char-by-Char Titles
## Goal
Build a full-page vertical scroll gallery (portfolio style) with Lenis smooth scroll where each tall "work" section is scrubbed by GSAP ScrollTrigger. As a section enters the viewport, its full-bleed image's `clip-path` morphs from an angular slanted polygon into a full rectangle (a diagonal wipe-open reveal); as the section leaves, the clip-path morphs again into a bottom-slanted polygon (a diagonal wipe-close). Meanwhile the big white project title, centered over the image, animates in character by character: SplitText masks every char and each char slides up from below its mask, with each character bound to its OWN scroll window so the reveal cascades left-to-right as you scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`ScrollTrigger`** and **`SplitText`**, and **`lenis`** for smooth scroll. Register with `gsap.registerPlugin(ScrollTrigger, SplitText)`. Run everything inside a `DOMContentLoaded` handler.
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```
<section class="hero">
  <h1>Beyond the limits</h1>
</section>
<!-- repeat this block 5 times, one per project -->
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
