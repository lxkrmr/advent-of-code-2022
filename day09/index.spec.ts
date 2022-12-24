import { Head, Rope, Tail } from './index';

describe('day 09: Rope movement', () => {
  it('tail should include origin', () => {
    // given
    const head = new Head({ x: 0, y: 0 });
    const tail = [new Tail({ x: 0, y: 0 })];
    const rope = new Rope(head, tail);

    // when
    rope.move({ direction: 'R', times: 4 });

    // then
    expect(rope.head.coords).toStrictEqual({ x: 4, y: 0 });
    expect(rope.tail[0].coords).toStrictEqual({ x: 3, y: 0 });
    expect(rope.tail[0].uniqueCoordsVisited.length).toEqual(4);

    // when
    rope.move({ direction: 'U', times: 4 });

    // then
    expect(rope.head.coords).toStrictEqual({ x: 4, y: -4 });
    expect(rope.tail[0].coords).toStrictEqual({ x: 4, y: -3 });
    expect(rope.tail[0].uniqueCoordsVisited.length).toEqual(7);

    // when
    rope.move({ direction: 'L', times: 3 });

    // then
    expect(rope.head.coords).toStrictEqual({ x: 1, y: -4 });
    expect(rope.tail[0].coords).toStrictEqual({ x: 2, y: -4 });
    expect(rope.tail[0].uniqueCoordsVisited.length).toEqual(9);

    // when
    rope.move({ direction: 'D', times: 1 });

    // then
    expect(rope.head.coords).toStrictEqual({ x: 1, y: -3 });
    expect(rope.tail[0].coords).toStrictEqual({ x: 2, y: -4 });
    expect(rope.tail[0].uniqueCoordsVisited.length).toEqual(9);

    // when
    rope.move({ direction: 'R', times: 4 });

    // then
    expect(rope.head.coords).toStrictEqual({ x: 5, y: -3 });
    expect(rope.tail[0].coords).toStrictEqual({ x: 4, y: -3 });
    expect(rope.tail[0].uniqueCoordsVisited.length).toEqual(10);
  });
});

describe('day 09: Head movement', () => {
  it('head should move up', () => {
    // given
    const head = new Head({ x: 0, y: 0 });

    // when
    head.move('U');

    // then
    expect(head.coords).toStrictEqual({ x: 0, y: -1 });
  });

  it('head should move right', () => {
    // given
    const head = new Head({ x: 0, y: 0 });

    // when
    head.move('R');

    // then
    expect(head.coords).toStrictEqual({ x: 1, y: 0 });
  });

  it('head should move down', () => {
    // given
    const head = new Head({ x: 0, y: 0 });

    // when
    head.move('D');

    // then
    expect(head.coords).toStrictEqual({ x: 0, y: 1 });
  });

  it('head should move left', () => {
    // given
    const head = new Head({ x: 0, y: 0 });

    // when
    head.move('L');

    // then
    expect(head.coords).toStrictEqual({ x: -1, y: 0 });
  });
});

describe('day 09: Tail movement', () => {
  //..H..
  //..*..
  //H*T*H
  //..*..
  //..H..
  it('tail should move up', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 0, y: -2 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: 0, y: -1 });
  });

  it('tail should move right', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 2, y: 0 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: 1, y: 0 });
  });

  it('tail should move down', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 0, y: 2 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: 0, y: 1 });
  });

  it('tail should move left', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: -2, y: 0 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: -1, y: 0 });
  });

  //.H.H.
  //H*.*H
  //..T..
  //H*.*H
  //.H.H.
  it('tail should move up right', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 1, y: -2 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: 1, y: -1 });
  });

  it('tail should move right up', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 2, y: -1 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: 1, y: -1 });
  });

  it('tail should move down right', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 1, y: 2 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: 1, y: 1 });
  });

  it('tail should move right down', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 2, y: 1 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: 1, y: 1 });
  });

  it('tail should move down left', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: -1, y: 2 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: -1, y: 1 });
  });

  it('tail should move left down', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: -2, y: 1 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: -1, y: 1 });
  });

  it('tail should move up left', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: -1, y: -2 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: -1, y: -1 });
  });

  it('tail should move left up', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: -2, y: -1 });

    // when
    tail.move(prevKnot);

    // then
    expect(tail.coords).toStrictEqual({ x: -1, y: -1 });
  });
});

describe('day 09: Tail unique coords visited', () => {
  it('tail should include origin', () => {
    // when
    const tail = new Tail({ x: 0, y: 0 });

    // then
    expect(tail.uniqueCoordsVisited.length).toEqual(1);
  });

  it('complex example', () => {
    // given
    const tail = new Tail({ x: 0, y: 0 });
    const prevKnot = new Head({ x: 0, y: 0 });

    // when
    prevKnot.move('U');
    tail.move(prevKnot);

    // then
    expect(tail.uniqueCoordsVisited.length).toEqual(1);

    // when
    prevKnot.move('U');
    tail.move(prevKnot);

    // then
    expect(tail.uniqueCoordsVisited.length).toEqual(2);

    // when
    prevKnot.move('U');
    tail.move(prevKnot);

    // then
    expect(tail.uniqueCoordsVisited.length).toEqual(3);

    // when
    prevKnot.move('D');
    tail.move(prevKnot);
    prevKnot.move('D');
    tail.move(prevKnot);
    prevKnot.move('D');
    tail.move(prevKnot);

    // then
    console.log(tail.uniqueCoordsVisited);
    expect(tail.uniqueCoordsVisited.length).toEqual(3);
  });
});
