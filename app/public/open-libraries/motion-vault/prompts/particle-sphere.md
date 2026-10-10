Create a React Three Fiber particle sphere: 4000 points sampled on a
Fibonacci sphere of radius 2, size 0.015, white at 0.7 opacity, rotating
slowly around Y (0.08 rad/s). When the mouse (raycast into the scene) comes
within 0.8 units, push nearby particles outward along their normals and let
them spring back over ~1s. Update positions in useFrame or via a custom
shader with a uMouse uniform. Dark background.