# Award List Hover — direction-aware row flip + stacked corner image preview
## Goal
Build a full-page awards list where hovering a row slides a 3-panel wrapper vertically (GSAP `y` tween) so the row flips from an award-name panel to an inverted project panel — the slide direction depends on whether the cursor enters/leaves from the top or the bottom of the row. Simultaneously, a fixed preview box in the bottom-right corner stacks up that row's image, scaling it in from 0; images scale back out and are removed when the cursor leaves the list or idles.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) and `lenis` (npm) for smooth scrolling. No GSAP plugins are needed (no ScrollTrigger — scroll handling is a manual listener). Everything runs inside `DOMContentLoaded`.
## Layout / HTML
```
<body>
  <section class="intro"><h1>Intro</h1></section>
  <section class="awards">
    <p>Recognition and awards</p>
    <div class="awards-list"></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
