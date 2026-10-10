# 3D Spiral Image Gallery
## Goal
Build a single scrollable hero where **75 curved image tiles wind down a five-revolution 3D helix**, rendered in WebGL. Ten editorial photos are cycled across the tiles, a **custom shader dims each tile as it turns away from the camera** (depth shading around the spiral), the whole spiral **slowly auto-rotates and gets spun by scroll velocity** (with inertial decay), and **scroll progress lerps the camera downward through the helix** so you appear to descend the spiral. On desktop, mouse position adds a subtle X/Z parallax tilt to the whole spiral. Smooth scroll via Lenis. After the tall hero comes a short second section.
## Tech
Vanilla HTML/CSS/JS with ES module imports (Vite/npm project). Use `three` for all WebGL and `lenis` for smooth scroll. **No GSAP, no ScrollTrigger** — all motion is a hand-rolled `requestAnimationFrame` loop with manual lerp/inertia. Put the two GLSL shader strings in a separate `shaders.js` and import them. Instantiate Lenis once with `new Lenis({ autoRaf: true })` (it drives its own rAF; you still run your own render loop separately).
## Layout / HTML
Two stacked sections; the WebGL canvas is injected into the first by JS.
```html
<section class="hero">
  <h1>Somewhere between structure and disorder new forms quietly start to emerge</h1>
</section>
<section class="about">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
