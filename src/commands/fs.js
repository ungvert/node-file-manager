import { createReadStream, createWriteStream } from "fs";
import { stat, unlink, rename, open } from "fs/promises";
import { pipeline } from "stream/promises";

import { resolvePaths } from "../resolvePaths.js";
import { writeStdoutAndFinish } from "../stream.js";

export const fileCommands = {
  cat: async (parameters) => {
    const [source] = resolvePaths(parameters, 1);

    const stats = await stat(source);
    if (stats.isDirectory()) throw new Error(`${source} Is a direcory`);

    await pipeline(createReadStream(source), writeStdoutAndFinish());
  },
  add: async (parameters) => {
    const [source] = resolvePaths(parameters, 1);
    const file = await open(source, "wx");
    await file.close();
  },
  rn: async (parameters) => {
    const [source, destination] = resolvePaths(parameters, 2);
    await rename(source, destination);
  },
  cp: async (parameters) => {
    const [source, destination] = resolvePaths(parameters, 2);
    await pipeline(createReadStream(source), createWriteStream(destination));
  },
  mv: async (parameters) => {
    const [source, destination] = resolvePaths(parameters, 2);
    await pipeline(createReadStream(source), createWriteStream(destination));
    await unlink(source);
  },
  rm: async (parameters) => {
    const [source] = resolvePaths(parameters, 1);
    await unlink(source);
  },
};
