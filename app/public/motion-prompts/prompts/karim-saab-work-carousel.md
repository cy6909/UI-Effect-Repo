# Fullscreen Work Carousel — Fling-Away / Clip-Path Reveal Slide Transitions
## Goal
Build a fullscreen, one-slide-at-a-time portfolio "work" carousel. Each mouse-wheel tick or touch swipe fires a dramatic GSAP transition: the **outgoing slide shrinks to 25%, rotates 30°, fades out and flings itself two viewport-heights off screen**, while (starting mid-flight) the **incoming slide flies in from the opposite edge inside a cropped clip-path window that opens up to the full frame**. As the new slide lands, its title words and every info line are revealed with **masked SplitText staggers** rising from below. The carousel loops infinitely in both directions.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`SplitText`** (`import { SplitText } from "gsap/SplitText"`, then `gsap.registerPlugin(SplitText)`). No other libraries, no smooth-scroll lib. Ship `index.html`, `styles.css`, and a `<script type="module" src="./script.js">`.
## Layout / HTML
The static HTML is minimal — the body contains only an empty stage:
```html
<body>
  <div class="slider"></div>
</body>
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
