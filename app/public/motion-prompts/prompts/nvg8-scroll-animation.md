# Nvg8 Scroll Animation — Pinned Scroll-Scrubbed SVG Stroke Reveal
## Goal
Build a single full-screen intro that is **pinned for eight viewport heights and scrubbed with Lenis smooth scroll**, driving one GSAP timeline. As you scroll: **nine thick, rounded, outlined SVG bars draw themselves on** (via `strokeDashoffset`) in a deliberately shuffled order across three horizontal rows; then **two big curved strokes draw on and then un-draw**; at the timeline's midpoint the whole section **flips from a warm light theme to a dark theme with a swapped headline**; and finally the three rows of bars **slide off to the right** with a stagger to reveal a plain outro section. Every bar has a darker cloned "border" path behind it, so each colored stroke reads as an outlined shape. The star effect is the staggered scroll-scrubbed stroke-drawing choreography.
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
