# Hero Warp Slider
## Goal
Build a **full-screen WebGL hero slider**: a Three.js fragment shader renders the current image cover-fit to the viewport, and **clicking anywhere advances to the next slide through an expanding "lens-warp bubble"** — a circular magnifying-lens distortion that grows from the center of the screen until the new image fills the frame. In sync, the overlay text (a big uppercase title split into characters, and a small description split into lines) **slides out upward and the next slide's text slides back in**, every fragment masked by an `overflow: hidden` wrapper. The star effect is the shader transition driven by a single GSAP tween on the `uProgress` uniform (0 → 1, 2.5s, `power2.inOut`) plus the GSAP/SplitText text choreography.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) with the **`SplitText`** plugin, and `three` (npm):
```js
import * as THREE from "three";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
gsap.config({ nullTargetWarn: false });
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
