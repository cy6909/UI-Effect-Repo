# Pixelated Text Hover Shaders — full-viewport wordmark
## Goal
Build a full-viewport white hero showing one huge, thin lowercase wordmark centered on screen. The wordmark is **not DOM text** — it is painted to an offscreen 2D canvas and used as a texture on a full-screen Three.js plane rendered through a **custom fragment shader**. The star effect: as the cursor moves across the wordmark, the shader quantizes the image into a **40×40 grid of square cells** and, in a soft radius around the cursor, **shoves each cell's texture sample in the direction the mouse is travelling** — producing a chunky, blocky, pixelated "smear" that ripples off the cursor and eases back to rest when the mouse stops or leaves. All motion is a hand-written `requestAnimationFrame` lerp feeding two shader uniforms; **there is no GSAP and no scroll**.
## Tech
Vanilla HTML/CSS/JS with an ES-module entry (`<script type="module">`). **No animation library at all — no GSAP, no Lenis.** The only dependency is Three.js. Import it as:
```js
import * as THREE from "three";
```
The whole effect is: one WebGL `ShaderMaterial` on a 2×2 plane under an orthographic camera, a canvas-generated text texture, and a raw rAF loop that eases a mouse position each frame and writes it to the shader. Runs in a fresh Vite project with `three` as the only npm dep.
## Layout / HTML
The body is essentially empty — a single container the renderer's `<canvas>` is appended into:
```html
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
