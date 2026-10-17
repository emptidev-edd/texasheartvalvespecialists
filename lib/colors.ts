export const colors = {
  paper: "#f3efe6",
  paperRaised: "#fbf8f3",
  ink: "#1a2836",
  inkSoft: "#31404d",
  inkMuted: "#3d4b58",
  navy: "#16324a",
  navyDeep: "#12263a",
  stone: "#5d675f",
  stoneSoft: "#4d5b66",
  crimson: "#c4372f",
  crimsonDeep: "#8d2e2a",
  blush: "#e7b2a8",
  blushSoft: "#f0c2ba",
  line: "#e0d8cb",
  lineSoft: "#d5cdbf",
  cream: "#f7f3eb",
  coral: "#e07a72",
} as const satisfies Record<string, string>;

export type ColorName = keyof typeof colors;
export type ColorPalette = Record<ColorName, string>;

export const colorVars = {
  paper: "--paper",
  paperRaised: "--paper-raised",
  ink: "--ink",
  inkSoft: "--ink-soft",
  inkMuted: "--ink-muted",
  navy: "--navy",
  navyDeep: "--navy-deep",
  stone: "--stone",
  stoneSoft: "--stone-soft",
  crimson: "--crimson",
  crimsonDeep: "--crimson-deep",
  blush: "--blush",
  blushSoft: "--blush-soft",
  line: "--line",
  lineSoft: "--line-soft",
  cream: "--cream",
  coral: "--coral",
} as const satisfies Record<ColorName, string>;
