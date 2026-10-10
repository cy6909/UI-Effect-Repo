# Infinite Perspective Slider — "Perpetual Motion"
## Goal
Build a full-viewport, **infinitely draggable horizontal image slider** where slides are anchored to the bottom edge and **grow exponentially wider from left to right**, producing a receding-perspective "wall of images" that never ends in either direction. Dragging, wheeling or swiping feeds a scroll target that is **lerp-smoothed every animation frame**; the images recycle modulo 10 so the stream loops forever. The star effect is the exponential width ramp + seamless infinite wrap driven entirely by a hand-written `requestAnimationFrame` loop.
## Tech
Vanilla HTML/CSS/JS with an ES module entry (`<script type="module">`). **No animation library is used — no GSAP, no Lenis.** All motion is a custom `requestAnimationFrame` render loop with manual linear interpolation (lerp). Everything must run in a fresh Vite project with zero npm dependencies.
## Layout / HTML
Minimal, semantic; the JS generates all slides at runtime.
```html
<section class="slider">
  <div class="slider-header">
    <h1>Perpetual Motion</h1>
  </div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
