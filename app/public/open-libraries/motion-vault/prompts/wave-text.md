Create a React wave-text component: each letter of the string continuously
oscillates vertically (±8px) following a sine wave — phase offset per letter
index × 0.35, period 1.6s, plus a subtle scale 1→1.08 in sync. Implement
with requestAnimationFrame or Framer Motion animate loops. On hover, double
the wave speed, easing back on leave. Tailwind styling.