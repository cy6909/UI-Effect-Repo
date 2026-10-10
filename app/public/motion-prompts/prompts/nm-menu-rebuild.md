# Fullscreen Portfolio Menu — Clip-Path Overlay with Staggered Giant Links
## Goal
Build a fullscreen overlay navigation for an editorial portfolio site. A burger button in the top-right toggles the menu: a single GSAP timeline sweeps a dark `clip-path` overlay down over the entire viewport, then staggers three oversized menu words up from behind a mask, grows a colored underline bar across the active item (animated via `CSSRulePlugin` on a `::after` pseudo-element), and fades a social sub-nav up into place. Clicking the burger again plays the exact same timeline in reverse. The burger morphs into an X. The top nav uses `mix-blend-mode: difference` so its text/lines invert against whatever is behind them.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`CSSRulePlugin`** (this is required — the active-item underline is a CSS `::after` pseudo-element and can only be tweened through `CSSRulePlugin.getRule(...)`).
```js
import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);
```
Wrap all JS in a `DOMContentLoaded` listener. No smooth-scroll library, no ScrollTrigger, no canvas/WebGL.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
