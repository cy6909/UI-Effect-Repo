Create a React component with React Three Fiber: a soft studio-light
orbit scene on a #FAFAFA canvas. A matte central sphere (zinc-200, radius
0.9, high roughness) sits at the origin while six small spheres (mix of
zinc-400 and zinc-600, plus exactly ONE amber #F59E0B accent) orbit on
three differently-tilted invisible rings (tilts ~0deg, 35deg, -25deg; radii
1.7 / 2.1 / 2.5), each satellite at its own speed between 0.3 and 0.8 rad/s.
Mark each orbit with a hairline torus (tube 0.004, zinc-300, opacity 0.6).
Rotate the whole group slowly at 0.05 rad/s. Lighting: ambient 0.7 + one
soft directional light, matte standard materials, no shadows.