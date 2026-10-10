# Orchestra 3D Scroll Animation
## Goal
Build a pinned full-screen hero where six image-mapped CSS 3D cubes fly in from extremely deep 3D space (`translateZ(-30000px)`) and assemble into a symmetric spread as the user scrolls, while a geometric block logo blurs away, a large intro headline scales up and fades out, and a second headline de-blurs into view. Everything is driven by a single scrubbed, pinned ScrollTrigger whose `onUpdate` manually interpolates every value from scroll progress (no tweens).
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scrolling. Register ScrollTrigger with `gsap.registerPlugin(ScrollTrigger)`. No other libraries.
Wire Lenis to GSAP exactly like this:
- `const lenis = new Lenis()` (default options)
- `lenis.on("scroll", ScrollTrigger.update)`
- `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- `gsap.ticker.lagSmoothing(0)`
Run all JS inside `DOMContentLoaded`.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
