import { useEffect, useState } from "react";

const LINES = ["SYSTEM INITIALIZATION", "LOADING DIGITAL ENVIRONMENT", "CONNECTING NEURAL PATHWAYS", "INITIALIZING VISUALIZATION ENGINE", "WELCOME, EXPLORER"];

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 600 : 2800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setPct(Math.round(p * 100));
      setStep(Math.min(LINES.length - 1, Math.floor(p * LINES.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(onDone, reduce ? 50 : 600);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div
      role="status"
      aria-label={`Loading ${pct}%`}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-700 ${leaving ? "scale-110 opacity-0" : "opacity-100"}`}
    >
      <div className="absolute left-6 top-6 hidden font-mono text-[11px] leading-6 text-muted-foreground md:block">
        {LINES.slice(0, step + 1).map((l, i) => (
          <div key={l} className="word-in">
            <span className="text-live">&gt;</span> {l}
            {i === step && <span className="caret ml-1 text-live">▍</span>}
          </div>
        ))}
      </div>
      <div className="relative flex flex-col items-center">
        <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
          <g stroke="currentColor" className="text-live" fill="none">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              const len = pct > 10 ? 100 : pct * 10;
              return <line key={i} x1="110" y1="110" x2={110 + Math.cos(a) * len} y2={110 + Math.sin(a) * len} strokeOpacity={0.15} />;
            })}
            <polygon points="110,40 170,75 170,145 110,180 50,145 50,75" strokeOpacity={pct > 35 ? 0.9 : 0} style={{ transition: "stroke-opacity .6s" }} />
            <polygon points="110,70 140,88 140,132 110,150 80,132 80,88" strokeOpacity={pct > 55 ? 0.7 : 0} style={{ transition: "stroke-opacity .6s", transformOrigin: "110px 110px", transform: `rotate(${pct * 3.6}deg)` }} />
            <circle cx="110" cy="110" r={r} strokeOpacity={0.12} />
            <circle cx="110" cy="110" r={r} strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform="rotate(-90 110 110)" strokeWidth={2} />
          </g>
          <circle cx="110" cy="110" r="4" className="fill-live" />
        </svg>
        <div className={`mt-6 font-display text-2xl tracking-[0.3em] transition-opacity duration-700 ${pct > 70 ? "opacity-100" : "opacity-0"}`}>AKASH R</div>
        <div className="mt-2 font-mono text-xs tracking-[0.3em] text-muted-foreground">{pct.toString().padStart(3, "0")}%</div>
      </div>
    </div>
  );
}
