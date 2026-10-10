# Landing Page Reveal — Grid Shuffle to Hero Zoom Intro
## Goal
Build an autoplay landing-page intro (runs once on page load, no scroll): a full-screen black overlay reveals a gradient-fill logo and staggered project/location lists, then a centered 3×3 image grid clips open and rapidly shuffles through random editorial photos. The outer cells clip shut again, the center "hero" cell scales up 4× into a large framed hero image, two banner images pop in and rotate outward to its sides, the nav drops in from the top, and masked word-by-word text reveals push in the intro copy and title.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `CustomEase`, and `split-type` (npm package, `SplitType` class — NOT GSAP's SplitText). No smooth-scroll library needed (the page never scrolls).
## Layout / HTML
Single page, `<body>` containing in this order:
1. `div.overlay` — full-screen fixed black overlay with three flex columns:
   - `div.projects` containing `div.projects-header` with two `<p>`: `Project` and `Director`. (Rows are appended by JS.)
   - `div.loader` containing `h1.logo-line-1` with text `Nova` and `h1.logo-line-2` with text `Vice` (stacked two-line logo).
   - `div.locations` containing `div.locations-header` with one `<p>`: `Location`. (Rows appended by JS.)
2. `div.image-grid` — three `div.grid-row`, each with three `div.img` wrappers, each wrapping an `<img>`. The middle cell of the middle row additionally has class `hero-img` (i.e. `div.img.hero-img`). Fill the 9 `<img>` `src`s with the first 9 images of the pool (image 5 in the hero cell).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
