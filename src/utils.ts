export const impossible = (): never => {
  throw new Error('Impossible');
};

export const chunkArray = <T>(
  array: readonly T[],
  size: number,
): readonly T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );

export const arrayMax = (array: readonly number[]): number =>
  array.reduce((prev, nb) => (nb > prev ? nb : prev), 0);

export const arrayReverse = (array: readonly number[]): readonly number[] =>
  Array.from({ length: array.length }, (_, i) => array[array.length - 1 - i]!);
