import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const LINES = [
  '好的动效从不喧哗，',
  '它只是在你注视的那一刻，',
  '恰好把信息送到眼前，',
  '然后安静地退场。',
];

/**
 * whileInView lives on the outer, non-translated wrapper: the inner line
 * spans start at y:'100%' and are fully clipped by their overflow-hidden
 * masks, so an observer attached to them would report 0% intersection
 * forever and never fire. Variants propagate the trigger down instead.
 */
const lineVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  show: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.12 },
  }),
};

/** Effect — masked lines slide up one by one when the preview scrolls into view (once). */
export default function LineRevealPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <motion.p
        className="max-w-md text-[15px] leading-[2] text-zinc-700"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        {LINES.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span className="block will-change-transform" variants={lineVariants} custom={i}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.p>
    </div>
  );
}
