Create a React component with React Three Fiber: a 3D split-flap clock on
a dark #09090B canvas showing real local time as HH:MM:SS. Six digit tiles
(dark zinc-800 RoundedBox 0.64 x 0.94 x 0.07, radius 0.05, pitch 0.78) with
two blinking colon dot pairs between the pairs (small 0.07 boxes, zinc-400,
opacity pulsing 0.35-0.85 with |sin(t*PI)|). Each tile has a 1px black hinge
line across its middle and four stacked faces at z≈0.037-0.041: a static top
half-plane (0.58 x 0.42 at y +0.235), a static bottom half-plane (y -0.235),
a top flap plane hinged at y=0 (child of a pivot group, offset y +0.235) and
a bottom flap plane (offset y -0.235). Digit faces are CanvasTextures: draw
each glyph 0-9 once on a 128x188 canvas (white #FAFAFA, 148px monospace,
centered) and crop two 128x92 canvases (top/bottom halves) into shared
MeshBasicMaterials (transparent, toneMapped false). Per-digit state lives in
a refs array { shown, flipping, from, to, t0 }: every useFrame read new
Date() and when a digit differs from 'shown', start a two-phase flip —
phase A (240ms, ease-in): the top flap carrying the OLD top half falls
forward around the hinge, rotation.x 0 -> PI/2, while the static top shows
the NEW digit so it is progressively revealed; phase B (260ms, ease-out):
the bottom flap carrying the NEW bottom half swings from rotation.x PI/2
(horizontal, edge-on) down to 0, followed by a 140ms hinge bounce
(-0.09 rad * sin decay). On completion settle 'shown' to the new digit and
hide both flaps. Camera [0, 0.4, 5.4] fov 38 looking at [0, 0.1, 0],
ambient 0.5 + one directional 0.9. A frosted mono chip overlay (white/10
border, white/70 text) shows 'LOCAL TIME · HH:MM:SS' via a 500ms interval
with cleanup on unmount.