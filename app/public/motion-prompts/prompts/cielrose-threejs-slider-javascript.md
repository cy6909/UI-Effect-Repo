# Three.js Wheel-Driven Shader Slider
## Goal
Build a full-viewport **WebGL image slider driven by the mouse wheel**. A single 16:9 plane floats in the center of the screen over a soft grey-to-white gradient page. Scrolling wheels through an endless loop of 7 images: a custom fragment shader performs a **vertical filmstrip wipe** (the next image slides up from the bottom edge while the current one slides out the top), a vertex shader **bulges the plane toward the camera** proportionally to scroll velocity, and the whole plane **swells/shrinks slightly** with scroll intensity. When scrolling stops, a lerp **snaps to the nearest whole image** and the project title (clipped inside a 16px-tall mask) **slides back up into view** with the new slide's name. Everything is hand-rolled in a `requestAnimationFrame` loop plus one CSS transition — **no GSAP, no ScrollTrigger, no page scroll**.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`three` (npm) only**:
```js
import * as THREE from "three";
```
No GSAP, no Lenis. Structure the JS in three modules: `script.js` (main), `shaders.js` (exports `vertexShader` and `fragmentShader` GLSL strings), and `slides.js` (exports a `slides` array of `{ title, url, image }`).
## Layout / HTML
```html
<body>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
