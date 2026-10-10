Create a React component with React Three Fiber: a 22x22 grid of thin
matte boxes (0.32 x 0.32 footprint, zinc-800, spacing 0.44) on a #FAFAFA
canvas, heights driven by a radial sine wave h = 0.15 + (sin(dist - t*2.2)
+ 1) * 0.5 * 1.1 where dist is the distance from a ripple center. Raycast
the pointer onto the grid plane and lerp the ripple center toward the hit
point at 0.08 per frame; ease back to the origin on leave. Render with a
single instancedMesh, lerping instance color from zinc-800 to zinc-200 by
wave height so crests read lighter — keep it strictly monochrome. Camera:
45deg elevated view, plus a slow breathing rotation of ±3deg. Ambient 0.7 +
one directional light, no shadows.