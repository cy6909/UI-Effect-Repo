# Frame Collapse Reveal — a full-bleed photo folds into its own window, then a row fans out
## Goal
Build a scroll page whose middle section is sticky and starts as a single full-bleed photograph with a thin rounded frame inset from the edges. Three acts follow, driven by scroll:
1. the frame contracts down to the size of a window in the centre of the screen;
2. the full-bleed photograph **fades out** — and because that centre window is showing the *same* photograph at the *same* screen coordinates, what the eye reads is the picture shrinking to fit the rectangle, while in fact not one pixel has moved;
3. only once the fade has finished, six tall slabs slide out from behind the window towards both sides, innermost pair first, and lock in place. They do not move again.
The second act is the whole idea. Actually shrinking the photo rescales and displaces the subject and reads as a zoom-out; fading it leaves the subject exactly where it was, and the effect becomes "the world cropped itself around the image" rather than "the image changed size".
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scrolling. Register with `gsap.registerPlugin(ScrollTrigger)`.
Lenis wiring (exact pattern):
- `const lenis = new Lenis()` (default options).
- `lenis.on("scroll", ScrollTrigger.update)`.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
