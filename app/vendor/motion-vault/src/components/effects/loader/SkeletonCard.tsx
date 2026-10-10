import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

/** Skeleton placeholder shapes (avatar + 3 text bars + image block). */
function SkeletonBody() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-2.5 w-24 rounded-full bg-zinc-200" />
          <div className="h-2 w-16 rounded-full bg-zinc-200" />
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200" />
      <div className="h-24 w-full rounded-lg bg-zinc-200" />
    </div>
  );
}

/** The "real" content that briefly flashes in to show the before/after. */
function RealBody() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-semibold text-white">
          MV
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs font-medium leading-none text-zinc-950">灵感库 MotionVault</p>
          <p className="text-[10px] leading-none text-zinc-400">动效加载完成</p>
        </div>
      </div>
      <p className="text-[11px] leading-snug text-zinc-500">等待也可以很美——内容已就绪。</p>
      <div className="flex h-24 w-full items-center justify-center rounded-lg bg-zinc-950">
        <svg width="72" height="28" viewBox="0 0 72 28" fill="none" aria-hidden>
          <path
            d="M2 22 C12 22 12 6 22 6 S32 22 42 22 S52 6 62 6 S70 14 70 14"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="70" cy="14" r="2.5" fill="white" />
        </svg>
      </div>
    </div>
  );
}

/**
 * A mock content card rendered as skeleton shapes with a shimmer band
 * sweeping left → right (1.6s). After 4s the real content flashes in for
 * 1.5s, then back to skeleton — looping the before/after.
 * The timer only runs while the preview is in view.
 */
export default function SkeletonCard() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!inView) {
      setLoaded(false);
      return;
    }
    const id = window.setTimeout(() => setLoaded((v) => !v), loaded ? 1500 : 4000);
    return () => window.clearTimeout(id);
  }, [inView, loaded]);

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="relative w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={loaded ? 'content' : 'skeleton'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {loaded ? <RealBody /> : <SkeletonBody />}
          </motion.div>
        </AnimatePresence>
        {!loaded && !reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                'linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)',
            }}
            initial={{ x: '-160%' }}
            animate={{ x: '320%' }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        skeleton
      </span>
    </div>
  );
}
