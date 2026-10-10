# Editorial Portfolio Gallery — Fixed Project Number that Sticks at Center then Peels Upward as the Next Section Pushes it Out
## Goal
Build a tall, scroll-driven vertical portfolio. Eight full-viewport project sections scroll past under smooth (Lenis) scrolling. On the left edge of each section a large **two-digit project number** (01–08) sits pinned; when a section reaches the vertical center of the screen its number **switches from absolutely-positioned to `position:fixed` at `top:50vh`** so it hangs at screen-center, and the moment the **next** section climbs into view the number **peels upward out of a fixed-height mask** — the mask, an inner digit-wrapper, and each of the two digit glyphs all translate `y:-80` with **staggered durations and delays** so the number exits in layers. Meanwhile a slim right-edge **progress bar** fills top→bottom, a small **project-name list** on the left has a triangular **indicator that hops down one row per section** while the current name goes black, and a **bottom-right preview thumbnail swaps to whichever gallery image is currently crossing the viewport's vertical center**. The star effect is the layered, velocity-aware masked-number push-up driven entirely from a single per-frame `ScrollTrigger.onUpdate` reading `getBoundingClientRect()`.
## Tech
Vanilla HTML/CSS/JS with ES module imports, fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) plus the plugin **`ScrollTrigger`** only.
- **`lenis`** — smooth scroll.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
