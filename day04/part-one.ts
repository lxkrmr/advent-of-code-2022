import fs from 'fs/promises';

async function main() {
  const raw = await fs.readFile('input.txt', { encoding: 'utf-8' });
  const lines = raw.split('\n');
  const pairs = lines.map(toPairedAssignments);
  const results = pairs.map(doesOneAssignmentContainsTheOther);
  const numberOfTrue = results.reduce(
    (acc: number, cur: boolean) => (cur ? acc + 1 : acc),
    0
  ) as number;
  console.log(numberOfTrue);
}

function toPairedAssignments(line: string): PairedAssignment {
  const rawAssignments = line.split(',');
  const [first, second] = rawAssignments.map(toAssignment);
  return {
    first,
    second,
  };
}

function toAssignment(rawAssignment: string): SectionAssignment {
  const [start, end] = rawAssignment.split('-').map((str) => parseInt(str));
  return {
    start,
    end,
  };
}

function doesOneAssignmentContainsTheOther(pair: PairedAssignment): boolean {
  const { first, second } = pair;
  return doesContain(first, second) || doesContain(second, first);
}

function doesContain(a: SectionAssignment, b: SectionAssignment) {
  const result = a.start <= b.start && a.end >= b.end;
  console.log(a, 'contains', b, result);
  return result;
}

main();

type PairedAssignment = {
  first: SectionAssignment;
  second: SectionAssignment;
};

type SectionAssignment = {
  start: number;
  end: number;
};
