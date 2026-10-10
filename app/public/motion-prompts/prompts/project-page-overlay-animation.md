# Project Overview Modal — Click-to-Reveal Sliding Detail Overlay
## Goal
Build a full-screen **project index**: a numbered list of projects sits at the bottom-left of a dark, non-scrolling viewport. Clicking any list row plays a **paused GSAP timeline** that slides a large white detail panel **up from far off-screen** while **un-rotating it from a 20° tilt to flat**, landing it pinned to the bottom-right. The panel's content (title, category, copy, link, image) is swapped in from a data array for whichever row you clicked. Clicking **Close**, or anywhere outside the panel, **reverses the same timeline** and the panel tilts and drops back off-screen. The star effect is that single tilt-corrected slide-up driven by one reversible timeline.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** only — **no GSAP plugins**, no ScrollTrigger, no Lenis, no SplitText.
```js
import gsap from "gsap";
import { data } from "./data.js";   // project content lives in a sibling module
```
No framework. `script.js` is loaded as `<script type="module" src="./script.js">` at the end of `<body>`, so it runs after the DOM is parsed — no `DOMContentLoaded` wrapper needed. The whole effect is **one `gsap.timeline({ paused: true })` with a single `.to()` tween**, played/reversed on click. Project a Vite-style dev server that resolves the npm import.
## Layout / HTML
Four top-level blocks in `<body>`: a fixed `.nav`, a fixed `.footer`, the hidden `.overlay` panel, and the `.container` holding the list. Class/ID names are load-bearing — the JS/CSS query them.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
