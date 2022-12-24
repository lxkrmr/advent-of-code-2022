export class Rope {
  constructor(public head: Head, public tail: Tail[]) {}

  move(motion: Motion): void {
    for (let i = 0; i < motion.times; i++) {
      this.head.move(motion.direction);

      let prevKnot: Knot = this.head;
      for (const knot of this.tail) {
        knot.move(prevKnot);
        prevKnot = knot;
      }
    }
  }
}

export class Head implements Knot {
  constructor(private _coords: Coordinates = { x: 0, y: 0 }) {}

  move(direction: Direction): void {
    const { x, y } = this._coords;
    switch (direction) {
      case 'U':
        this._coords = { x, y: y - 1 };
        break;
      case 'R':
        this._coords = { x: x + 1, y };
        break;
      case 'D':
        this._coords = { x, y: y + 1 };
        break;
      case 'L':
        this._coords = { x: x - 1, y };
        break;
      default:
        throw new Error('Unknown direction: ' + direction);
    }
  }

  public get coords() {
    return this._coords;
  }
}

export class Tail implements Knot {
  constructor(
    private _coords: Coordinates = { x: 0, y: 0 },
    private _uniqueCoordsVisited: Coordinates[] = []
  ) {
    this._uniqueCoordsVisited.push(this.coords);
  }

  move(prevKnot: Knot): void {
    const maybeNewCoords = this.calcMaybeNewCoords(
      this.coords,
      prevKnot.coords
    );
    if (maybeNewCoords) {
      this._coords = maybeNewCoords;
      this.addUniqueCoords(maybeNewCoords);
    }
  }

  private calcMaybeNewCoords(
    own: Coordinates,
    other: Coordinates
  ): Coordinates | null {
    const xDiff = other.x - own.x;
    const yDiff = other.y - own.y;

    if (Math.abs(yDiff) === 2) {
      const newX = xDiff === 0 ? own.x : other.x;
      const newY = yDiff > 0 ? own.y + 1 : own.y - 1;
      return { x: newX, y: newY };
    }

    if (Math.abs(xDiff) === 2) {
      const newY = yDiff === 0 ? own.y : other.y;
      const newX = xDiff > 0 ? own.x + 1 : own.x - 1;
      return { x: newX, y: newY };
    }

    return null;
  }

  get coords() {
    return this._coords;
  }

  get uniqueCoordsVisited(): Coordinates[] {
    return this._uniqueCoordsVisited;
  }

  private addUniqueCoords(coords: Coordinates): void {
    const existing = this._uniqueCoordsVisited.find(
      (entry) => entry.x === coords.x && entry.y === coords.y
    );

    if (existing) {
      return;
    }

    this._uniqueCoordsVisited.push(coords);
  }
}

export function toMotion(line: string): Motion {
  const [direction, times] = line.split(' ');
  return {
    direction,
    times: parseInt(times),
  } as Motion;
}

export function render(
  rope: Rope,
  mapSize: MapSize,
  offset: Coordinates
): string {
  const map = createMap(mapSize);

  for (let i = rope.tail.length - 1; i >= 0; i--) {
    const knot = rope.tail.at(i);
    knot ? addToMap(knot, map, '' + (i + 1), offset) : '';
  }

  addToMap(rope.head, map, 'H', offset);

  return map.map((row) => row.join('')).join('\n');
}

function createMap(mapSize: MapSize, char: string = '.'): string[][] {
  return char
    .repeat(mapSize.height)
    .split('')
    .map((row) => row.repeat(mapSize.width).split(''));
}

function addToMap(
  knot: Knot,
  map: string[][],
  char: string,
  offset: Coordinates
): void {
  const { x, y } = knot.coords;
  const newY = y + offset.y;
  const newX = x + offset.x;
  map[newY][newX] = char;
}

export type Motion = {
  direction: Direction;
  times: number;
};

type Direction = 'R' | 'L' | 'U' | 'D';

export type Coordinates = {
  x: number;
  y: number;
};

export interface Knot {
  coords: Coordinates;
}

type MapSize = {
  width: number;
  height: number;
};
