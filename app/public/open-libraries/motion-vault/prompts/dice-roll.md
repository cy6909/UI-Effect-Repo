Create a React component with React Three Fiber: a toy dice roller on a
#FAFAFA canvas. A white matte rounded die (@react-three/drei RoundedBox,
size 1.2, radius 0.12) with black pip dots (small dark spheres half-embedded
in each face, standard 1-6 layouts, opposite faces sum to 7). On pointer
down anywhere, toss the die: integrate simple physics in useFrame — upward
velocity 6.5-9 u/s, random horizontal drift and angular velocity ~8-14 rad/s
per axis, gravity 18 u/s^2, bounce off an invisible floor at y=0 with 0.5
restitution and angular damping 0.6, soft invisible walls at |x|,|z|=1.4.
When nearly still, slerp the quaternion over 600ms (ease-out cubic) to the
nearest axis-aligned orientation that puts a pre-rolled random face (1-6)
on top, then show a small mono chip overlay with the rolled number. Soft
studio lighting (ambient 0.75 + one directional) and drei ContactShadows.