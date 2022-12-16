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
  const wrongItems = rucksackList.flatMap(findWrongItems);
  console.log(wrongItems);
  const sumOfPriorities = wrongItems.reduce(
    (acc, cur) => acc + cur.priority,
    0
  );
  console.log(sumOfPriorities);

  // logging
  // rucksackList.forEach((rucksack) => {
  //   console.log('Rucksack:', rucksack.line, rucksack.line.length);
  //   rucksack.compartments.forEach((compartment, index) => {
  //     console.log(`Compartment #${index}:`, compartment, compartment.length);
  //   });
  //   const wrongItems = findWrongItems(rucksack);
  //   console.log('Wrong items:', wrongItems);
  //   console.log('...');
  // });
}

function findWrongItems(rucksack: Rucksack): Item[] {
  const first = rucksack.compartments[0];
  const second = rucksack.compartments[1];

  return Object.values(first).filter((item) => second[item.value]);
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
