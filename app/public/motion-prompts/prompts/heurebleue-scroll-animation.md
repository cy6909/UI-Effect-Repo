# Scroll Zoom-Through Image Gallery ("Serene Drift")
## Goal
Build a scroll-driven **fly-through-the-images** effect: a fixed 5-column grid of photos sits pinned behind the page, and as a tall transparent spacer section scrolls past, a single `ScrollTrigger` (scrub) reads its progress and **scales the whole gallery wrapper up** (1 → ~3.65x on desktop, 1 → ~5x on mobile) while it **pushes the four side columns downward** and **shrinks the centered focal image from scale 2 down to ~1.15**. The viewer appears to accelerate forward through a wall of images. Opaque editorial sections (hero, intro, outro, footer) sit above the gallery; only the transparent spacer section lets the zooming gallery show through. Lenis drives smooth scrolling synced to GSAP's ticker.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, plus **`lenis`** for smooth scrolling:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
No frameworks. `script.js` is loaded as `<script type="module" src="./script.js">` at the end of `<body>`, so it runs after the DOM is parsed — no `DOMContentLoaded` wrapper is needed. There are **no tweens and no timeline** — the entire effect is **one `ScrollTrigger.create()` whose `onUpdate` writes absolute inline `style.transform` strings** every frame; all smoothing comes from `scrub: 1` + Lenis inertia.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
