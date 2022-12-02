import type { option as O } from 'fp-ts';

export const impossible = (): never => {
  throw new Error('Impossible');
};

export const getOrImpossibleO = <T>(option: O.Option<T>): T => {
  if (option._tag === 'None') return impossible();
  else return option.value;
};
