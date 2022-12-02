import { function as fp, readonlyArray as RA, number as N } from 'fp-ts';

import { getOrImpossibleO } from './lib';
import { day } from './wrapper';

day(1, (input, part) => {
  const inventories = fp.pipe(
    input,
    RA.reduce([] as number[], (acc, line) => {
      if (line === '') acc.push(0);
      else acc[acc.length - 1] += parseInt(line, 10);
      return acc;
    }),
  );

  part(1, () =>
    fp.pipe(inventories, RA.sort(N.Ord), RA.head, getOrImpossibleO),
  );

  part(2, () =>
    fp.pipe(
      inventories.slice(0, 3),
      RA.reduce(0, (acc, nb) => acc + nb),
    ),
  );
});
