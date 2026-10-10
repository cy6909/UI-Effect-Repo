# Savoir-Faire Click Reveal — click-to-spawn floating media cards + sparkle cursor
## Goal
Build a full-screen, black editorial landing page for a creative studio. A big uppercase serif wordmark sits at the bottom, a fixed nav sits at the top, and a custom **white circular cursor with a black sparkle glyph** trails the mouse. The star effect: **every click anywhere on the page spawns a random media card** (50/50 an image or an autoplaying video) at the pointer — it pops in from `scale: 0` with a slight random tilt, then **drifts 500px straight up over 4s while holding full opacity**, and finally **fades out and removes itself**. A short click sound plays on each spawn. Cards pile up as the user keeps clicking.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins**, no ScrollTrigger, no smooth-scroll library. Single import:
```js
import gsap from "gsap";
```
Everything is mouse-driven (mousemove + click); there is no scroll behavior (the page is `overflow: hidden`, exactly one viewport tall).
## Layout / HTML
```
<body>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
