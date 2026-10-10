Create a React component with React Three Fiber: a Rubik's cube on a
#FAFAFA studio canvas, camera [0, 1.6, 4.1] fov 40. Build 27 cubies on a
3x3x3 grid (pitch 0.35): each is a dark zinc-800 RoundedBox (0.315, radius
0.045) with six sticker planes (0.246^2) mounted 0.004 proud of each face
in a muted low-saturation palette — white #F4F4F5, sand #D9CDB8, sage
#9CAF88, steel blue #93B4C8, clay #C99A8E, amber #F59E0B. The root group
acts as a slow turntable (rotation.y += 0.22*dt, fixed 0.42 rad x tilt
with a tiny breathing wobble). A move: pick a random axis, layer
(-1/0/1) and direction; pivot the layer by attaching the 9 affected cubies
(those whose rounded grid coordinate matches the layer) to a temporary
pivot group with Object3D.attach (preserves world transforms), then ease
pivot.rotation[axis] 0 -> dir * PI/2 over 460ms (ease-in-out) in useFrame.
On completion attach all cubies back to the root and snap them: round
positions to the grid and round the 3x3 rotation matrix elements to
{-1,0,1} before rebuilding the quaternion — this keeps every turn exactly
on-grid. Ignore new moves while one is animating; auto-twist every 2s when
idle, and pointer down anywhere triggers an immediate twist (tick ref
pattern, no setState in the frame loop). Ambient 0.7 + key directional
1.1 + fill 0.35, drei ContactShadows, mono chip overlay counting twisted
layers.