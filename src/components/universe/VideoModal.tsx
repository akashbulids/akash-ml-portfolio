import { useEffect, useRef, useState } from "react";
import { X, RotateCcw } from "lucide-react";
import video from "@/assets/used-car-demo.mp4.asset.json";
import poster from "@/assets/used-car-poster.jpg.asset.json";
import { play } from "@/lib/sound";

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(false);
    setLoading(true);
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    ref.current?.pause();
    play("close");
    onClose();
  };

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Used Car Price Estimation demo" className="fixed inset-0 z-[90] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md" onClick={close}>
      <div className="panel relative w-full max-w-5xl overflow-hidden p-2 md:p-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="eyebrow">Demo · Used Car Price Estimation</span>
          <div className="flex gap-2">
            <button aria-label="Replay" onClick={() => { if (ref.current) { ref.current.currentTime = 0; ref.current.play(); } play("click"); }} className="rounded-full p-2 hover:bg-live-soft">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button ref={closeBtn} aria-label="Close video" onClick={close} className="rounded-full p-2 hover:bg-live-soft">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video bg-background">
          {loading && !error && <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.3em] text-muted-foreground">LOADING…</div>}
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">The video couldn't be loaded. Please try again later.</div>
          ) : (
            <video
              ref={ref}
              src={video.url}
              poster={poster.url}
              controls
              autoPlay
              muted
              playsInline
              preload="none"
              className="relative h-full w-full"
              onCanPlay={() => setLoading(false)}
              onError={() => setError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
