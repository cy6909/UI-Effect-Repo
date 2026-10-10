# Scroll-Powered Full-Screen Project Carousel (Clip-Path Wipes + Marquee Titles)
## Goal
Build a full-screen, editorial project carousel that is **pinned by ScrollTrigger and driven entirely by scroll progress**: as the user scrolls through 15 viewport-heights of pinned distance, 5 slides swap in and out. Each swap is a **1-second clip-path polygon wipe** — the incoming slide unclips from one edge while the outgoing slide collapses toward the opposite edge — combined with **opposing parallax `y` translations** on the slide image (±25%) and the slide copy (±100%), all on `power4.inOut`. On every slide, the giant project title scrolls sideways forever as an **infinite GSAP linear marquee**, and **5 progress bars** at the bottom fill left-to-right via a `--progress` CSS variable. Direction-aware: scrolling back reverses the wipe direction. Scroll is smoothed with Lenis.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, plus **`lenis`** for smooth scrolling:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
Everything runs inside a `DOMContentLoaded` listener. Wire Lenis the standard way:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
