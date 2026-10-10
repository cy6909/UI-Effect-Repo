Create a React component with React Three Fiber: a mini mechanical
keyboard on a #FAFAFA canvas, viewed from a 45deg elevated camera
([0, 4.4, 4.0], fov 40, lookAt near origin). Build 26 keycaps in three
QWERTY rows ('QWERTYUIOP' / 'ASDFGHJKL' / 'ZXCVBNM', pitch 0.56, row x
offsets 0 / 0.14 / 0.36) sitting on a dark zinc-800 rounded plate
(RoundedBox 6.1 x 0.22 x 2.15, radius 0.09). Each keycap is two stacked
drei RoundedBoxes — a zinc-300 bottom lip (0.48^2 x 0.12) and a zinc-100
top face (0.43^2 x 0.16, radius 0.06) — plus a letter legend: draw each
character on a 128x128 offscreen canvas (zinc-600, 56px monospace,
centered) into a CanvasTexture applied to a 0.26 plane lying flat on the
top face (meshBasicMaterial, transparent, toneMapped false). Every key
owns a spring state in a stable ref map { v, vel, target }: integrate in
useFrame with stiffness 340 / damping 24 (slightly underdamped), position
the keycap group at y = -0.09 * v and lerp the top-face material color
zinc-100 -> zinc-300 with v. Wire window keydown/keyup listeners (ignore
repeats and modifier combos, match /^[A-Z]$/ on e.key.toUpperCase()) to
set target 1/0, release all on window blur, and mirror the same
press/release on the keycap meshes' pointer events (stopPropagation on
pointerdown). Show a mono chip overlay with the last pressed letter.
Lighting: ambient 0.75 + key directional 1.15 + weak fill, drei
ContactShadows under the plate. All motion state in refs — no setState in
the frame loop.