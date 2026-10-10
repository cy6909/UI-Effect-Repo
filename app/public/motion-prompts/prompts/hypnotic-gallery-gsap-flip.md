# Hypnotic Image Gallery — GSAP Flip Layout Morph (3 layouts) + Lenis Scroll List
## Goal
Build a full-viewport image gallery of **14 tiles** that **morphs between three completely different layouts** when you click the numbered nav items (`01` / `02` / `03`). The star effect is **GSAP Flip**: on every switch it records the on-screen state of all 14 tiles, swaps a single layout class on the gallery, then animates every tile smoothly from its old position/size to its new one with a custom **"hop"** ease and a tiny per-tile stagger. Layout `01` is a scattered editorial grid, layout `02` is a small vertical column that becomes a **Lenis-smoothed vertical scroll list** (a framed "minimap" box and a hidden full-size preview column fade in and drift as you scroll), and layout `03` piles all 14 tiles into a single stacked deck in the top-right corner.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`Flip`**, **`CustomEase`**, and **`ScrollToPlugin`**, and **`lenis`** for smooth scroll. Imports:
```js
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
gsap.registerPlugin(Flip, CustomEase, ScrollToPlugin);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
