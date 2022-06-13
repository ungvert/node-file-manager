import { cwd } from "process";
import { parseStartCommands } from "./parse.js";

const consoleCommands = process.argv.slice(2);
const parameters = parseStartCommands(consoleCommands);

export const messages = {
  welcome: `Welcome to the File Manager, ${parameters.username}!`,
  goodbye: `Thank you for using File Manager, ${parameters.username}!`,
  invalidCommand: "Invalid input",
  operationFailed: "Operation failed",
  cwd: () => `You are currently in ${cwd()}`,
};
