# Photo Dump Scroll Scatter — Pinned Ring of Cards that Fly In and Out
## Goal
Build a full-screen, pinned "photo dump" gallery. A dark section pins in place for **six viewport heights of scroll**, split into **four segments**. In each segment, **15 rotated photo cards** are scattered in a loose ring around a **centered serif heading**. Every time you cross a segment boundary, the whole set re-shuffles: the current 15 cards **fly out to their nearest screen edge** (accelerating away) while 15 fresh cards from the **next image set fly in from the edges** (decelerating into place) with a half-second overlap, and the heading **cross-fades** to a new phrase. The star effect is this choreographed scatter-out / scatter-in card swap driven by scroll position while the section stays pinned.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**, and `lenis` (npm) for smooth scroll. No other plugins, no framework:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Register once: `gsap.registerPlugin(ScrollTrigger);`. Run everything inside `document.addEventListener("DOMContentLoaded", …)`. Must run in a fresh Vite + npm project. Ship one `index.html` (`<link rel="stylesheet" href="./styles.css">` and `<script type="module" src="./script.js">`), one `styles.css`, one ES-module `script.js`.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
