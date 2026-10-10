Create a React magnetic card with Framer Motion: while the cursor is inside
the container, translate the card toward the cursor with distance-based
falloff (max 24px) using useMotionValue + useSpring (stiffness 200,
damping 18). On mouse leave, spring back to origin with a satisfying
overshoot. Apply the same magnetic effect at 0.5x strength to the card's
inner content for parallax depth.