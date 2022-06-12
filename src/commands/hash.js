import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";

import { resolvePaths } from "../common/resolvePaths.js";
import { writeStdoutAndFinish } from "../common/stream.js";

export const hashCommands = {
  hash: async (parameters) => {
    const [source] = resolvePaths(parameters, 1);
    await pipeline(
      createReadStream(source),
      createHash("sha256").setEncoding("hex"),
      writeStdoutAndFinish()
    );
  },
};
