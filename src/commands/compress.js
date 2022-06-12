import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";

import { resolvePaths } from "../resolvePaths.js";

export const compressCommands = {
  compress: async (parameters) => {
    const [source, destination] = resolvePaths(parameters, 2);

    await stat(source);

    await pipeline(
      createReadStream(source),
      createBrotliCompress(),
      createWriteStream(destination)
    );
  },
  decompress: async (parameters) => {
    const [source, destination] = resolvePaths(parameters, 2);

    await stat(source);

    await pipeline(
      createReadStream(source),
      createBrotliDecompress(),
      createWriteStream(destination)
    );
  },
};
