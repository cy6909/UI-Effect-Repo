# Sticky Cards ScrollTrigger — Pinned Full-Screen Deck That Shrinks Each Image
## Goal
Build a full-screen, scroll-driven image gallery. A hero heading and a stack of full-viewport image cards are each **pinned in place one after another** with ScrollTrigger (`pin`, `pinSpacing:false`, `scrub`), so every card holds fixed while the next section scrolls up and covers it. As a card gets covered, **its centered image scales down from 1 to 0.5** (a fixed 1000×700 frame shrinking to half). The giant hero headline **fades its opacity from 1 to 0** across the first 400vh of scroll. The last card scrolls normally (not pinned), then a footer releases the whole pinned stack. The signature effect is the layered "sticky cards" stack with each image quietly shrinking as it's buried.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`ScrollTrigger`**. No other plugins, no Lenis, no framework — plain Vite-style module imports:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```
Register once: `gsap.registerPlugin(ScrollTrigger);`. Wrap all setup in a `DOMContentLoaded` listener. Native scroll (no smooth-scroll library).
## Layout / HTML
A `.container` wraps a fixed logo, a hero section, six card sections, and a footer. Class names are load-bearing — the JS queries `.pinned`, `.card.scroll`, `.img`, `.footer`, and `.hero h1`.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
