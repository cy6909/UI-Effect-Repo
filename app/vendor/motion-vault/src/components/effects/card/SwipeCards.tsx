import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const THRESHOLD = 100;
const FLY_X = 460;

const PROFILES = [
  { name: '林晚晴', tag: 'DESIGNER · 26', gradient: 'from-rose-200 via-orange-100 to-amber-100', initials: '晚' },
  { name: '沈亦辰', tag: 'ENGINEER · 29', gradient: 'from-sky-200 via-indigo-100 to-violet-100', initials: '辰' },
  { name: '顾念安', tag: 'PHOTOGRAPHER · 24', gradient: 'from-emerald-200 via-teal-100 to-lime-100', initials: '念' },
  { name: '苏听白', tag: 'MUSICIAN · 27', gradient: 'from-violet-200 via-fuchsia-100 to-pink-100', initials: '听' },
];

type Profile = (typeof PROFILES)[number];

function ProfileFace({ profile }: { profile: Profile }) {
  return (
    <div className="flex h-full flex-col">
      <div className={`relative h-[120px] rounded-t-xl bg-gradient-to-br ${profile.gradient}`}>
        <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur">
          {profile.initials}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[15px] font-semibold text-zinc-950">{profile.name}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">{profile.tag}</span>
        </div>
        <div className="h-2 w-4/5 rounded-full bg-zinc-100" />
        <div className="h-2 w-3/5 rounded-full bg-zinc-100" />
        <div className="mt-auto flex gap-1.5">
          <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-500">咖啡</span>
          <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-500">徒步</span>
        </div>
      </div>
    </div>
  );
}

const CARD_BASE =
  'absolute inset-x-0 top-[18px] h-[264px] w-[216px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_10px_28px_-12px_rgba(0,0,0,0.14)]';

/** The draggable front card of the deck. */
function FrontCard({ profile, onSwiped }: { profile: Profile; onSwiped: () => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-16, 16]);
  const likeOpacity = useTransform(x, [45, THRESHOLD], [0, 1]);
  const skipOpacity = useTransform(x, [-THRESHOLD, -45], [1, 0]);
  const flying = useRef(false);

  function onDragEnd(_: PointerEvent | MouseEvent | TouchEvent, info: { offset: { x: number } }) {
    if (flying.current) return;
    const offset = info.offset.x;
    if (Math.abs(offset) > THRESHOLD) {
      flying.current = true;
      void animate(x, Math.sign(offset) * FLY_X, { duration: 0.28, ease: EASE }).then(() => {
        onSwiped();
      });
    } else {
      void animate(x, 0, { type: 'spring', stiffness: 500, damping: 32 });
    }
  }

  return (
    <motion.div
      className={`${CARD_BASE} z-30 cursor-grab active:cursor-grabbing`}
      style={{ x, rotate, touchAction: 'none' }}
      drag="x"
      dragMomentum={false}
      onDragEnd={onDragEnd}
      initial={{ scale: 0.95, y: 14, opacity: 0.9 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <ProfileFace profile={profile} />
      {/* 喜欢 stamp */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute left-3 top-3 -rotate-12 rounded-md border-[3px] border-green-600 px-2.5 py-1 font-mono text-sm font-bold tracking-widest text-green-600"
      >
        喜欢
      </motion.div>
      {/* 跳过 stamp */}
      <motion.div
        style={{ opacity: skipOpacity }}
        className="absolute right-3 top-3 rotate-12 rounded-md border-[3px] border-zinc-400 px-2.5 py-1 font-mono text-sm font-bold tracking-widest text-zinc-400"
      >
        跳过
      </motion.div>
    </motion.div>
  );
}

/**
 * Tinder-style swipe deck: drag the top card left/right, it rotates with the
 * drag distance; past ±100px a stamp appears and on release the card flies off
 * and cycles to the back of the deck. Springs back under the threshold.
 */
export default function SwipeCards() {
  const [deck, setDeck] = useState([0, 1, 2, 3]);

  const cycle = () => setDeck((d) => [...d.slice(1), d[0]]);

  const front = PROFILES[deck[0] % PROFILES.length];
  const mid = PROFILES[deck[1] % PROFILES.length];
  const back = PROFILES[deck[2] % PROFILES.length];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[300px] w-[216px]">
        {/* back card — fresh copy of the swiped card fades in here */}
        <motion.div
          key={`back-${deck[2]}-${deck.join('')}`}
          className={`${CARD_BASE} z-10`}
          initial={{ scale: 0.88, y: 28, opacity: 0 }}
          animate={{ scale: 0.9, y: 24, opacity: 0.6 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <ProfileFace profile={back} />
        </motion.div>
        {/* mid card */}
        <motion.div
          key={`mid-${deck[1]}`}
          className={`${CARD_BASE} z-20`}
          initial={{ scale: 0.9, y: 24 }}
          animate={{ scale: 0.95, y: 12 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <ProfileFace profile={mid} />
        </motion.div>
        {/* front card — draggable, remounts each cycle */}
        <FrontCard key={`front-${deck[0]}-${deck.join('')}`} profile={front} onSwiped={cycle} />
      </div>
    </div>
  );
}
