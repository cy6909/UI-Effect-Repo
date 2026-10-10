# Sticky Cards — Scroll-Pinned 3D Flip & One-by-One Dismiss
## Goal
Build a full-screen, scroll-pinned hero where a stack of cards rises into view while the headline slides out the top; past the halfway point a single "front" card performs a springy 3D flip to reveal four tilted, colored cards fanned on top of each other, which are then dismissed upward one at a time as you keep scrolling. The star effect is the **elastic 3D card flip driven by a long scrubbed, pinned ScrollTrigger**, combined with a **staggered per-card dismiss** keyed to precise scroll-progress windows.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Build under Vite (npm). Use:
- `gsap` (npm) with the plugin **`ScrollTrigger`** (`gsap/ScrollTrigger`), registered via `gsap.registerPlugin(ScrollTrigger)`.
- `lenis` (npm) for smooth scroll, wired into GSAP's ticker.
- Icon glyphs via the **Ionicons** web component (`ion-icon`) — see **Icons** below for the exact version and where to get it. No raster images are used.
Wire Lenis to GSAP exactly like this:
```js
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
