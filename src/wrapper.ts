import * as fs from 'node:fs';
import * as path from 'node:path';

type PartOutput = string | number;
type PartFn = (part: number, handler: () => PartOutput) => void;

const createPartFunction =
  (day: number): PartFn =>
  (part, handler) => {
    const output = handler();
    console.log(`Output of day ${day}-${part} is: ${output}`);
  };

export const day = (
  nb: number,
  handler: (input: readonly string[], part: PartFn) => void,
) => {
  const inputPath = path.join(__dirname, '..', 'inputs', `day${nb}.txt`);
  const input = fs.readFileSync(inputPath, 'utf8').split('\n');
  handler(input, createPartFunction(nb));
};
