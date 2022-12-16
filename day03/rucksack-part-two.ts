import fs from 'fs/promises';

type RucksackConfig = {
  numberOfCompartments: number;
};

type Rucksack = {
  compartments: Compartment[];
  line: string;
};

type Compartment = {
  [key: string]: Item;
};

type Item = {
  value: string;
  priority: number;
};

async function main() {
  const raw = await fs.readFile('input.txt', { encoding: 'utf-8' });
  const rucksackList = raw
    .split('\n')
    .map((line) => toRucksack(line, { numberOfCompartments: 2 }));

  const grouped = toGroupOfThree(rucksackList);
  const commonItems = grouped.flatMap(findCommon);
  const result = commonItems.reduce((acc, curr) => acc + curr.priority, 0);
  console.log('result', result);
}

function findCommon([first, second, third]: Rucksack[]) {
  const firstFakeCompartment = toCompartment(first.line);
  const secondFakeCompartment = toCompartment(second.line);
  const thirdFakeCompartment = toCompartment(third.line);

  const result = Object.values(firstFakeCompartment).filter(
    (item) =>
      secondFakeCompartment[item.value] && thirdFakeCompartment[item.value]
  );
  return result;
}

function toGroupOfThree(rucksackList: Rucksack[]): Rucksack[][] {
  const copy = [...rucksackList];
  const result = [];
  while (copy.length > 0) {
    result.push(copy.splice(0, 3));
  }

  return result;
}

function toRucksack(line: string, rucksackConfig: RucksackConfig): Rucksack {
  return {
    compartments: toCompartments(line, rucksackConfig.numberOfCompartments),
    line,
  };
}

function toCompartments(
  line: string,
  numberOfCompartments: number
): Compartment[] {
  let result: Compartment[] = [];
  const sizeOfCompartment = line.length / numberOfCompartments;

  for (let i = 0; i < numberOfCompartments; i++) {
    const start = i * sizeOfCompartment;
    const end = (i + 1) * sizeOfCompartment;
    const itemsAsString = line.slice(start, end);
    const compartment = toCompartment(itemsAsString);
    result.push(compartment);
  }

  return result;
}

function toCompartment(input: string): Compartment {
  const result = {} as Compartment;
  input
    .split('')
    .map(toItem)
    .forEach((item) => (result[item.value] = item));
  return result;
}

function toItem(char: string): Item {
  return {
    value: char,
    priority: toPriority(char),
  };
}

function toPriority(char: string) {
  const charCode = char.charCodeAt(0);

  if (char === char.toLowerCase()) {
    return charCode - 96;
  }
  return charCode - 38;
}

main();
