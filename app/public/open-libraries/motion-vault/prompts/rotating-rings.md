Create a React Three Fiber gyroscope scene: five concentric torus rings
(radii 1.0 to 2.0, tube 0.015, white wireframe, opacity 0.5→0.9 from inner
to outer). Each ring has a random initial tilt (±0.6 rad on x/y) and spins
at a different speed (0.2-0.6 rad/s, alternating direction). The group
subtly tilts toward the mouse (±0.1 rad, lerped). Dark background.