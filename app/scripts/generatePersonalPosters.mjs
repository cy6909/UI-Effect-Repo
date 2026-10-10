// Run only on machine 12. Uses FFmpeg to extract preview frames from upstream videos.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { componentMetadata } from '../src/constants/Information.js';
const output = 'public/assets/personal-posters';
fs.mkdirSync(output, { recursive: true });
let count = 0;
for (const item of Object.values(componentMetadata)) {
  const source = `public${item.videoUrl}`;
  if (!fs.existsSync(source)) throw new Error(`Missing video: ${source}`);
  const probe = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', source],
    { encoding: 'utf8' }
  );
  const duration = Number(probe.stdout);
  const time = Number.isFinite(duration) && duration > 0 ? Math.min(1.5, duration / 2) : 0;
  const result = spawnSync(
    'ffmpeg',
    [
      '-nostdin',
      '-v',
      'error',
      '-y',
      '-ss',
      String(time),
      '-i',
      source,
      '-frames:v',
      '1',
      '-vf',
      'scale=640:-2',
      '-c:v',
      'libwebp',
      '-quality',
      '75',
      `${output}/${item.name}.webp`
    ],
    { encoding: 'utf8' }
  );
  if (result.status !== 0) throw new Error(`${item.name}: ${result.stderr}`);
  count++;
}
console.log(`Generated ${count} preview posters.`);
