# Circular Futuristic Navigation Menu — Radial Segments + Draggable Joystick
## Goal
Build a fullscreen overlay navigation menu whose 6 links are arranged as **radial "pie-donut" segments** (clip-path wedges) around a **draggable white joystick** in the center. Clicking a rounded hamburger tab at the bottom of the screen toggles the overlay: the joystick **pops in with a back-out scale**, and the nav bar, footer and every wedge **flicker in with randomized glitchy yoyo blinks** (GSAP `repeat`/`yoyo` opacity pulses). While open, hovering a wedge — or **dragging the joystick toward it** — triggers a CSS "flicker to solid white" keyframe animation on that wedge, like a sci-fi console selection. Short UI sound effects play on open/close/select. The star effect is the combination of the randomized glitch-flicker reveal and the lerped joystick-drag segment highlighting.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) — **core only, no plugins**. No smooth-scroll library. Icons come from **Ionicons v7 web components**, served from your own origin:
```html
<script type="module" src="/vendor/ionicons/ionicons.esm.js"></script>
<script nomodule src="/vendor/ionicons/ionicons.js"></script>
```
Get those two files with `npm i ionicons@7.1.0` and copy `node_modules/ionicons/dist/ionicons/`
into your public directory. Copy the **whole** folder: the loader fetches its `p-*.entry.js` chunks
and one `svg/<name>.svg` per icon at runtime, resolved relative to the script's own URL.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
