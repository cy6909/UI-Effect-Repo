# Studio Navbar — Scroll-Expanding 16:9 Window with Flip Logo Fly
## Goal
Build a fixed, centered **16:9 "navbar window"** — a cream panel carrying two pairs of nav links and an oversized studio logo — floating over a **full-viewport fixed cinematic backdrop image**. The star effect: as you scroll the first viewport height, the cream window **expands from ~50% width up to fullscreen** (scrubbed frame-by-frame via `ScrollTrigger.onUpdate` + `gsap.utils.interpolate`), the nav links hold their pixel width near the corners instead of spreading, and simultaneously a **paused GSAP Flip animation flies the big bottom-centered logo up to a small pinned position at the very top**, shrinking it as it goes. Once the window has filled the screen, further scrolling reveals a plain hero heading and an about section. Smooth scroll via Lenis. Desktop-only for the expand effect; mobile gets a static full-screen fallback.
## Tech
Vanilla HTML/CSS/JS with ES module imports, fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugins **`ScrollTrigger`** and **`Flip`**.
- **`lenis`** — smooth scroll.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";
import Lenis from "lenis";
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
