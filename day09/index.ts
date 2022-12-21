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
    }
  }

  headCoords(): Coords {
    return this.head.coords;
  }

  tailCoords(): Coords {
    return this.tail.coords;
  }

  tailUniqueCoordsVisisted(): number {
    return this.tail.numberOfUniqueCoordsVisted() + 1;
  }
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
    private uniqueCoordsVisited: Set<Coords> = new Set<Coords>()
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
      this.uniqueCoordsVisited.add(newCoords);
    }

    if (xDiff === -2) {
      if (yDiff !== 0) {
        newCoords.y = head.coords.y;
      }
      newCoords.x = newCoords.x - 1;
      this.uniqueCoordsVisited.add(newCoords);
    }

    if (yDiff === -2) {
      newCoords.y = newCoords.y - 1;
      this.uniqueCoordsVisited.add(newCoords);
    }

    if (yDiff === 2) {
      newCoords.y = newCoords.y + 1;
      this.uniqueCoordsVisited.add(newCoords);
    }

    return new Tail(newCoords, new Set(this.uniqueCoordsVisited));
  }

  numberOfUniqueCoordsVisted(): number {
    console.log(this.uniqueCoordsVisited);
    return this.uniqueCoordsVisited.size;
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
