# Tile Grid Preloader Reveal — Glass Tiles, Flip-Hopping Progress Marker & Masked Hero Text
## Goal
Build a landing-page load sequence. A pale veil covers the page and a grid of **frosted glass tiles** (always an odd number of rows and columns, plus one hidden ring outside the viewport) **fills in random order**. A dark square **progress marker** sits on the middle row and **hops with GSAP Flip** across four stops — showing `25`, `50`, `75`, then a small logo — while the stops it leaves turn back into glass. When the marker lands in the centre, the veil is removed, and every tile **folds down on its top edge** (`scaleY → 0`, random order), briefly **blurring the hero photo** underneath through the glass; the hero then settles from a slight zoom, and the **headline characters, subtitle lines and nav words rise out of their masks**.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm) plus the plugins **`Flip`** and **`SplitText`**. Fonts: **Barlow Condensed** (800), **DM Mono** (500), **DM Sans** (500–600).
## Layout / HTML
```html
<div class="tg">
  <div class="tg-preloader" aria-hidden="true">
    <div class="tg-preloader__bg"></div>
    <div class="tg-preloader__grid"></div>
    <div class="tg-marker"><span class="tg-marker__value">25</span></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
