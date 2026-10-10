Create a React component with Tailwind CSS (pure DOM, no WebGL): a 3D
marquee card wall. Inside a preview container, a perspective(900px) stage
holds a plane rotated rotateX(18deg) rotateZ(-10deg) containing 4 vertical
columns of small mock cards (white bg, hairline zinc-200 borders, soft
neutral gradient thumbnails with one subtle amber accent, tiny skeleton
title/text bars and mono tag chips). Each column scrolls vertically in an
infinite seamless loop (duplicate the card list, animate translateY 0 to
-50% with transform-only keyframes), alternating directions at slightly
different durations between 18s and 28s. Fade top and bottom edges with a
mask-image linear gradient, offset columns with small translateZ values for
parallax depth, and isolate each looping column in a React.memo component.