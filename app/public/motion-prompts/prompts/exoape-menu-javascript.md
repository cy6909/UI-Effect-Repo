# Fullscreen Overlay Menu with Skewed Clip-Path Reveal & Hover Image Preview
## Goal
Build a fullscreen overlay navigation menu (ExoApe-style). Clicking a "Menu" toggle fires a set of synchronized GSAP tweens: the page content rotates/scales/translates away to the bottom-right, a dark overlay opens via an animated `clip-path` polygon with a skewed bottom edge, the menu content "settles" from a rotated/zoomed state into place, and the nav links rise into view with a stagger. Hovering each link cross-fades a stacked preview image with a scale + rotate entrance.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm). No GSAP plugins are needed — only core tweens (`gsap.to` / `gsap.set`) animating transforms and `clipPath`.
```js
import gsap from "gsap";
```
Wrap all JS in `DOMContentLoaded`.
## Layout / HTML
```
<nav>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
