# Pinned Horizontal-Scroll 404 — Giant Serif Headline Pans Sideways While Image Cards Parallax and Rotate
## Goal
Build a **full-screen black 404 page** whose star effect is a **pinned, scroll-driven horizontal pan**. A colossal white serif headline ("Page Not Found", set at `48vw`) lives on a `400vw`-wide stage; as the visitor scrolls **down**, the whole stage is pinned in place and slides **left** (its `x` goes `0 → −350vw`), so the giant letters sweep across the viewport from right to left. Scattered over the headline are **four small rounded image cards** that each **drift sideways at their own rate and rotate** as you scroll — a layered parallax. When the pan completes, a centered closing message ("This page doesn't exist anymore… but that's okay. We'll get you right back on the track!") is revealed on the now-empty black stage. Everything is driven by GSAP **ScrollTrigger** (`scrub` + `pin`) with a distinctive double-smoothed, trailing feel.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`ScrollTrigger`**. No smooth-scroll library, no canvas/WebGL, no SplitText. Import as:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```
All animation code runs inside a `DOMContentLoaded` listener.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
