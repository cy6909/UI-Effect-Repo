# Landing Page Reveal — Rolling-Digit Counter Preloader + Exploding Loader Bar + Masked Heading Rise
## Goal
Build a full-screen **preloader-to-content intro** that plays once automatically on page load (~8.5 s total). Three digit columns in the lower-left corner spin upward like a mechanical odometer to count `000 → 100`, while a two-segment white bar fills a grey track in the center. When the count lands on 100, the digit columns lift up and vanish behind a clip-path window; then the white loader bar snaps (one half rotates), balloons **40×**, rotates and flies off-screen to the bottom-right as a wipe; the black loading screen fades to nothing; and behind it a big centered "Website Content" heading rises up from behind a white revealer edge. Everything is driven by plain standalone `gsap.to` / `gsap.from` tweens (no timeline object, no ScrollTrigger) synchronized purely by `delay`.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use only **`gsap`** (npm) — `import gsap from "gsap"`. No GSAP plugins, no smooth-scroll library, no canvas/WebGL. The counter-column setup runs inside a `DOMContentLoaded` handler; the rest of the tweens run at module top level (they fire as soon as the script loads). The whole thing is a pure load-triggered animation — no scroll, hover, or click.
## Layout / HTML
Two sibling roots directly in `<body>`: `.website-content` (the page revealed at the end) and `.loading-screen` (the black overlay on top). Class names are load-bearing — the JS/CSS query them.
```html
<div class="website-content">
  <div class="header">
    <div class="h1">
      <h1>Website</h1>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
