# Sliding Editorial Side-Menu with Text-Scramble Hover
## Goal
Build a fixed **black rounded side panel** navigation menu that lives off-screen to the left and **slides in from the left edge** when a small "Menu" toggle in the top nav is clicked. As the panel arrives, its six big display links **cascade in one after another** from the left, and every label **scrambles through random letters and then resolves** into the real word (a left-to-right settling wave). Hovering any link re-runs the same character-scramble, flips a **chamfered white "bg-hover" block** on behind the word (turning the black text to black-on-white / aquamarine-on-active), and **lights up the small sub-label to its right character-by-character**. A close (X) button in the sidebar slides the panel back out and staggers the links away. The star effect is the **SplitType per-character scramble + the CSS clip-path slide choreography** — there is **no GSAP** here.
## Tech
Vanilla HTML/CSS/JS with ES module imports. The **only** JS dependency is **`split-type`** (npm) for splitting text into per-character spans. **Do NOT use GSAP, ScrollTrigger, Lenis, or any tween library** — all motion is done with CSS `transition`/`@keyframes` plus vanilla `setTimeout`/`setInterval`. Icons come from **Ionicons v7 web components**, served from your own origin via script tags in the `<head>`:
```html
<script type="module" src="/vendor/ionicons/ionicons.esm.js"></script>
<script nomodule src="/vendor/ionicons/ionicons.js"></script>
```
Get those two files with `npm i ionicons@7.1.0` and copy `node_modules/ionicons/dist/ionicons/`
into your public directory. Copy the **whole** folder: the loader fetches its `p-*.entry.js` chunks
and one `svg/<name>.svg` per icon at runtime, resolved relative to the script's own URL.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
