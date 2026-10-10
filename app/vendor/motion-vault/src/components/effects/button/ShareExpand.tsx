import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link2, Mail, MessageCircle, Send, Share2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const SPRING = { type: 'spring', stiffness: 500, damping: 25 } as const;

const CHANNELS = [
  { icon: Link2, label: '复制链接' },
  { icon: Send, label: '发送' },
  { icon: MessageCircle, label: '消息' },
  { icon: Mail, label: '邮件' },
];

/**
 * Click the dark pill: it morphs elastically (spring 500/25) into a row of
 * four share-channel icons popping in with a 60ms stagger on a zinc-100
 * tray. Click the trailing X (or re-click) to spring back. Layout width is
 * animated via Framer Motion layout on the wrapper.
 */
export default function ShareExpand() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        layout
        transition={SPRING}
        className={cn(
          'flex h-11 items-center overflow-hidden rounded-full',
          open ? 'gap-1 border border-zinc-200 bg-zinc-100 p-1' : 'bg-zinc-950',
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.button
              key="closed"
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-full cursor-pointer items-center gap-2 px-5 text-sm font-medium text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={SPRING}
            >
              <Share2 className="h-4 w-4" />
              分享
            </motion.button>
          ) : (
            <motion.div key="open" className="flex items-center gap-1" initial={false}>
              {CHANNELS.map(({ icon: Icon, label }, i) => (
                <motion.button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={label}
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ ...SPRING, delay: open ? i * 0.06 : 0 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.button>
              ))}
              <motion.button
                type="button"
                aria-label="收起"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white hover:text-zinc-950"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ ...SPRING, delay: open ? CHANNELS.length * 0.06 : 0 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
