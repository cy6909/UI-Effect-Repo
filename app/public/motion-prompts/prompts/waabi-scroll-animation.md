# Waabi Scroll Animation — Pinned Hero with Manual Progress Mapping + Parallax Columns
## Goal
Build a scroll-driven hero that is **pinned for 3.5 viewport heights** while a single scrubbed `ScrollTrigger`'s `progress` is **mapped by hand** into four sequential phases: a centered heading **slides up out of frame**, a supporting line **reveals word-by-word** (SplitText) then **fades out**, and the **full-screen hero image shrinks into a tiny 150 px rounded card** anchored at screen center. After the hero unpins, a following section **parallax-scrolls four columns of small square thumbnails upward at two different speeds**. Smooth scroll via Lenis. The star effect is the single manually-mapped pinned ScrollTrigger driving all four hero phases off one `progress` value.
## Tech
Vanilla HTML/CSS/JS with ES module imports, fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugins **`ScrollTrigger`** and **`SplitText`**.
- **`lenis`** — smooth scroll.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
