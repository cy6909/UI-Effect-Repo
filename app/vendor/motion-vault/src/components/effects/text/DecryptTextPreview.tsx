import { useEffect, useRef, useState } from 'react';

const TARGET = 'MOTION IS THE MESSAGE';
const GLYPHS = '!<>-_\\/[]{}=+*^?#@$%&';
const FRAME_MS = 30;
/** frames each glyph scrambles before locking */
const SCRAMBLE_FRAMES = 8;
/** extra frames between successive locks (left → right) */
const PER_CHAR_FRAMES = 2;

function lockFrame(index: number) {
  return SCRAMBLE_FRAMES + index * PER_CHAR_FRAMES;
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function decode(target: string, frame: number) {
  return target
    .split('')
    .map((ch, i) => {
      if (ch === ' ') return ' ';
      return frame >= lockFrame(i) ? ch : randomGlyph();
    })
    .join('');
}

/** Effect — hover to decrypt: glyphs scramble at 30ms/frame and lock left-to-right into the final sentence. */
export default function DecryptTextPreview() {
  const [text, setText] = useState(TARGET);
  const [decrypted, setDecrypted] = useState(false);
  const frameRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const stop = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => stop, []);

  const run = () => {
    if (timerRef.current !== null) return;
    frameRef.current = 0;
    setDecrypted(false);
    const maxFrame = lockFrame(TARGET.length - 1);
    timerRef.current = window.setInterval(() => {
      frameRef.current += 1;
      const frame = frameRef.current;
      if (frame > maxFrame) {
        setText(TARGET);
        setDecrypted(true);
        stop();
        return;
      }
      setText(decode(TARGET, frame));
    }, FRAME_MS);
  };

  return (
    <div
      className="flex h-full w-full cursor-pointer select-none flex-col items-center justify-center gap-5 px-8"
      onMouseEnter={run}
      role="button"
      aria-label="悬停解密文字"
    >
      <p className="text-center font-mono text-lg font-medium uppercase tracking-[0.14em] text-zinc-950 sm:text-2xl">
        {text}
      </p>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
        {decrypted ? '— Decoded' : 'Hover to decrypt'}
      </span>
    </div>
  );
}
