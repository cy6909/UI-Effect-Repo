# Capsules Animated Sticky Columns — scroll-pinned phased column swap
## Goal
Build a full-page scroll experience with a pinned full-screen section containing four rounded "capsule" columns (two text capsules, two image capsules). As the user scrolls through the pinned section, the columns swap in two discrete phases: new capsules slide in from the right/bottom while the previous one fades and scales away, an image is revealed with a growing clip-path wipe, and a text block swaps via SplitText line masks. Scrolling back up reverses each phase.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins `ScrollTrigger` and `SplitText`, and `lenis` (npm) for smooth scrolling. Everything runs inside a `DOMContentLoaded` listener. Register plugins with `gsap.registerPlugin(ScrollTrigger, SplitText)`.
Lenis wiring (exact pattern):
- `const lenis = new Lenis()` (default options).
- `lenis.on("scroll", ScrollTrigger.update)`.
- `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- `gsap.ticker.lagSmoothing(0)`.
## Layout / HTML
Three sections, each `100vw` × `100svh`:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
