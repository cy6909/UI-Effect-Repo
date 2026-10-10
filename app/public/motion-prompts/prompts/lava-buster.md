# Lava Buster — GPU Particle-Fluid Blaster (Three.js / GLSL)
## Goal
Build a **full-screen WebGL background** that looks like molten lava. Thousands of glowing
particles are continuously **blasted out from the exact center of the screen**, swirl and stream
outward like incandescent fluid, and **react to the cursor**: moving the mouse aims the field and
**holding the mouse button down** injects a spinning vortex of force around the pointer. The whole
thing is a multi-pass GLSL simulation running in ping-pong float render targets — glowing
orange filaments (`rgb 1.0, 0.3, 0.1`) on pure black, brightest where the flow curls. Minimal
nav/footer text overlays sit on top. The star of this piece is the shader simulation, not any DOM
animation.
## Tech
- Vanilla **HTML / CSS / JS** with ES module imports, bundled by **Vite** (`npm`).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
