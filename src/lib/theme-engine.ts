export const PALETTES: { name: string; hex: string }[] = [
  { name: "Crimson Red", hex: "#F51B36" },
  { name: "Electric Scarlet", hex: "#FF334F" },
  { name: "Deep Cherry", hex: "#A70F2E" },
  { name: "Coral Red", hex: "#FF625A" },
  { name: "Tangerine", hex: "#FF8738" },
  { name: "Amber Orange", hex: "#FFAD42" },
  { name: "Solar Yellow", hex: "#FFD84A" },
  { name: "Golden Glow", hex: "#F5B82E" },
  { name: "Hot Pink", hex: "#FF3D9A" },
  { name: "Rose Pink", hex: "#FF75B8" },
  { name: "Electric Violet", hex: "#8B5CF6" },
  { name: "Deep Purple", hex: "#6435C9" },
  { name: "Orchid", hex: "#C084FC" },
  { name: "Electric Blue", hex: "#4776FF" },
  { name: "Royal Blue", hex: "#3047D5" },
  { name: "Bright Cyan", hex: "#22D3EE" },
  { name: "Turquoise", hex: "#20D6B5" },
  { name: "Emerald", hex: "#27C982" },
  { name: "Lime", hex: "#B7F34A" },
  { name: "Dark Background", hex: "#101014" },
];

/** Milliseconds between palette changes. */
export const THEME_INTERVAL_MS = 14_000;

type Listener = (i: number) => void;
const listeners = new Set<Listener>();
let current = 0;
export const getPaletteIndex = () => current;
export function onPalette(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function startThemeEngine() {
  if (typeof window === "undefined") return () => {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const apply = () => {
    const color = PALETTES[current]!.hex;
    document.documentElement.style.setProperty("--ambient-color", color);
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
