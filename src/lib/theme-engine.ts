// Central color engine: 20 palettes cycled smoothly.
export const PALETTES: { name: string; hue: number; hex: string }[] = [
  { name: "Midnight Blue", hue: 255, hex: "#5b7cff" },
  { name: "Electric Cyan", hue: 205, hex: "#3fd9ff" },
  { name: "Emerald Green", hue: 160, hex: "#3ee0a0" },
  { name: "Violet", hue: 300, hex: "#b98cff" },
  { name: "Royal Purple", hue: 290, hex: "#9a6bff" },
  { name: "Arctic Blue", hue: 225, hex: "#8fc7ff" },
  { name: "Teal", hue: 185, hex: "#2fd0c4" },
  { name: "Sapphire", hue: 245, hex: "#4f8dff" },
  { name: "Magenta", hue: 340, hex: "#ff5fc8" },
  { name: "Crimson", hue: 20, hex: "#ff5a6e" },
  { name: "Amber", hue: 70, hex: "#ffb547" },
  { name: "Golden Yellow", hue: 90, hex: "#ffd84a" },
  { name: "Ice White", hue: 215, hex: "#dfefff" },
  { name: "Silver", hue: 240, hex: "#c8d0e0" },
  { name: "Turquoise", hue: 195, hex: "#3ae6e0" },
  { name: "Indigo", hue: 270, hex: "#7a74ff" },
  { name: "Copper", hue: 50, hex: "#e8915a" },
  { name: "Rose", hue: 5, hex: "#ff8aa8" },
  { name: "Aurora Green", hue: 145, hex: "#7cff9e" },
  { name: "Deep Space Blue", hue: 260, hex: "#4c6bd8" },
];

/** Milliseconds between palette changes. */
export const THEME_INTERVAL_MS = 14_000;

type Listener = (i: number) => void;
const listeners = new Set<Listener>();
let current = 1;
export const getPaletteIndex = () => current;
export function onPalette(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function startThemeEngine() {
  if (typeof window === "undefined") return () => {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const apply = () => {
    document.documentElement.style.setProperty("--live-h", String(PALETTES[current]!.hue));
    listeners.forEach((l) => l(current));
  };
  apply();
  if (reduce) return () => {};
  const id = window.setInterval(() => {
    current = (current + 1) % PALETTES.length;
    apply();
  }, THEME_INTERVAL_MS);
  return () => window.clearInterval(id);
}
