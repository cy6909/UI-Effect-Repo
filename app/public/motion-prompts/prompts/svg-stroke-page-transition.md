# SVG Stroke Page Transition — Two Self-Drawing Squiggle Strokes That Swell to Wipe the Screen
## Goal
Build a tiny multi-page site (three full-screen hero "pages": **Home / About / Contact**) with a fixed top navbar. The star effect is the **page transition**: clicking a nav link runs a two-phase GSAP sequence over two full-screen, winding inline-SVG paths. **Leave phase** — both squiggly strokes *draw themselves in* (classic `strokeDasharray`/`strokeDashoffset` line-draw) while their `stroke-width` **swells from 200 to 700**, so the two fattening ribbons cover the entire viewport and wipe out the old page. Then the visible page is swapped underneath. **Enter phase** — the strokes *keep drawing out* the same direction (dashoffset continues past zero into negative) while the `stroke-width` **thins back from 700 to 200**, uncovering the new page. It is entirely click-driven — no scroll, no autoplay. A small hand-rolled "fake router" toggles which hero is visible (this stands in for a framework router like next-transition-router).
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) only. **No GSAP plugins, no ScrollTrigger, no Lenis, no SplitText.**
```js
import gsap from "gsap";
```
No `gsap.registerPlugin(...)` — nothing to register.
## Layout / HTML
A `<nav>`, one fixed full-screen `.transition-svg` overlay holding the two paths, and three `.hero.page` sections (only the active one is displayed). Class names and `data-route` attributes are load-bearing (the JS queries them).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
