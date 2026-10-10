# Inline Spot Hover Cards — Dots in a Headline that Open into Pointer-Tilting Glass Cards
## Goal
Build a centred, heavy condensed headline (six lines) where three of the lines contain an **inline square dot** between two words. Each dot is a folded **photo card**: on hover it **grows from 0.4em to an 18×14rem card**, its photo **fades in while sharpening from a blur**, an **iridescent glass edge** lights up, and a per-frame loop makes the card **drift toward the pointer** (clamped to a 25px radius) and **tilt on both axes** (clamped to ±20°) while the photo inside **moves the opposite way**, like looking through a lens. Leaving shrinks it back to a dot that gently "breathes". Desktop only (≥1000px). GSAP core.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm), no plugins. Font: **Barlow Condensed** 900.
## Layout / HTML
```html
<div class="is">
  <section class="is-stage">
    <h2 class="is-headline">
      <span class="is-line">We frame the</span>
      <span class="is-line">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
