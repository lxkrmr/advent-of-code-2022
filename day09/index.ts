export class Rope {
  private head: Head;
  private tail: Tail;
  constructor(start: Coords) {
    this.head = new Head(start);
    this.tail = new Tail(start);
  }

  move(motion: Motion): void {
    for (let i = 0; i < motion.times; i++) {
      this.head = this.head.move(motion.direction);
      this.tail = this.tail.move(this.head);
      display(motion.direction, this.head, this.tail);
    }
  }

  headCoords(): Coords {
    return this.head.coords;
  }

  tailCoords(): Coords {
    return this.tail.coords;
  }

  tailUniqueCoordsVisisted(): number {
    return this.tail.numberOfUniqueCoordsVisted();
  }
}

function display(direction: Direction, head: Head, tail: Tail) {
  const headCoords = head.coords;
  const tailCoords = tail.coords;
  //const grid = createGrid('.', 251, 251);
  //addToGrid(grid, 'T', tailCoords, { x: 126, y: 126 });
  //addToGrid(grid, 'H', headCoords, { x: 126, y: 126 });

  console.log();
  console.log('Direction: ', direction);
  console.log('Head: ', headCoords);
  console.log('Tail: ', tailCoords);
  console.log('Tail unique coords visted : ', tail.uniqueCoordsVisited);
  console.log(
    'Tail number of unique coords visited: ',
    tail.numberOfUniqueCoordsVisted()
  );
  //console.log(grid.map((row) => row.join('')).join('\n'));
}

function createGrid(char: string, width: number, height: number): string[][] {
  return char
    .repeat(height)
    .split('')
    .map((row) => row.repeat(width).split(''));
}

function addToGrid(
  grid: string[][],
  char: string,
  coords: Coords,
  offset: Coords = { x: 4, y: 4 }
) {
  return (grid[coords.y + offset.y][coords.x + offset.x] = char);
}

class Head {
  readonly coords: Coords;

  constructor(coords: Coords) {
    this.coords = coords;
  }

  move(direction: Direction): Head {
    const { x, y } = this.coords;
    switch (direction) {
      case 'R':
        return new Head({ x: x + 1, y });
      case 'L':
        return new Head({ x: x - 1, y });
      case 'U':
        return new Head({ x, y: y - 1 });
      case 'D':
        return new Head({ x, y: y + 1 });
      default:
        throw new Error('Unknown direction: ' + direction);
    }
  }
}

class Tail {
  constructor(
    readonly coords: Coords,
    public uniqueCoordsVisited: Coords[] = []
  ) {}

  move(head: Head): Tail {
    const xDiff = head.coords.x - this.coords.x;
    const yDiff = head.coords.y - this.coords.y;

    const newCoords = { ...this.coords };
    if (xDiff === 2) {
      if (yDiff !== 0) {
        newCoords.y = head.coords.y;
      }
      newCoords.x = newCoords.x + 1;
      this.add(newCoords);
    }

    if (xDiff === -2) {
      if (yDiff !== 0) {
        newCoords.y = head.coords.y;
      }
      newCoords.x = newCoords.x - 1;
      this.add(newCoords);
    }

    if (yDiff === -2) {
      if (xDiff !== 0) {
        newCoords.x = head.coords.x;
      }
      newCoords.y = newCoords.y - 1;
      this.add(newCoords);
    }

    if (yDiff === 2) {
      if (xDiff !== 0) {
        newCoords.x = head.coords.x;
      }
      newCoords.y = newCoords.y + 1;
      this.add(newCoords);
    }

    return new Tail(newCoords, [...this.uniqueCoordsVisited]);
  }

  private add(coords: Coords): void {
    const existingEntry = this.uniqueCoordsVisited.find(
      (entry) => entry.x === coords.x && entry.y === coords.y
    );
    existingEntry ? '' : this.uniqueCoordsVisited.push(coords);
  }

  numberOfUniqueCoordsVisted(): number {
    return this.uniqueCoordsVisited.length + 1;
  }
}

type Coords = {
  x: number;
  y: number;
};

export class Motion {
  readonly direction: Direction;
  readonly times: number;

  constructor(direction: Direction, times: number) {
    this.direction = direction;
    this.times = times;
  }
}

export type Direction = 'R' | 'L' | 'U' | 'D';
