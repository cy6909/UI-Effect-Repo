import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LINE_TOP = '24%';

/**
 * Aceternity-style Lamp, inverted to a restrained monochrome: a thin light
 * line expands near the top, a conic beam unfolds downward (scaleY + blur),
 * a soft halo blooms behind the line, and 'LAMPLIGHT' floats up afterwards.
 * Click anywhere on the stage to toggle the lamp off and on. All centering
 * goes through Framer Motion `x: '-50%'` so transforms never conflict.
 */
export default function Lamp() {
  const [on, setOn] = useState(true);

  const toggle = () => setOn((v) => !v);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={on}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className="absolute inset-0 cursor-pointer select-none overflow-hidden bg-zinc-950 outline-none"
    >
      {/* halo behind the line */}
      <motion.div
        aria-hidden
        className="absolute left-1/2"
        style={{
          top: LINE_TOP,
          x: '-50%',
          width: '72%',
          height: 130,
          marginTop: -65,
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(24px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.6, delay: on ? 0.15 : 0 }}
      />
      {/* conic beam unfolding downward */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 w-[80%] max-w-[580px]"
        style={{
          top: LINE_TOP,
          x: '-50%',
          height: '60%',
          transformOrigin: '50% 0%',
          background:
            'conic-gradient(from 165deg at 50% 0%, transparent 0deg, rgba(244,244,245,0.16) 13deg, rgba(244,244,245,0.30) 15deg, rgba(244,244,245,0.16) 17deg, transparent 30deg)',
          filter: 'blur(10px)',
        }}
        initial={{ opacity: 0, scaleY: 0.15 }}
        animate={on ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.15 }}
        transition={{ duration: 0.7, ease: EASE, delay: on ? 0.1 : 0 }}
      />
      {/* the thin light line */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 h-px w-[62%] max-w-[340px]"
        style={{
          top: LINE_TOP,
          x: '-50%',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
        }}
        initial={{ opacity: 0.2, scaleX: 0.2 }}
        animate={on ? { opacity: 1, scaleX: 1 } : { opacity: 0.2, scaleX: 0.2 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      {/* bright core on the line */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 h-[3px] w-16 rounded-full bg-white"
        style={{
          top: `calc(${LINE_TOP} - 1px)`,
          x: '-50%',
          filter: 'blur(2px)',
          boxShadow: '0 0 12px 2px rgba(255,255,255,0.6)',
        }}
        initial={{ opacity: 0.15, scaleX: 0.4 }}
        animate={on ? { opacity: 1, scaleX: 1 } : { opacity: 0.15, scaleX: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      {/* title floating up after the cone opens */}
      <motion.div
        className="absolute inset-x-0 flex flex-col items-center gap-3"
        style={{ top: '48%' }}
        initial={{ opacity: 0, y: 16 }}
        animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7, ease: EASE, delay: on ? 0.35 : 0 }}
      >
        <span
          className="text-xl font-light tracking-[0.45em] text-zinc-100"
          style={{ textShadow: '0 0 24px rgba(255,255,255,0.35)' }}
        >
          LAMPLIGHT
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          点击开关 · Click to toggle
        </span>
      </motion.div>
    </div>
  );
}
