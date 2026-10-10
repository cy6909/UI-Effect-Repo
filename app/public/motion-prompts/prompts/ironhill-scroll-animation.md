# Second Skin — Scroll-Scrubbed WebGL Dissolve Hero
## Goal
Build a very tall hero (`175svh`) where scrolling makes a solid near-black fill **sweep upward over a full-bleed portrait**, dissolving the image away behind an **organic, ragged, fbm-noise edge**. The fill is a Three.js fullscreen quad running a custom GLSL shader whose `uProgress` uniform is driven by Lenis scroll position — so it is fully scroll-scrubbed, not time-based. Once the fill has covered the lower part of the hero, a long paragraph sitting over it **fades in one word at a time**, each word's opacity tied directly to a ScrollTrigger's progress. Below, a dark closing section. The star effect is the noisy WebGL dissolve reveal.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`three`** — WebGL scene/renderer/shader material.
- **`gsap`** (3.x) plus the plugins **`ScrollTrigger`** and **`SplitText`**.
- **`lenis`** — smooth scroll; it also owns the scroll value that drives the shader.
```js
import { vertexShader, fragmentShader } from "./shaders.js";
import * as THREE from "three";
import gsap from "gsap";
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
