# Turbulent Inversion Lens Hover Effect
## Goal
Build a full-viewport WebGL image viewer with a "turbulent inversion lens". A single photograph fills the screen, rendered on a Three.js fullscreen quad through a custom fragment shader. The star effect: as the cursor moves over the image, a **circular lens trails the mouse with a smooth lag**, and everything inside that circle is shown as **inverted grayscale** (a photographic-negative look). The lens edge is not a clean circle — it is **jittered by animated fractal turbulence (fBm noise)**, so the boundary constantly boils and crackles like static. The lens radius **grows open when the cursor enters** the container and **shrinks closed to nothing when it leaves** (or when the section scrolls out of view). No scroll effects, no clicks — just cursor-driven shading.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP, no Lenis.** The only runtime dependency is `three` (npm). All motion comes from a `requestAnimationFrame` loop that lerps values into shader uniforms.
Imports needed:
- `three` (`import * as THREE from "three"`)
- A local `./shaders.js` module exporting two GLSL strings: `vertexShader` and `fragmentShader` (given verbatim below — they are load-bearing).
## Layout / HTML
Minimal. One full-viewport container holding a hidden `<img>`; the WebGL canvas is created in JS and appended into the container.
```html
<div class="inversion-lens">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
