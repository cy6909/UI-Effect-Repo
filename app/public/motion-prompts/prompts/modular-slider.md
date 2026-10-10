# Modular Carousel — click-advanced split-panel clip-path image slider
## Goal
Build a **full-viewport, click-driven image carousel**. The whole page is the button: every click
anywhere advances the slider. Two things happen per click, in parallel: (1) a horizontal strip of
big centered slide **titles** slides one slot to the left via a slow 2s `gsap.to` `power4.out`
tween, promoting a new title to the highlighted center position; and (2) in a small centered stage
made of **two offset split panels** (a top band and a bottom band cut with CSS `clip-path`
polygons), a **fresh pair of `<img>` elements is injected and revealed** — their own animated
`clip-path` wipes open from the right edge while they simultaneously **scale from 2 → 1**, with a
0.15s stagger between the top and bottom panel. The star effect is this layered clip-path reveal:
each new image is stacked on top of the previous ones and sweeps in; old images are trimmed away
after the tween completes. Hovering the image stage widens the two clip-path windows via a pure-CSS
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
