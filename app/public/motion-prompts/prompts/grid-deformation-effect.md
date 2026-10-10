# Grid Deformation Hover Effect (WebGL mouse-velocity image distortion)
## Goal
Build a full-screen hero that shows a single background image, but the image is not a plain
`<img>` — it is rendered onto a **Three.js shader plane**. Moving the pointer over the hero injects
**velocity** into a coarse grid of cells stored in a `DataTexture`; each cell's accumulated push
**displaces the image UVs** locally, dragging the pixels in the direction of the swipe, with a
subtle **RGB chromatic-aberration split** along the displacement. When the cursor stops, the whole
field **relaxes back to rest smoothly** (a per-cell decay of `0.925`/frame), so the image un-warps
on its own. The star of this piece is the grid-based UV displacement shader + the mouse-velocity
physics — there is no DOM animation and nothing scrolls.
## Tech
- Vanilla HTML / CSS / JS with ES module imports, bundled by Vite.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
