# PrototypeStudio Scroll Animation — Pinned Spotlight Counter + Image Column
## Goal
Build a portfolio "spotlight" section that gets **pinned and scrubbed over five viewport heights** while three things move in lockstep with scroll progress: a large uppercase **`01/10` counter** that both **updates its number** and **slides straight down** the left edge; a **vertical column of ten project images**, centered on screen, that **translates upward** so each image passes through the middle of the viewport in turn; and a bottom-right **list of ten project names** where each name **slides up within its own slice of the scroll** and **turns white while it is the active project**. The image currently crossing the horizontal midline **brightens from 50% to full opacity**. Smooth scroll via Lenis. There is a plain intro screen before and a plain outro screen after. This is **not a GSAP timeline** — it is a single pinned `ScrollTrigger` whose `onUpdate` callback drives everything with `gsap.set` off `self.progress`.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugin **`ScrollTrigger`**.
- **`lenis`** — smooth scroll.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
