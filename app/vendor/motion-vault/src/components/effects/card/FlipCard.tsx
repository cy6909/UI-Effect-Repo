import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Hover flips the card 180° around the Y axis (700ms, preserve-3d,
 * backface hidden). Click toggles as a touch-device fallback.
 */
export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="group h-48 w-72 cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className={cn(
            'relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]',
            flipped && '[transform:rotateY(180deg)]',
          )}
        >
          {/* front */}
          <div className="absolute inset-0 flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 [backface-visibility:hidden]">
            <div className="h-2 w-10 rounded-full bg-zinc-950" />
            <div>
              <div className="text-lg font-semibold text-zinc-950">Motion</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                hover to flip
              </div>
            </div>
          </div>
          {/* back */}
          <div className="absolute inset-0 flex flex-col justify-between rounded-xl bg-zinc-950 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              灵感 #05
            </div>
            <p className="text-[13px] leading-relaxed text-zinc-300">
              每一次翻转都是一次小小的揭晓——正面提出问题，背面给出答案。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
