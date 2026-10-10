import { motion } from 'framer-motion';

const blobs = [
  { color: '#C7D2FE', left: '8%', top: '6%', x: ['0%', '22%', '-10%', '0%'], y: ['0%', '14%', '26%', '0%'], duration: 18 },
  { color: '#FBCFE8', left: '52%', top: '0%', x: ['0%', '-18%', '12%', '0%'], y: ['0%', '22%', '8%', '0%'], duration: 23 },
  { color: '#A7F3D0', left: '16%', top: '42%', x: ['0%', '18%', '-14%', '0%'], y: ['0%', '-16%', '6%', '0%'], duration: 29 },
  { color: '#FDE68A', left: '56%', top: '38%', x: ['0%', '-20%', '8%', '0%'], y: ['0%', '-12%', '-24%', '0%'], duration: 31 },
];

/** Four blurred radial-gradient blobs drifting on slow elliptical paths over white. */
export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <div className="absolute inset-0" style={{ mixBlendMode: 'multiply' }}>
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '45%',
              paddingTop: '45%',
              left: b.left,
              top: b.top,
              background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
            animate={{ x: b.x, y: b.y }}
            transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      {/* mock page content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">流动渐变网格</span>
        <span className="flex h-8 items-center rounded-lg bg-zinc-950 px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
