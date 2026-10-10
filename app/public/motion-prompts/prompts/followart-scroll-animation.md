# FollowArt Scroll Animation
## Goal
Build a vertical scroll page of six stacked full-screen sections (plus a footer). The signature effect: each section's inner content block starts tilted at **30 degrees** (pivoting from its bottom-left corner) and, as you scroll it into view, **scrubs back to level (0deg)**. At the same time each section **pins** at the bottom of the viewport so the next section slides up and overlaps it — producing a layered "card-deck" reveal where straightened panels stack underneath the incoming tilted one. Smooth scroll via Lenis.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scroll. No other plugins, no framework — plain Vite-style module imports:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
## Layout / HTML
`<main>` contains six `<section>` elements followed by a `<footer>`. Every section wraps its content in a single `.container`. The class order matters — sections are `.one` … `.six` and each has a distinct background color.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
