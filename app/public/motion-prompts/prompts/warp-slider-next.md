# Warp Lens Slider
## Goal
Build a **full-screen WebGL image slider**: a Three.js canvas fills the viewport and shows one cinematic photograph at a time, with a big centered uppercase title and a small description block layered on top in HTML. **Clicking anywhere** advances to the next slide with the signature effect — a **circular "lens bubble" expands from the exact center of the screen**, revealing the incoming photo inside it while the bubble's rim **warps the new image with a magnifying-glass distortion** (a custom fragment shader). While the bubble grows, GSAP slides the title characters and description lines up out of their masks and staggers the next slide's text back in. Slides loop forever in one direction.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`SplitText`** plugin, plus **`three`** (npm) for the WebGL layer:
```js
import * as THREE from "three";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
```
Call `gsap.registerPlugin(SplitText)` and `gsap.config({ nullTargetWarn: false })` (content nodes are removed mid-timeline, so null targets must not warn). You may keep the slide data and the GLSL shader strings in separate local modules (e.g. `slides.js`, `shaders.js`) or inline in `script.js`.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
