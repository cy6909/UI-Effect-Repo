# Landing Page Reveal Animation (rolling counter + Flip image reveal + masked line text)
## Goal
Build an auto-playing landing-page intro for a design studio: three vertical rolling digit
columns count from 0 to 100 in the bottom-right corner while a lighter background panel wipes
up from the bottom and 15 rounded photo thumbnails pop in (scale 0 → 1) stacked in the
top-left corner. When the "load" finishes, the counter fades out and GSAP **Flip** animates
every thumbnail from the top-left corner to the bottom-right corner with a staggered
scale-punch (each image blows up to 2.5× mid-flight and settles back to 1). Finally, divider
lines draw in and every piece of text (nav, giant heading, side info, footer) rises into view
line-by-line through overflow masks via **SplitText**. Everything runs once on
`DOMContentLoaded` — no scroll, no hover.
## Tech
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
