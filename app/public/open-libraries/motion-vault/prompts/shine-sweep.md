Create a React shine-sweep button: inside an overflow-hidden black button,
a diagonal (45deg) white gradient band (40% width, 0.25 opacity) sweeps
from left to right (translateX -150% → 150%, 0.8s ease-in-out) every 3.5s,
and once immediately on hover. Pseudo-element implementation, transform
only, no layout thrash.