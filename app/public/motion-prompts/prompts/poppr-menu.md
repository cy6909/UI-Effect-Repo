# Fullscreen Overlay Menu — Gooey SVG-Path Liquid Curtain + Elastic SplitText Links
## Goal
Build a fixed navbar with a **Menu / Close** text toggle in the top-right corner that opens a **fullscreen overlay menu**. The signature effect: clicking the toggle drops a **gooey liquid "curtain"** down over the whole viewport by morphing a single SVG `<path>`'s `d` attribute through a quadratic-Bézier belly (it sags down like dripping paint before flattening to fill the screen), and as it lands the nav-link characters **snap in one-by-one from far off the right edge with a springy `elastic.out` ease** while the contact-info lines stagger up from below. Clicking **Close** reverses the whole thing: content fades, and the curtain retreats back up through an upward Bézier belly until it vanishes off the top. Entirely click-driven — no scroll, no autoplay.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`SplitText`**. No ScrollTrigger, no smooth-scroll library. Import as:
```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
```
Wrap all code in a `DOMContentLoaded` listener.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
