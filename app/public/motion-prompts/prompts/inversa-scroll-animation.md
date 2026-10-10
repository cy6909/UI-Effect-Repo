# Inversa Scroll Animation
## Goal
Build a single pinned hero that plays a **scroll-scrubbed "map framing" sequence** driven entirely by one `ScrollTrigger.onUpdate` handler doing hand-written smoothstep math (no tweens, no timeline). As you scroll four viewport-heights of pinned distance: a column of four stacked text blocks **slides up** through the viewport; a very tall (200svh) aerial photo **parallaxes in the opposite direction** (it drifts *down* while the text goes *up* — this counter-motion is the "inversa" idea); a fixed dark layer carrying a **subtractive vertical-bar SVG mask scales from 2.5 → 1** to squeeze the photo into a narrow bar-code-shaped window while the photo simultaneously **desaturates to grayscale and darkens**; and a **blueprint grid overlay**, **two pulsing location markers**, and a **vertical progress bar** fade in during the middle "analysis" phase, then everything reverses — the mask scales back to 2.5, color returns, overlays clear — as the sequence resolves. Smooth scroll via Lenis. A short outro section follows once the pin releases.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scroll. No other plugins, no framework, no Three.js, no SplitText/CustomEase. Plain Vite-style module imports:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Register once at top level: `gsap.registerPlugin(ScrollTrigger);`. Wrap all setup in a `DOMContentLoaded` listener.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
