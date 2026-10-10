Create a React component with React Three Fiber: a dotted globe on a
dark #09090B canvas. Sample ~600 points on a Fibonacci sphere of radius 2
(golden-angle spiral), rendered as a single THREE.Points with vertexColors —
zinc-100 (#F4F4F5) at randomized brightness (0.3-1.0 multiplier) for
instrument-like depth; point size 0.035, sizeAttenuation, toneMapped false.
The group self-rotates at 0.12 rad/s with a fixed 0.32 rad tilt plus a tiny
breathing wobble. Add two glowing connection arcs between points on the
sphere: pick endpoint pairs in lat/lon, build a QuadraticBezierCurve3 with
the control point pushed outward along the midpoint normal (1.5-1.7x radius),
then TubeGeometry (64 segments, radius 0.011) with a white core and a second
wider tube (radius 0.045, opacity ~0.12 pulsing with sin(t)) as a halo. Place
a small bright white sphere travelling along each arc via curve.getPoint
((t*speed + offset) % 1). Camera at [0, 0.6, 5.2], fov 45, no lights.