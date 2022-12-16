import { stringify } from 'querystring';
import { loadFile } from '../lib/utils';

async function main() {
  const raw = await loadFile('input.txt');
  const lines = raw.split('\n');
  const result = lines.map(startIndexOfPacketMarker);
  console.log(result);
}

function startIndexOfPacketMarker(line: string) {
  for (const { index, value } of toPacketMarker(line, 14)) {
    if (doesOnlyContainUnqiueChars(value)) {
      return index + value.length;
    }
  }
  return -1;
}

function* toPacketMarker(input: string, windowSize: number) {
  for (let index = 0; index < input.length; index++) {
    const start = index;
    const end = start + windowSize;
    if (end > input.length) {
      break;
    }
    const value = input.slice(start, end);
    yield {
      index,
      value,
    } as PacketMarker;
  }
}

function doesOnlyContainUnqiueChars(value: string): boolean {
  let tmp = {} as { [key: string]: string };
  for (let char of value) {
    if (tmp[char]) {
      return false;
    }

    tmp[char] = char;
  }

  console.log(value);
  return true;
}

main();

type PacketMarker = {
  index: number;
  value: string;
};
