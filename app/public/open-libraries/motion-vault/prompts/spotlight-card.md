Create a React spotlight card: a dark card (zinc-900 on zinc-950) with a
radial-gradient spotlight (radius 220px, white at 8% opacity fading to
transparent) that follows the cursor via CSS custom properties --x/--y
updated on mousemove. Also brighten the 1px border near the cursor using a
masked gradient border. Smooth, GPU-friendly (transform/opacity only).