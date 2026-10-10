Create a React component with React Three Fiber: a 3D carousel of seven
portrait cards flying along a closed racetrack loop on a #FAFAFA canvas.
Build the loop by sampling 40 points of a stadium outline (straights along
x with half-length 2.35, semicircle caps radius 1.55) into a closed
CatmullRomCurve3 (centripetal, arcLengthDivisions 400). Each card: a white
matte RoundedBox (1.02 x 1.36 x 0.05, radius 0.045) with a CanvasTexture
face (256x340: white card, muted low-saturation gradient thumbnail from a
6-duotone palette — mist/sand/sage/clay/ink/dawn — plus one amber-tinted
variant, mono 'FRAME · 0N' tag, dark title bar, two skeleton lines).
Per frame place card i at curve.getPointAt((i/7 + offset) mod 1), yaw it
from the tangent (atan2(tan.x, tan.z) + PI/2 so it faces outward), and
bank it into the motion: rotation.z = clamp(-angularVelocity * 0.16,
±0.22). Emphasize depth: scale 0.82 -> 1.12 and y 0.86 -> 1.02 by
frontness ((z/1.55+1)/2), and lerp the material color from zinc-300 to
white with frontness so back cards recede. The shared offset eases toward
a target (lerp rate ~4.2/s): clicking the left/right half of the preview
(invisible button overlays, cursor w-resize/e-resize) steps the target by
±1/7 so the whole train glides one card along the curve; auto-advance
every 3.2s when idle. Camera [0, 2.5, 4.6] fov 42 looking at [0, 0.75, 0],
ambient 0.8 + one directional, drei ContactShadows, mono chip overlay
counting switches.