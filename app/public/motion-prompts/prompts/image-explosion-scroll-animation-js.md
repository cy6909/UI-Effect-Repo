# Image Explosion Scroll Animation
## Goal
Build a single scrollable page where, the moment the footer scrolls halfway into view, 15 images violently burst upward out of the footer's bottom edge and rain back down under gravity — a one-shot "image explosion" driven by a hand-rolled requestAnimationFrame physics simulation (per-particle velocity, gravity, friction and rotation). No GSAP is used for this effect; the physics loop IS the effect.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `lenis` (npm) for smooth scrolling. No GSAP plugins are required — the explosion is pure JavaScript physics updating `style.transform` inside a `requestAnimationFrame` loop.
```js
import Lenis from "lenis";
```
Wrap all JS in a `DOMContentLoaded` listener.
## Layout / HTML
Four stacked blocks, in this order:
1. `<section class="hero">` — empty; full-screen background image.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
