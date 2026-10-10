Create a React Three Fiber starfield: 3000 stars distributed in a 60-unit
deep tunnel flying toward the camera along -z at 6 units/s, wrapping back
to the far end after passing the camera. Point size attenuates with
distance, white stars, camera fov 70, black background. On click, lerp
speed to 30 u/s over 3s (stars stretch into streaks via elongated
geometry or shader), then ease back over 2s.