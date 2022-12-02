import { function as fp, readonlyArray as RA } from 'fp-ts';
import { match } from 'ts-pattern';

import { impossible } from './lib';
import { day } from './wrapper';

type InputLetter = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';
type InputRound = [InputLetter, InputLetter];

type Shape = number;
type ShapeRound = [enemy: Shape, player: Shape];

type Outcome = number;
type OutcomeRound = [enemy: Shape, outcome: Outcome];

const Shape = {
  ROCK: 1,
  PAPER: 2,
  CISSORS: 3,
};

const Outcome = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
};

const getShapeFromInputLetter = (letter: InputLetter): Shape =>
  match(letter)
    .with('A', () => Shape.ROCK)
    .with('B', () => Shape.PAPER)
    .with('C', () => Shape.CISSORS)
    .with('X', () => Shape.ROCK)
    .with('Y', () => Shape.PAPER)
    .with('Z', () => Shape.CISSORS)
    .exhaustive();

const getOutcomeFromInputLetter = (letter: InputLetter): Outcome =>
  match(letter)
    .with('X', () => Outcome.LOSE)
    .with('Y', () => Outcome.DRAW)
    .with('Z', () => Outcome.WIN)
    .otherwise(impossible);

const getOutcomeForRound = (round: ShapeRound): Outcome =>
  match(round)
    .with([Shape.ROCK, Shape.ROCK], () => Outcome.DRAW)
    .with([Shape.ROCK, Shape.PAPER], () => Outcome.WIN)
    .with([Shape.ROCK, Shape.CISSORS], () => Outcome.LOSE)
    .with([Shape.PAPER, Shape.ROCK], () => Outcome.LOSE)
    .with([Shape.PAPER, Shape.PAPER], () => Outcome.DRAW)
    .with([Shape.PAPER, Shape.CISSORS], () => Outcome.WIN)
    .with([Shape.CISSORS, Shape.ROCK], () => Outcome.WIN)
    .with([Shape.CISSORS, Shape.PAPER], () => Outcome.LOSE)
    .with([Shape.CISSORS, Shape.CISSORS], () => Outcome.DRAW)
    .otherwise(impossible);

const getShapeToPlayForOutcome = (round: OutcomeRound): Shape =>
  match(round)
    .with([Shape.ROCK, Outcome.LOSE], () => Shape.CISSORS)
    .with([Shape.ROCK, Outcome.DRAW], () => Shape.ROCK)
    .with([Shape.ROCK, Outcome.WIN], () => Shape.PAPER)
    .with([Shape.PAPER, Outcome.LOSE], () => Shape.ROCK)
    .with([Shape.PAPER, Outcome.DRAW], () => Shape.PAPER)
    .with([Shape.PAPER, Outcome.WIN], () => Shape.CISSORS)
    .with([Shape.CISSORS, Outcome.LOSE], () => Shape.PAPER)
    .with([Shape.CISSORS, Outcome.DRAW], () => Shape.CISSORS)
    .with([Shape.CISSORS, Outcome.WIN], () => Shape.ROCK)
    .otherwise(impossible);

day(2, (input, part) => {
  const rounds = input.map((line) => line.split(' ') as InputRound);

  part(1, () => {
    const roundsAsShape = fp.pipe(
      rounds,
      RA.map(
        ([enemyLetter, playerLetter]) =>
          [
            getShapeFromInputLetter(enemyLetter),
            getShapeFromInputLetter(playerLetter),
          ] as ShapeRound,
      ),
    );

    return fp.pipe(
      roundsAsShape,
      RA.reduce(0, (acc, round) => acc + round[1] + getOutcomeForRound(round)),
    );
  });

  part(2, () => {
    const roundsAsOutcome = fp.pipe(
      rounds,
      RA.map(
        ([enemyLetter, outcomeLetter]) =>
          [
            getShapeFromInputLetter(enemyLetter),
            getOutcomeFromInputLetter(outcomeLetter),
          ] as OutcomeRound,
      ),
    );

    return fp.pipe(
      roundsAsOutcome,
      RA.reduce(0, (acc, round) => {
        const shapeToPlay = getShapeToPlayForOutcome(round);
        return acc + shapeToPlay + round[1];
      }),
    );
  });
});
