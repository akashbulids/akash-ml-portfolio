import { beforeEach, describe, expect, it, vi } from "vitest";

describe("sound module", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("loads and persists the muted state when storage is available", async () => {
    const storageDescriptor = Object.getOwnPropertyDescriptor(window, "localStorage");
    const storage = {
      getItem: vi.fn((key: string) => key === "ui-muted" ? "1" : null),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: storage,
    });

    try {
      const sound = await import("./sound");
      expect(sound.isMuted()).toBe(true);

      sound.setMuted(false);
      expect(sound.isMuted()).toBe(false);
      expect(storage.setItem).toHaveBeenCalledWith("ui-muted", "0");
      sound.setVolume(0.5);
      expect(sound.getVolume()).toBe(0.5);
      expect(storage.setItem).toHaveBeenCalledWith("ui-volume", "0.5");
    } finally {
      if (storageDescriptor) {
        Object.defineProperty(window, "localStorage", storageDescriptor);
      } else {
        Reflect.deleteProperty(window, "localStorage");
      }
    }
  });

  it("keeps sound state functional when localStorage is unavailable", async () => {
    const storageDescriptor = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: undefined,
    });

    try {
      const sound = await import("./sound");
      const listener = vi.fn();
      const unsubscribe = sound.onMuted(listener);

      expect(sound.isMuted()).toBe(true);
      expect(sound.getVolume()).toBe(0.35);
      expect(() => sound.setMuted(true)).not.toThrow();
      expect(() => sound.setVolume(0.7)).not.toThrow();
      expect(sound.getVolume()).toBe(0.7);
      expect(sound.isMuted()).toBe(true);
      expect(listener).toHaveBeenCalledWith(true);

      unsubscribe();
      sound.setMuted(false);
      expect(listener).toHaveBeenCalledTimes(1);
    } finally {
      if (storageDescriptor) {
        Object.defineProperty(window, "localStorage", storageDescriptor);
      } else {
        Reflect.deleteProperty(window, "localStorage");
      }
    }
  });

  it("can be imported and updated without a browser window", async () => {
    vi.stubGlobal("window", undefined);

    try {
      const sound = await import("./sound");
      expect(sound.isMuted()).toBe(true);
      expect(() => sound.setMuted(true)).not.toThrow();
      expect(sound.isMuted()).toBe(true);
      expect(() => sound.play()).not.toThrow();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
