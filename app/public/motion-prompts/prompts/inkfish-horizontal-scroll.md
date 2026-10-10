# Draggable Timeline Horizontal Scroll — 500vw Editorial Track Panned by a Bottom Scrubber
## Goal
Build a **full-screen, black editorial fashion gallery** whose content lives on one enormous **500vw horizontal track** (five side-by-side full-viewport sections that alternate text and image spreads). The page itself never scrolls. Instead a **draggable "timeline" scrubber pinned to the bottom** of the screen — sitting over a ruler of thin vertical tick-marks — is dragged left/right, and that drag **pans the whole track horizontally**. The star effect: as you drag the scrubber, its position is normalized to a 0→1 progress that maps onto a **0 → −400vw** pan, and the track **eases to that target with a trailing, momentum-style `power3.out` tween** (each drag frame re-fires a 1s tween, so the track glides and lags smoothly behind your hand rather than snapping). Built with GSAP **Draggable**.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`Draggable`**. No ScrollTrigger, no smooth-scroll library, no canvas/WebGL. Import as:
```js
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";   // or "gsap/all"
gsap.registerPlugin(Draggable);
```
## Layout / HTML
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
