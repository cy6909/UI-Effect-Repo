import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EASE = [0.65, 0, 0.35, 1] as [number, number, number, number];

/** Two compatible shapes: identical command structure (8 cubic segments each). */
const BLOB_D =
  'M 100.0 32.0 C 128.6 32.0 123.8 41.8 141.0 59.0 C 158.2 76.2 148.0 79.8 148.0 100.0 C 148.0 120.2 158.2 123.8 141.0 141.0 C 123.8 158.2 128.6 168.0 100.0 168.0 C 71.4 168.0 76.2 158.2 59.0 141.0 C 41.8 123.8 52.0 120.2 52.0 100.0 C 52.0 79.8 41.8 76.2 59.0 59.0 C 76.2 41.8 71.4 32.0 100.0 32.0 Z';
const STAR_D =
  'M 100.0 30.0 C 111.2 30.0 122.6 68.8 126.9 73.1 C 131.2 77.4 170.0 88.8 170.0 100.0 C 170.0 111.2 131.2 122.6 126.9 126.9 C 122.6 131.2 111.2 170.0 100.0 170.0 C 88.8 170.0 77.4 131.2 73.1 126.9 C 68.8 122.6 30.0 111.2 30.0 100.0 C 30.0 88.8 68.8 77.4 73.1 73.1 C 77.4 68.8 88.8 30.0 100.0 30.0 Z';

const HALF_CYCLE_MS = 1500; // 1.2s morph + 0.3s hold; full loop = 3s

/** Effect — one filled path morphs blob → star → blob by tweening the 'd' attribute; label tracks the current shape. */
export default function PathMorphPreview() {
  const [isStar, setIsStar] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setIsStar((s) => !s), HALF_CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <svg viewBox="0 0 200 200" className="h-40 w-40" aria-label="路径变形动画">
        <motion.path
          fill="#09090B"
          fillOpacity={0.9}
          initial={{ d: BLOB_D }}
          animate={{ d: isStar ? STAR_D : BLOB_D }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </svg>
      <div className="relative h-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isStar ? 'star' : 'blob'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="block font-mono text-xs uppercase tracking-[0.04em] text-zinc-400"
          >
            {isStar ? 'STAR' : 'BLOB'}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
