import { motion } from 'framer-motion';

const WORD = 'SHADOW';
/** thin vertical lines under each glyph */
const LINES_PER_CHAR = 12;
const BREATH_S = 2.4;

/**
 * Effect — the 'shadow' of a bold 72px word is a field of hairline vertical
 * strokes growing downward from each glyph, their length and opacity
 * breathing on staggered sine-ish eases for a printed-plate illusion.
 * transform (scaleY, origin top) + opacity only.
 */
export default function LineShadowPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6 pt-2">
      <p className="flex gap-[0.06em]" aria-label={WORD}>
        {WORD.split('').map((ch, ci) => (
          <span key={ci} className="relative inline-block" aria-hidden>
            <span className="text-[72px] font-bold leading-none tracking-[-0.02em] text-zinc-950">
              {ch}
            </span>
            {/* hairline shadow fan */}
            <span
              className="absolute left-1/2 top-[0.98em] flex -translate-x-1/2 gap-[3px] [mask-image:linear-gradient(to_bottom,black_35%,transparent_96%)]"
            >
              {Array.from({ length: LINES_PER_CHAR }).map((_, li) => {
                // middle lines taller, edge lines shorter — like light falloff
                const centerBias = 1 - Math.abs(li - (LINES_PER_CHAR - 1) / 2) / (LINES_PER_CHAR / 2);
                return (
                  <motion.span
                    key={li}
                    className="block h-14 w-px origin-top bg-zinc-950 will-change-transform"
                    style={{ height: 34 + centerBias * 22 }}
                    animate={{ scaleY: [0.25, 1, 0.25], opacity: [0.12, 0.65, 0.12] }}
                    transition={{
                      duration: BREATH_S,
                      ease: 'easeInOut',
                      repeat: Number.POSITIVE_INFINITY,
                      delay: ci * 0.16 + li * 0.06,
                    }}
                  />
                );
              })}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
