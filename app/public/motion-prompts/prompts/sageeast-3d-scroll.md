# Sage East 3D Scroll
## Goal
Build a fixed, full-viewport **3D perspective slider** on a black stage. Ten editorial fashion cards sit at staggered `translateZ` depths inside a CSS `perspective` container and **fly toward the camera as you scroll a very tall (2000vh) page** — like flipping through a deck that keeps rushing out of deep space, alternating left and right. A **per-slide `ScrollTrigger` (scrub)** maps scroll progress to a shared Z increment, recomputes each card's `opacity` with a `mapRange` fade, and **cross-fades a blurred, full-screen background image** (`gsap.to`, `power3.out`) as each card reaches the front so the whole screen glows with the ambient color of the frontmost photo. There is no ScrollTrigger tween and no pinning — the scroll span itself is the timeline, and every transform is written by hand inside `onUpdate`.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** plus the GSAP plugin **`ScrollTrigger`** — nothing else (no Lenis, no SplitText, no CustomEase, no Three.js). Import as:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```
All setup runs inside a single `window.addEventListener("load", …)` so `getComputedStyle` can read each slide's initial `matrix3d`.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
