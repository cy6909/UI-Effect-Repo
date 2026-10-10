# ThreeJS 3D Curved Slider (WebGL canvas-texture, Lenis scroll, no GSAP)
## Goal
Build a full-screen **3D curved plane that displays an endless vertical slideshow of captioned images**, rendered entirely in Three.js. Seven images with title captions are painted onto a tall repeating **2D canvas** that is used as a texture on one big **parabolically curved plane** tilted in 3D space. **Lenis smooth-scroll progress (0→1 over a very tall page) is fed into a scroll listener that shifts the texture's vertical offset and re-renders the WebGL scene**, so scrolling pushes the strip of images continuously up through the curved 3D sheet and loops forever. The star effect: the **image strip appears to bend and flow over a concave wave** because the flat canvas is mapped onto a plane whose vertices curve toward the camera at the top and bottom edges, viewed from an angled, rolled camera. A dark radial vignette overlay and fixed nav/footer frame the scene.
## Tech
- Vanilla HTML / CSS / JS with ES module imports, bundled by **Vite** (npm project).
- **`three` (npm)** imported `import * as THREE from "three";` and **`lenis` (npm)** imported `import Lenis from "lenis";`.
- **No GSAP, no ScrollTrigger, no shaders.** All motion is: Lenis for smooth scroll + a `lenis.on("scroll", …)` callback that redraws a 2D `<canvas>` texture and calls `renderer.render()`. There is **no continuous rAF render loop** — the scene renders once at init and then only on scroll events. `MeshBasicMaterial` (unlit) — no lights.
- Everything runs inside a single `window.addEventListener("load", …)` in one `script.js`.
## Layout / HTML
Almost no DOM — a fixed nav, a fixed footer, the WebGL `<canvas>` inside a wrapper, and a vignette overlay. Text is neutral/fictional demo copy (no real brands). Class names are load-bearing (`.slider-wrapper`, `.overlay`).
```html
<nav>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
