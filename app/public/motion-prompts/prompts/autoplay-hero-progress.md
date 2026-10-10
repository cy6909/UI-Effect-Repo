# Autoplay Hero with Progress — a hero on a clock, and the clock made visible
## Goal
Build a full-bleed hero carousel that advances **on a timer**, with one progress tick per slide
filling over exactly that slide's duration, and controls that actually work.
Use it when the front page has to show three or four things and none outranks the others: a
season's programme, a line-up, a schedule.
## Tech
**No GSAP, no ScrollTrigger, no Lenis — deliberately.** This hero is driven by a clock, not by the
scroll, and wiring a time-driven component to a scroll library is pretending. Plain ES modules and
one `requestAnimationFrame` loop.
> How the effect was identified in the first place: on the reference site the progress bar read
> **40% scrolling down and 86% scrolling back up at the same scroll position**. That is only
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
