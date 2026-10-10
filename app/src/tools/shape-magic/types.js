export const DEFAULT_STYLE = {
  // Fill
  fillType: 'solid', // 'solid' | 'linear' | 'radial'
  fill: '#ffffff',
  fillColor2: '#a855f7',
  gradientAngle: 135,

  // Stroke (rendered as a clean outer outline of the merged silhouette)
  strokeEnabled: false,
  strokeColor: '#0d0716',
  strokeWidth: 4,

  // Drop shadow (cast from the merged silhouette)
  shadowEnabled: false,
  shadowColor: '#000000',
  shadowBlur: 24,
  shadowOffsetX: 0,
  shadowOffsetY: 14,
  shadowOpacity: 0.35,

  // Global
  opacity: 1,

  // Canvas / export background
  backgroundEnabled: false,
  backgroundColor: '#0d0716'
};

export const DEFAULT_GLOBAL_RADIUS = 32;
// Blend (k): the star knob of the liquid engine — low = crisp inverse-rounded
// joints, high = gooey metaball melt. In px of field distance.
export const DEFAULT_BLEND = 22;
// Detail: marching-squares grid step in px. Smaller = crisper outline, more cost.
export const DEFAULT_DETAIL = 4;

// Quick fusion looks: one click sets both blend + detail.
export const FUSION_MODES = [
  { id: 'geometric', label: 'Geometric', blend: 22, detail: 4 },
  { id: 'goo', label: 'Goo', blend: 64, detail: 6 }
];
export const DEFAULT_CANVAS_WIDTH = 800;
export const DEFAULT_CANVAS_HEIGHT = 600;
export const DEFAULT_GRID_SIZE = 10;

let shapeCounter = 0;
const uid = () => {
  shapeCounter += 1;
  return `shape-${Date.now()}-${shapeCounter}-${Math.random().toString(36).slice(2, 8)}`;
};

export const createShape = (x = 100, y = 100, w = 120, h = 80) => ({
  id: uid(),
  x,
  y,
  w,
  h,
  r: undefined
});

export const createInitialState = () => ({
  shapes: [
    { id: 'shape-1', x: 300, y: 150, w: 200, h: 280, r: undefined },
    { id: 'shape-2', x: 500, y: 220, w: 200, h: 140, r: undefined }
  ],
  style: { ...DEFAULT_STYLE },
  globalRadius: DEFAULT_GLOBAL_RADIUS,
  blend: DEFAULT_BLEND,
  selectedIds: [],
  canvasWidth: DEFAULT_CANVAS_WIDTH,
  canvasHeight: DEFAULT_CANVAS_HEIGHT,
  snapToGrid: true,
  gridSize: DEFAULT_GRID_SIZE
});
