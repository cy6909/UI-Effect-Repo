# Build: Mousemove Pan-Canvas Video Gallery
## Goal
A full-viewport black canvas holds an **oversized 200vw × 200vh grid of media tiles**, centered so only the middle of the grid is visible at rest. **Moving the mouse pans the whole grid in the opposite direction of the cursor**, letting you "explore" the offscreen tiles by simply steering — no scroll, no drag, no click. The motion is buttery and weighty because the pan is written as a single `transform` on the grid and eased by a **2-second `cubic-bezier` CSS transition**, so the grid glides toward each new cursor position and trails behind fast movements. Each tile **hover-reveals a looping video** (its still preview fades out, a zoomed-in looping clip fades in) with the project title centered on top. The star effect is the **cursor-inverse translate + long cubic-bezier easing** that makes the entire gallery feel like a heavy, floating canvas.
## Tech
Vanilla HTML/CSS/JS in a Vite + npm project. **No GSAP, no libraries, no framework, no npm dependencies at all** — the entire pan is done with one `mousemove` listener that writes `element.style.transform`, and *all* of the easing/smoothing lives in a **CSS `transition` on the grid element** (not in JS, not in a rAF loop). The hover reveals are pure CSS `:hover` opacity transitions. Load the script as `<script type="module" src="./script.js">`. Do not reach for a tween library, ScrollTrigger, Lenis, or a requestAnimationFrame loop — the whole point is that the smoothing is delegated to the browser's CSS transition engine.
## Layout / HTML
```html
<body>
  <div class="container">
    <div class="gallery">
      <!-- Row 1 — 4 items -->
      <div class="row">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
