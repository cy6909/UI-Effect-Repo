# Full-Screen Overlay Menu with Clip-Path Wipe & Lerped Highlighter
## Goal
Build a fixed top navbar whose **Menu** toggle opens a full-screen dark overlay that **wipes open from the bottom edge upward via an animated `clip-path` polygon**. As it opens, two columns of meta text fade/slide in, a small centered image scales up, and a row of five oversized (Anton, 10rem) menu links **stagger up into view from a mask**. On desktop, each link does a **per-character vertical swap on hover** (SplitText), a lime **highlighter bar slides + resizes to track the hovered link** using a lerp loop, and the **entire link strip pans horizontally with the mouse X position** (also lerped). It is a click-to-open/close menu, not scroll-driven.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm), the GSAP plugins **`ScrollTrigger`** and **`SplitText`**, and **`lenis`** for smooth scroll. Import as:
```js
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from "lenis";
```
Register `gsap.registerPlugin(ScrollTrigger, SplitText)` inside `DOMContentLoaded`. (ScrollTrigger is only wired to Lenis for smooth scroll updates; there are no scroll-triggered animations in this component — everything is click/hover/mousemove driven.)
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
