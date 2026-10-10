# Cursor-Driven Material Spotlight
## Goal
Build a full-viewport WebGL scene showing a single monochrome 3D sculpture sitting on a flat warm-grey backdrop. The star effect: as the cursor moves over the canvas, an invisible **spotlight trails the mouse with a smooth lag** and, wherever it lands on the model's surface, the material locally turns **glossier and darker** — a soft round "wet/polished" patch that reveals reflections and follows the pointer. The reveal fades in when the cursor enters and fades out when it leaves. There is no scroll, no click state, no page chrome — just the sculpture and the roaming highlight.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP, no Lenis, no scroll library.** The only runtime dependency is `three` (npm). The motion is produced entirely by a `requestAnimationFrame` loop that linearly interpolates (lerps) values into custom shader uniforms.
Imports needed:
- `three`
- `three/examples/jsm/loaders/GLTFLoader.js`
- `three/examples/jsm/environments/RoomEnvironment.js`
- A local `./shaders.js` module that exports four GLSL string snippets (see below).
## Layout / HTML
Minimal. One full-viewport section; the WebGL `<canvas>` is created in JS and appended into it.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
