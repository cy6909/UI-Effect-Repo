Create a React liquid-fill button: an outlined button (1px zinc-950 border,
black text) that on hover fills from the bottom with black — the fill
layer's top edge is a gentle wave (SVG path or animated border-radius)
rising with translateY 100% → 0 over 0.5s ease-out, the wave subtly
undulating while hovered. The label flips to white after a 0.3s delay.
Reverse on mouse leave. Pure CSS + Tailwind.