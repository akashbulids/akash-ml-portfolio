import { useCallback, useEffect, useRef, useState } from "react";
import { X, RotateCcw } from "lucide-react";
import video from "../../../assets-originals/used-car-demo.mp4?url";
import poster from "../../../assets-originals/used-car-poster.jpg?url";
import { play } from "@/lib/sound";

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const close = useCallback(() => {
    ref.current?.pause();
    play("close");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    setError(false);
    setLoading(true);
    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeBtn.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previousFocus.current?.focus();
    };
  }, [open, close]);

  if (!open) return null;
  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-dialog-title"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md"
      onClick={close}
    >
      <div
        className="panel relative w-full max-w-5xl overflow-hidden p-2 md:p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-2 pb-2">
          <h2 id="video-dialog-title" className="eyebrow">
            Used Car Price Estimation demo
          </h2>
          <div className="flex gap-2">
            <button
              aria-label="Replay video"
              onClick={() => {
                if (ref.current) {
                  ref.current.currentTime = 0;
                  setError(false);
                  setLoading(true);
                  void ref.current.play().catch(() => setError(true));
                }
                play("click");
              }}
              className="rounded-full p-2 hover:bg-live-soft"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button ref={closeBtn} aria-label="Close video" onClick={close} className="rounded-full p-2 hover:bg-live-soft">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video bg-background">
          {loading && !error && (
            <div
              role="status"
              className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.3em] text-muted-foreground"
            >
              Loading video…
            </div>
          )}
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">The video couldn't be loaded. Please try again later.</div>
          ) : (
            <video
              ref={ref}
              src={video}
              poster={poster}
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
