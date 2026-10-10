import { useState } from 'react';
import { motion } from 'framer-motion';

const SPRING = { type: 'spring' as const, stiffness: 320, damping: 26 };
const PEEK = 28; // px each card peeks above the one in front

const CARDS = [
  {
    bank: 'MOTION BANK',
    number: '5312 •••• •••• 0425',
    holder: 'LIN WANQING',
    expiry: '09 / 28',
    balance: '¥ 12,480.00',
    gradient: 'from-zinc-700 to-zinc-900',
    text: 'text-zinc-100',
    sub: 'text-zinc-400',
    chip: 'from-amber-200 to-yellow-400',
  },
  {
    bank: 'SLATE PAY',
    number: '4485 •••• •••• 7716',
    holder: 'SHEN YICHEN',
    expiry: '03 / 27',
    balance: '¥ 6,052.30',
    gradient: 'from-slate-400 to-slate-600',
    text: 'text-slate-50',
    sub: 'text-slate-300',
    chip: 'from-amber-100 to-yellow-300',
  },
  {
    bank: 'SAND CARD',
    number: '6200 •••• •••• 9183',
    holder: 'GU NIANAN',
    expiry: '11 / 26',
    balance: '¥ 2,997.50',
    gradient: 'from-[#CDBD9E] to-[#A89472]',
    text: 'text-zinc-800',
    sub: 'text-zinc-600',
    chip: 'from-zinc-100 to-zinc-300',
  },
];

/**
 * Three bank cards stacked in a wallet, each peeking 28px above the one in
 * front. Click a peeking edge and that card springs up and out, fully
 * revealed; click it again (or another card) and it slots back. Only one
 * card is out at a time.
 */
export default function WalletPull() {
  const [out, setOut] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[292px] w-[300px]">
        {/* wallet pocket behind the stack */}
        <div className="absolute inset-x-[-14px] bottom-[-6px] h-[150px] rounded-2xl border border-zinc-200 bg-zinc-100 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)]" />
        {CARDS.map((card, i) => {
          const isOut = out === i;
          const dimmed = out !== null && !isOut;
          // card 0 sits lowest (front of the stack), card 2 peeks highest
          const baseY = 36 + (CARDS.length - 1 - i) * PEEK;
          return (
            <motion.div
              key={card.bank}
              onClick={() => setOut(isOut ? null : i)}
              className={`absolute inset-x-0 top-0 h-[176px] cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient} shadow-[0_14px_32px_-12px_rgba(0,0,0,0.30)]`}
              initial={false}
              animate={{
                y: isOut ? 0 : dimmed ? baseY + 10 : baseY,
                scale: isOut ? 1.03 : dimmed ? 0.97 : 1,
                opacity: dimmed ? 0.55 : 1,
                zIndex: isOut ? 40 : 10 * (i + 1),
              }}
              transition={SPRING}
            >
              <div className="flex h-full flex-col justify-between p-5">
                <div className="flex items-start justify-between">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${card.sub}`}>{card.bank}</span>
                  {/* tiny chip graphic */}
                  <div className={`h-4 w-6 rounded-[4px] bg-gradient-to-br ${card.chip} shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]`} />
                </div>
                <div className={`font-mono text-[15px] tracking-[0.12em] ${card.text}`}>{card.number}</div>
                {/* details — fully visible once the card is pulled out */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isOut ? 1 : 0.35 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-end justify-between"
                >
                  <div>
                    <div className={`font-mono text-[9px] uppercase tracking-[0.18em] ${card.sub}`}>card holder</div>
                    <div className={`mt-0.5 font-mono text-xs tracking-wider ${card.text}`}>{card.holder}</div>
                  </div>
                  <div>
                    <div className={`font-mono text-[9px] uppercase tracking-[0.18em] ${card.sub}`}>expires</div>
                    <div className={`mt-0.5 font-mono text-xs tracking-wider ${card.text}`}>{card.expiry}</div>
                  </div>
                  <div className={`font-mono text-xs font-semibold tracking-wide ${card.text}`}>{card.balance}</div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
