const controlCharacter = "\x1b";
const formatAnsiColorCode = (n) => `[${n}m`;
const colorCodes = {
  reset: formatAnsiColorCode(0),

  //foreground
  green: formatAnsiColorCode(32),
  yellow: formatAnsiColorCode(33),
  red: formatAnsiColorCode(31),
  lightGray: formatAnsiColorCode(37),
  gray: formatAnsiColorCode(90),
  default: formatAnsiColorCode(39),
};

export function color(input, color) {
  const colorCode = colorCodes[color];
  if (!colorCode) return input;

  const resetColorCode = colorCodes.reset;
  const out = `${controlCharacter}${colorCode}${input}${controlCharacter}${resetColorCode}`;
  return out;
}
