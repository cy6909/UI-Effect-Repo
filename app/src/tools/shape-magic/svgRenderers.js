// Renderer-agnostic fill/effect specs + export generators for the fused liquid
// shape. All geometry comes from computeLiquidPath (SDF smooth-union + marching
// squares) — a single `d` path replaces the old per-shape + bridge output.
import { computeLiquidPath } from './liquid';

// How much extra room the shadow / stroke effects need outside the shape bounds.
export const effectPadding = style => {
  let pad = 0;
  if (style?.shadowEnabled) {
    pad = Math.max(
      pad,
      (style.shadowBlur || 0) + Math.max(Math.abs(style.shadowOffsetX || 0), Math.abs(style.shadowOffsetY || 0))
    );
  }
  if (style?.strokeEnabled) {
    pad = Math.max(pad, style.strokeWidth || 0);
  }
  return Math.ceil(pad);
};

// Build a renderer-agnostic description of the fill (solid color or gradient).
// `bbox` must be in the same coordinate space as the drawn paths so a gradient
// spans the whole merged silhouette seamlessly (gradientUnits=userSpaceOnUse).
export const getFillSpec = (style, bbox, idSuffix = '') => {
  const id = `sm-fill-${idSuffix}`;
  const type = style.fillType || 'solid';
  if (type === 'solid') {
    return { type: 'solid', id, paint: style.fill };
  }

  const c1 = style.fill;
  const c2 = style.fillColor2 || style.fill;
  const cx = bbox.x + bbox.w / 2;
  const cy = bbox.y + bbox.h / 2;

  if (type === 'linear') {
    const angle = (((style.gradientAngle ?? 135) - 90) * Math.PI) / 180;
    const half = (Math.abs(Math.cos(angle)) * bbox.w + Math.abs(Math.sin(angle)) * bbox.h) / 2;
    const dx = Math.cos(angle) * half;
    const dy = Math.sin(angle) * half;
    return {
      type: 'linear',
      id,
      paint: `url(#${id})`,
      x1: cx - dx,
      y1: cy - dy,
      x2: cx + dx,
      y2: cy + dy,
      stops: [
        { offset: 0, color: c1 },
        { offset: 1, color: c2 }
      ]
    };
  }

  // radial
  return {
    type: 'radial',
    id,
    paint: `url(#${id})`,
    cx,
    cy,
    r: Math.max(bbox.w, bbox.h) / 2,
    stops: [
      { offset: 0, color: c1 },
      { offset: 1, color: c2 }
    ]
  };
};

// Description of the shadow + outer-stroke filter applied to the merged group.
export const getFxSpec = (style, idSuffix = '') => {
  const hasShadow = !!style.shadowEnabled;
  const hasStroke = !!style.strokeEnabled && (style.strokeWidth || 0) > 0;
  if (!hasShadow && !hasStroke) return null;
  return {
    id: `sm-fx-${idSuffix}`,
    hasShadow,
    hasStroke,
    shadowColor: style.shadowColor,
    shadowBlur: style.shadowBlur,
    shadowOffsetX: style.shadowOffsetX,
    shadowOffsetY: style.shadowOffsetY,
    shadowOpacity: style.shadowOpacity,
    strokeColor: style.strokeColor,
    strokeWidth: style.strokeWidth
  };
};

// String builders (used by the export generators).
export const fillDefsString = spec => {
  if (!spec || spec.type === 'solid') return '';
  const stops = spec.stops.map(s => `<stop offset="${s.offset}" stop-color="${s.color}" />`).join('');
  if (spec.type === 'linear') {
    return `<linearGradient id="${spec.id}" gradientUnits="userSpaceOnUse" x1="${spec.x1}" y1="${spec.y1}" x2="${spec.x2}" y2="${spec.y2}">${stops}</linearGradient>`;
  }
  return `<radialGradient id="${spec.id}" gradientUnits="userSpaceOnUse" cx="${spec.cx}" cy="${spec.cy}" r="${spec.r}">${stops}</radialGradient>`;
};

export const fxFilterString = spec => {
  if (!spec) return '';
  const parts = [];
  if (spec.hasShadow) {
    parts.push(`<feGaussianBlur in="SourceAlpha" stdDeviation="${spec.shadowBlur}" result="smBlur" />`);
    parts.push(`<feOffset in="smBlur" dx="${spec.shadowOffsetX}" dy="${spec.shadowOffsetY}" result="smOff" />`);
    parts.push(
      `<feFlood flood-color="${spec.shadowColor}" flood-opacity="${spec.shadowOpacity}" result="smShadowColor" />`
    );
    parts.push(`<feComposite in="smShadowColor" in2="smOff" operator="in" result="smShadow" />`);
  }
  if (spec.hasStroke) {
    parts.push(`<feMorphology in="SourceAlpha" operator="dilate" radius="${spec.strokeWidth}" result="smDilated" />`);
    parts.push(`<feFlood flood-color="${spec.strokeColor}" result="smStrokeColor" />`);
    parts.push(`<feComposite in="smStrokeColor" in2="smDilated" operator="in" result="smOutline" />`);
  }
  const merge = [
    spec.hasShadow ? '<feMergeNode in="smShadow" />' : '',
    spec.hasStroke ? '<feMergeNode in="smOutline" />' : '',
    '<feMergeNode in="SourceGraphic" />'
  ].join('');
  return `<filter id="${spec.id}" x="-50%" y="-50%" width="200%" height="200%">${parts.join('')}<feMerge>${merge}</feMerge></filter>`;
};

