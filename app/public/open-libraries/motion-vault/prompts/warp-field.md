Create a React component with React Three Fiber: a hyperspace warp
tunnel on a dark #09090B canvas. Render ~420 stars as a single
instancedMesh of thin boxes (0.02 x 0.02 x 1) distributed in a hollow
cylindrical tunnel (radius 1.2-10, depth 70 units) flying toward the
camera along +z. Each frame compute a pulsing speed: speed = 5 + 34 *
pow(0.5 + 0.5 * sin(t * 0.45), 3) so the tunnel periodically bursts into
warp. Stretch each instance along z proportionally to speed (stretch =
0.6 + speed * 0.075) so stars become light streaks; recycle any star
passing the camera back to the far end with a fresh random angle/radius.
Per-instance color: lerp from dim steel blue (#93C5FD) in the distance to
bright white (#FAFAFA) near the camera, brightness also scaling with
proximity. Rotate the whole group slowly around z (0.05 rad/s) for a
gentle tunnel roll. Camera fov 75 at z=5, meshBasicMaterial with
toneMapped false, no lights needed.