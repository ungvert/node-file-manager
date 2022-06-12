import { resolve, dirname } from "path";
import { cwd } from "process";

export function resolvePaths(parameters, n) {
  if (parameters.length !== n) throw new Error(`Expected ${n} parameters`);

  const [sourcePath, destinationPath] = parameters;

  const source = resolve(cwd(), sourcePath);

  let destination;
  if (n > 1 && !destinationPath) throw new Error(`No destination path provided`);
  if (destinationPath) {
    destination = resolve(cwd(), dirname(sourcePath), destinationPath);
  }

  return [source, destination];
}
