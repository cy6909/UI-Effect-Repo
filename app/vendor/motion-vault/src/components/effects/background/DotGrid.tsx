import { motion } from 'framer-motion';

/** Extremely subtle breathing dot grid — hero atmosphere only (3% black dots). */
export default function DotGrid() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(9,9,11,1) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
      animate={{ opacity: [0.03, 0.05, 0.03] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}
