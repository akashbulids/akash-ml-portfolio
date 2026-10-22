import { createFileRoute } from "@tanstack/react-router";
import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from "react";
import { BootLoader } from "@/components/universe/BootLoader";
import { VideoModal } from "@/components/universe/VideoModal";
import { Nav, Hero, About, Skills, Projects, Education, Contact } from "@/components/universe/Sections";
import { startThemeEngine } from "@/lib/theme-engine";

const Universe3D = lazy(() => import("@/components/universe/Universe3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akash R — The AI Universe | Machine Learning Portfolio" },
      { name: "description", content: "Interactive 3D portfolio of Akash R, aspiring Machine Learning Engineer: predictive modeling, NLP, segmentation and ML apps." },
      { property: "og:title", content: "Akash R — The AI Universe" },
      { property: "og:description", content: "Interactive 3D portfolio of Akash R, aspiring Machine Learning Engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

class GLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override render() { return this.state.failed ? null : this.props.children; }
}

function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

function Index() {
  const [booted, setBooted] = useState(false);
  const [gl, setGl] = useState(false);
  const [video, setVideo] = useState(false);
  const done = useCallback(() => setBooted(true), []);
  useEffect(() => { setGl(hasWebGL()); return startThemeEngine(); }, []);

  return (
    <div className="relative">
      <div aria-hidden className="fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,var(--live-soft),transparent_60%)]">
        {gl && (
          <GLBoundary>
            <Suspense fallback={null}><Universe3D /></Suspense>
          </GLBoundary>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      </div>
      {!booted && <BootLoader onDone={done} />}
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects onVideo={() => setVideo(true)} />
        <Education />
        <Contact />
      </main>
      <VideoModal open={video} onClose={() => setVideo(false)} />
    </div>
  );
}
