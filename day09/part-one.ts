import { loadFile } from '../lib/utils';
import { Motion, Direction, Rope } from './index';

async function main() {
  const raw = await loadFile('input.txt');
  const lines = raw.split('\n');

  const rope = new Rope({ x: 0, y: 0 });
  lines.forEach(async (line) => {
    const [direction, times] = line.split(' ');
    const motion = new Motion(direction as Direction, parseInt(times));
    rope.move(motion);
  });
}

main();
