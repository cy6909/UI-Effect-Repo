# Build: Scroll Wave Image Gallery
## Goal
A tall, single-column **vertical gallery of 12 images that drift left and right in a rippling sine-wave pattern as you scroll**. Each image is its own ScrollTrigger: as it travels through the viewport, three layered sine waves (a slow **base** swell, a fast **flow** oscillation, and a fine **detail** jitter) are summed and scaled to viewport width to drive its horizontal `translate`, while a symmetric left/right `clip-path` inset **closes the image to a narrow slit at the top and bottom of its travel and opens it fully wide exactly when it is centered on screen**. A short intro title screen and outro title screen bookend the gallery. Smooth scroll is provided by Lenis wired into GSAP's ticker. The star effect is the organic, wave-like horizontal shimmer of the whole stack combined with the center-focused clip reveal.
## Tech
Vanilla HTML/CSS/JS with ES module imports (Vite/npm project). Use `gsap` (npm) plus the single GSAP plugin **`ScrollTrigger`**, and `lenis` (npm) for smooth scroll. No other plugins, no framework, no SplitText/CustomEase/Three.js.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
