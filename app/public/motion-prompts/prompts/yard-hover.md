# Editorial Hover Menu — text roll-swap rows + cursor-trailing stacked clip-path image preview
## Goal
Build a full-width list of large uppercase project rows. Hovering the whole list dims every row's text to grey; hovering an individual row **rolls its text upward and swaps in an identical black duplicate line** (the active row snaps to black, the rest stay grey). At the same time a small **stacked image-preview card follows the cursor with lag** and the hovered row's thumbnail **wipes into view from the bottom via an animated `clip-path` polygon**. Leaving the list wipes all previews upward and out. Everything is hover/mousemove-driven — no scroll, no click, no autoplay.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins**, no ScrollTrigger, no smooth-scroll library. Single import: `import gsap from "gsap";`. All logic runs inside a `DOMContentLoaded` listener.
## Layout / HTML
```
<body>
  <div class="container">
    <div class="preview">
      <div class="preview-img preview-img-1"></div>
      <div class="preview-img preview-img-2"></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
