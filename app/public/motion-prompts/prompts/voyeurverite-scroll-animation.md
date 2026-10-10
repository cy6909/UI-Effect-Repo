# VoyeurVerite Scroll Animation — Pinned Rotating-Slit Hero over Five Viewports
## Goal
Build a full-screen editorial hero that is **pinned and scrubbed across five viewport heights**, driven by a **single manual `ScrollTrigger.onUpdate` handler** (NOT a `gsap.timeline`) that reads `self.progress` and hand-computes four sequential phases with `gsap.utils.clamp` + `gsap.utils.interpolate`. In order, as you scroll: a full-bleed foreground image **clips inward to a thin central vertical slit** while a dark overlay simultaneously **fades in over it** (so the slit goes black); the slit then **rotates to 65°**; then it **scales down to zero** while, behind it, two background text columns **slide apart** and a gold accent overlay **flash-fills the shrinking slit**; then two side-by-side outro images **wipe in via clip-path** (left one top-down, right one bottom-up); and finally, once scroll passes 90%, a **line-masked SplitText headline staggers up** with a real (non-scrubbed) tween. Smooth scroll via Lenis. Then a plain dark `about` section follows.
## Tech
Vanilla HTML/CSS/JS with ES module imports (fresh Vite project). Install and import from npm:
- **`gsap`** (3.x) plus the plugins **`ScrollTrigger`** and **`SplitText`**.
- **`lenis`** — smooth scroll.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
