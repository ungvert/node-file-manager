import { Writable } from "stream";
import { EOL } from "os";

export function writeStdoutAndFinish() {
  return new Writable({
    write(chunk, encoding, callback) {
      process.stdout.write(chunk + EOL, callback);
    },
  });
}
