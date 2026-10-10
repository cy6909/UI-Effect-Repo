# Skincare Landing Page Reveal — counter preloader into full-bleed hero
## Goal
Build a full-page preloader-to-hero reveal for a natural skincare brand landing page. On load, a single GSAP timeline (with a custom "hop" ease) rolls a giant two-digit counter through 00 → 27 → 65 → 98 → 99, slides the logo words together over a growing vertical divider, then wipes two dark overlay blocks upward with clip-path while the background hero image de-zooms from 1.5 to 1 and the nav, masked headline lines, subcopy and CTA pill animate into place. It plays automatically, exactly once.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `CustomEase`. Icons come from Ionicons v7 served from your own origin (`/vendor/ionicons/ionicons.esm.js` as `type="module"`, plus the `nomodule` fallback `ionicons.js`); get them with `npm i ionicons@7.1.0` and copy the whole `node_modules/ionicons/dist/ionicons/` folder, since the loader fetches its chunks and one SVG per icon relative to the script's own URL. No smooth-scroll library, no ScrollTrigger — everything runs on `DOMContentLoaded`.
## Layout / HTML
Two top-level siblings in `<body>`:
1. `div.loader` — fixed full-viewport overlay (`z-index: 2`) containing:
   - `div.overlay` with two `div.block` children (side-by-side dark panels, each 100% height / 50% width via flex).
   - `div.intro-logo` centered, with two words: `div.word#word-1 > h1 > span` containing "Kind" (the span gets the italic serif font) and `div.word#word-2 > h1` containing "Root".
   - `div.divider` — a 1px-wide vertical white line, full height, horizontally centered.
   - `div.spinner-container` (centered, `bottom: 10%`) with `div.spinner` inside.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
