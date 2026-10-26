import { useCallback, useEffect, useRef, useState } from "react";
import photo from "../../../assets-originals/akash-optimized.webp?url";
import { portfolioCopy } from "@/content/portfolio";

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);
  const doneTimer = useRef<number | undefined>(undefined);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    doneTimer.current = window.setTimeout(onDone, reducedMotion ? 0 : 260);
  }, [onDone]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let imageReady = false;
    let minimumTimePassed = reducedMotion;
    const image = new Image();
    let minimumTimer = 0;

    const finishIfReady = () => {
      if (imageReady && minimumTimePassed) finish();
    };
    const markImageReady = () => {
      imageReady = true;
      finishIfReady();
    };

    image.onload = markImageReady;
    image.onerror = markImageReady;
    image.src = photo;

    if (image.complete) markImageReady();

    minimumTimer = window.setTimeout(() => {
      minimumTimePassed = true;
      finishIfReady();
    }, reducedMotion ? 0 : 680);
    const fallbackTimer = window.setTimeout(finish, reducedMotion ? 100 : 1250);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
      if (doneTimer.current !== undefined) window.clearTimeout(doneTimer.current);
      image.onload = null;
      image.onerror = null;
    };
  }, [finish]);

  return (
    <div
      role="status"
      aria-label={portfolioCopy.loader.message}
      className={`neural-loader fixed inset-0 z-[100] grid place-items-center px-6 transition-opacity duration-300 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div aria-hidden="true" className="neural-loader__network">
        <svg viewBox="0 0 900 560" fill="none">
          <path d="M110 282 260 166l154 120 174-158 190 109" />
          <path d="m110 282 164 136 140-132 133 158 231-207" />
          <path d="m260 166 14 252m140-132 174-158m0 0 9 316" />
          {[["110", "282"], ["260", "166"], ["274", "418"], ["414", "286"], ["588", "128"], ["721", "286"], ["812", "237"], ["721", "444"]].map(([cx, cy], index) => (
            <circle key={index} cx={cx} cy={cy} r={index === 3 ? 5 : 3} />
          ))}
        </svg>
      </div>

      <div aria-hidden="true" className="neural-loader__code">
        {portfolioCopy.loader.code.map((line) => <span key={line}>{line}</span>)}
      </div>

      <div className={`neural-loader__core text-center ${leaving ? "neural-loader__core--exit" : ""}`}>
        <div className="neural-loader__ring mx-auto mb-8 grid h-36 w-36 place-items-center rounded-full border border-live/35 sm:h-44 sm:w-44">
          <div className="neural-loader__ring-inner grid h-[78%] w-[78%] place-items-center rounded-full border border-live/20">
            <span className="font-display text-5xl font-semibold tracking-[-0.08em] text-foreground sm:text-6xl">
              {portfolioCopy.loader.initials}
            </span>
          </div>
        </div>
        <p className="font-display text-lg font-semibold tracking-[0.24em] text-foreground">
          {portfolioCopy.loader.name}
        </p>
        <p className="eyebrow mt-2 mb-3 !text-[9px]">
          {portfolioCopy.loader.role}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground sm:text-xs">
          {portfolioCopy.loader.message}
        </p>
        <div aria-hidden="true" className="neural-loader__scan mx-auto mt-6 h-px w-48 overflow-hidden bg-live/15 sm:w-64">
          <span className="block h-full w-1/3 bg-live shadow-[0_0_16px_var(--live)]" />
        </div>
        <button
          type="button"
          onClick={finish}
          className="mt-8 min-h-11 rounded-full border border-border/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-live/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-live"
        >
          {portfolioCopy.loader.enter}
        </button>
      </div>
    </div>
  );
}
