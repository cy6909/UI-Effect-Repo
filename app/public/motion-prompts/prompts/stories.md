# Stories Slideshow — Fullscreen Instagram-Stories Carousel with Clip-Path Image Swaps & Custom Cursor
## Goal
Build a **fullscreen, single-view "Stories" slideshow** (Instagram-Stories style). One story is on screen at a time over a dimmed full-bleed background image. Each story **auto-advances every 4s**, and a segmented progress bar at the top fills linearly over that 4s. You can also **step manually by clicking**: clicking the left half of the screen goes **Prev**, the right half goes **Next**. The star effect is the **transition between stories**: the incoming background image **wipes in via an animated `clip-path`** (from the right on Next, from the left on Prev) while the outgoing image **scales up to 2× and rotates** as the incoming image **scales down from 2× and counter-rotates** into place — a zoom/rotate crossfade. Simultaneously the **profile name and the three title lines slide-swap inside clip-path masks** (old text scrolls out, new text scrolls in), and the completed progress segment **swipes away**. A **blurred glassy custom cursor** follows the pointer with lag and reads `PREV` / `NEXT` depending on which half of the screen you're on.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) only — **no plugins, no ScrollTrigger, no Lenis, no SplitText**. All motion is imperative `gsap.to` / `gsap.fromTo` / `gsap.set` driven by timers and pointer events. Runs in one `script.js` with a separate `data.js` exporting the story array. No build framework beyond a Vite-style dev server that resolves the `gsap` npm import.
## Layout / HTML
A single `.container` holding: the custom cursor, the background-image layer, and the centered story content (progress indices + profile row, then the title + link). Class names are load-bearing — the JS queries them. The initial DOM is pre-populated with **story 1**.
```html
<div class="container">
  <div class="cursor"><p></p></div>
  <div class="story-img">
    <div class="img"><img src="/story-1.jpg" alt="" /></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
