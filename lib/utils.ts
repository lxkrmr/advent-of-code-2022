import fs from 'fs/promises';

export async function loadFile(filename: string) {
  return await fs.readFile(filename, { encoding: 'utf-8' });
}

export async function loadLines(filename: string) {
  const file = await loadFile(filename);
  return file.split('\n');
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
