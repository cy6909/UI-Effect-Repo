# Fluid Simulation Hero (Cappen-style ink over inverted type)
## Goal
Build a full-screen landing hero with a giant white typographic headline and a **GPU fluid
simulation** painted on top of everything. Moving the pointer injects swirling "ink" that flows,
curls and dissipates like real fluid (a Navier–Stokes solver running entirely in fragment
shaders). The fluid canvas uses `mix-blend-mode: difference`, so the moving white ink **inverts**
whatever it passes over — black over the white page, white over the black headline — producing the
signature liquid, self-inverting trail. The star of this piece is the fluid solver, not any DOM
animation.
## Tech
- Vanilla HTML / CSS / JS with ES module imports, bundled by Vite.
- **`three` (npm)** is the only JS dependency — a WebGL fluid simulation written by hand in GLSL.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
