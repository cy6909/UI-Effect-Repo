# Responsive Fullscreen Menu — Clip-Path Sweep-Up + Staggered Reveal + 3D Parallax Image Stack
## Goal
Build a minimal editorial landing page with a tiny fixed top navbar (a small logo mark on the left, a **"Menu"** label on the right) sitting over a full-bleed hero photo with an oversized display heading. Clicking **"Menu"** opens a **fullscreen dark overlay menu**: the dark panel **sweeps up from the bottom edge** by animating a `clip-path` polygon on a `power4.inOut` ease while the hero photo simultaneously slides up and fades away. Once the panel is up, the menu logo, four oversized nav links, and two footer columns of tiny mono lines **rise and reveal from behind clip-path masks** with staggered `power3.out` `y`-translations. On the wide left side of the open menu sits a **stack of four semi-transparent copies of the hero image** that **parallax and tilt in 3D (`rotate3d`)** continuously as the mouse moves — each layer offset by a different amount for depth. Clicking **"Close"** reverses it: the panel collapses off the top edge, the menu column slides up and fades, and the hero photo slides back up into view from below; on complete everything hard-resets for the next open. All motion is click/mousemove-driven with plain GSAP tweens (no timeline).
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) only — **no plugins** (no ScrollTrigger, no SplitText, no CustomEase), no smooth-scroll library. The whole thing is click- and mousemove-driven. Import as:
```js
import gsap from "gsap";
```
Ship `index.html`, `styles.css`, and an ES-module `script.js` (`<script type="module" src="./script.js">`). Wrap logic in a `DOMContentLoaded` listener (the file uses two separate `DOMContentLoaded` handlers — one for open/close, one for the mouse tilt — but a single one is fine).
## Layout / HTML
Use neutral, fictional labels — no real brand names. The demo wordmark/heading is **"Break"**.
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
