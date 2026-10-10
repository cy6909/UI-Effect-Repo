# WorkingStiff Animated Teams Section — Scroll-Scrubbed Rising Columns + Sliding Team Cards
## Goal
Build a full-screen scroll section that introduces a 3-person team. As the team block scrolls into view, three tall columns **rise up from below the viewport in a stagger**, each revealing a **giant yellow name-initial** that scales up from nothing. Then the section **pins for three viewport heights** and, still scrubbed by scroll, three **white team cards slide in from the right one after another** — each rotating from 20° back to upright and scaling from 0.75 up to 1 — landing centered to **cover the initials** with a portrait + role + name. Framed by a yellow-on-black hero heading above and a yellow-on-black outro heading below. Smooth scroll via Lenis. The two star effects are the **staggered rise + initial pop** and the **pinned staggered card slide-in**. Both are driven by **manual per-element progress math inside `ScrollTrigger.onUpdate` (not GSAP timelines)**. Desktop-only; disabled below 1000px.
## Tech
Vanilla HTML/CSS/JS with ES module imports, fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugin **`ScrollTrigger`**.
- **`lenis`** — smooth scroll.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
