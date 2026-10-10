# Rotating Hand Animation — pinned scroll hero with a spinning clock-hand rod
## Goal
Build a full-page scroll-driven hero: the section pins for 8 viewport heights while a thin vertical rod (like a clock hand) spins 5 full turns (1800°) around the center of the screen, driven directly by scroll progress. Each completed 360° cycle swaps the intro headline text. On the 4th cycle a portrait photo fades in inside the rod and two paragraphs slide in. In the final stretch the rod grows to full height, scales up 20×, fades out, and a giant brand wordmark is revealed underneath.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) with the `ScrollTrigger` plugin, plus `lenis` for smooth scrolling. No other libraries.
## Layout / HTML
- `<section class="sticky">` — the pinned hero. Inside it, three absolutely-positioned layers:
  - `<div class="hand-container">` containing `<div class="hand">` which contains a single `<img>` (the portrait).
  - `<div class="intro">` containing `<h1><span>time to</span> be brave</h1>` followed by two `<p>` elements of placeholder lorem-ipsum copy (2–3 lines each).
  - `<div class="website-content">` containing `<h1>harrnish</h1>` (the brand wordmark).
- `<section class="about">` after it — a simple white section with a centered paragraph like "(Your next section goes here)" so there is somewhere to scroll to after the pin releases.
- Module script tag at the end of `<body>`.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
