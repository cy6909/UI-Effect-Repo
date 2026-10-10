# Masked Image Reveal Scroll Animation (Pinned Spotlight + Growing SVG Mask)
## Goal
Build a cinematic scroll-story section: after an intro screen, a **spotlight section pins for 7 viewport-heights**. During the first half of the pin, a **300svh-tall grid of desaturated portrait photos scrolls vertically upward** past a fixed centered headline. Overlapping it (progress 0.25 → 0.75), a full-viewport banner image is **revealed through a CSS `mask` shaped like a bold inverted-Y emblem whose `mask-size` grows from 0% to 450%** while the image inside scales down 1.5 → 1. In the final stretch (0.75 → 0.95) a second headline appears **word by word** (hard opacity toggles via SplitText). One `ScrollTrigger` with `onUpdate` drives everything; scroll is smoothed with Lenis.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** and **`SplitText`** plugins, plus **`lenis`**:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
```
Everything runs inside a `DOMContentLoaded` listener. Register both plugins, then wire Lenis the standard way:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
