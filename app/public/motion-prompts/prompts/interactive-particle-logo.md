# Interactive Fluid Particle Logo
## Goal
Build a full-viewport **WebGL hero** where a PNG logo is rasterized pixel-by-pixel into tens of thousands of soft round `GL_POINTS` particles floating on a near-black background. The star effect: **moving the mouse repels nearby particles with an inverse-square force**, scattering them fluidly, and each particle then **springs back to its home position** through velocity damping plus a constant return force — with an exponentially damped clamp that stops any particle drifting more than ~100px from home. The whole simulation is raw WebGL + a hand-rolled physics loop on `requestAnimationFrame`. **No GSAP, no Three.js, no libraries at all.**
## Tech
Vanilla HTML/CSS/JS with ES module scripts. **Zero npm dependencies** — use the raw `canvas.getContext("webgl")` API directly. Put the two GLSL source strings in a sibling module and import them:
```js
import { vertexShader, fragmentShader } from "./shaders.js";
```
## Layout / HTML
Minimal — the entire page is one canvas:
```html
<body>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
