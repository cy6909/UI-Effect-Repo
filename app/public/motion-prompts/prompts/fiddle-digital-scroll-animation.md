# Scroll-Scaling Editorial Image Grid
## Goal
Build a full-page scroll gallery: a dark editorial grid of portraits arranged in 10 four-column rows, where each row's images **scale up from 0 to 1** (from a corner transform-origin) as the row scrolls into view, then the row **pins** and its images **scale back down from 1 to 0** as it scrolls out — all driven by scrubbed ScrollTriggers and Lenis smooth scrolling.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` for smooth scrolling.
```js
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```
Run everything inside a `DOMContentLoaded` listener.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
