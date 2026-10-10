# 3D Circular Image Gallery
## Goal
Build a full-viewport **WebGL image gallery** where ~100 curved image tiles are wrapped around the surface of a tall vertical cylinder that **spins slowly and continuously** on its Y axis. Smooth-scrolling drives the camera **vertically** up and down through the stack, and each burst of scroll velocity briefly **accelerates the cylinder's spin** for an inertial, momentum-based feel. The star effect is the endlessly rotating 3D drum of photos that you travel through as you scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports, bundled by Vite. No framework.
- `three` (npm) — the entire scene is Three.js WebGL. **No GSAP is used.**
- `lenis` (npm) — smooth scroll, whose scroll position and velocity drive the camera and spin.
Import them as:
```js
import * as THREE from "three";
import Lenis from "lenis";
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
