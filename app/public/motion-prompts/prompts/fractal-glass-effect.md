# Fractal Glass Parallax Hero — build prompt
## Goal
Build a full-viewport hero for a fictional design studio called **"Glassform"**. A single editorial portrait fills the screen, but it is not shown directly: it is rendered on a WebGL plane and refracted through a custom fragment shader that bends the image into dozens of vertical **fractal-glass ribbons** (like looking through fluted / reeded glass). Moving the mouse feeds a smoothed pointer position into the shader that produces a subtle **horizontal parallax**, amplified inside the distorted stripes so the ribbons appear to slide over each other. The star effect is the shader itself, driven by a lerped mouse uniform on a `requestAnimationFrame` loop.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`three`** (npm) only — there is **no GSAP and no scroll library** in this component. All motion comes from the Three.js render loop + a GLSL fragment shader. Assume a fresh Vite project; `three` is installed via npm and imported as `import * as THREE from "three"`.
Split the code into three files:
- `index.html`
- `styles.css`
- `script.js` — the Three.js app (`<script type="module" src="./script.js">`)
- Put the GLSL strings in a small `shaders.js` module that exports `vertexShader` and `fragmentShader`, imported by `script.js`. (Inlining them in `script.js` is also fine.)
## Layout / HTML
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
