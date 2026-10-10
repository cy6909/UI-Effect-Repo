# Interactive Divs with Physics — floating grayscale cards that scatter from the cursor
## Goal
Build a full-screen, black, zero-gravity playground where **twelve grayscale polaroid-style image cards drift over the whole viewport**. Each card is a real HTML `<div>` whose position and rotation are driven, every frame, by a Matter.js rigid body living in a **gravity-free** physics world. A big centered word sits behind them. The star effect: **moving the mouse near a card fires a random impulse into it**, so nearby cards shoot away, slowly coast to a stop under air friction, gently bounce off the invisible viewport walls, and keep floating. It reads like a slow-motion swarm of photo prints you can bat around with the cursor.
## Tech
Vanilla HTML/CSS/JS. Two libraries with **two different loading mechanisms** (match this exactly — the sketch depends on p5 running in "global mode"):
1. **p5.js v1.4.0 as a classic `<script>` in `<head>`, served from your own origin** (NOT an npm import). This runs p5 in global mode: p5 auto-initializes on window load and attaches globals like `createCanvas`, `random`, `dist`, `background`, `width`, `height`, `mouseX`, `mouseY`, and calls your global `setup()` / `draw()` / `mouseMoved()` functions.
   ```html
   <script src="/vendor/p5-1.4.0.js"></script>
   ```
   Get the file with `npm i p5@1.4.0` and copy `node_modules/p5/lib/p5.js` into your public
   directory. It must stay a plain `<script>` — importing it as a module kills global mode.
2. **matter-js as an npm ESM import** in your module script:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
