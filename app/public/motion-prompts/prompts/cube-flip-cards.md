# Cube Flip Cards — Six-Faced Glass Prisms that Flip on Hover and Tilt with the Pointer
## Goal
Build a row of four cards, each rendered as a real **3D prism** with six faces: front and back are **frosted white glass** carrying a thumbnail, a title, a short description and an arrow; the four sides are translucent. On **hover** the prism **flips 180° on its horizontal axis** (you see the top and bottom faces sweep past) and lands on its identical back face; from then on **pointer movement tilts it** on both axes (up to ±40°) with short tweens, and a **specular highlight sweeps** across the face with the rotation. On leave it eases back to rest. GSAP core.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm). Font: **DM Sans** (400–500).
## Layout / HTML
```html
<div class="cf">
  <section class="cf-stage">
    <div class="cf-card"></div><div class="cf-card"></div><div class="cf-card"></div><div class="cf-card"></div>
  </section>
</div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
