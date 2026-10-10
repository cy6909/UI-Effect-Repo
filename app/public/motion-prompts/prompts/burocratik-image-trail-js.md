# Cursor Image Trail (vanilla JS + CSS transitions)
## Goal
Build a three-section page whose middle, light-colored full-viewport panel spawns a trail of photos under the cursor: every time the mouse travels far enough (or sits idle, or the page scrolls) a new 200×200 image pops in at the cursor position with a random tilt, scaling up from 0, then collapses back to scale 0 and unmounts after a short lifespan. The result is a continuous, self-cleaning stream of tilted photos chasing the pointer.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP is used** — the animation engine is a `requestAnimationFrame` loop plus CSS `transform` transitions with custom `cubic-bezier` easings. Install and import `lenis` (npm) for smooth scrolling. Everything runs inside a `DOMContentLoaded` handler.
## Layout / HTML
Three stacked `<section>` elements, each exactly one viewport tall:
```
<section class="intro">
  <h1>Dynamic Cursor Trail Animation</h1>
</section>
<section class="trail-container">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
