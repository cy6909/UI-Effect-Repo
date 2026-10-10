Create a React component with React Three Fiber: an open book lying on a
#FAFAFA table, camera at [0, 3.4, 3.1] fov 40 looking at the spine. The
book (local XY plane, group rotated -90deg on x so pages lie flat): two
cloth cover boards (zinc-700, 1.49 x 2.04 x 0.055) mirrored around a
zinc-800 spine box, an amber bookmark ribbon (#F59E0B, 0.07 x 0.3) peeking
past the bottom edge, and two flat page stacks (6 thin white boxes per
side, 1.35 x 1.9, thickness 0.012, stacked with 0.012 z steps). On pointer
down (or after ~3.8s idle), flip the top sheet: a PlaneGeometry(1.35, 1.9,
24, 1) translated +w/2 on x so it pivots at the spine, parented to a pivot
group whose rotation.y eases 0 -> PI over 1150ms (ease-in-out); while
mid-air curl the sheet in useFrame by rewriting vertex z =
0.34 * sin(PI * x / w) * sin(theta) so it arcs like real paper, flat at
both ends (cache base positions, set needsUpdate). Page faces are
CanvasTextures (340x480, off-white, hairline border, mono 'CHAPTER · 0N'
header, three abstract editorial layout variants — title bars / paragraph
skeleton / soft gradient figure — one subtle amber accent line, page
number footer), cycled per flip, DoubleSide material. When a flip settles,
decrement the source stack / increment the other (React state for counts,
frame-loop state in refs with a ref mirror to avoid stale closures); when
the right stack empties, flips reverse direction and pages come back.
Ambient 0.8 + key directional, drei ContactShadows, mono chip overlay
counting turned pages.