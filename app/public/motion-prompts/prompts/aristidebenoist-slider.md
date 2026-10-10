# Fullscreen Horizontal Slider — Segmented Progress Nav + Kinetic Display-Type Titles
## Goal
Build a full-screen horizontal image carousel with a signature choreography driven entirely by **clicking segments in a top progress-bar navigation**. Each slide holds one centered image. Above them sits a slim horizontal bar split into 30 thin segments; the **active segment stretches wide** (a pure-CSS `flex` grow) while the others stay hairline-thin. Clicking a different segment does three things at once, all `1.5s` long on a custom **`"hop"` CustomEase**: (1) the whole horizontal track of slides **slides sideways** to the chosen slide, (2) a full-screen **background-color overlay tweens to a new random color**, and (3) a giant two-row **display-type title** re-animates — every letter is destroyed and re-created, then **slides in from the side** (from the right when advancing, from the left when going back) with `power2.out`. It's an editorial portfolio slider: oversized serif kinetic typography floating over a color wash, with a centered image per slide.
## Tech
- Vanilla HTML / CSS / JS with ES module imports, bundled by a **Vite**-style dev server (npm project).
- **`gsap` (npm)** plus exactly one GSAP plugin: **`CustomEase`**. No ScrollTrigger, no SplitText, no smooth-scroll library, no canvas/WebGL. The whole thing is **click-driven** — there is no scroll and no rAF loop.
- Imports and registration:
```js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1");
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
