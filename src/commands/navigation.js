import { homedir } from "os";
import { resolve } from "path";
import { stat, readdir } from "fs/promises";
import { chdir, cwd } from "process";

import { resolvePaths } from "../common/resolvePaths.js";

chdir(homedir());
export const navigationCommands = {
  up: () => {
    const destination = resolve(cwd(), "..");
    chdir(destination);
  },
  cd: async (parameters) => {
    const [destination] = resolvePaths(parameters, 1);

    const stats = await stat(destination);
    if (stats.isFile()) throw new Error(`Can't change current directory to file`);

    chdir(destination);
  },
  ls: async () => {
    const dirs = await readdir(cwd());
    return dirs;
  },
};
