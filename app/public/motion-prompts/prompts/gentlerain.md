# Water Ripple Text Simulation — build prompt
## Goal
Build a full-screen hero for a fictional product studio called **"Soft Horizon"**. The whole viewport is a WebGL water surface: a giant canvas-drawn wordmark (**"softhorizon"**) sits under a real-time **wave simulation**, and as the pointer moves across the screen the cursor injects pressure into the fluid, leaving **rippling wakes that refract the text and throw off bright specular glints**, like poking the surface of a still pool. Nav and footer text float above the water. The star effect is the physics itself: a double-buffered (ping-pong) GPU wave-equation solver whose gradient field distorts and lights the text every frame. **No GSAP, no scroll** — everything is driven by `mousemove` on the canvas plus a `requestAnimationFrame` loop.
## Tech
Vanilla HTML/CSS/JS with ES module imports. The only runtime dependency is **`three`** (npm), imported as `import * as THREE from "three"`. There is **no GSAP, no Lenis, no scroll library**. Assume a fresh Vite project with `three` installed via npm.
Split the code into four files:
- `index.html`
- `styles.css`
- `script.js` — the Three.js app (`<script type="module" src="./script.js">`), wrapped in a `DOMContentLoaded` listener.
- `shaders.js` — a small module that exports **four** GLSL strings: `simulationVertexShader`, `simulationFragmentShader`, `renderVertexShader`, `renderFragmentShader`. Imported by `script.js`.
## Layout / HTML
Two fixed UI layers over the canvas; the `<canvas>` is created and appended to `<body>` by JS at runtime.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
