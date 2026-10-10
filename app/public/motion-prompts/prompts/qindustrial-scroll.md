# Lenis Smooth Scroll + ScrollTrigger — Expanding Service-Row Thumbnails
## Goal
Build a long, smooth-scrolling page with a full-screen photo hero, a black "All Services" list section, and a full-screen photo footer. The star effect is in the services list: it is a stack of thin service rows, and **as each row scrolls up into view its small thumbnail expands from 30% to 100% width while the row itself grows in height from 150px to 450px**, driven by two per-row scrubbed ScrollTriggers. Scrolling is smoothed by Lenis synced to GSAP's ticker, and the per-row triggers are created **lazily** the first time each row enters the viewport (via an IntersectionObserver).
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugin **`ScrollTrigger`**.
- **`lenis`** — smooth scroll, wired into GSAP's ticker.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
