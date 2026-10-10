Create a React glow-border card: wrap the card in a pseudo-element border
(1.5px) painted with a conic-gradient (transparent → #6366F1 → transparent,
25% arc) whose angle rotates 360deg every 4s (use CSS @property --angle or a
rotating background layer masked to the border ring). Add a matching blurred
glow behind it at 0.4 opacity. On hover, speed up to 2s per revolution.