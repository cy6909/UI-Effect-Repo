# Lottie Scroll Animation (Scroll-Scrubbed Full-Screen Lottie Hero)
## Goal
Build a cinematic, full-viewport hero whose background is a **Lottie animation scrubbed frame-by-frame by scroll position**. A fixed, full-screen Lottie (a movie exported to a JSON of embedded frames) sits behind the page; a **GSAP ScrollTrigger with `scrub` tweens a virtual playhead from frame 0 to the Lottie's last frame**, calling `goToAndStop` on every update, so the clip plays forward as you scroll down and reverses as you scroll up — never autoplaying on its own. A tall `gradient` section wipes the fixed animation to black, and normal black website content scrolls up over it. A slowly-jittering film-grain overlay and a `saturate(2)` filter give it a warm, analog, cinematic finish.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin, plus **`lottie-web`** for the Lottie player. No Lenis, no other plugins.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";
gsap.registerPlugin(ScrollTrigger);
```
Everything runs inside a `DOMContentLoaded` listener. There is exactly **one tween** (a `gsap.to` on a playhead object) whose motion is entirely scroll-driven — the Lottie is loaded with `autoplay:false`, `loop:false`, so nothing moves except via scroll.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
