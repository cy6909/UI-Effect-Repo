import { motion } from 'framer-motion';

const blobs = [
  { color: 'rgba(168, 85, 247, 0.35)', size: '55%', x: ['-12%', '18%', '-12%'], y: ['-8%', '10%', '-8%'], duration: 14 },
  { color: 'rgba(56, 189, 248, 0.32)', size: '60%', x: ['22%', '-10%', '22%'], y: ['12%', '-6%', '12%'], duration: 18 },
  { color: 'rgba(52, 211, 153, 0.30)', size: '50%', x: ['0%', '14%', '0%'], y: ['18%', '-12%', '18%'], duration: 16 },
];

/** Soft aurora gradient blobs drifting slowly (Framer Motion infinite loop). */
export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B1020]">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: '22%',
            top: '18%',
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
