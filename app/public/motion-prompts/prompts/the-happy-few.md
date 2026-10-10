# Landing Preloader + Hero Reveal with Cursor Emoji Confetti
## Goal
Build a full-screen playful/editorial landing intro. A neutral beige **preloader** holds a small spinning square loader for a few seconds, then wipes upward off the top of the screen to reveal a bright-yellow hero. As it reveals, the two-line headline animates in character by character (each glyph slides up from below its clip mask), and a circular orbit mark pops in beside the headline and starts an **endless slow rotation**. The signature detail: **while the preloader is still running**, moving the cursor sprinkles round emoji "stickers" at the pointer — each pops in with a bouncy `back.out` ease, hangs for a beat, then drops off the bottom of the screen and unmounts. All motion is GSAP core; text is split into `<span>`s manually (no SplitText plugin).
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) only — **no plugins** (no ScrollTrigger, no SplitText, no CustomEase) and no smooth-scroll library. The page does not scroll; it is a pure load-triggered sequence plus a `mousemove` particle spawner. `import gsap from "gsap";` at the top of the module. Everything runs immediately on module load (script is `type="module"`, placed at end of `<body>`).
## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):
```
<div class="container">
  <div class="preloader">
    <div class="loader"></div>
  </div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
