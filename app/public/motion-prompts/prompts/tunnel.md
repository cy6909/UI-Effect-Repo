# 3D Tunnel Image Slider — WebGL Shader Tunnel + Scroll-Driven Z-Flight Carousel
## Goal
Build a full-screen experience where **ten framed portrait images fly toward the camera down the Z axis of a CSS-perspective tunnel**, over a **hypnotic monochrome neon-tunnel pattern rendered by a Three.js fragment shader** that fills the whole background. Smooth scrolling (Lenis) feeds a GSAP `ScrollTrigger` with `scrub: 1`: the same scroll progress (a) pushes every slide's `translateZ` from deep-space toward the viewer, fading each one in as it nears, and (b) drives a `scrollOffset` uniform that warps/advances the shader tunnel in sync. Result: as you scroll, images emerge one after another out of a spinning light-tunnel and rush past you, with the pattern accelerating in lock-step.
## Tech
- Vanilla HTML / CSS / JS with ES module imports, bundled by **Vite** (npm project).
- **`gsap` (npm)** plus the GSAP plugin **`ScrollTrigger`** (`import { ScrollTrigger } from "gsap/ScrollTrigger"`, register with `gsap.registerPlugin(ScrollTrigger)`).
- **`lenis` (npm)** for smooth scroll, wired into GSAP's ticker.
- **`three` (npm)** imported `import * as THREE from "three"` — a single full-screen shader plane (raw GLSL, `ShaderMaterial`). No other Three geometry.
- The tunnel background is **WebGL**; the carousel slides are **plain DOM `<div>`s** transformed in 3D by CSS + inline styles. The two systems only share the scroll progress value.
Lenis + GSAP ticker wiring (put at top of the module, runs immediately):
```js
const lenis = new Lenis();
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
