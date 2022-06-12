import { EOL, cpus, homedir, userInfo, arch } from "os";

import { runCommand } from "../runCommand.js";

const osSubCommands = {
  EOL: () => {
    return JSON.stringify(EOL);
  },
  cpus: () => {
    return cpus().map(({ model, speed }) => ({
      model,
      speed: speed / (speed < 100 ? 10 : 1000), //In Ghz. 10 - for Apple CPUs
    }));
  },
  homedir: () => {
    return homedir();
  },
  username: () => {
    return userInfo().username;
  },
  architecture: () => {
    return arch();
  },
};

export const osCommands = {
  os: async (parameters) => {
    if (parameters.length !== 1) throw new Error(`Expected 1 parameter`);

    const [param] = parameters;
    const subCommand = osSubCommands[param.trim().replace("--", "")];

    await runCommand(subCommand);
  },
};
