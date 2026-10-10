# WebGL Interactive Gradient
## Goal
Build a full-screen hero whose entire background is a **living, flowing multi-color gradient rendered in WebGL** (Three.js + two custom fragment shaders). A **real-time fluid simulation** runs in a ping-pong pair of float render targets; a display pass warps a time-evolving trig-based gradient by the fluid's velocity field. **Moving the mouse stirs the fluid** — the gradient ripples, smears and swirls along the cursor's trail, then slowly relaxes back to its ambient flow. A minimal white nav, a centered logo image and a footer strip float on top. The star effect is the cursor-reactive fluid distortion of the animated gradient.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP is needed** — all motion is a raw `requestAnimationFrame` loop driving shader uniforms. Use `three` (npm):
```js
import * as THREE from "three";
import { vertexShader, fluidShader, displayShader } from "./shaders.js";
```
Put the three shader source strings in a sibling module `shaders.js` and export them as template-literal strings.
## Layout / HTML
```html
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
