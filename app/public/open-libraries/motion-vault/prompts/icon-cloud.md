Create a React component with React Three Fiber + @react-three/drei:
a draggable icon cloud on a #FAFAFA canvas. Place 12 lucide-react icons
(Sparkles, Star, Heart, Zap, Moon, Music, Camera, Globe, Code2, Coffee,
Rocket, Hexagon; size 20, strokeWidth 1.5, zinc-600 #52525B) on a sphere
of radius 1.75 using Fibonacci distribution, rendered with drei Html
(center, zIndexRange [5,0], pointerEvents none). Add a faint icosahedron
wireframe sphere (zinc-200, opacity 0.5) for depth. The group auto-rotates
at 0.18 rad/s; pointer drag (pointer capture on the wrapper div) converts
horizontal/vertical drag deltas into extra yaw/pitch velocity (clamped,
pitch limited to ±0.45 rad), and on release the extra velocity decays with
friction pow(0.94, dt*60) back to the idle spin. All motion state in refs,
applied in useFrame; cursor grab/grabbing. Camera fov 42 at z=5.