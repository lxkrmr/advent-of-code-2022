import { loadFile } from '../lib/utils';
import { maxScenicScore } from '.';

async function main() {
  const raw = await loadFile('input.txt');
  console.log('The best scenic score is: ', maxScenicScore(raw));
}

main();
