# Filter Gallery with Letter-by-Letter Swelling Headings
## Goal
Build a full-screen editorial gallery on a white page: a **two-column staggered (masonry-ish) image grid** fills the left, and a stack of **oversized category filters** sits bottom-right. Clicking a filter is the star effect — the clicked category's heading is split into per-character `<span>`s and its **`font-size` tweens up letter-by-letter with a stagger** (a small word swelling into a giant magenta headline), the previously-active heading simultaneously **shrinks back down** the same way, and the item grid **cross-fades out and back in** to swap in only the items matching that category.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins**, no smooth-scroll library.
```js
import gsap from "gsap";
```
The character-splitting is done by hand (not SplitText). Run everything inside a `DOMContentLoaded` listener.
## Layout / HTML
Class names are load-bearing (JS and CSS query them). Static markup is minimal — the gallery items are injected by JS.
```html
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
