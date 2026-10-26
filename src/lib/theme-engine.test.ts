import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("ambient color system", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.documentElement.style.removeProperty("--ambient-color");
  });

  it("defines all 20 supplied colors and starts on crimson", async () => {
    const { PALETTES } = await import("./theme-engine");

    expect(PALETTES).toHaveLength(20);
    expect(PALETTES[0]).toEqual({ name: "Crimson Red", hex: "#F51B36" });
    expect(PALETTES.at(-1)).toEqual({ name: "Dark Background", hex: "#101014" });
  });

  it("cycles the ambient color palette and stops when cleaned up", async () => {
    const theme = await import("./theme-engine");
    const listener = vi.fn();
    const unsubscribe = theme.onPalette(listener);
    const stop = theme.startThemeEngine();

    expect(document.documentElement.style.getPropertyValue("--ambient-color")).toBe("#F51B36");
    expect(listener).toHaveBeenLastCalledWith(0);

    vi.advanceTimersByTime(theme.THEME_INTERVAL_MS);
    expect(document.documentElement.style.getPropertyValue("--ambient-color")).toBe("#FF334F");
    expect(listener).toHaveBeenLastCalledWith(1);

    stop();
    vi.advanceTimersByTime(theme.THEME_INTERVAL_MS * 2);
    expect(listener).toHaveBeenCalledTimes(2);
    unsubscribe();
  });

  it("does not rotate colors when reduced motion is requested", async () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    const theme = await import("./theme-engine");
    const listener = vi.fn();
    const unsubscribe = theme.onPalette(listener);
    const stop = theme.startThemeEngine();

    vi.advanceTimersByTime(theme.THEME_INTERVAL_MS * 2);
    expect(document.documentElement.style.getPropertyValue("--ambient-color")).toBe("#F51B36");
    expect(listener).toHaveBeenCalledTimes(1);

    stop();
    unsubscribe();
  });
});
