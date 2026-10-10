# Asset Orb — Draggable WebGL Image Sphere
## Goal
Build a full-viewport, pitch-black WebGL scene containing a single **"orb" made of 100 small photo planes** arranged on the surface of a sphere via a **Fibonacci-sphere (golden-spiral) distribution**, every plane textured with one of 30 editorial photographs picked at random. The user **drags to spin the orb** (with damped inertia, so it keeps gliding after release) and **scrolls/pinches to zoom** between a near and far limit. A fixed HTML nav ("ORB") and footer ("[ ARCHIVE BEYOND REALITY ]") float over the canvas. This is a pure Three.js piece — **no GSAP at all**; all motion comes from OrbitControls damping inside a `requestAnimationFrame` loop.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`three` (npm) only** — no GSAP, no Lenis, no other libraries. Import:
```js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```
## Layout / HTML
Nearly empty — the canvas is injected by JS:
```html
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
