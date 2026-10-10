# Scroll-Driven Arc Card Carousel with Synced Step Counter
## Goal
Build a single full-screen **pinned** section where a row of image cards is laid out along a **circular arc** (like cards resting on the rim of a giant wheel below the viewport) and **rotates through the top of the screen as you scroll** — each card swings up from the right, passes upright through the center, and swings off to the left, staying tangent to the arc the whole way. A large **step counter (01–05)** in the corner slides vertically to stay in sync with whichever card is currently centered. Smooth scroll via Lenis. The card positions are recomputed every frame with trigonometry (`cos`/`sin`) and applied through `gsap.set` — there is **no tween/timeline** on the cards themselves; only the counter uses a tween.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scroll. No other plugins, no framework:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Register once: `gsap.registerPlugin(ScrollTrigger);`. Wrap all setup in a `DOMContentLoaded` listener. Card positioning is done with a native `IntersectionObserver` (for the counter) plus GSAP.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
