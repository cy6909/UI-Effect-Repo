# Sticky Cards that Fold Away in 3D on Scroll
## Goal
Build a scroll-driven "sticky card deck" page: four full-height, brightly colored art cards stack on top of each other. As you scroll, each card stays pinned while its inner panel folds away in 3D — sliding up, pushing back in Z and tilting 45° on the X axis — and darkens under a fading black overlay as the next card slides over it. Smooth scrolling via Lenis.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm), the GSAP plugin `ScrollTrigger`, and `lenis` for smooth scrolling.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
