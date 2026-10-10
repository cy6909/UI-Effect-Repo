# Advanced Infinite Scroll — Endless Wrapping Editorial Menu with Velocity Squash & Tilt
## Goal
Build a **fullscreen, edge-to-edge vertical menu** of large editorial rows (a small category label + a huge serif title per row) that **loops endlessly in both directions**. You drive it by **mouse wheel** or by **click-and-drag** (and touch). A `requestAnimationFrame` loop **lerps** the scroll position for buttery inertia, and every row is repositioned each frame with `gsap.set` using a `y` **modifier** that runs `gsap.utils.wrap` so items that leave one edge seamlessly re-enter from the other — a true infinite recycle with only 10 DOM nodes. On top of that, the whole list **elastically scales down and tilts** proportional to the current scroll **velocity**: flick it fast and the rows shrink and rotate; let it settle and they spring back to `scale 1`, `rotate 0`. A dark, vignetted photo sits fixed behind everything.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) — **core only**. No plugins (no ScrollTrigger, no Draggable, no SplitText), no smooth-scroll library. The infinite wrap and the inertia are done by hand with `gsap.set` + `gsap.utils.wrap` + a manual `requestAnimationFrame` lerp loop.
```js
import gsap from "gsap";
```
## Layout / HTML
Class names are load-bearing — the JS and CSS query them.
```
.menu                              (fullscreen stage; the drag + wheel surface; cursor: grab)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
