import { loadFile } from '../lib/utils';

async function main() {
  const raw = await loadFile('input.txt');
  const { stacks, instructions } = toStacksAndInstructions(raw);
  console.log('stacks');
  stacksToString(stacks);
  console.log('instructions');
  console.log(instructions);
  const result = instructions.reduce(
    (stacks, instr) => applyInstruction(stacks, instr),
    stacks
  );
  console.log('result');
  stacksToString(result);
}

function applyInstruction(stacks: Stack[], instruction: Instruction): Stack[] {
  const { quantity, from, to } = instruction;
  const copy = stacks.map((arr) => arr.slice());

  const target = copy[from - 1];
  const destination = copy[to - 1];

  const cargo = [];
  for (let i = 0; i < quantity; i++) {
    const value = target.pop();
    if (value) {
      cargo.unshift(value);
    }
  }

  destination.push(...cargo);

  return copy;
}

function stacksToString(stacks: Stack[]) {
  const maxStacks = stacks.reduce(
    (max, cur) => (max > cur.length ? max : cur.length),
    0
  );
  for (let i = maxStacks - 1; i >= 0; i--) {
    console.log(stacks.map((stack) => stack[i] ?? '   ').join(' '));
  }
}

function toStacksAndInstructions(raw: string) {
  const indexFirstMove = raw.search(/move/);
  const stackLines = raw.slice(0, indexFirstMove).split('\n');
  const instructionLines = raw.slice(indexFirstMove).split('\n');

  return {
    stacks: toStacks(stackLines),
    instructions: toInstructions(instructionLines),
  };
}

function toStacks(lines: string[]): Stack[] {
  const stackRows = lines.map(toStackRow).filter((row) => row.length > 0);
  const stackIdentifiers = stackRows.pop();

  const stacks = [] as Stack[];
  const numberOfStacks = stackIdentifiers?.length ?? 0;
  for (let i = 0; i < numberOfStacks; i++) {
    stacks.push(toStack(i, stackRows));
  }

  return stacks;
}

function toStackRow(line: string): StackRow {
  const result = [];
  for (let i = 0; i < line.length; i = i + 4) {
    result.push(line.slice(i, i + 3));
  }
  return result;
}

function toStack(index: number, stackRows: StackRow[]): Stack {
  const stack = [];
  for (const row of stackRows) {
    const value = (row[index] || '').trim();
    if (value) {
      stack.push(value);
    }
  }
  return stack.reverse();
}

function toInstructions(lines: string[]): Instruction[] {
  const regex =
    /move (?<quantity>\d{1,}) from (?<from>\d{1,}) to (?<to>\d{1,})/;
  return lines.map((line) => {
    const { quantity, from, to } = line.match(regex)?.groups ?? {};
    return {
      quantity: quantity ? parseInt(quantity) : 0,
      from: from ? parseInt(from) : 0,
      to: to ? parseInt(to) : 0,
    };
  });
}

main();

type Instruction = {
  quantity: number;
  from: number;
  to: number;
};

type StackRow = string[];

type Stack = string[];
