import {
  isVisible,
  above,
  below,
  left,
  right,
  countVisibleTrees,
  maxScenicScore,
  rawInput,
  toMapOfTrees,
  toOutput,
} from './index';

describe('Day 08 - part one -input is output', () => {
  it('input is output', async () => {
    // given
    const input = await rawInput('./day08/input.txt');
    const mapOfTrees = toMapOfTrees(input);

    // when
    const result = toOutput(mapOfTrees);

    // then
    expect(result).toEqual(input);
  });
});

describe('Day 08 - part one - count visible trees', () => {
  it('Return number of visible trees', () => {
    // given
    const mapOfTrees = '30373\n25512\n65332\n33549\n35390';

    // when
    const result = countVisibleTrees(mapOfTrees);

    // then
    expect(result).toEqual(21);
  });
});

describe('Day 08 - part one - is tree visible', () => {
  it('A tree is visible if it is taller than the tallest one of the others', () => {
    // given
    const tree = 5;
    const others = [4, 3, 2, 1, 0];

    // when
    const result = isVisible(tree, others);

    // then
    expect(result).toEqual(true);
  });

  it('A tree is visible if no other trees exist', () => {
    // given
    const tree = 0;
    const others = [] as number[];

    // when
    const result = isVisible(tree, others);

    // then
    expect(result).toEqual(true);
  });

  it('A tree is not visible if it is as tall as the tallest one of the others', () => {
    // given
    const tree = 4;
    const others = [4, 3, 2, 1, 0];

    // when
    const result = isVisible(tree, others);

    // then
    expect(result).toEqual(false);
  });

  it('A tree is not visible if it is shorter than the tallest one of the others', () => {
    // given
    const tree = 3;
    const others = [4, 3, 2, 1, 0];

    // when
    const result = isVisible(tree, others);

    // then
    expect(result).toEqual(false);
  });
});

describe('Day 08 - part one - top', () => {
  it('Return list of trees above', () => {
    // given
    const curCoords = { x: 0, y: 3 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = above(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([31, 21, 11]);
  });

  it('Return empty list if no trees above', () => {
    // given
    const curCoords = { x: 0, y: 0 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = above(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([]);
  });
});

describe('Day 08 - part one - bottom', () => {
  it('Return list of trees below', () => {
    // given
    const curCoords = { x: 0, y: 0 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = below(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([21, 31, 41]);
  });

  it('Return empty list if no trees below', () => {
    // given
    const curCoords = { x: 0, y: 3 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = below(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([]);
  });
});

describe('Day 08 - part one - left', () => {
  it('Return list of trees on the left', () => {
    // given
    const curCoords = { x: 3, y: 0 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = left(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([13, 12, 11]);
  });

  it('Return empty list if no trees on the left', () => {
    // given
    const curCoords = { x: 0, y: 0 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = left(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([]);
  });
});

describe('Day 08 - part one - right', () => {
  it('Return list of trees on the right', () => {
    // given
    const curCoords = { x: 0, y: 0 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = right(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([12, 13, 14]);
  });

  it('Return empty list if no trees on the right', () => {
    // given
    const curCoords = { x: 3, y: 0 };
    const mapOfTrees = [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ];

    // when
    const result = right(curCoords, mapOfTrees);

    // then
    expect(result).toStrictEqual([]);
  });
});

describe('Day 08 - part two - scenic score', () => {
  it('Return the max scenic score of all trees', () => {
    // given
    const raw = '30373\n25512\n65332\n33549\n35390';

    // when
    const result = maxScenicScore(raw);

    // then
    expect(result).toEqual(8);
  });
});
