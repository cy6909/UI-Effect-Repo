Create a React component with React Three Fiber: a hanging staff badge on
a #FAFAFA canvas. Draw the badge with an offscreen Canvas 2D texture (512x320,
white rounded rect, hairline zinc-300 stroke, clip hole at top center, grey
avatar placeholder, 'STAFF' in bold JetBrains Mono zinc-950, a mono subtitle
'MOTIONVAULT / N°034', and a small barcode strip), applied as a CanvasTexture
(transparent, toneMapped false) on a 1.36 x 0.85 plane. The badge hangs from
a thin cylinder rope (radius 0.008, zinc-500, length 1.7) on a pivot group at
y=1.55 with a small anchor pin sphere. Physics in useFrame with all state in
refs: a spring-pendulum where rotation.z (theta) integrates
omega += (-k*theta - c*omega)*dt. While pointer-dragging (pointer capture on
the wrapper div, cursor grab/grabbing, touchAction none) the spring stiffens
(k=34, c=9) and targets clamp(pointerNDC.x * 1.3, ±1.15) so the badge follows
the drag; on release k=9, c=0.55 gives a loose underdamped swing back to
center. Add a subtle lerped rotation.y tilt from drag x. Camera [0, 0.1, 4.2],
fov 42, no lights.