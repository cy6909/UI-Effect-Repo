# Landing Page Reveal — Revealer Wipe → Image Stack → Flip-to-Corner Intro
## Goal
Build a full-screen editorial fashion landing hero with a cinematic **load-triggered intro** (~8.6 s, plays once). Two white panels (top + bottom) split apart with a custom `hop` ease to reveal a full-bleed image; a deck of 8 images scales down from `1.5×` and fades in one after another so they cascade into place; then **GSAP Flip** shrinks the final three "main" images from full-screen down to a small stacked cluster of thumbnails in the bottom-left corner. Simultaneously the hero furniture slides in — the logo, nav links, address and a **SplitType**-split heading all rise up from behind clip-path masks, and a desaturated team image in the bottom-right unmasks upward. Everything is orchestrated by nested GSAP timelines that fire automatically on `DOMContentLoaded`.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`Flip`** and **`CustomEase`**, and **`split-type`** (npm, imported as `SplitType`) for the line-splitting. No smooth-scroll library — the page does not scroll during the intro; it is a pure load-triggered timeline. Register with `gsap.registerPlugin(Flip, CustomEase)` and fire the whole sequence on `DOMContentLoaded`.
Imports:
```js
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";
gsap.registerPlugin(Flip, CustomEase);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
