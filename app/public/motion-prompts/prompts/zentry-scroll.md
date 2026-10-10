# Cosmic Scroll Story — Pinned Section with Clip-Path Reveals, Deep Zoom & Flip-Open Headline
## Goal
Build a long-scroll "scrollytelling" page whose centerpiece is a single section pinned for **4 viewport heights** while every stage is scrubbed by scroll. As you scroll through the pinned section: the letters of two intro paragraphs **flicker in** one-by-one in a random order; a small centered rectangle **expands via an animated `clip-path`** into a fullscreen image (its photo scaling up at the same time); then a third image **opens outward from a central seam** while it is held at a heavy 3× zoom, and finally **zooms back out** to natural scale; and as a closing beat a headline that starts folded away at `rotateY(-75deg)` **swings flat to camera** to reveal the last line of copy. All of it is driven by GSAP `ScrollTrigger` (one pin + many scrubbed tweens) with Lenis smooth scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**, and **`lenis`** for smooth scroll. Register with `gsap.registerPlugin(ScrollTrigger)`. Run everything inside a `DOMContentLoaded` handler. No SplitText, no CustomEase, no Three.js — the letter split is done by hand.
## Layout / HTML
Single `.container` wrapping five full-viewport sections in order. Class names are load-bearing (JS/CSS query them):
```
<div class="container">
  <section class="hero">
    <h1>Genesis</h1>
    <p>At the nexus of infinite realities, the Aethoria Spire rises: a beacon of limitless potential in the cosmic tapestry.</p>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
