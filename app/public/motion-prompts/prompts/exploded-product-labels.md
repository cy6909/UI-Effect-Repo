# Exploded Product with Leader Labels — the object comes apart and names its own pieces
## Goal
Build a pinned stage where a layered product **separates along Z as you scroll**, and each part
names itself with a hairline leader running back to the stack.
Use it when the argument is *what the thing is made of*. A named exploded view beats a bullet list
of features because the reader can see the relationship between the parts, not just their names.
## Tech
Vanilla HTML/CSS/JS with ES modules: `gsap` + `ScrollTrigger`, and `lenis`.
Wire Lenis to ScrollTrigger — this is not optional:
```js
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
