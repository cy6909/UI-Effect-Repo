# 3D Orbit Carousel — Wheel-Driven Orbit, Counter-Rotating Glass Preview & Pointer Tilt
## Goal
Build a fullscreen carousel where **ten portrait panels stand in a circle** around a pivot (`rotateY(i·36°) translateZ(400px)`). **Scrolling the wheel** (or dragging on touch) **turns the orbit** through a lerped loop; a larger **glass preview in the centre counter-rotates** so it always faces the camera and **crossfades** to whichever panel is in front; the **pointer tilts the whole stage** on both axes; panels **fade and darken with their angle** to the camera (depth fog); and a small **title chip** at the bottom slides to the active slide's index and name. Pure rAF + a couple of GSAP tweens.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm), no plugins. Font: **JetBrains Mono** (400–500).
## Layout / HTML
```html
<div class="oc">
  <section class="oc-slider" aria-label="Carousel">
    <div class="oc-stage">
      <div class="oc-orbit"><div class="oc-preview"></div></div>
    </div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
