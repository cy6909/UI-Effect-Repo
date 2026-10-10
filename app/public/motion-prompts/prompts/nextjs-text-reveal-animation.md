# Text Reveal Animation (Masked Line-by-Line Scroll Reveal)
## Goal
Build a minimal, editorial one-page site for a fictional design studio ("Greyloom") where **every headline, label and paragraph reveals itself line by line**: GSAP **SplitText** breaks each text block into lines, each line is wrapped in an overflow-clipping mask, pushed down to `y: 100%`, and slid up to `y: 0%` with a `power4.out` ease and a 0.1s stagger — triggered **once per block when it scrolls to 75% of the viewport** (the hero headline plays on load with a 0.5s delay). Scrolling is smoothed with Lenis. The reveal system is generic and attribute-driven (`data-copy`, `data-copy-wrapper`, `data-copy-delay`, `data-copy-scroll`).
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`SplitText`** and **`ScrollTrigger`** plugins, plus **`lenis`** for smooth scrolling:
```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(SplitText, ScrollTrigger);
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
