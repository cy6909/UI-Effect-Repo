# Three.js Infinite Curved-Distortion Slider — Velocity-Reactive Vertex Warp
## Goal
Build a **full-viewport, infinitely looping horizontal image slider rendered entirely in Three.js**. Ten textured planes drift left/right in 3D space, driven by mouse wheel, touch drag, or arrow keys. The star effect: as the strip moves, the planes **bend toward the camera in a radial bulge centered on the middle of the screen** — a curved-screen distortion whose intensity is proportional to scroll velocity. Fast flicks warp the slides dramatically; when motion settles, the planes relax back to perfectly flat. The strip wraps seamlessly, so you can scroll forever in either direction. Everything is lerped every frame — position, per-slide easing, and the distortion factor itself — so the whole thing feels weighty and fluid, never snappy.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **`three` (npm) only — no GSAP, no smooth-scroll library.** The entire engine is a hand-rolled `requestAnimationFrame` loop with linear interpolation and a velocity tracker. `import * as THREE from "three";`
## Layout / HTML
```
nav                 (fixed top strip — two small labels)
  p  "[ Silhouette ]"
  p  "/ Experiment by Silhouette"
footer              (fixed bottom strip — two small labels)
  p  "Infinite WebGL Slider"
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
