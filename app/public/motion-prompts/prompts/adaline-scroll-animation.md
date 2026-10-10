# Adaline-Style Scroll Animation (Canvas Image-Sequence Hero)
## Goal
Build a cinematic landing hero where a **104-frame image sequence plays back frame-by-frame on a full-viewport `<canvas>`, driven entirely by scroll**. The hero section is **pinned for 7 viewport-heights** of scrolling; as the user scrolls, a single ScrollTrigger's `onUpdate` maps progress to (1) the current video frame drawn on canvas, (2) a fade-out of the fixed nav, (3) the headline block being **pushed away on the Z axis** (`translateZ` 0 → −500px) while fading, and (4) a product-dashboard mockup that **flies in from deep 3D space** (`translateZ(1000px)` → `0`) and lands centered as the sequence ends. A plain outro section follows. Scroll is smoothed with Lenis.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, plus **`lenis`** for smooth scrolling:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Everything runs inside a `DOMContentLoaded` listener. Register ScrollTrigger, then wire Lenis the standard way:
```js
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
