# Work Section Scroll — Curved Letter Streams + WebGL Filmstrip
## Goal
Build a full-viewport, pinned "WORK" section wedged between a red intro and a red outro. While the section is pinned for **700% of the viewport height**, three layered effects run in sync, all driven by one ScrollTrigger progress value:
1. A **red dot grid** (2D canvas) that slides horizontally as you scroll.
2. Sixty HTML letter `<div>`s — fifteen each of **W, O, R, K** — that stream along **four Three.js CatmullRom curves**, projected from 3D world space to screen pixels every scroll tick, with a per-frame **lerp (0.07)** gliding each letter toward its target and a snap rule that hides the wrap-around jump.
3. A **parabolically warped Three.js plane** carrying a `CanvasTexture` filmstrip of 7 project images that slides across the screen from right to left over the full scroll.
Lenis smooths the scroll; a single `ScrollTrigger` (pin + `scrub: 1`) feeds its `progress` to all three layers in `onUpdate`.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, **`lenis`** for smooth scrolling, and **`three`** for the WebGL layers:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
