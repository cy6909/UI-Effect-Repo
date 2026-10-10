// The orchestration layer between the tool's rect shapes and the geometry.
//
// Turns the canvas rects ({x, y, w, h, r}) into one fused SVG path via the SDF
// smooth-union field + marching squares. Framework-free; callers memoize.

import { Field } from './sdf';
import { fieldToPath } from './marchingSquares';

export const getShapeRadius = (shape, globalRadius) => (shape.r !== undefined ? shape.r : globalRadius);

/** Compute the fused liquid path for a set of rects.
 *  - `blend` (k): low = crisp inverse-rounded joints, high = gooey melt.
 *  - `opts.cell`: marching-squares grid step in px (smaller = crisper + slower).
 *  - `opts.smooth`: Chaikin passes on the traced outline.
 *  - `opts.alignTo`: translate the path so its bounds' top-left lands there.
 *  Returns { d, minX, minY, width, height } in canvas coordinates (or aligned). */
export const computeLiquidPath = (shapes, globalRadius, blend, opts = {}) => {
  const boxes = shapes.map(s => ({
    kind: 'box',
    cx: s.x + s.w / 2,
    cy: s.y + s.h / 2,
    hw: s.w / 2,
    hh: s.h / 2,
    r: getShapeRadius(s, globalRadius)
  }));
  const field = new Field(boxes, blend);
  return fieldToPath(field, { cell: opts.cell ?? 4, smooth: opts.smooth ?? 2, alignTo: opts.alignTo });
};
