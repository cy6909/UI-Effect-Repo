# Cursor Image Trail with Striped Clip-Path Reveal (dark editorial hero)
## Goal
Build a full-viewport dark hero where **moving the mouse leaves a trail of 175×175px editorial portrait images: each time the cursor travels past a distance threshold, a new image spawns at a smoothed (lerped) trailing position and slides toward the live cursor position while it is revealed through 10 horizontal strip masks that expand from a center line outward with a middle-first stagger; ~1 second later the strips collapse back to the center (edges first) while the image dims, and the element is removed**. The star effect is the striped clip-path in/out reveal combined with the lerp-lagged spawn-and-slide motion.
## Tech
Vanilla HTML/CSS/JS with an ES module script (`<script type="module" src="./script.js">`). **No GSAP, no plugins, no Lenis, no libraries at all** — the whole effect is native CSS `transition`s (on `clip-path`, `left`, `top`, `opacity`) driven by a `requestAnimationFrame` loop, `mousemove` tracking, manual linear interpolation (lerp), and `setTimeout`-based staggers. There is no scroll interaction.
## Layout / HTML
```
section.hero                      (full-viewport stage)
  .hero-img > img                 (full-bleed faint background image)
  p                               "[ The Future Moves in Frames ]"
  p                               "Experiment 457 by Motionprompts"
  .trail-container                (empty; JS appends the trail images here)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
