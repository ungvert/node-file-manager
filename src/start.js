import readline from "readline";
import { EOL } from "os";

import { navigationCommands } from "./commands/navigation.js";
import { fileCommands } from "./commands/fs.js";
import { osCommands } from "./commands/os.js";
import { hashCommands } from "./commands/hash.js";
import { compressCommands } from "./commands/compress.js";

import { parseCommandAndArguments } from "./common/parse.js";
import { runCommand } from "./common/runCommand.js";
import { messages } from "./common/messages.js";
import { color } from "./common/log.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.on("close", () => {
  console.log(color(EOL + messages.goodbye, "green"));
});

const commands = {
  ".exit": () => rl.close(),
  ...navigationCommands,
  ...fileCommands,
  ...osCommands,
  ...hashCommands,
  ...compressCommands,
};

console.log(color(messages.welcome, "green"));
console.log(color(messages.cwd(), "lightGray"));

for await (const line of rl) {
  const [commandStr, parameters] = parseCommandAndArguments(line);
  const command = commands[commandStr];
  await runCommand(command, parameters);
  if (commandStr !== ".exit") console.log(color(messages.cwd(), "lightGray"));
}
