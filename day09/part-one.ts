import { Rope, Motion, Head, Tail } from './index';
import { loadLines } from '../lib/utils';

async function main() {
  const lines = await loadLines('input-part-one.txt');

  const rope = new Rope(new Head(), [new Tail()]);

  lines.forEach((line) => {
    const motion = toMotion(line);
    rope.move(motion);
  });

  console.log(rope.tail[0].uniqueCoordsVisited.length);
}

function toMotion(line: string): Motion {
  const [direction, times] = line.split(' ');
  return {
    direction,
    times: parseInt(times),
  } as Motion;
}

main();
