# Fluid Splash Cursor (page-level GPU Navier–Stokes overlay)
## Goal
Build a page whose pointer drags **liquid ink across the entire document** — not inside a hero box, not behind the content, but on a transparent full-window layer that composites over headlines, tables, borders and photographs alike. Moving the pointer pushes a force and a puff of dye into a fluid simulation running on the GPU; the ink curls, spreads and dissipates on its own. Clicking bursts. The page underneath is never touched: no blend mode inverts it, no canvas covers it, no listener steals its clicks.
The demo dress is **Nocturne Baths № 4**, a municipal swimming pool that only opens after dark.
## Tech
**Vanilla HTML/CSS/JS. No library at all** — not GSAP, not three.js, not a shader loader. Raw WebGL2 with a WebGL1 fallback, one `requestAnimationFrame` loop, ES module syntax so it drops into a bundler or a plain `<script type="module">` unchanged. The whole solver is one exported function:
```js
const fluid = splashCursor({ curl: 12, densityDissipation: 3, color: "#ff0000" });
```
If you are tempted to reach for three.js: don't. The entire GPU side is ten fragment shaders and a fullscreen quad — copy, clear, splat, advection, divergence, curl, vorticity, pressure, gradient-subtract and display — and pulling in a scene graph to draw a quad triples the bundle for nothing.
## The mechanic
### What a fluid solver actually is here
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
