# Full-Screen Preloader → Curtain-Wipe Landing Reveal (counter + layered clip-path wipe)
## Goal
Build an auto-playing landing-page **preloader** for a fictional design studio called **New Reality**. On load a full-screen black panel fills the viewport; a numeric counter races **0 → 100** in the center while an editorial label ("NEW REALITY") reveals **letter-by-letter** from above, holds, then slides letter-by-letter **downward** out of view. At ~3 s the whole preloader **scales down to 0.5** and then, in a tightly staggered sequence, three stacked full-screen layers each **collapse upward** — a black panel and a red panel animate their `height` to 0, and a hero-image layer wipes away via `clip-path` — peeling back like curtains to uncover the site underneath: a giant `20vw` headline whose seven letters **rise up** into place, and two footer thumbnails that **wipe open from the left**. Everything is purely time-delayed on page load — no scroll, hover, or click.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) only — **no** GSAP plugins, **no** ScrollTrigger, **no** Lenis/smooth-scroll. The page never scrolls; every animation is a load-triggered `gsap.to` / `gsap.from` with a `delay`.
```js
import gsap from "gsap";
```
Two effects are **not** GSAP and must be reproduced as described:
1. **The counter** (0 → 100) is a plain-JS `setTimeout` loop with random increments — not a tween.
2. **The label letter reveal** was originally an **anime.js v3.2.2** timeline using `easeOutExpo`. Reproduce it with GSAP: anime's `easeOutExpo` is mathematically identical to GSAP's **`expo.out`** (`1 − 2^(−10·t)`), so two `gsap.fromTo` tweens reproduce it faithfully with a single dependency (see the GSAP section). Do not add anime.js.
All animation code runs immediately on module execution (no `DOMContentLoaded` wrapper is required).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
