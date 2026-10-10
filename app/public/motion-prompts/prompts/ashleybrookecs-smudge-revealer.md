# Cursor Smudge Revealer — Gooey SVG-Mask Hero
## Goal
Build a full-screen hero made of **two stacked full-viewport layers**: a dark foreground carrying a giant title, and a light background carrying a hidden message. Moving the cursor (or dragging a finger) **smudges the dark foreground away**, revealing the light layer beneath through the cursor trail. The star effect: at a **lerp-smoothed pointer position**, white circles are continuously stamped into an **SVG mask** whose contents run through a **gooey (metaball) SVG filter**, so overlapping stamps fuse into organic blobs. Each stamp is **sized by pointer speed**, **expands 2× over 2s** with GSAP, then **dissolves back to 0 over 3s** and is removed — producing a soft, wet "wipe-away" reveal that heals itself when you stop moving.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) only — **no** ScrollTrigger, SplitText, Lenis, or any other plugin. No smooth scroll. Import as:
```js
import gsap from "gsap";
```
No `registerPlugin` needed. All motion is **pointer-driven** (mousemove + touch), animated per-stamp via `gsap.timeline`, and pumped by a manual `requestAnimationFrame` loop. Runs in a fresh Vite project with just `gsap` installed.
## Layout / HTML
A single `<section class="hero">` containing two absolutely-stacked content layers and one inline `<svg>` that holds the mask + filter definitions:
```html
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
