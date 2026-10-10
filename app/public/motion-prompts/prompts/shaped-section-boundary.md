# Shaped Section Boundary — the edge between stacked sections is a shape, opened by scroll
## Goal
Build a scrolling page of full-height, flat-colour sections where **the top edge of each section
is a shape, not a straight line** — a wave, a chevron, a diagonal, a torn edge, an arch — and
where **the amplitude of that shape is written by the scroll position**: the edge starts flat as
the section appears from the bottom of the viewport and reaches its full form by the time the
section has risen a little past half the screen.
The point is not decoration. Stacked sections of flat colour with straight butt joins are the
single most recognisable tell of a generated page. Giving the join a shape — and animating that
shape — costs one element and one ScrollTrigger per section.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
