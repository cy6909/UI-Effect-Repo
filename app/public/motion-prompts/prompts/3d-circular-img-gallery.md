# 3D Circular Image Gallery
## Goal
Build a full-screen 3D scene where **32 small image tiles (18 on phones) are arranged around a circle using CSS 3D transforms to form a single tilted ring** seen in perspective — like a carousel viewed from above and to the side. Four GSAP-driven behaviours: (1) on load the tiles are **dealt out** — they start stacked on one point of the ring at 30% scale and fan to their places with a stagger; (2) **scrolling spins the entire ring a full 360°** via a scrubbed ScrollTrigger over a very tall page; (3) **dragging with mouse or finger spins it directly**, with inertia after release, composing with the scroll instead of fighting it; and (4) **moving the mouse parallax-tilts the whole ring** toward the cursor. Hovering (or tapping) any tile nudges it outward in 3D and swaps a large centered preview still. Nothing is a framework — plain DOM + CSS `preserve-3d` + `perspective`, with GSAP doing every animation.
**The count is the design decision.** The obvious version of this component packs 150 tiles at 2.4° apart, and it looks impressive in a thumbnail and illegible in use: neighbouring tiles overlap into a solid sawtooth wall, no single frame is readable, and you are looking at a texture, not at an archive. 32 tiles at 11.25° leave visible air between neighbours, so each still reads as a *frame*. The trap: whatever number you land on, the on-screen label has to be written from that same constant. The original shipped a hard-coded "150 frames" in the footer, which is exactly the kind of copy that survives three refactors of the number it describes.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin `ScrollTrigger`. No Lenis, no Three.js, no SplitText — the 3D is pure CSS transforms and GSAP tweens `rotationX/rotationY/rotationZ/x/y/z`. Register with `gsap.registerPlugin(ScrollTrigger)`. Must run in a fresh Vite + npm project. Import shape:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
