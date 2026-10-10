# Gradual Blur Edges (Stacked Masked `backdrop-filter` Bands)
## Goal
Build a page whose edges **dissolve instead of being cut**. A progressive blur band is pinned to the bottom of the window and a long index scrolls under it, so the list never "ends" — it fades out of focus. A second band sits under a fixed header that rests on a full-bleed photograph, keeping the navigation legible without drawing a bar. A third sits on the right end of a horizontal rail, so the crop reads as *there is more* rather than as a bug. Each band is a **stack of N `backdrop-filter` layers whose linear-gradient mask windows deliberately overlap**, with a falloff curve distributing the radii. The only scroll-driven motion is the bottom band's height, animated through a single CSS custom property by two scrubbed ScrollTriggers.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, plus **`lenis`** for smooth scroll:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Everything runs inside a `DOMContentLoaded` listener. Register the plugin, then wire Lenis the standard way:
```js
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
