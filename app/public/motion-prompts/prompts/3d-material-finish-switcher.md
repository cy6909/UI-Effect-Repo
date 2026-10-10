# 3D Material Finish Switcher
## Goal
Build a full-viewport hero for a watch atelier. A single 3D object — a vintage pocket watch — hangs slightly right of centre, swaying gently about its own axis with the dial towards the camera, lit by nothing but an image-based environment. Four pill buttons across the bottom left name four finishes: brushed metal, iridescent, red lacquer, cut glass. Press one and the case answers immediately, in the same frame: the material is rebuilt from a table of physically-based numbers and the case swings far enough to show the new finish on the rim before easing back to the dial, so the change reads as a gesture rather than a flicker. The glass crystal over the dial is a **real transmission material** — it refracts what is behind it — while everything else is `MeshPhysicalMaterial`.
Four things separate this from a spinning-model demo, and all four are load-bearing:
1. **No PBR value is written in the JavaScript.** Every finish is read at runtime from a JSON file, mesh by mesh. Adding a fifth finish is a change to that file, not to the code.
2. **The environment is aimed, not chosen.** A watch case is an almost flat disc, so it reflects a narrow cone of directions and whatever fills that cone *is* the finish. The lighting here is a generated studio whose bright panel has its feathered edge exactly where the centre of the case looks — that edge is what splits the case into a lit half and a dark half, and it is the difference between a polished object and a plastic one.
3. **A static poster is the first thing that paints**, and on a device that should not be running this scene it is the *only* thing that paints. The canvas is never created until the section is on screen.
4. **The quality degrades by measured frame time, not by guesswork** — buffer resolution, then pixel ratio, then transmission itself, then back to the poster.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP, no Lenis, no scroll library, no tweening library at all.** The motion is one `requestAnimationFrame` loop: an idle sway plus an angular velocity the pointer feeds and friction takes back.
Runtime dependencies (both npm):
- `three`
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
