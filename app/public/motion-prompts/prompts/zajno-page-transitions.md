# Nuvoro Page Transitions — View Transitions API + GSAP revealer + masked SplitText
## Goal
Build a minimal editorial four-view single-page site (home, work, studio, contact) for a fictional studio called "nuvoro". The star effect: clicking a nav link swaps views through the native **View Transitions API** — the incoming page is unmasked by a full-screen `clip-path` polygon that expands from a thin horizontal slit at 75% viewport height to the whole screen over 2s — while a dark GSAP "revealer" overlay wipes away vertically and the new view's heading reveals through masked SplitText chars/words/lines.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **SplitText** and **CustomEase**, and **`lenis`** (npm) for smooth scrolling. Register the plugins with `gsap.registerPlugin(SplitText, CustomEase)`. No frameworks, no build-specific code beyond ES imports (assume a Vite dev server).
## Layout / HTML
- Fixed top **nav** (`.nav`) spanning the viewport width with two columns:
  - `.col` 1 (flex: 1): `.nav-logo` containing `<a href="/" data-path="/">nuvoro</a>`.
  - `.col` 2 (flex: 2, `display:flex; justify-content: space-between`): `.nav-items` with three `.nav-item` divs — `work`, `studio`, `contact` — each wrapping an `<a href="/work" data-path="/work">`-style anchor, plus a `.nav-copy` with `<p>toronto, ca</p>`. **`.nav-items` has NO layout rule of its own — do NOT make it a horizontal flex row.** Since the anchors are `display:block` (~0.85rem), the three `.nav-item` divs stack **vertically** as a compact column list sitting at the left edge of this second column, while the column's `justify-content: space-between` pushes `.nav-copy` ("toronto, ca") to the right edge.
- `<main id="views">` containing four `<section class="view" data-path="...">` elements. Only the home view (`data-path="/"`) is visible initially; the other three carry the `hidden` attribute. **Every view's first child is an empty `<div class="revealer"></div>`** (the dark wipe overlay).
  - **Home** (`data-path="/"`): `.home` wrapper with `.header > h1` reading `nuvoro` (huge, centered) and `.hero-img > img` (full-width image anchored to the bottom of the viewport).
  - **Work** (`data-path="/work"`): `.work` wrapper with `<h1>selected work</h1>` and `.projects` containing 4 `<img>` stacked vertically.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
