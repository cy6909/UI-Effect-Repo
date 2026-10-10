# Brutalist Sci-fi Corridor — WebGL Preloader Reveal
## Goal
Build a full-viewport WebGL hero: a **brutalist concrete corridor** rendered in Three.js with **UnrealBloom + a custom film-grain shader**, revealed by an on-load cinematic sequence. First a **preloader counter climbs 0 → 100** over a solid black overlay while the GLTF model loads; then a single **GSAP timeline** fades the counter and overlay out, **sweeps the camera 180° around** the corridor to its resting angle, and **scrambles the nav + heading text in** via randomized per-character opacity flickers. Once the intro finishes, the camera **follows the mouse** with a lerped parallax sway. The overlaid HTML text uses `mix-blend-mode: difference`, so it reads as black over the bright, bloom-blown white scene and inverts as the camera moves.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** and **`three` (npm)**. **No GSAP plugins** (no ScrollTrigger, no SplitText, no CustomEase — the text split is hand-rolled). No Lenis / no smooth-scroll (the page never scrolls). Import from three's examples/addons:
```js
import gsap from "gsap";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
