# GTA-VI-style Scroll Logo Reveal — Pinned Hero with Shrinking SVG Mask
## Goal
Build a cinematic, full-page landing hero in the style of the GTA VI trailer site: as you scroll, a giant dark overlay punched with a logo-shaped SVG mask hole shrinks exponentially (scale 500 → 1), so the dark screen "closes in" until only a logo-shaped window into the scene remains; meanwhile the layered hero artwork zooms out, a white overlay blooms behind the mask, and a big headline is unveiled with a bottom-up gradient wipe. Everything is driven by a single pinned, scrubbed ScrollTrigger smoothed by Lenis.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` for smooth scrolling. No other libraries.
## Layout / HTML
```
body
├── header.site-header                 ← fixed, two spans: "Casa Vicente" / "Autumn Winter 2026 · Lisbon"
├── section.hero
│   ├── div.hero-img-container
│   │   ├── picture               ← image 1: full-bleed campaign photograph (JPG)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
