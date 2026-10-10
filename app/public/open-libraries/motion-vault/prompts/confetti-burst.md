Create a React confetti-burst component on Canvas 2D: on click, explode
80-120 confetti pieces from the click point — colored rectangles (palette
#F43F5E #F59E0B #10B981 #3B82F6 #8B5CF6) plus round dots — with an upward
fan of initial velocities (3-9 px/frame, ±50deg), gravity 0.15, air drag
0.98. Rectangles tumble by oscillating scaleX (fake 3D flip). Fade out
before landing and clear the canvas after ~1.2s. Expose an onCelebrate
callback. No external libraries.