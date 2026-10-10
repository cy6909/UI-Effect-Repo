Create a React Three Fiber wave plane: an 80x80 grid of points spanning
12x12 units, camera at a 45deg elevated angle. Animate each point's z with
z = sin(x*0.8 + t) * cos(y*0.8 + t) * 0.4, t advancing at 0.8/s. Lerp point
color between zinc-700 and zinc-100 by wave height. Add a slow ±5deg
breathing rotation of the whole plane. Dark background, points material.