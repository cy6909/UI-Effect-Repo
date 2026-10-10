# Guiding Light — Cursor Spotlight with Trailing Flame
## Goal
Build a three-section scrolling page. The middle section is the star: a **cursor-driven spotlight**. When the pointer enters that section a **dark veil drops over the whole section**, punched through by a soft circular hole that follows the cursor — so content (heading + paragraph) is dimmed everywhere except a moving "flashlight" window around the pointer. Inside that section a small **animated flame (Lottie) with a pulsing warm glow trails the cursor with a smooth lag**, drifting from its home position toward wherever you point and easing back to center when the pointer leaves the section. Both the spotlight hole and the flame move with lerped smoothing, not snapping. The other two sections (before/after) are plain full-screen headings you scroll past with Lenis smooth scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP is used at all.** The only runtime dependencies are:
- `lenis` (npm) — page-wide smooth scroll, started with `new Lenis({ autoRaf: true })`.
- `lottie-web` (npm) — loads and plays the flame animation JSON, `renderer: "svg"`, `loop: true`, `autoplay: true`.
All motion of the spotlight and flame is produced by a single hand-rolled `requestAnimationFrame` loop that linearly interpolates (lerps) values into CSS custom properties and a `transform`. Do not reach for any tween library.
## Layout / HTML
Three stacked full-viewport `<section>`s. The middle one holds the spotlight machinery.
```html
<section class="intro">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
