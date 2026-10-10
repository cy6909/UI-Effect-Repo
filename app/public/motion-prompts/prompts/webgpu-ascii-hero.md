# WebGPU ASCII Hero
Build a full-bleed hero section whose subject is a **twisted torus raymarched
and quantised to monospaced characters entirely on the GPU**, with the key light
following the pointer. No mesh, no font file, no texture atlas, no model — the
only asset is a static poster image.
The finished thing reads like the output of a terminal that has been asked to
draw a solid: mint-green glyphs on near-black, dense `*` and `#` where the light
hits, thinning through `o`, `+`, `=`, `-` to sparse `.` in shadow, with a hole
through the middle where the torus opens.
---
## 1 · Stack, and why this one
Use **[vgpu](https://vgpu.sh)** (`npm install vgpu`), the WebGPU library from
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
