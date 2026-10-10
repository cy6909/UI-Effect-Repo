import { useState } from 'react';
import { motion } from 'framer-motion';

const ITEMS = ['接收通知', '记住登录状态', '自动同步数据'];

/**
 * Jelly checkbox: toggling squishes the box (scale 1 → 0.8 → 1.1 → 1
 * spring wobble), fills it zinc-950, and pops the check path in with a
 * tiny overshoot; the label gains a scaleX strike-through line.
 * Unchecking reverses calmly.
 */
function JellyItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => setChecked((c) => !c)}
      className="flex items-center gap-3"
    >
      <motion.span
        animate={
          checked
            ? { scale: [1, 0.8, 1.1, 1], backgroundColor: '#09090B', borderColor: '#09090B' }
            : { scale: 1, backgroundColor: '#FFFFFF', borderColor: '#A1A1AA' }
        }
        transition={
          checked
            ? { type: 'spring', stiffness: 500, damping: 12 }
            : { duration: 0.2, ease: 'easeOut' }
        }
        className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border"
      >
        <motion.svg
          viewBox="0 0 12 10"
          className="h-3 w-3"
          initial={false}
          animate={checked ? { scale: [0.4, 1.2, 1], opacity: 1 } : { scale: 0.6, opacity: 0 }}
          transition={
            checked
              ? { duration: 0.3, times: [0, 0.6, 1], ease: 'easeOut' }
              : { duration: 0.15, ease: 'easeIn' }
          }
        >
          <path
            d="M1 5.5 L4.5 8.5 L11 1.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.span>
      <span className="relative text-sm text-zinc-700">
        {label}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: checked ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute left-0 top-1/2 h-px w-full origin-left bg-zinc-400"
        />
      </span>
    </button>
  );
}

export default function JellyCheckbox() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-4">
        {ITEMS.map((label) => (
          <JellyItem key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
