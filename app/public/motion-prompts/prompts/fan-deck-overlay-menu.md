# Fan Deck Overlay Menu — Clip-Path Panel, Glass Shelf & Fanned Image Cards
## Goal
Build a click-to-open fullscreen overlay menu. When the pill button in the top-right is pressed, a dark panel **wipes up from the bottom** (animated `clip-path` polygon) while a soft violet light blooms behind it. A thin **glass shelf** rises near the bottom, and **four frosted-glass image cards** climb out of it — blurred, tilted and slightly small — straighten up, then **fan out** left/right with a centre-out stagger into a row of four with a gentle arc and alternating rotation. With the menu open, moving the pointer **parallaxes** the cards (outer cards drift more) and a **specular highlight** follows the cursor across each card's glass; hovering a card scales it up a touch. Closing gathers the fan back into a stack, drops the cards into the shelf, dims the light and wipes the panel back down. Everything is GSAP.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) — core only, no plugins. Fonts: **DM Sans** (weights 400–600). One `script.js`, one `styles.css`, one `index.html`.
## Layout / HTML
Wrap everything in `<div class="fd">`. Class names are load-bearing.
```html
<div class="fd">
  <nav class="fd-nav">
    <a class="fd-brand" href="#">Lumen</a>
    <button class="fd-toggle" aria-expanded="false" aria-controls="fd-menu">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
