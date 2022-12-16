import fs from 'fs/promises';

type Pick = 'ROCK' | 'PAPER' | 'SCICCORS';

type HaveTo = 'LOSE' | 'WIN' | 'DRAW';

type Match = {
  you: Player;
  other: Player;
};

type Player = {
  haveTo?: HaveTo;
  played: Pick | null;
  score: number | null;
};

type Result = {
  yourScore: number;
  otherScore: number;
};

type PickMapping = {
  [key in Pick]: Pick;
};

const losersPicks = {
  ROCK: 'SCICCORS',
  SCICCORS: 'PAPER',
  PAPER: 'ROCK',
} as PickMapping;

const counterPick = {
  SCICCORS: 'ROCK',
  ROCK: 'PAPER',
  PAPER: 'SCICCORS',
} as PickMapping;

async function rockPaperSciss() {
  const matches = await loadRockPaperScissorsMatches();
  console.log(matches);
  const result = calcResult(matches);
  console.log(result);
}

async function loadRockPaperScissorsMatches() {
  const raw = await fs.readFile('input.txt', { encoding: 'utf-8' });
  return raw.split('\n').map(toMatch);
}

function calcResult(matches: Match[]): Result {
  return matches.reduce(
    (result: Result, match: Match): Result => {
      result.otherScore += match.other.score ?? 0;
      result.yourScore += match.you.score ?? 0;
      return result;
    },
    { yourScore: 0, otherScore: 0 } as Result
  );
}

function toMatch(encryptedOtherAndYourPick: string): Match {
  const [otherEncrypted, youHaveToEncrypted] =
    encryptedOtherAndYourPick.split(' ');
  const otherPicked = decryptPick(otherEncrypted);
  const youHaveTo = decryptHaveTo(youHaveToEncrypted);
  const youPicked = pick(youHaveTo, otherPicked);
  return {
    you: {
      haveTo: youHaveTo as HaveTo, //no
      played: youPicked,
      score: calcScore(youPicked, otherPicked),
    },
    other: {
      played: otherPicked,
      score: calcScore(otherPicked, youPicked),
    },
  };
}

function decryptPick(encryptedPick: string): Pick | null {
  switch (encryptedPick) {
    case 'A':
      return 'ROCK';
    case 'B':
      return 'PAPER';
    case 'C':
      return 'SCICCORS';
    default:
      return null;
  }
}

function decryptHaveTo(encryptedPick: string): HaveTo | null {
  switch (encryptedPick) {
    case 'X':
      return 'LOSE';
    case 'Y':
      return 'DRAW';
    case 'Z':
      return 'WIN';
    default:
      return null;
  }
}

function pick(haveTo: HaveTo | null, otherPicked: Pick | null): Pick | null {
  if (haveTo === null || otherPicked === null) {
    return null;
  }

  if (haveTo === 'DRAW') {
    return otherPicked;
  }

  if (haveTo === 'WIN') {
    return counterPick[otherPicked];
  }

  if (haveTo === 'LOSE') {
    return losersPicks[otherPicked];
  }

  return null;
}

function calcScore(yourPick: Pick | null, otherPick: Pick | null): number {
  const forPick = scoreForPick(yourPick) ?? 0;
  const forResult = scoreForResult(yourPick, otherPick) ?? 0;
  return forPick + forResult;
}

function scoreForPick(pick: Pick | null): number | null {
  switch (pick) {
    case 'ROCK':
      return 1;
    case 'PAPER':
      return 2;
    case 'SCICCORS':
      return 3;
    default:
      return null;
  }
}

function scoreForResult(you: Pick | null, other: Pick | null): number {
  // draw
  if (you === other) {
    return 3;
  }

  // win
  if (
    (you === 'ROCK' && other === 'SCICCORS') ||
    (you === 'SCICCORS' && other === 'PAPER') ||
    (you === 'PAPER' && other === 'ROCK')
  ) {
    return 6;
  }

  // lost
  return 0;
}

rockPaperSciss();

// Rock Paper Scissors tournament

// Rules
// * Rock defeats Scissors
// * Scissors defeats Paper
// * Paper defeats Rock

// The encrypted strategy guied
// * 1st column -> other is going to play
// ** A == Rock
// ** B == Paper
// ** C == Scissors
//
// * 2nd column -> how the round has to end
// ** X => you need to lose
// ** Y => you need a draw
// ** Z => you need to win

// The score
// * score for the shape you selected
// ** Rock 1
// ** Paper 2
// ** Scissors 3
// * plus
// ** lost 0
// ** draw 3
// ** won 6
