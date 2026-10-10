Create a React component with React Three Fiber: a draggable polished
metal torus knot on a dark #09090B canvas. TorusKnot geometry (radius 1,
tube 0.32, 220x36 segments) with meshStandardMaterial zinc-300 #D4D4D8,
metalness 0.85, roughness 0.25. Pointer interaction with pointer capture:
while dragging, convert pointer delta (NDC) into angular velocity on both
axes (~4 rad per full-screen sweep); on release keep the inertia with
friction decay 0.95 per frame (frame-rate independent via pow(0.95, dt*60));
after 2s idle, lerp the yaw velocity back to a slow 0.25 rad/s auto-
rotation and pitch to 0. All motion state in refs, cursor grab/grabbing.
Lighting without network assets: drei Environment with resolution 256 and
3-4 Lightformers (top softbox intensity 3, two side strips, weak front
fill) plus ambient 0.15 — no HDR preset download.