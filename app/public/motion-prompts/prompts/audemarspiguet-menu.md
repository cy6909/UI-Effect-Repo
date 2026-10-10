# Fullscreen Overlay Menu — Rotating Background Doors + Masked Line Reveal
## Goal
Build a fixed top navbar with a circular hamburger toggle that opens a **fullscreen overlay menu**. The signature effect: two full-height background halves, each pre-rotated 180° and scaled ×2 around their inner edge, **rotate back to 0° so they sweep in like two closing blades/doors** on a custom cubic-bezier ease, while the hamburger bars **morph into an X** at the same time; then two columns of menu links plus a footer **reveal line-by-line from a mask with a staggered `power3.out` slide-up**. It is a single **paused GSAP timeline**: clicking the toggle `.play()`s it to open, clicking again `.reverse()`s the exact same timeline to close.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`SplitText`** and **`CustomEase`**. No smooth-scroll library, no ScrollTrigger — the whole thing is click-driven. Import as:
```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(SplitText, CustomEase);
```
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
