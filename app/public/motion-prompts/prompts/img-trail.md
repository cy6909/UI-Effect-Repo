# Mouse Image Trail — cursor spawns image tiles that drop-and-fade on pause
## Goal
Build a full-viewport interactive canvas where **moving the mouse spawns image tiles at the cursor**, leaving a trail of stacked photos across the screen. The tiles keep piling up while the pointer is moving; **the instant the pointer pauses (~100 ms of no movement) GSAP animates the entire batch straight down off-screen** with a staggered scale-down + fade, then removes them. A centered uppercase headline sits behind the trail. The star effect is the `gsap.to(".item", …)` staggered drop (`y: 1000`, `scale: 0.5`, `opacity: 0`) fired on pointer-idle.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite + npm project. Install and import from npm:
- **`gsap`** (3.x) — the only dependency.
```js
import gsap from "gsap";
```
**No GSAP plugins** (no ScrollTrigger, SplitText, CustomEase), no Lenis, no Three.js, no canvas/WebGL. All logic runs inside a single `DOMContentLoaded` listener. Ship exactly three files: `index.html`, `styles.css`, `script.js`.
## Layout / HTML
A minimal document: one empty `.items` layer (JS injects tiles into it) and one headline `<h1>`. Class names are load-bearing — the JS queries `.items` and animates `.item`; the CSS positions both.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
