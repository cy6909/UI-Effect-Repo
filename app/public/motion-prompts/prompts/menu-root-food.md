# Editorial Fullscreen Food Menu — Right-Docked Panel Expands to Full-Bleed Columns with Rising Split-Letter Reveal
## Goal
Build a magazine-style navigation overlay. A tiny fixed **"Menu"** button sits over a full-viewport food photo. Clicking it makes a **narrow dark panel docked to the right edge expand across the whole screen** into **five equal vertical columns**, while **giant slab-serif labels reveal letter-by-letter, rising up from below** each column with a staggered climb. Clicking **"Close"** reverses everything. Once open, **hovering a column reveals a food image** (a clip-path box growing from a center point to full rectangle) and **swaps the label** between a dark version sliding out and a muted duplicate sliding in. The star effect is the combination of the **CustomEase "hop" panel-width expansion** and the **per-letter `power3.out` staggered vertical reveal** of oversized rotated type.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`CustomEase`**. No ScrollTrigger, no SplitText (the letter splitting is done by a small hand-written helper, not the plugin), no smooth-scroll library — there is **no scroll interaction at all**; the whole thing is a fixed-position click-toggled overlay. Import as:
```js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
```
Ship `index.html`, `styles.css`, and an ES-module `script.js` (`<script type="module" src="./script.js">`).
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
