# Clip-Path Drop-Down Overlay Menu — Top Panel Wipe + Staggered Link Reveal + Growing Reel Thumbnail + Divider Line Draw
## Goal
Build a page with a fixed top navbar (logo + a "Menu" text button) sitting over a full-bleed photographic background. Clicking **Menu** opens a lime-green **overlay panel that drops down from the top edge** via an animated `clip-path`, and clicking **Close** reverses it. The signature effect is a single **paused, reversible GSAP timeline** whose four tweens all fire together at time 0: (1) the overlay's `clip-path` polygon expands from a zero-height top strip to the full panel (wipes down from top); (2) the nav links + CTA button **fade up from below** with a small stagger; (3) the reel thumbnail **grows in height** from 0 to 200px; and (4) the footer divider **draws itself** from 0% to 100% width. Open plays the timeline forward, Close plays the exact same timeline in reverse. It is entirely click-driven — no scroll, no autoplay.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) only — **no GSAP plugins**, no ScrollTrigger, no smooth-scroll library. Import as:
```js
import gsap from "gsap";
```
Icons: **Phosphor Icons (web)** — see **Icons** below for the exact version and where to get it. Two filled glyphs: a `play` inside `.video-preview` (`<i class="ph-fill ph-play"></i>`) and a `play-circle` in `.video-details` (`<i class="ph-fill ph-play-circle"></i>`). If unavailable, any small play-circle icon substitutes.
## Layout / HTML
```
.container                              (position: relative, full width/height)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
