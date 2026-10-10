Create a React magnetic button with Framer Motion: when the cursor comes
within 80px, the whole pill button translates toward it (max 16px) via
useMotionValue + useSpring (stiffness 180, damping 14); the inner label
follows at 0.4x strength for layered parallax. On leave, both spring back
with a soft overshoot. Attach listeners on a wrapper, not window.