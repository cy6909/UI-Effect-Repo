# Framecast — 3D Curved Video Wall (Three.js)
## Goal
Build a full-viewport, white WebGL scene: a **7×7 grid of 49 flat planes**, each textured with a **looping muted video**, bent into a **parabolic wall** that curves back toward the viewer on both the horizontal and vertical axes (a shallow satellite-dish / IMAX-screen shape). As the user **moves the mouse**, the whole wall reacts: every plane gets independent **parallax + gentle sinusoidal oscillation**, the **camera eases its `lookAt` target** around so the wall appears to turn, and a fixed CSS-3D headline ("FRAMECAST") **tilts in 3D** like a card catching the light. A small lime nav badge ("FRAMES 2024") floats top-center. This is a pure Three.js piece — **no GSAP at all**; all motion lives in a `requestAnimationFrame` loop driven by mouse position through eased/`lerp`-style interpolation.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`three` (npm) only** — no GSAP, no Lenis. (`lil-gui` is imported for an optional debug panel that is disabled by default; you can omit it entirely.) Import:
```js
import * as THREE from "three";
// optional, debug only: import GUI from "lil-gui";
```
## Layout / HTML
Almost empty — the canvas is injected by JS into `<body>`:
```html
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
