import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PHRASES = ['收集灵感。', '复现动效。', '一键复制 Prompt。'];
const TYPE_MS = 90;
const DELETE_MS = 40;
const HOLD_MS = 1600;

/** Effect 03 — types, pauses, deletes, then moves to the next phrase; blinking block cursor. */
export default function TypewriterPreview() {
  const [text, setText] = useState('');

  useEffect(() => {
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = PHRASES[phrase]!;
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char >= current.length) {
          deleting = true;
          timer = window.setTimeout(tick, HOLD_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPE_MS);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char <= 0) {
          deleting = false;
          phrase = (phrase + 1) % PHRASES.length;
          timer = window.setTimeout(tick, 420);
          return;
        }
        timer = window.setTimeout(tick, DELETE_MS);
      }
    };

    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <span className="flex items-center text-[28px] font-semibold text-zinc-950">
        <span className="min-w-[1ch]">{text}</span>
        <motion.span
          aria-hidden
          className="ml-1 inline-block h-[1.05em] w-[2px] bg-zinc-950"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.06, times: [0, 0.49, 0.5, 1], repeat: Infinity, ease: 'linear' }}
        />
      </span>
    </div>
  );
}
