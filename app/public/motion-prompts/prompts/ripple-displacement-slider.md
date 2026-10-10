# Ripple Displacement Slider (WebGL radial-wave crossfade on click)
## Goal
Build a full-screen slider that shows one large, boxed image at a time with an editorial title on
the left and a short description on the right. The image is not a DOM `<img>` — it is rendered onto
a **Three.js shader plane**. **Clicking anywhere on the slider fires a radial ripple**: a custom
GLSL wave expands from the center of the image outward, **displacing the UVs** along its front
(the pixels ripple like water) and **crossfading to the next slide's texture** right behind the
advancing wave, with a subtle brightness boost riding the crest. That ripple is a single
**GSAP tween of one shader uniform** (`uProgress`, 0 → maxCornerDistance over ~3s, `power2.out`).
Simultaneously, **SplitText** slides the current slide's title characters and description lines
**out** (`y: -100%`) and, once they clear, builds the next slide and slides its text **in**
(`y: 100%` → `0%`). The overlaid text uses `mix-blend-mode: difference`, so the white type inverts
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