export const generateMergedSVG = (shapes, style, globalRadius, blend, detail, opts = {}) => {
  const basePad = 10;
  const userPad = opts.padding ?? 0;
  const fxPad = effectPadding(style);
  const padding = basePad + userPad + fxPad;

  const path = computeLiquidPath(shapes, globalRadius, blend, {
    cell: detail,
    alignTo: { x: padding, y: padding }
  });
  const width = Math.ceil(path.width + padding * 2);
  const height = Math.ceil(path.height + padding * 2);

  const drawnBBox = { x: padding, y: padding, w: path.width, h: path.height };
  const fillSpec = getFillSpec(style, drawnBBox, 'merged');
  const fxSpec = getFxSpec(style, 'merged');

  const defs = `${fillDefsString(fillSpec)}${fxFilterString(fxSpec)}`;
  const bg =
    style.backgroundEnabled || opts.forceBackground
      ? `<rect x="0" y="0" width="${width}" height="${height}" fill="${style.backgroundColor}" />\n  `
      : '';

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs ? `<defs>${defs}</defs>\n  ` : ''}${bg}<path d="${path.d}" fill="${fillSpec.paint}" fill-opacity="${style.opacity ?? 1}"${fxSpec ? ` filter="url(#${fxSpec.id})"` : ''} />
</svg>`;
};

export const generateMergedClipPathSVG = (shapes, style, globalRadius, blend, detail) => {
  const padding = 10;
  const path = computeLiquidPath(shapes, globalRadius, blend, {
    cell: detail,
    alignTo: { x: padding, y: padding }
  });
  const width = Math.ceil(path.width + padding * 2);
  const height = Math.ceil(path.height + padding * 2);

  const fillSpec = getFillSpec(style, { x: padding, y: padding, w: path.width, h: path.height }, 'clip');
  const defs = fillDefsString(fillSpec);

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="merged-shape-clip">
      <path d="${path.d}" />
    </clipPath>
    ${defs}
  </defs>

  <!-- The merged shape - use as mask for images/videos -->
  <path d="${path.d}" fill="${fillSpec.paint}" />

  <!-- Example: Clipped content container -->
  <!-- <g clip-path="url(#merged-shape-clip)">
    <image href="your-image.jpg" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" />
  </g> -->
</svg>`;
};

export const generateCSSClipPath = (shapes, globalRadius, blend, detail) => {
  const padding = 10;
  const path = computeLiquidPath(shapes, globalRadius, blend, {
    cell: detail,
    alignTo: { x: padding, y: padding }
  });
  const width = Math.ceil(path.width + padding * 2);
  const height = Math.ceil(path.height + padding * 2);

  return `/* Container dimensions: ${width}px × ${height}px */
.clipped-element {
  clip-path: path('${path.d}');
  width: ${width}px;
  height: ${height}px;
}`;
};

export const generateReactComponent = (shapes, style, globalRadius, blend, detail, name = 'MergedShape') => {
  const path = computeLiquidPath(shapes, globalRadius, blend, { cell: detail });
  const width = Math.ceil(path.width);
  const height = Math.ceil(path.height);

  // One content slot per source rect, positioned relative to the fused bounds so
  // real content (text, images, links) can be dropped into each original region.
  const slotElements = shapes
    .map((s, i) => {
      const left = Math.round(s.x - path.minX);
      const top = Math.round(s.y - path.minY);

      return `      {/* Shape ${i + 1} content slot */}
      <div
        style={{
          position: 'absolute',
          left: ${left},
          top: ${top},
          width: ${s.w},
          height: ${s.h},
        }}
      >
        {/* Add content here */}
      </div>`;
    })
    .join('\n');

  return `const ${name} = ({ fill = "${style.fill}", children, style: containerStyle, ...props }) => (
  <div
    style={{
      position: 'relative',
      width: ${width},
      height: ${height},
      ...containerStyle,
    }}
    {...props}
  >
    {/* The fused liquid skin (SDF smooth-union traced to a single path) */}
    <svg
      aria-hidden
      viewBox="${path.minX.toFixed(2)} ${path.minY.toFixed(2)} ${path.width.toFixed(2)} ${path.height.toFixed(2)}"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <path d="${path.d}" fill={fill} />
    </svg>
${slotElements}
    {children}
  </div>
);

export default ${name};`;
};
