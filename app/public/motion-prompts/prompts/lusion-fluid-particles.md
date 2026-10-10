# Fluid Particle Simulation Hero (falling shapes that pile up like a liquid)
## Goal
Build a full-screen contact/CTA hero on a saturated electric-blue background, with a centered white
headline floating over it, and — painted across the whole viewport behind the text — a **p5.js
particle physics simulation**: ~250 small white shapes (triangles, squares, circles) that spawn in a
loose grid near the top, **fall under gravity, collide, and pile up at the bottom with soft,
fluid-like collision resolution** (a spatial-grid neighbor solver that pushes overlapping particles
apart and blends their velocities so the heap behaves like a settling liquid rather than rigid
bodies). **Pressing and dragging the mouse shoves and swirls nearby particles**, injecting velocity
and spin along the drag. The star of this piece is the per-frame particle solver, not any DOM
animation — there is **no GSAP** here.
## Tech
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
