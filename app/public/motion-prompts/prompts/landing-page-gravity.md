# Physics Gravity Landing Page (Matter.js drop + GSAP overlay)
## Goal
Build a full-viewport, single-screen hero where **twelve small image tiles** (90×60px each, thin black border) are scattered across a flat acid-lime panel. A `[ Drop / Raise ]` button in the top-right toggles real physics: on **Drop**, Matter.js gravity switches on and all twelve tiles **fall, tumble with random spin, bounce and pile up on an invisible floor** at the bottom. On **Raise**, gravity switches off and a manual eased `requestAnimationFrame` lerp **glides every tile back to its exact starting position and 0° angle**. In sync with the drop, GSAP animates the lime overlay's `clip-path` (collapsing it into a thin band at the bottom), grows and re-positions the giant `Freefall` headline, flips the toggle button's color, and reveals four columns of footer nav links from behind a clip mask. Raising reverses all of it. The whole thing is one screen — no scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports (Vite-style npm imports). Use:
- `gsap` (npm) — for all the overlay/headline/text/button tweens. **No GSAP plugins** (no ScrollTrigger, no SplitText — text splitting is done by hand).
- `matter-js` (npm) — the physics engine. Destructure `const { Engine, Runner, World, Bodies, Body, Events } = Matter;`.
```js
import gsap from "gsap";
import Matter from "matter-js";
```
No smooth-scroll library, no canvas, no WebGL. Matter.js runs **headless** (no `Render`) and its bodies drive the DOM tiles via inline `style.top/left/transform` on every `afterUpdate` tick. All code runs at module top level (no `DOMContentLoaded` wrapper needed since the module is loaded at end of `<body>`).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
