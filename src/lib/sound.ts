// Subtle synthesized UI sounds. No music, nothing before user interaction.
let ctx: AudioContext | null = null;
let muted = true;
const subs = new Set<(m: boolean) => void>();

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

try {
  if (getStorage()?.getItem("ui-muted") === "0") {
    muted = false;
  }
} catch {
  // Keep the default muted state when storage cannot be read.
}

export const isMuted = () => muted;
export function setMuted(m: boolean) {
  muted = m;
  try {
    getStorage()?.setItem("ui-muted", m ? "1" : "0");
  } catch {
    // Sound state still works when storage is unavailable or full.
  }
  subs.forEach((s) => s(m));
}
export function onMuted(fn: (m: boolean) => void) {
  subs.add(fn);
  return () => subs.delete(fn);
}

type Kind = "click" | "select" | "open" | "close";
const TONES: Record<Kind, [number, number, number]> = {
  click: [880, 660, 0.05],
  select: [520, 1040, 0.08],
  open: [440, 880, 0.12],
  close: [700, 350, 0.1],
};

export function play(kind: Kind = "click") {
  if (muted || typeof window === "undefined") return;
  try {
    ctx ??= new AudioContext();
    const [f1, f2, d] = TONES[kind];
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f1, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(f2, ctx.currentTime + d);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d + 0.05);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + d + 0.06);
  } catch {
    /* audio unavailable */
  }
}
