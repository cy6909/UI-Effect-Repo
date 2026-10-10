import { motion } from 'framer-motion';

type GradientShineProps = {
  text: string;
  className?: string;
  /** seconds for one shine sweep */
  duration?: number;
  /** pause between sweeps */
  repeatDelay?: number;
};

/** A restrained light sweep across dark text via background-clip gradient. */
export default function GradientShine({ text, className, duration = 2.4, repeatDelay = 3.6 }: GradientShineProps) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: 'linear-gradient(105deg, #09090B 42%, #C4C4CC 50%, #09090B 58%)',
        backgroundSize: '280% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
      animate={{ backgroundPosition: ['120% 0%', '-120% 0%'] }}
      transition={{ duration, repeat: Infinity, repeatDelay, ease: 'easeInOut' }}
    >
      {text}
    </motion.span>
  );
}
