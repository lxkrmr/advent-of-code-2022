import { loadFile } from '../lib/utils';

// part two - scenic score

export function maxScenicScore(raw: string): number {
  const mapOfTrees = toMapOfTrees(raw);
  const mapScenicScores = mapOfTrees.map((row, y) =>
    row.map((tree, x) => totalScenicScore(tree, { x, y }, mapOfTrees))
  );
  const scenicScoresMaxPerRow = mapScenicScores.map((row) =>
    row.reduce((acc, cur) => (acc > cur ? acc : cur), -Infinity)
  );

  console.log(mapScenicScores);
  console.log(scenicScoresMaxPerRow);

  return scenicScoresMaxPerRow.reduce(
    (acc, cur) => (acc > cur ? acc : cur),
    -Infinity
  );
}

function totalScenicScore(
  tree: number,
  coords: Coordinates,
  mapOfTrees: MapOfTrees
) {
  const scoreAbove = scenicScore(tree, above(coords, mapOfTrees));
  const scoreBelow = scenicScore(tree, below(coords, mapOfTrees));
  const scoreRight = scenicScore(tree, right(coords, mapOfTrees));
  const scoreLeft = scenicScore(tree, left(coords, mapOfTrees));

  return scoreAbove * scoreBelow * scoreRight * scoreLeft;
}

function scenicScore(tree: number, others: number[]): number {
  let tmp = [];
  for (const other of others) {
    tmp.push(other);
    if (other >= tree) {
      break;
    }
  }

  return tmp.length;
}

// part one - visible trees
export async function rawInput(file: string) {
  return await loadFile(file);
}

export function countVisibleTrees(raw: string): number {
  const mapOfTrees = toMapOfTrees(raw);
  const treesVisibility = mapOfTrees.map((row, y) =>
    row.map((tree, x) => isVisibleTree(tree, { x, y }, mapOfTrees))
  );
  const countPerRow = treesVisibility.map((row) =>
    row.reduce((acc, cur) => (cur ? (acc = acc + 1) : acc), 0)
  );
  const totalRowCount = countPerRow.reduce((acc, cur) => acc + cur, 0);
  return totalRowCount;
}

export function toOutput(mapOfTrees: MapOfTrees): string {
  return mapOfTrees.map((row) => row.join('')).join('\n');
}

export function toMapOfTrees(raw: string): MapOfTrees {
  const mapOfTrees = raw
    .split('\n')
    .map((row) => row.split('').map((it) => parseInt(it)));
  return mapOfTrees;
}

function isVisibleTree(
  tree: number,
  coords: Coordinates,
  mapOfTrees: MapOfTrees
): boolean {
  return (
    isVisible(tree, above(coords, mapOfTrees)) ||
    isVisible(tree, below(coords, mapOfTrees)) ||
    isVisible(tree, right(coords, mapOfTrees)) ||
    isVisible(tree, left(coords, mapOfTrees))
  );
}

export function isVisible(height: number, others: number[]): boolean {
  const max = others.reduce((acc, cur) => (acc > cur ? acc : cur), -Infinity);
  const result = height > max;
  return result;
}

export function above(coords: Coordinates, mapOfTrees: MapOfTrees): number[] {
  return fetchTrees(coords, nextUp, mapOfTrees);
}

export function below(coords: Coordinates, mapOfTrees: MapOfTrees): number[] {
  return fetchTrees(coords, nextDown, mapOfTrees);
}

export function left(coords: Coordinates, mapOfTrees: MapOfTrees): number[] {
  return fetchTrees(coords, nextLeft, mapOfTrees);
}

export function right(coords: Coordinates, mapOfTrees: MapOfTrees): number[] {
  return fetchTrees(coords, nextRight, mapOfTrees);
}

function fetchTrees(
  coords: Coordinates,
  createNextCoords: (coords: Coordinates) => Coordinates,
  mapOfTrees: MapOfTrees
): number[] {
  const nextCoords = createNextCoords(coords);
  const tree = getTree(nextCoords, mapOfTrees);
  if (typeof tree === 'number') {
    return [tree, ...fetchTrees(nextCoords, createNextCoords, mapOfTrees)];
  }

  return [];
}

function nextUp(coords: Coordinates): Coordinates {
  return { x: coords.x, y: coords.y - 1 };
}

function nextDown(coords: Coordinates): Coordinates {
  return { x: coords.x, y: coords.y + 1 };
}

function nextLeft(coords: Coordinates): Coordinates {
  return { x: coords.x - 1, y: coords.y };
}

function nextRight(coords: Coordinates): Coordinates {
  return { x: coords.x + 1, y: coords.y };
}

function getTree(
  coords: Coordinates,
  mapOfTrees: MapOfTrees
): number | undefined {
  const treesOnYAxis = mapOfTrees[coords.y];
  return treesOnYAxis ? treesOnYAxis[coords.x] : undefined;
}

export type Coordinates = {
  x: number;
  y: number;
};

export type MapOfTrees = number[][];
