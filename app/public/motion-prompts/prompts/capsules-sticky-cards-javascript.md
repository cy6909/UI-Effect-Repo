# Capsule-to-Fullscreen Sticky Cards (scroll deck with marquee + SplitText reveals)
## Goal
Build a scroll-driven page with a **deck of four full-viewport cards that pin on top of each other**. The star effect: the **first card starts as a small pill-shaped "capsule"** (image wrapper scaled to 0.5 with a 400px border-radius) floating over a **giant looping horizontal text marquee**; as the user scrolls through 300vh, the capsule **grows into a full-bleed image** (scale 0.5→1, border-radius 400px→25px) while the marquee fades away, and when the expansion completes the card's **title characters slide in through overflow masks (SplitText)** together with a small description. Every following card then pins over the previous one — the outgoing card **scales down and fades**, the incoming card's image **de-zooms (scale 2→1) and sharpens its corners (border-radius 150px→25px)**, and its title/description animate in the same masked-chars way. Smooth scroll via Lenis. An intro section sits above the deck and an outro below.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins `ScrollTrigger` and `SplitText`, and `lenis` (npm) for smooth scrolling. No framework:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
```
Register once: `gsap.registerPlugin(SplitText, ScrollTrigger);`. Wrap all setup in a `DOMContentLoaded` listener. Put the seamless-marquee helper in a second module (`marquee.js`) exporting `setupMarqueeAnimation()`.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
