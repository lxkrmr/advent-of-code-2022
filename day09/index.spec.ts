import { Rope, Motion } from './index';

describe('Day 09: Rope Bridge - part one', () => {
  it('head and tail should move right', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const motion = new Motion('R', 2);

    // when
    rope.move(motion);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: 2, y: 0 });
    expect(rope.tailCoords()).toStrictEqual({ x: 1, y: 0 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move left', () => {
    // given
    const rope = new Rope({ x: 2, y: 0 });
    const motion = new Motion('L', 2);

    // when
    rope.move(motion);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: 0, y: 0 });
    expect(rope.tailCoords()).toStrictEqual({ x: 1, y: 0 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move up', () => {
    // given
    const rope = new Rope({ x: 0, y: 2 });
    const motion = new Motion('U', 2);

    // when
    rope.move(motion);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: 0, y: 0 });
    expect(rope.tailCoords()).toStrictEqual({ x: 0, y: 1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move down', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const motion = new Motion('D', 2);

    // when
    rope.move(motion);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: 0, y: 2 });
    expect(rope.tailCoords()).toStrictEqual({ x: 0, y: 1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move up right', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const up = new Motion('U', 1);
    const right = new Motion('R', 2);

    // when
    rope.move(up);
    rope.move(right);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: 2, y: -1 });
    expect(rope.tailCoords()).toStrictEqual({ x: 1, y: -1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move up left', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const up = new Motion('U', 1);
    const right = new Motion('L', 2);

    // when
    rope.move(up);
    rope.move(right);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: -2, y: -1 });
    expect(rope.tailCoords()).toStrictEqual({ x: -1, y: -1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move down right', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const up = new Motion('D', 1);
    const right = new Motion('R', 2);

    // when
    rope.move(up);
    rope.move(right);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: 2, y: 1 });
    expect(rope.tailCoords()).toStrictEqual({ x: 1, y: 1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move down left', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const up = new Motion('D', 1);
    const right = new Motion('L', 2);

    // when
    rope.move(up);
    rope.move(right);

    // then
    expect(rope.headCoords()).toStrictEqual({ x: -2, y: 1 });
    expect(rope.tailCoords()).toStrictEqual({ x: -1, y: 1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });

  it('head and tail should move in complex example', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const motions = [
      new Motion('R', 4),
      new Motion('U', 4),
      new Motion('L', 3),
      new Motion('D', 1),
      new Motion('R', 4),
      new Motion('D', 1),
      new Motion('L', 5),
      new Motion('R', 2),
    ];

    // when
    motions.forEach((m) => rope.move(m));

    // then
    //expect(rope.headCoords()).toStrictEqual({ x: -2, y: 1 });
    //expect(rope.tailCoords()).toStrictEqual({ x: -1, y: 1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(13);
  });

  it('foo', () => {
    // given
    const rope = new Rope({ x: 0, y: 0 });
    const motions = [new Motion('R', 1), new Motion('U', 2)];

    // when
    motions.forEach((m) => rope.move(m));

    // then
    expect(rope.headCoords()).toStrictEqual({ x: 1, y: -2 });
    expect(rope.tailCoords()).toStrictEqual({ x: 1, y: -1 });
    expect(rope.tailUniqueCoordsVisisted()).toEqual(2);
  });
});
