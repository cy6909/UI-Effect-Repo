# Thetalab — Hover Preview Landing
## Goal
Build a dark, full-screen studio/portfolio landing page. The left third of the screen holds a vertical list of 10 project names (pill chips). **Hovering a name crossfades a full-bleed background photo AND reveals a floating "preview card"** for that project — a portrait image that wipes open via an animated `clip-path`, plus a large title, a tags line, and a short description that each slide into place from different directions. Each project uses one of 3 rotating layout **variants** that place the card pieces in different corners and make the image wipe open from a different edge. Moving off the list crossfades everything back to a default muted background.
## Tech
Vanilla HTML/CSS/JS with ES module imports, bundled by Vite. Use **`gsap`** (npm) only — no GSAP plugins are needed (the `clip-path` polygon is tweened by GSAP's built-in CSSPlugin because both keyframes share the same 4-point count). No smooth-scroll / Lenis (the page never scrolls). No canvas, no WebGL.
```
import gsap from "gsap";
```
## Layout / HTML
Everything lives inside one fixed, `overflow: hidden`, 100vw×100vh black container. Static markup:
- `.container` (fixed, `background-image: var(--sky)`, overflow hidden)
  - `nav` — three equal flex columns (`nav > div { flex:1 }`):
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
