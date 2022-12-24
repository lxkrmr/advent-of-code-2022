import { Rope, Head, Tail, toMotion, render } from './index';
import { loadLines } from '../lib/utils';

async function main() {
  const lines = await loadLines('test-input-part-two.txt');

  const rope = new Rope(new Head(), [
    new Tail(),
    new Tail(),
    new Tail(),
    new Tail(),
    new Tail(),
    new Tail(),
    new Tail(),
    new Tail(),
    new Tail(),
  ]);

  lines.forEach((line) => {
    const motion = toMotion(line);
    rope.move(motion);

    console.log();
    const mapSize = { width: 25, height: 20 };
    const offset = { x: 11, y: 15 };
    console.log(render(rope, mapSize, offset));
  });

  console.log(rope.tail.at(-1)?.uniqueCoordsVisited.length);
}

main();
