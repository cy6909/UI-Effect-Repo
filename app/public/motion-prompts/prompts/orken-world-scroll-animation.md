# Pinned Horizontal Card Scroll with Triangle-Grid Fill Reveal
## Goal
Build a full-page cinematic scroll sequence. A single section **pins** for 5 viewport heights while Lenis-smoothed scrolling drives two things at once: (1) a horizontal row of three tall product cards **slides left across the screen** (across the first ~65% of the scroll), and (2) a full-screen **canvas grid of interlocking triangles** — barely-visible white outlines — that, over the last ~35% of the scroll, **fills in with bright orange one triangle at a time in random order**, each triangle easing up from scale 0→1, until the orange grid blankets the whole viewport. A dark background image sits behind everything; a hero panel precedes the pinned section and an outro panel follows it.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**, and **`lenis`** for smooth scrolling. The reveal grid is drawn with the raw **Canvas 2D API** (no extra plugin — no PixiJS/Three.js). Everything runs inside a `DOMContentLoaded` listener.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
Lenis wiring (standard GSAP integration):
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
