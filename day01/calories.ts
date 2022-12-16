import fs from 'fs/promises';

async function main() {
  const raw = await fs.readFile('./input.txt', { encoding: 'utf8' });
  const calorieEntries = toCalorieEntries(raw);
  const totalCaloriesPerElve = sumCaloriesByElve(calorieEntries);
  const sortedCaloriesByElveDesc = totalCaloriesPerElve
    .sort((a, b) => a - b)
    .reverse();

  console.log('Day 01 - part 1: Elve with the max amount of calories.');
  const maxCalories = totalCaloriesPerElve.reduce((max, current) =>
    max > current ? max : current
  );
  console.log('And the answer is ...', maxCalories);
  console.log('Can we confirm it? ...', sortedCaloriesByElveDesc[0]);

  console.log();
  console.log(
    'Day 01 - part 2: Display top 3 Elves carrying the most calories.'
  );
  const top3 = sortedCaloriesByElveDesc.slice(0, 3);
  const sumTop3 = top3.reduce((acc, cur) => acc + cur);
  console.log('Here are the top 3:', top3);
  console.log('And the sum of the top 3:', sumTop3);
}

function toCalorieEntries(raw: string) {
  const lines = raw.split('\n');
  return lines.map((line) => parseInt(line));
}

function sumCaloriesByElve(data: number[]): number[] {
  let result = [];
  let totalForCurrentElf = 0;

  for (const entry of data) {
    if (isTransitionToNextElve(entry)) {
      result.push(totalForCurrentElf);
      totalForCurrentElf = 0;
    } else {
      totalForCurrentElf += entry;
    }
  }

  return result;
}

function isTransitionToNextElve(caloriefOrNaN: number) {
  return Number.isNaN(caloriefOrNaN);
}

main();

let totalForCurrentElf = 0;
