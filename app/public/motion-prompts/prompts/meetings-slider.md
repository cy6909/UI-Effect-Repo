# Arc Card Slider with Clip-path Reveal & Counter-rotating Images
## Goal
Build a **click-driven fullscreen slider** that shows **three cards laid out on a horizontal arc** — a `prev` card on the left, the `active` card upright in the center, and a `next` card on the right. Clicking a side card (or a name in the bottom-left list) fires a **single 2-second GSAP transition on a CustomEase called "hop"** where: the clicked side card **orbits into the center**, un-rotating to 0° while its **clip-path opens from a small centered window to a full rectangle**; the old center card **orbits out to the opposite side**, rotating ±90° while its clip-path **closes back into the centered window**; the far outgoing card **scales to zero and fades**; and a brand-new card is spawned on the vacated side, **scaling up from zero**. Throughout, each card's frame rotates while its **inner image counter-rotates** to stay upright. In parallel, the big center **title swaps letter-by-letter** (per-character `<span>` y-staggers), a **blurred background preview image cross-fades**, and a slow CSS `pan` keyframe zooms that preview forever. The star effect is the synchronized clip-path-open / clip-path-close / counter-rotation choreography on the shared "hop" ease.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`CustomEase`**:
```js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1");
```
No Lenis, no ScrollTrigger, no Three.js. The page does not scroll — the whole thing is a fixed fullscreen stage. Wrap all setup in a `DOMContentLoaded` listener.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
