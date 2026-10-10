# Unfolding Words Menu — Frosted Veil & Letter-by-Letter Link Reveal
## Goal
Build a fullscreen overlay navigation where every link **unfolds letter by letter**. Pressing "Menu": a **frosted glass veil** fades over the hero photo (which also zooms and blurs slightly); then, link by link, the small index number and the **first letter rise out of a mask**, a thin **light divider** grows from its centre with a 20° lean, and the **remaining letters slide in from the right** while the box that holds them **widens from 0 to its natural width**. Serif and grotesk links alternate. Hovering a link nudges it to the right and dims the others; the toggle text flickers between "Menu" and "Close". Reverse on close. GSAP + SplitText.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) and the plugin **`SplitText`** (`gsap/SplitText`, included with GSAP 3.13+). Fonts: **Instrument Serif** (400) and **Space Grotesk** (400–600).
## Layout / HTML
```html
<div class="uw">
  <nav class="uw-nav">
    <a class="uw-brand" href="#">Obscura</a>
    <button class="uw-toggle" aria-expanded="false" aria-controls="uw-menu">Menu</button>
  </nav>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
