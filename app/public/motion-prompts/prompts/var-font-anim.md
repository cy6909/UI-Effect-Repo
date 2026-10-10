# ScrollTrigger Variable-Font Marquee — Weight Blooms as the Strips Drift
## Goal
Build an editorial scroll page whose centerpiece is a stack of four horizontal image marquees. As you scroll, each strip of images drifts sideways (alternating rows drift opposite directions), and — interspersed among the thumbnails — big uppercase words are split into individual letters whose **variable font-weight is scrubbed from 100 (hairline) to 900 (black)** in a staggered wave. Everything is scroll-scrubbed through Lenis smooth scroll, so the text visibly "fattens up" and the strips slide as a direct function of scroll position.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, the `split-type` package (imported as `SplitType`, this is NOT GSAP SplitText), and `lenis` (npm) for smooth scroll. A Vite-style dev server that resolves npm imports is all that's needed.
## Layout / HTML
```
<div class="container">
  <section class="hero">
    <img src="..." alt="" />              <!-- full-bleed opening image -->
  </section>
  <section class="about">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
