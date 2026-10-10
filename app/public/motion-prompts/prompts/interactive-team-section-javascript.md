# Interactive Team Section — hover thumbnails reveal giant staggered names
## Goal
Build a full-viewport "meet the team" section: a centered row of 9 small square portrait thumbnails sits above a giant clip-masked headline area. Hovering a thumbnail smoothly enlarges it (70px → 140px) while that member's name slides up into view as huge red condensed type, animated character-by-character with a center-out SplitText stagger. When the cursor enters the row at all, a default title ("The Squad") animates in the same way in an off-white color; leaving the row hides it again.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `SplitText` (`import { SplitText } from "gsap/SplitText"`, then `gsap.registerPlugin(SplitText)`). No other libraries, no smooth-scroll.
## Layout / HTML
```
<section class="team">
  <div class="profile-images">
    <div class="img"><img src="..." alt="" /></div>   <!-- x9 -->
  </div>
  <div class="profile-names">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
