import { loadFile } from '../lib/utils';
import { countVisibleTrees } from '.';

async function main() {
  const raw = await loadFile('input.txt');
  console.log('I have counted all visible trees: ', countVisibleTrees(raw));
}

main();
