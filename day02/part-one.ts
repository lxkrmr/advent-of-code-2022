import fs from 'fs/promises';

type Pick = 'ROCK' | 'PAPER' | 'SCICCORS';

type Match = {
  you: Player;
  other: Player;
};

type Player = {
  played: Pick | null;
  score: number | null;
};

type Result = {
  yourScore: number;
  otherScore: number;
};

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
  const [otherEncrypted, youEncrypted] = encryptedOtherAndYourPick.split(' ');
  const youPicked = decryptPick(youEncrypted);
  const otherPicked = decryptPick(otherEncrypted);
  return {
    you: {
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
    case 'X':
      return 'ROCK';
    case 'B':
    case 'Y':
      return 'PAPER';
    case 'C':
    case 'Z':
      return 'SCICCORS';
    default:
      return null;
  }
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
// * 2nd column -> what you should play
// ** X == Rock
// ** Y == Paper
// ** Z == Scissors

// The score
// * score for the shape you selected
// ** Rock 1
// ** Paper 2
// ** Scissors 3
// * plus
// ** lost 0
// ** draw 3
// ** won 6
