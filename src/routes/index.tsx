import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { BootLoader } from "@/components/universe/BootLoader";
import { VideoModal } from "@/components/universe/VideoModal";
import { Nav, Hero, About, Skills, Projects, Education, Contact } from "@/components/universe/Sections";
import { startThemeEngine } from "@/lib/theme-engine";
import { profile } from "@/content/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.site} | Machine Learning Portfolio` },
      { name: "description", content: "Explore Akash R's machine-learning projects, data science work, and journey toward practical AI applications." },
      { property: "og:title", content: profile.site },
      { property: "og:description", content: "A cinematic portfolio of Akash R's machine-learning projects and learning journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  const [video, setVideo] = useState(false);
  const done = useCallback(() => setBooted(true), []);
  useEffect(() => startThemeEngine(), []);

  return (
    <div className="relative">
      <div aria-hidden="true" className="ambient-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="ambient-backdrop__wash absolute inset-0" />
        <div className="ambient-backdrop__grid absolute inset-0" />
        <svg
          className="ambient-backdrop__network absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path d="M-80 650 230 430l240 150 270-310 220 170 260-220 300 120" />
          <path d="M-30 280 210 420l250-160 260 250 210-170 240 180 330-160" />
          <circle cx="230" cy="430" r="4" />
          <circle cx="470" cy="580" r="4" />
          <circle cx="740" cy="270" r="4" />
          <circle cx="960" cy="440" r="4" />
          <circle cx="1220" cy="220" r="4" />
        </svg>
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
