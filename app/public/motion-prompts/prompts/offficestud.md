# Three.js 3D Scroll Experience
## Goal
Build a full-page editorial hero for a fictional furniture design studio (**"oak atelier"**) whose star effect is a **fixed Three.js furniture model** (a designer chair loaded from a GLB) floating in the center of the viewport. On load the model **scales up from nothing** with an elastic-free ease; it then **bobs gently up and down forever** (a sine float) while its **X-axis rotation is driven directly by page-scroll progress** — as you scroll the 400vh page the chair tumbles head-over-heels through two full revolutions (4π radians). Smooth scrolling is handled by **Lenis**, wired into GSAP's ticker, and the same ticker also runs the Three.js render loop. A secondary effect: the closing headline is split into lines and **each line masks up into view with a staggered translateY** via ScrollTrigger.
## NON-NEGOTIABLE visual requirements (get these exactly right)
These are essential — a reproduction that misses them does not look like the original, even if the animation is perfect:
1. **Dark canvas, always.** The page background is a near-black **`#111111`** with **white (`#fff`) text**. There is no light mode, no white page. The transparent WebGL chair floats above this dark canvas. If you ship a white/unstyled page you have failed the brief.
2. **The stylesheet MUST be linked.** The `index.html` `<head>` must contain `<link rel="stylesheet" href="./styles.css" />`. Without it the page renders 100% unstyled (white background, browser-default type, a raw blue underlined link) — this is the single most common way this build breaks. See the full HTML skeleton below.
3. **Real display typography.** A **huge 225px uppercase grotesque headline** and **120px serif archive titles** — load actual web fonts (below). System-font fallbacks (Helvetica/Times) do not read like the original.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** plus the GSAP plugin **`ScrollTrigger`**, **`three`** (Three.js core + `GLTFLoader` from `three/examples/jsm/loaders/GLTFLoader.js`), **`lenis`** for smooth scroll, and **`split-type`** for the headline line-split. Imports:
```js
import gsap from "gsap";
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
