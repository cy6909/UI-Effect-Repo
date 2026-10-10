# Sci-Fi Terminal Preloader Button → Hero Clip-Path Reveal
## Goal
Build a **self-playing terminal-styled preloader** that fills a circular SVG "loading" button, then waits for a **click to wipe the whole preloader away and reveal a hero headline**. On load: monospace status lines rise into view from behind masks (SplitText), a thin **circular SVG outline draws itself while the whole ring rotates 270°**, and a second **progress stroke fills in randomized, jittery stages** like a loader stalling and jumping. When it finishes, the centered logo fades out and an **"Engage" label rises up** — the button is now armed. **Clicking** the button scales the black preloader down, **unwinds both SVG strokes off the ring**, swaps the label from "Engage" up-and-out to "Access Granted" in, then **wipes the black preloader and a white revealer panel leftward via `clip-path`** while the hero **scales up from 0.75 → 1** and its headline **words stagger up out of masks**. The star effect is the **self-drawing + rotating + randomly-stepping SVG loader ring**, followed by the **synchronized left clip-path wipe → hero word reveal**.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`SplitText`** and **`CustomEase`**. No smooth-scroll library and no scroll interaction at all — the intro is a load-triggered timeline and the reveal is a `click`-triggered timeline. Imports:
```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
```
Register once at module top: `gsap.registerPlugin(SplitText, CustomEase)`. Immediately create two custom eases:
```js
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
