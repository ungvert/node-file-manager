import { messages } from "./messages.js";
import { color } from "./log.js";

export async function runCommand(command, parameters) {
  if (!command) {
    console.log(color(messages.invalidCommand, "yellow"));
  } else {
    try {
      const outputMessage = await command(parameters);
      if (outputMessage) console.log(outputMessage);
    } catch (error) {
      console.log(color(messages.operationFailed, "red"), color(String(error), "gray"));
    }
  }
}
