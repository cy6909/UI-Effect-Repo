# Epic Scroll Story — Rotating Clip-Path Cross that Scales Up to Wipe the Screen
## Goal
Build a long, cinematic single-page scroll story. A tiny white **plus/cross shape** sits over a pinned dark editorial section; as you scroll, it **rotates a full 360°**, its `clip-path` **expands** from a thin cross into a solid white square, it **drifts horizontally** from left-of-center to center, and finally **scales up ~13×** to white-out the entire viewport and hand off to a final white content section. Everything is driven by several scrubbed / `onUpdate` GSAP ScrollTriggers over Lenis-smoothed scrolling, plus two pinned sections.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**, and **`lenis`** for smooth scroll.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
Run everything inside a `DOMContentLoaded` handler.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
