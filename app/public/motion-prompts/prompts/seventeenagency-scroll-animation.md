# Infinite-Scroll Contact Page — Center-Crossing Gap "Breathing" + Icon Cycling
## Goal
Build a full-screen, **endlessly looping** contact page. A tall list of contact rows scrolls
vertically forever (seamless infinite loop). As each row passes through the vertical center of
the viewport, the horizontal **gap between its label and value expands then snaps back**, giving a
"breathing" pulse to whichever row is centered. Simultaneously, a single **3D icon fixed at the
exact center of the screen swaps to the next shape** every time a new row locks onto center. That
center-crossing gap pulse synced with the icon swap is the star effect.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Build as a fresh Vite project (`npm create vite`,
vanilla template). Install and import from npm:
- `gsap` and the GSAP plugin **`ScrollTrigger`** (`import { ScrollTrigger } from "gsap/ScrollTrigger"`), registered via `gsap.registerPlugin(ScrollTrigger)`.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
