# Interactive Logo Depth Tunnel
## Goal
Build a full-viewport hero that frames a centered monogram logo inside a **tunnel of concentric, logo-shaped holes** receding into depth. Five solid, purple, full-bleed layers each have the **same glyph silhouette punched out of them** at progressively smaller sizes (via `mask-composite: subtract`), stacked with a sixth layer that holds the real logo image at the very center. As the pointer moves over the hero, every layer **trails the cursor** — but each one reads a progressively *older* cursor position from a frame-buffer (an 8-frame stagger per layer) and eases toward it with a slow lerp. The result is a soft, cascading parallax "wormhole": the inner logo leads, the outer rings lag behind like a comet tail, and the whole tunnel swings toward wherever the mouse is. No scroll, no click — pure `mousemove` + a per-frame ticker.
## Tech
Vanilla HTML/CSS/JS with an ES-module entry (`<script type="module">`). **Only dependency is `gsap` (npm)** — no plugins, no ScrollTrigger, no Lenis, no Three.js. The motion uses `gsap.ticker.add(...)` for the per-frame loop, `gsap.utils.toArray(...)` to collect the layers, and `gsap.set(...)` to write transforms. Runs in a fresh Vite project with a single import: `import gsap from "gsap"`.
## Layout / HTML
One hero section containing **six sibling `.depth-layer` divs**. The first five each wrap a `.depth-mask`; the sixth wraps a `.logo` with the `<img>`:
```html
<section class="hero">
  <div class="depth-layer"><div class="depth-mask"></div></div>
  <div class="depth-layer"><div class="depth-mask"></div></div>
  <div class="depth-layer"><div class="depth-mask"></div></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
