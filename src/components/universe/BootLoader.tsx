import { useEffect, useState } from "react";

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let doneTimer = 0;
    const timer = window.setTimeout(() => {
      setLeaving(true);
      doneTimer = window.setTimeout(onDone, reduce ? 20 : 280);
    }, reduce ? 100 : 650);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-label="Preparing the Neural Odyssey portfolio"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-background/50 transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        aria-hidden="true"
        className="h-full w-1/3 bg-live shadow-[0_0_16px_var(--live)] motion-safe:animate-[loading-sweep_1.2s_ease-in-out_infinite]"
      />
      <span className="sr-only">Preparing the portfolio</span>
    </div>
  );
}
