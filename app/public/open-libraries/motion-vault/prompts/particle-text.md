Create a React particle-text component on Canvas 2D. Render a word
(e.g. "MOTION", 120px bold) to an offscreen canvas, sample pixels to get
~1500 target points. Particles start at random positions and spring toward
their targets (attraction 0.06, damping 0.86). Within 60px of the cursor,
apply a repulsion force (up to 8, distance-falloff) so particles scatter,
then spring back. White 1.2px dots on a dark background. rAF loop, pause
offscreen, rebuild on resize.