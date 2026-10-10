# Orbit-Text SVG Preloader → Hero Reveal
## Goal
Build a full-screen portfolio **preloader** whose star effect is eight words riding eight **concentric circular SVG orbits**. Each word is an SVG `<textPath>` that, as it animates, **stretches** (its `textLength` grows enormously) and **slides** around its ring (its `startOffset` shifts), so the words appear to elongate and smear along nested circles while the whole SVG **wobbles** back and forth in random ±25° rotations and a central counter tweens **0 → 100**. After ~6 s the orbit words **fade out ring by ring**, the loader panel dissolves, and the hero underneath is revealed with a background **1.25 → 1 zoom-out** and a word-masked **SplitText** line sliding up on a custom ease. Everything plays automatically once on page load; there is no scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`SplitText`** and **`CustomEase`**. No smooth-scroll library — the whole thing is a pure load-triggered set of tweens, the page does not scroll. Register: `gsap.registerPlugin(SplitText, CustomEase)`. The animations are created immediately on module execution (no `DOMContentLoaded`/`fonts.ready` wrapper is required, though wrapping in `fonts.ready` is fine).
## Layout / HTML
Two stacked layers. The `.loader` is a **fixed** full-viewport overlay (`z-index: 2`) that sits on top of a `.hero` section (natural flow underneath). Class/tag names are load-bearing — the JS queries them.
```
<div class="loader">
  <svg viewBox="-425 -425 1850 1850" xmlns="http://www.w3.org/2000/svg">
    <!-- 8 concentric orbit paths (see geometry below) -->
    <path id="loader-orbit-1" d="..." />
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
