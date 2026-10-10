# BarbaJS Page Transitions — Two-Sheet Curtain Wipe + Masked Heading Reveal Between Routes
## Goal
Build a small **three-page editorial site** — a fictional press called **Recto** — where the pages are swapped in place, and make the swap the star of the page. A fixed masthead holds the brand and three real nav links (**Index / Studio / Contact**). Clicking one fires the transition: a **blue accent sheet leads a solid ink panel** up from the bottom of the content stage, both travelling in one direction; while the stage is covered the route is replaced underneath; the two sheets keep going **off the top**, uncovering the new page, whose giant `<h1>` **lifts out of a mask** and whose rows **step up** behind it. The ink panel carries the **name and number of the page you are travelling to**, so even a frame grabbed mid-wipe reads as "we are on our way to Studio" rather than as a coloured rectangle.
The whole thing reproduces Barba.js's `sync: true` lifecycle (leave + enter overlap, the outgoing container is dropped mid-transition) with a hand-rolled in-page router — no real multi-page fetch, no framework.
**Three things make this legible, and all three are design decisions, not decoration:**
1. **The masthead never moves.** The curtain covers the content stage only, not the whole viewport. You watch the nav highlight jump to the link you clicked while the page area is being replaced — which is what tells the viewer this is *navigation*, not a loose animation.
2. **Each route has genuinely different content and a different layout** — a numbered work list, a two-column studio statement with a facts table, a huge mail address with a channel grid. If all three routes were the same big word on an empty field, nothing would read as a page change.
3. **The first paint is the first page.** The sheets park *below* the stage and the first route is authored in the HTML, so the very first frame is the Index page, never a full-bleed panel.
## Tech
Vanilla HTML/CSS/JS with ES module imports, in a fresh Vite project. Install and import from npm:
- **`gsap`** (3.x) only. **No GSAP plugins, no ScrollTrigger, no SplitText, no Lenis, no Three.js.**
```js
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
