# Editorial Contact-Form Overlay — Giant Serif Title Reveals Char-by-Char on Load, Fullscreen Dark Form Wipes In on Click
## Goal
Build a **full-viewport editorial hero on a bone/off-white background** whose star effect is a **per-character display-title reveal**: a colossal serif headline (set at `20vw`) is split into single-character `<span>`s that GSAP tweens **up from a clipped baseline** (each char starts pushed 500px below and rises into a clip-path mask) with a staggered `power4.out` ease on load, while the nav / tagline / CTA / social links fade in a beat later. Clicking the **"Apply now"** button plays a **paused GSAP timeline** that fades a **fullscreen dark contact-form overlay** in over everything and then staggers a giant single-line **"Apply"** wordmark (sized in `vw`, anchored bottom-right) upward with the same clipped char-reveal; clicking **"[ back ]"** inside the overlay **reverses the exact same timeline** to dismiss it. Pure click/load driven — no scroll animation.
The overlay is a **locked two-column grid** — a narrow ~1/3 left column holds the stacked form (logo, vertically-stacked fields, submit button) hard against the left edge; a wide ~2/3 right column holds a short intro paragraph up top and the enormous "Apply" wordmark down in its bottom-right corner. Getting that grid, the vertical field stacking, and the `vw`-scaled single-line wordmark right is as important as the GSAP gesture.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) **only** — no plugins, no ScrollTrigger, no SplitText library, no Lenis, no canvas/WebGL. The character splitting is done by hand in plain JS (see below). Import as:
```js
import gsap from "gsap";
```
All code runs inside `DOMContentLoaded` listeners (two of them in the original — one for the load reveal, one for the overlay toggle). Do **not** use GSAP's SplitText; write a tiny helper that wraps each character in a `<span>`.
## Layout / HTML
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
