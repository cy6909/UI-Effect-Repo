# We Go Again — Click-to-Swap Project Showcase
## Goal
Build a full-viewport, three-column creative-agency showcase. The right column is a slim, internally-scrollable **vertical thumbnail gallery**; the wide middle column shows the currently featured project (big title, a paragraph of copy split into lines, credits, a large featured image); the left column holds the site nav + agency intro. Behind everything sits a **full-screen, heavily-blurred version of the featured image** as an ambient color wash. The star effect: **clicking any thumbnail runs a two-phase GSAP transition** — the current title/copy/credits lines slide **up and out** (staggered, accelerating) while the featured image **shrinks, rises and zooms**; then the details are rebuilt for the new project and the new text **rises in from below** while the new image **grows up from below and zooms back to normal** — and the blurred background **crossfades** between the two images the whole time.
## Tech
Vanilla HTML/CSS/JS with ES module imports, bundled by Vite. No framework.
- `gsap` (npm) — all motion. **No GSAP plugins, no ScrollTrigger.**
- `split-type` (npm, `SplitType`) — splits the copy paragraph into lines so each line can be masked/animated.
Import them as:
```js
import gsap from "gsap";
import SplitType from "split-type";
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
