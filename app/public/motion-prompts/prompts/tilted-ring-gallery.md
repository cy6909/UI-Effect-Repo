# Tilted Ring Gallery — Wheel-Accelerated Oval Orbit with Hover Spotlight
## Goal
Build a fullscreen dark gallery where **twelve glass-framed photos orbit on a tilted oval**. The ring **turns by itself** at a slow idle speed; every **wheel tick adds speed** (capped) and sets the direction, and the speed **eases back** to idle. Because the items move under a still cursor, the hovered item is found with `elementFromPoint` on every frame: the hovered photo **scales up** (its inner image relaxes from a 1.1 idle zoom to 1) while every other item **desaturates, darkens and blurs**. A small dot and "Scroll to spin" sit at the centre. rAF loop + GSAP tweens.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm), no plugins. Font: **Space Mono** for the centre label.
## Layout / HTML
```html
<div class="tr">
  <section class="tr-gallery" aria-label="Gallery">
    <div class="tr-center" aria-hidden="true">
      <span class="tr-center__mark"></span>
      <span class="tr-center__label">Scroll to spin</span>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
