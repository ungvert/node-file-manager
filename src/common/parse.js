export function parseStartCommands(scriptStartCommands) {
  const defaultParameters = {
    username: "Unknown Username",
  };
  const ARG_KEY = "--";
  const ARG_VALUE_SEPARATOR = "=";

  for (const arg of scriptStartCommands) {
    if (arg.startsWith(ARG_KEY)) {
      let [key, value] = arg.split(ARG_VALUE_SEPARATOR);
      key = key.replace(ARG_KEY, "");
      if (key in defaultParameters) {
        defaultParameters[key] = value;
      }
    }
  }

  return defaultParameters;
}

export function parseCommandAndArguments(line) {
  let [command, ...parameters] = line.split(" ");

  if (/"|'/g.test(parameters)) {
    parameters = parameters
      .join(" ")
      .split(/["'] | ["']/)
      .map((item) => item.replace(/"|'/g, ""));
  }

  return [command, parameters];
}
