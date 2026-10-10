# Scroll-Pinned Horizontal Heading + Fly-Across Product Cards
## Goal
Build a scroll-driven, **pinned** section where a **giant single-line heading slides horizontally to the left** as you scroll, while **five product cards fly in from off the right edge, travel all the way across the screen and off the left**, each one **staggered by a scroll delay** and following its own hand-authored path of vertical bob + rotation. The whole section is pinned for 5 viewport heights of scroll, smooth-scrolled with Lenis. The star effect is the interplay between the massive horizontally-panning title and the swarm of cards arcing across it, all scrubbed 1:1 to scroll via a single `ScrollTrigger.onUpdate` that recomputes every element per frame with `gsap.utils.interpolate`. A full-bleed hero image sits above the pinned section and a plain dark outro sits below it.
## Tech
Vanilla HTML/CSS/JS with ES module imports (Vite/npm project). Use `gsap` (npm) plus the single GSAP plugin **`ScrollTrigger`**, and `lenis` (npm) for smooth scroll. No other plugins, no framework, no SplitText/CustomEase/Three.js.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Register once: `gsap.registerPlugin(ScrollTrigger);`. Wrap all setup in a `DOMContentLoaded` listener.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
