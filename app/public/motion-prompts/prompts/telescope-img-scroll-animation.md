# Telescope Image Scroll Animation
## Goal
Build a scroll-driven "telescope" hero: a pinned full-screen banner where an image container scales up from 0 while six stacked copies of the same photo — each clipped by a silhouette-shaped CSS mask — grow at staggered scales, producing a lens-within-a-lens telescoping depth effect. Two large intro words slide apart horizontally and a centered headline fades in word-by-word near the end of the scrub.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm), plus the GSAP plugins `ScrollTrigger` and `SplitText`, and `lenis` for smooth scrolling. No frameworks, no build-specific code — plain `import` statements at the top of `script.js`.
## Layout / HTML
Three full-viewport sections in `<body>`:
1. `<section class="hero">` — a centered `<h1>` with the text "The frame is only the beginning."
2. `<section class="banner">` — the animated section. Inside:
   - `<div class="banner-img-container">` containing, in this order:
     - **7 image layers**, each `<div class="img"><img src="..." alt="" /></div>`. All 7 use the **same photo**. The **first** layer has only class `img` (the unmasked base). The remaining **6** have class `img mask` (silhouette-masked copies).
     - `<div class="banner-header"><h1>The Season Wears Confidence</h1></div>` — the headline that reveals word-by-word.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
