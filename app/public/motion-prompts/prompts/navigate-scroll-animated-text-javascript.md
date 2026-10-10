# Scroll Animated Text Reveal (word-by-word highlight pills)
## Goal
Build a one-page scroll experience where two paragraph sections are pinned while scrolling and their text reveals word by word: each word fades in behind a dark grey rounded "highlight pill", the pill then dissolves to expose the letters, special keywords reveal inside brightly colored pills, and past 70% of the pinned scroll the whole sequence re-highlights the words in reverse (letters fade back out behind grey pills).
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) with the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scrolling. No other libraries. Three files: `index.html` (links `./styles.css`, loads `<script type="module" src="./script.js">`), `styles.css`, `script.js`.
## Layout / HTML
Five full-viewport `<section>` elements, in this order:
1. `<section class="hero">` — contains `<div class="copy-container">` with an `<h1>`: "Playground for bold ideas and creative interfaces."
2. `<section class="about anime-text-container">` — `<div class="copy-container">` wrapping `<div class="anime-text">` with **two `<p>` paragraphs** of marketing copy for a fictional design tool called "Huebase". The copy must naturally contain the keywords **vibrant, living, clarity, expression** (e.g. "Huebase is a vibrant space for designers who think in motion… bold ideas turn into living interfaces… great design starts with clarity and expression ends… your palette comes to life…"). Roughly 40–50 words per paragraph.
3. `<section class="cta">` — `copy-container` with `<h1>`: "Join Huebase now to create expressive interfaces."
4. `<section class="features anime-text-container">` — same structure as `.about` (a `copy-container` > `anime-text` > two `<p>`), with copy that naturally contains the keywords **shape, intuitive, storytelling, interactive, vision** (e.g. "Huebase brings motion, structure, and creativity together in one intuitive space… explore rich storytelling visuals… interactive components… bring your creative vision to life…").
5. `<section class="outro">` — `copy-container` with `<h1>`: "Built for designers who shape the web."
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
