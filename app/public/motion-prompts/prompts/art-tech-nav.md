# Art Tech Overlay Navigation
## Goal
Build a fullscreen overlay navigation for an editorial/tech studio site. The star effect: clicking a burger button plays a single paused GSAP timeline that reveals a black fullscreen overlay by wiping **eight vertical blocks** downward via animated `clip-path` (staggered, `power3.inOut`), and — overlapping the tail of that wipe — fades in a menu title plus a list of menu items. Clicking again reverses the exact same timeline to close.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — no plugins, no ScrollTrigger, no smooth-scroll library. Google Font `Space Mono` (weights 400 & 700) loaded via `<link>`.
## Layout / HTML
Body contains four top-level regions, in this DOM order (order matters for stacking):
1. `.website-content` — fixed, full viewport, `z-index: 0`. Holds a single `.header` div with an `<img>` of the wide wordmark. This is the background "page" behind everything.
2. `nav` — fixed, full width, `z-index: 2` (sits ABOVE the overlay so the burger stays clickable). Three flex children, each `flex: 1`:
   - `.logo` → `<img>` of the small square brand mark.
   - `.logo-main` → `<img>` of the wide wordmark, centered.
   - `.toggle-btn` → a `<button class="burger">` aligned to the right. The button has an inline `onclick="this.classList.toggle('active');"` that toggles the CSS X-morph (this is separate from the GSAP handler).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
