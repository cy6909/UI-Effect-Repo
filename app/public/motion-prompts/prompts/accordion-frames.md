# Accordion Frames — Spotlight Row
## Goal
Build a full-viewport, dark hero section containing a single horizontal **accordion row of tall, thin image slivers**. All panels sit collapsed to a 20px-wide sliver by default; hovering one panel (tapping on mobile) makes it smoothly **expand to a wide 400px "frame"** while every other panel simultaneously **collapses back to 20px**, all sliding to make room via a slow, decelerating ease. A crisp **white focus frame** with two thin vertical crosshair lines running the full height of the viewport glides along the row to sit exactly over the currently focused panel. The star effect is this synchronized expand/collapse "accordion" motion plus the tracking frame.
## Tech
Vanilla HTML/CSS/JS. **No GSAP, no npm animation libraries, no smooth-scroll** — the entire motion is a **CSS `transition`** on `left`/`width` driven by a small vanilla-JS layout engine, plus a `ResizeObserver`. Ship it as one `index.html`, one `styles.css`, one ES-module `script.js` (`<script type="module">`). It must run in a fresh Vite project with zero dependencies.
## Layout / HTML
Minimal semantic skeleton — the JS injects the panels at runtime:
```html
<main>
  <section class="spotlight">
    <div class="spotlight-track">
      <div class="spotlight-panels">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
