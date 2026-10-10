# Flowing Menu Curtain (closest-edge marquee sheet)
## Goal
Build a contents page whose rows answer the hand. Hovering a row pulls an **inverted sheet** across it — ink where the page is paper — carrying that row's own name on an endless marquee with a photographic still between each repetition. The sheet does not simply rise: it **enters from whichever horizontal edge the pointer actually crossed**, and leaves towards the edge it exits by. Come down onto a row and the sheet comes down with you; come up from below and it rises to meet you.
The demo dress is **Meridian**, a printed quarterly cut into five sections.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **`gsap` (npm), no plugins:**
```js
import gsap from "gsap";
```
No ScrollTrigger, no Lenis, no SplitText. Everything runs inside a `DOMContentLoaded` listener.
Write the engine so it takes **every hook as a `data-` attribute selector** rather than hard-coded class names — `[data-flow-item]`, `[data-flow-panel]`, `[data-flow-strip]`, `[data-flow-part]`. It costs four lines and it means the same engine drops into a page with a completely different naming scheme without an edit.
That does mean each hook is written twice in the markup: a **class for painting** and a **`data-` attribute for moving**. That is the deal, and it is worth it — the alternative is an engine that can only ever be used by a page that agreed to its class names.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
