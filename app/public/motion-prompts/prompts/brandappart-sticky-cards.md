# Scroll-Pinned Sticky Cards Deck (3D tilt-off)
## Goal
Build a scroll-driven section that holds a **deck of four stacked cards** pinned in the middle of the viewport. As the user scrolls through the (long) pinned section, the **front card flies straight up while tilting back in 3D perspective (rotationX 0→35deg)**, and the cards stacked behind it **slide forward and scale up** to take the front position — one card handed off per scroll segment, in a continuous scrubbed loop. Smooth scroll via Lenis. There is an intro panel above and an outro panel below the pinned deck.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scroll. No other plugins, no framework — plain Vite-style module imports:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Register once: `gsap.registerPlugin(ScrollTrigger);`. Wrap all setup in a `DOMContentLoaded` listener.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
