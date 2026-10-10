Create a React component with React Three Fiber: a minimal wireframe
sculpture on a #FAFAFA canvas. Three nested wireframe solids — an outer
icosahedron (radius 1.55, zinc-400 #A1A1AA, opacity 0.75), a middle torus
(radius 1.02, tube 0.34, zinc-300 #D4D4D8, opacity 0.55, tilted ~65deg)
and an inner octahedron (radius 0.6, zinc-500 #71717A, opacity 0.9) — all
meshBasicMaterial wireframe, no lights. Each solid rotates on its own axes
at different slow speeds (0.1-0.32 rad/s, mixed directions). The parent
group breathes with scale = 1 + sin(t * 0.6) * 0.04 and drifts around y at
0.06 rad/s. Camera at [0, 0.4, 5], fov 42. Strictly monochrome, gallery-
quiet mood.