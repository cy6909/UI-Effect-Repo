Create a React component with React Three Fiber: a perpetual bouncing-ball
toy on a #FAFAFA canvas. Start with 3 matte spheres (zinc-700 #52525B,
zinc-400 #A1A1AA, and one amber #F59E0B; radii 0.24-0.38) integrating
simple physics in useFrame: gravity 14 u/s^2, floor bounce with restitution
0.9 but enforce a minimum rebound velocity (~5.2 u/s) so balls never stop
bouncing, side walls at |x|=3.1 with 0.9 restitution, and a squash-and-
stretch on impact (scaleY 1->0.85->1, scaleXZ up to 1.1, recovering over
120ms). On pointer down, raycast the click onto an invisible plane and drop
a NEW ball (random of the 3 colors, random size) from above that x position,
up to a max of 10 balls; show a small mono chip counter. Physics state lives
in refs keyed by ball id — no useState in useFrame. Soft ambient 0.75 + one
directional light, drei ContactShadows, matte standard materials.