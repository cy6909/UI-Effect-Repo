# Dotted Path Traveller — a route with stops, drawn by the scroll
## Goal
Build a pinned scene where **a dot travels along a dashed line as you scroll**, the line
revealing itself behind it, and **named milestones light up as it passes each one**. Use it when
there is a journey with stops and the spatial order is the information: where the materials come
from, a route, a timeline that is not a straight bar.
## Tech
Vanilla HTML/CSS/JS with ES modules: `gsap` + `ScrollTrigger`, and `lenis`. **No `MotionPathPlugin`
and no SVG animation library** — `getPointAtLength()` is native, exact, and free.
Wire Lenis to ScrollTrigger — this is not optional:
```js
const lenis = new Lenis();
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
