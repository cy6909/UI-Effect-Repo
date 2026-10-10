Create a React component with React Three Fiber: a 3D stacking toy on a
dark #09090B canvas. Each pointer down drops a rounded box (@react-three/
drei RoundedBox, radius 0.06, ~0.95 x 0.42 x 0.95 randomized ±15%, random
muted tone from a 4-color palette: zinc-600 #52525B, zinc-400 #A1A1AA,
sage #9CAF88, sand #D9CDB8, tiny random x offset ±0.07) from 4.6 units
above onto the growing stack. Integrate the fall in useFrame (gravity
26 u/s^2), land with a small 0.35-restitution bounce, then a settle wobble:
rotation.z/x = tilt * exp(-3.2t) * cos(9t). The whole stack group slowly
orbits at 0.1 rad/s and sways on rotation.z with amplitude proportional to
stack height (up to ±0.014 rad). After the 8th block settles (~2.2s), fade
all materials out while sinking the stack 4.2 units over 0.9s, then clear
and restart. Dim ambient 0.4 + key directional 1.4 + weak fill, drei
ContactShadows, transparent materials for the fade. Mono chip shows the
block count.