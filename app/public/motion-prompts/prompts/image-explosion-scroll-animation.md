# Image Explosion Scroll Animation
## Goal
Build a 4-section scroll page whose payoff is the footer: when the footer scrolls at least half-way into view, **15 photos erupt from below the footer's bottom edge like confetti**, launched upward with randomized velocity and spin, then arc back down under simulated gravity until they fall out of sight. The whole effect is a hand-rolled particle physics system (velocity + gravity + friction + rotation) driven by `requestAnimationFrame` — **no GSAP, no libraries, zero dependencies**.
## Tech
Vanilla HTML/CSS/JS. `script.js` is loaded as an ES module (`<script type="module" src="./script.js">`) but needs **no imports whatsoever** — do not install or import GSAP, Lenis or anything else. Everything is plain DOM + rAF.
## Layout / HTML
Four blocks in `<body>`, in this order:
```
<section class="hero"></section>
<section class="about">
  <p>
    The world collapsed, but the game survived. In the neon-lit ruins of
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
