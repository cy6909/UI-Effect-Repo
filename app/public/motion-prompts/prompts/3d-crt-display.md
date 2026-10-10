# 3D CRT Display
## Goal
Build a full-screen hero where a **3D CRT monitor** (an external `.glb` model) floats center-stage, its screen driven by a **custom GLSL shader** that fakes a real cathode-ray tube: scanlines, an RGB aperture-grille mask, a vignette, warm phosphor tint and chromatic aberration. A row of clickable project pills sits at the bottom. **Hovering a pill swaps the on-screen texture and fires a GSAP-driven glitch burst** — horizontal line-tearing, RGB split and static noise that spike to full and **decay to zero over 0.75s**. The whole monitor lazily **parallax-rotates toward the mouse** via a per-frame lerp. The star effect is the shader-based CRT + the glitch-on-swap.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) and `three` (npm). No GSAP plugins are needed — GSAP is used for the glitch burst, for the two power-on tweens, and for `gsap.utils.interpolate()`. Three.js supplies the WebGL scene and the GLTF loader. Plain Vite-style imports:
```js
import gsap from "gsap";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
```
Put the two shader source strings in a sibling module `shaders.js` and import them: `import { vertexShader, fragmentShader } from "./shaders.js";`
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
