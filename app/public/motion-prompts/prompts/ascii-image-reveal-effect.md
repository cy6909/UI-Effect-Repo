# ASCII Image Reveal Effect
## Goal
Build an editorial photo grid where **each frame paints itself as live ASCII art on a `<canvas>` the moment it scrolls into view**, then cross-fades into the real photograph. Cells fill in **random order**; the shadow cells snap straight to their final glyph while the mid-tones and highlights — the lit part of the face — **flicker through dense random glyphs** for about three quarters of a second before locking in. When a whole grid has settled it holds for a beat, then dissolves to the photo. Frames that enter together cascade 140 ms apart. Tapping or clicking a frame scans it again.
## Tech
Vanilla HTML/CSS/JS. **No GSAP, no libraries, no framework, no npm dependencies** — the whole effect is hand-rolled with the **Canvas 2D API**, one `requestAnimationFrame` loop per tile, and an `IntersectionObserver`. A single ES-module script (`<script type="module" src="./script.js">`) drives everything.
## Layout / HTML
A single `<section class="gallery">` holding an `.intro` block and **15** `<figure class="frame fN">` elements. Each figure holds a `<div class="img">` wrapper with one `<img class="ascii-reveal">` inside it, plus a `<figcaption>`. The script inserts a `<canvas>` into each `.img` at runtime.
```html
<section class="gallery">
  <div class="intro">…eyebrow, h1, lede, credits, hint…</div>
  <figure class="frame f1">
    <div class="img">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
