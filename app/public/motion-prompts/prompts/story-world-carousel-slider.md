# Story World Carousel Slider — Click-Advanced Clip-Path Reveal + Animated Hour Timeline
## Goal
Build a **fullscreen, click-advanced photo carousel** on a black page. Every click on the page swaps to the next image with a single cinematic move: the current image **slides left and off** while the next image is **wiped into view by expanding its `clip-path` from a zero-width sliver pinned to the right edge out to the full frame**, its own picture **easing in from the right** at the same time. Layered on top, a horizontal row of **hour labels (1pm → 8pm)** animates its `flex-grow` values so the "active" hour balloons wide while the rest compress — and the whole label strip **recycles itself so both the images and the clock loop forever**. Every tween shares one bespoke `CustomEase` called `"hop"` that gives the motion a soft, slightly overshooting settle. The whole stage sits under a 50% black scrim for an editorial, dusk-lit mood.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`CustomEase`** (imported from `gsap/CustomEase` and registered). No ScrollTrigger, no SplitText, no smooth-scroll library — the component is **click-driven**, not scroll-driven. No images data module; the five `<img>` are written directly in the HTML.
```js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
```
## Layout / HTML
A near-empty document — five stacked full-screen slides, a fixed nav and footer, and the hour timeline.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
