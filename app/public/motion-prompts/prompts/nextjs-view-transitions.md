# Next.js-style View Transitions — multi-page portfolio with native View Transitions API + GSAP text intros
## Goal
Build a single-page demo that simulates a 3-route portfolio site (Home / Projects / Info) where clicking a nav link triggers a full-page transition powered by the **native View Transitions API** (`document.startViewTransition`): the outgoing page slides up and fades to 20% opacity while the incoming page is revealed from the bottom by an animated `clip-path`, both over 1.5s with a `cubic-bezier(0.87, 0, 0.13, 1)` ease. On top of that, each destination page runs its own GSAP text intro on mount: the Home headline reveals character-by-character and the Info paragraph reveals line-by-line, both sliding up from `y: 400` behind clip-path masks.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm), `split-type` (npm, for splitting text into chars/lines — NOT the GSAP SplitText plugin), and `lenis` (npm) for smooth scrolling. No GSAP plugins are needed. The page-to-page transition itself uses the Web Animations API (`document.documentElement.animate(...)`) targeting `::view-transition-old(root)` / `::view-transition-new(root)` pseudo-elements — not GSAP.
```js
import gsap from "gsap";
import SplitType from "split-type";
import Lenis from "lenis";
```
## Layout / HTML
- `<nav class="nav">` fixed at the top, containing:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
