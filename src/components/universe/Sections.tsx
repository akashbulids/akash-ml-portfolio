
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Play,
  ExternalLink,
  Volume2,
  VolumeX,
  Car,
  Plane,
  MessageSquareText,
  Users,
  BrainCircuit,
  ChartNoAxesColumnIncreasing,
  CodeXml,
  Wrench,
} from "lucide-react";

import photo from "../../../assets-originals/akash-optimized.webp?url";
import poster from "../../../assets-originals/used-car-poster.jpg?url";
import {
  profile,
  skills,
  projects,
  education,
  portfolioCopy,
  sections,
  type Project,
  type SkillCategory,
} from "@/content/portfolio";
import { play, isMuted, setMuted, onMuted } from "@/lib/sound";
import { PALETTES, onPalette, getPaletteIndex } from "@/lib/theme-engine";

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.369 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.001-4.124 2.062 2.062 0 0 1 .001 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ---------- reveal on scroll ---------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    if (ref.current) io.observe(ref.current);

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-90"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Heading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h2 className="text-4xl font-semibold leading-tight md:text-6xl">{title}</h2>
    </Reveal>
  );
}

/* ---------- navigation ---------- */

export function Nav() {
  const [active, setActive] = useState("home");
  const [muted, setM] = useState(false);
  const [pal, setPal] = useState(getPaletteIndex());

  useEffect(() => {
    setM(isMuted());

    const a = onMuted(setM);
    const b = onPalette(setPal);

    const io = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) => e.isIntersecting && setActive(e.target.id),
        ),
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    return () => {
      a();
      b();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        aria-label="Main"
        className="panel fixed left-1/2 top-4 z-50 flex w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center justify-start gap-0.5 overflow-x-auto overscroll-x-contain rounded-full px-2 py-1.5 md:top-6 md:gap-1 md:overflow-visible"
      >
        <a
          href="#home"
          className="hidden px-3 font-display text-sm font-semibold tracking-widest sm:block"
        >
          NO<span className="text-live">.</span>
        </a>

        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => play("click")}
            aria-current={active === s.id ? "true" : undefined}
            className={`rounded-full px-1 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors sm:px-2.5 sm:tracking-[0.15em] md:px-3 md:text-[11px] ${
              active === s.id
                ? "bg-live-soft text-live"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </a>
        ))}

        <button
          aria-label={
            muted ? "Unmute interface sounds" : "Mute interface sounds"
          }
          aria-pressed={muted}
          onClick={() => {
            setMuted(!muted);
            if (muted) setTimeout(() => play("select"), 0);
          }}
          className="ml-0.5 rounded-full p-1.5 text-muted-foreground hover:text-live sm:ml-1 sm:p-2"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
      </nav>

      {/* environment map */}

      <div
        aria-hidden
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 2xl:flex"
      >
        {sections.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em]"
          >
            <span
              className={`transition-opacity ${
                active === s.id
                  ? "text-live opacity-100"
                  : "opacity-0"
              }`}
            >
              W{i + 1} · {s.label.toUpperCase()}
            </span>

            <span
              className={`h-px transition-all ${
                active === s.id
                  ? "w-8 bg-live"
                  : "w-3 bg-muted-foreground/40"
              }`}
            />
          </div>
        ))}

        <div className="mt-4 font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
          {PALETTES[pal]!.name.toUpperCase()}
        </div>
      </div>
    </>
  );
}

/* ---------- hero ---------- */

function RoleChips() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Areas of interest">
      {profile.roles.map((role) => (
        <span
          key={role}
          className="rounded-full border border-live/20 bg-live-soft/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/80 sm:text-xs"
        >
          {role}
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-x-clip px-6 pb-16 pt-28 md:px-14"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="eyebrow word-in mb-6">
            {portfolioCopy.hero.eyebrow}
          </div>

          <h1 className="text-6xl font-semibold leading-[0.98] md:text-7xl xl:text-8xl">
            <span
              className="word-in light-sweep inline-block"
              style={{ animationDelay: "200ms" }}
            >
              {profile.name}<span className="text-foreground">.</span>
            </span>
          </h1>

          <h2 className="mt-6 max-w-xl text-xl font-medium leading-snug text-foreground/90 md:text-3xl">
            {profile.headline}
          </h2>

          <div className="mt-4">
            <RoleChips />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {profile.location}
          </p>

          <p
            className="word-in mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "500ms" }}
          >
            {profile.intro}
          </p>

          <div
            className="word-in mt-10 flex flex-wrap gap-3"
            style={{ animationDelay: "650ms" }}
          >
            <a href="#projects" onClick={() => play("click")} className="btn-live">
              {portfolioCopy.hero.viewProjects}
            </a>
            <a href="#contact" onClick={() => play("click")} className="btn-ghost">
              {portfolioCopy.hero.contact}
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-live"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-live"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>

        <Workstation />
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-live"
      >
        {portfolioCopy.hero.scroll} <ArrowDown className="floaty h-4 w-4" />
      </a>
    </section>
  );
}

function Workstation() {
  return (
    <div className="profile-stage relative mx-auto w-full max-w-[34rem]">
      <div className="profile-stage__halo absolute inset-[8%] rounded-full" aria-hidden="true" />
      <svg
        aria-hidden="true"
        className="profile-stage__orbit absolute inset-0 h-full w-full"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="250" cy="250" r="221" />
        <circle cx="250" cy="250" r="200" />
        <path d="M250 18v52M250 430v52M18 250h52M430 250h52" />
        <circle className="profile-stage__node" cx="250" cy="29" r="4" />
        <circle className="profile-stage__node profile-stage__node--warm" cx="461" cy="315" r="3" />
      </svg>

      <figure className="profile-stage__frame panel relative mx-auto w-[78%] overflow-hidden rounded-[2rem] p-2">
          <img
            src={photo}
            alt="Akash R working on a laptop at his desk"
            className="aspect-[4/4.2] w-full rounded-[1.5rem] object-cover object-top"
            fetchPriority="high"
            decoding="async"
          />

          <div
            className="pointer-events-none absolute inset-x-2 bottom-2 h-1/3 rounded-b-[1.5rem]"
            style={{ background: "var(--gradient-fade)" }}
          />

          <figcaption className="absolute bottom-5 left-5 font-mono text-[9px] tracking-[0.2em] text-silver sm:left-7 sm:text-[10px]">
            {profile.name.toUpperCase()} · {profile.location.toUpperCase()}
          </figcaption>
      </figure>

      <div className="panel profile-stage__code absolute bottom-[7%] left-0 hidden w-52 p-3 font-mono text-[10px] leading-5 md:block">
          <div className="text-muted-foreground"># model.py</div>
          <div>
            <span className="text-live">from</span> sklearn{" "}
            <span className="text-live">import</span> ensemble
          </div>
          <div>model.fit(X_train, y_train)</div>
          <div className="text-amber">→ ready to predict</div>
      </div>

      <div className="panel profile-stage__chart absolute right-0 top-[13%] hidden p-3 md:block">
          <svg
            width="90"
            height="44"
            viewBox="0 0 90 44"
            className="text-live"
            fill="none"
            stroke="currentColor"
          >
            <polyline
              points="0,40 15,30 30,34 45,18 60,22 75,8 90,12"
              strokeWidth="2"
            />
          </svg>
      </div>
    </div>
  );
}

/* ---------- about ---------- */

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-32 md:px-14"
    >
      <div className="mx-auto max-w-7xl">
        <Heading
          eyebrow={portfolioCopy.about.eyebrow}
          title={portfolioCopy.about.title}
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex items-center justify-center">
            <div className="profile-orbit relative flex h-72 w-full max-w-sm items-center justify-center md:h-96">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
                fill="none"
              >
                <circle cx="200" cy="200" r="168" className="profile-orbit__ring" />
                <circle cx="200" cy="200" r="142" className="profile-orbit__ring profile-orbit__ring--inner" />
                <path d="M200 16v44M200 340v44M16 200h44M340 200h44" className="profile-orbit__ticks" />
                <circle cx="200" cy="32" r="4" className="profile-orbit__node" />
                <circle cx="344" cy="283" r="3" className="profile-orbit__node profile-orbit__node--warm" />
              </svg>
              <img
                src={photo}
                alt="Portrait of Akash R"
                loading="lazy"
                decoding="async"
                className="profile-orbit__portrait absolute left-1/2 top-1/2 z-10 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-live/50 object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="panel p-8 md:p-10">
            {profile.about.map((p) => (
              <p
                key={p}
                className="mb-5 leading-relaxed text-foreground/90 md:text-lg"
              >
                {p}
              </p>
            ))}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Info title={portfolioCopy.about.careerInterests} items={profile.interests} />
              <Info title={portfolioCopy.about.technicalInterests} items={profile.technical} />

              <Info
                title={portfolioCopy.about.education}
                items={education
                  .filter((item) => item.tag !== "Training")
                  .map((item) => `${item.title} — ${item.place}`)}
              />

              <Info
                title={portfolioCopy.about.training}
                items={education
                  .filter((item) => item.tag === "Training")
                  .map((item) => `${item.title} — ${item.place}`)}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Info({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="eyebrow mb-2 !text-[10px] !text-amber">
        {title}
      </div>

      <ul className="space-y-1 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- skills ---------- */

export function Skills() {
  const [selected, setSelected] = useState(skills[0]!.id);

  return (
    <section
      id="skills"
      className="relative px-6 py-24 md:px-14 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Heading
          eyebrow={portfolioCopy.skills.eyebrow}
          title={portfolioCopy.skills.title}
        />

        <p className="mb-8 max-w-2xl text-muted-foreground md:text-lg">
          {portfolioCopy.skills.introduction}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((category, index) => {
            const Icon = SKILL_ICONS[category.id];
            const active = category.id === selected;

            return (
              <Reveal key={category.id} delay={index * 70}>
                <article
                  className={`group h-full rounded-2xl border bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-live/40 hover:bg-card/90 md:p-6 ${
                    active
                      ? "border-live/35 shadow-[0_18px_48px_-32px_var(--live)]"
                      : "border-border/80"
                  }`}
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSelected(category.id);
                      play("select");
                    }}
                    className="flex min-h-11 w-full items-center gap-3 text-left"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-live-soft text-live transition-transform duration-300 group-hover:scale-105">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="flex-1 font-display text-lg font-semibold">
                      {category.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full transition-colors ${
                        active ? "bg-live" : "bg-muted-foreground/40"
                      }`}
                    />
                  </button>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border/80 bg-background/50 px-2.5 py-1.5 text-xs leading-relaxed text-foreground/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- projects ---------- */

const ICONS = {
  car: Car,
  plane: Plane,
  clusters: Users,
  speech: MessageSquareText,
};

const SKILL_ICONS = {
  python: CodeXml,
  ml: BrainCircuit,
  ds: ChartNoAxesColumnIncreasing,
  nlp: MessageSquareText,
  tools: Wrench,
} satisfies Record<SkillCategory["id"], typeof CodeXml>;

function Installation({
  p,
  onVideo,
}: {
  p: Project;
  onVideo: () => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[p.shape];
  const reverse = Number(p.index) % 2 === 0;

  return (
    <Reveal>
      <article
        className={`group grid items-center gap-6 md:grid-cols-2 md:gap-12 xl:gap-20 ${
          reverse ? "md:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div className="project-art relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] border border-border/70 bg-[radial-gradient(ellipse_at_50%_55%,var(--live-soft),transparent_68%)] p-4 sm:p-6">
          <span className="absolute left-5 top-5 z-10 rounded-full border border-border/70 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur">
            {p.index} <span className="mx-1.5 text-live">/</span> {p.kind}
          </span>

          {p.hasVideo ? (
            <button
              onClick={() => {
                play("open");
                onVideo();
              }}
              className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-background/50 text-left"
              aria-label={`${portfolioCopy.projects.demo}: play video`}
            >
              <img
                src={poster}
                alt={`${p.title} application screenshot`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />

              <span className="absolute inset-0 flex items-center justify-center bg-background/10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-live text-primary-foreground shadow-[0_0_40px_-8px_var(--live)] transition-transform duration-300 group-hover:scale-110">
                  <Play aria-hidden="true" className="ml-1 h-5 w-5" />
                </span>
              </span>
            </button>
          ) : p.shape === "clusters" ? (
            <ClusterViz />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-background/20">
              {p.shape === "plane" ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 420 300"
                  className="absolute inset-0 h-full w-full text-live"
                  fill="none"
                >
                  <path d="M38 226C104 205 123 87 211 108s100 111 171 14" stroke="currentColor" strokeOpacity=".42" strokeWidth="1.5" strokeDasharray="5 8" />
                  <circle cx="38" cy="226" r="5" fill="currentColor" />
                  <circle cx="211" cy="108" r="5" fill="currentColor" />
                  <circle cx="382" cy="122" r="5" fill="currentColor" />
                  <path d="M45 252h330" stroke="currentColor" strokeOpacity=".12" />
                </svg>
              ) : (
                <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center gap-2">
                  {["TEXT", "TOKENS", "SENTIMENT"].map((token, index) => (
                    <span
                      key={token}
                      className={`rounded-full border px-2 py-1 font-mono text-[9px] tracking-[0.12em] ${
                        index === 1
                          ? "border-live/45 bg-live-soft text-live"
                          : "border-border/80 bg-background/65 text-muted-foreground"
                      }`}
                      style={{ transform: `translateY(${index === 1 ? "-1.5rem" : "1.25rem"})` }}
                    >
                      {token}
                    </span>
                  ))}
                </div>
              )}
              {[0, 1, 2].map((ring) => (
                <div
                  key={ring}
                  aria-hidden="true"
                  className="absolute aspect-square rounded-full border border-live/30 transition-transform duration-700 group-hover:rotate-12"
                  style={{
                    width: `${48 + ring * 18}%`,
                    transform: `rotate(${ring * 40}deg)`,
                  }}
                />
              ))}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-live/30 bg-background/80 text-live shadow-[0_0_52px_-20px_var(--live)] transition-transform duration-500 group-hover:scale-110">
                <Icon aria-hidden="true" className="h-9 w-9" strokeWidth={1.4} />
              </div>
            </div>
          )}
        </div>

        <div className="relative py-3 md:py-8">
          <div className="eyebrow mb-3">
            {p.kind}
          </div>
          <h3 className="mb-3 text-2xl font-semibold leading-snug md:text-3xl xl:text-4xl">
            {p.title}
          </h3>

          <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {p.summary}
          </p>

          {p.highlights && (
            <ul className="mb-6 flex flex-wrap gap-2">
              {p.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-lg border border-live/20 bg-live-soft/60 px-3 py-2 font-mono text-xs text-foreground/90"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => play("click")}
              className="btn-live"
            >
              <GithubIcon /> {portfolioCopy.projects.repository}
            </a>

            <button
              onClick={() => {
                setOpen(!open);
                play(open ? "close" : "select");
              }}
              aria-expanded={open}
              className="btn-ghost"
            >
              {open
                ? portfolioCopy.projects.hideDetails
                : portfolioCopy.projects.details}
            </button>

            {p.backend && (
              <a
                href={p.backend}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" /> {portfolioCopy.projects.backend}
              </a>
            )}
          </div>

          <div
            className={`grid transition-all duration-300 ${
              open
                ? "mt-5 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <ul
              aria-hidden={!open}
              className="space-y-2 overflow-hidden rounded-xl border border-border/70 bg-background/40 p-0 text-sm text-foreground/85 [&>li]:px-4 first:[&>li]:pt-4 last:[&>li]:pb-4"
            >
              {p.details.map((detail) => (
                <li key={detail}>
                  <span aria-hidden="true" className="mr-2 text-live">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ClusterViz() {
  const [hover, setHover] = useState<number | null>(null);

  const clusters = [
    { cx: 90, cy: 90, n: 18 },
    { cx: 220, cy: 70, n: 14 },
    { cx: 160, cy: 190, n: 20 },
    { cx: 290, cy: 180, n: 12 },
  ];

  const r = (s: number) => {
    const x = Math.sin(s * 999) * 1e4;
    return x - Math.floor(x);
  };

  return (
    <svg
      viewBox="0 0 360 260"
      className="w-full p-4"
      role="img"
      aria-label={portfolioCopy.projects.illustrativeClusters}
    >
      {clusters.map((c, ci) => (
        <g
          key={ci}
          onMouseEnter={() => setHover(ci)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setHover(ci)}
          style={{
            opacity: hover === null || hover === ci ? 1 : 0.25,
            transition: "opacity .3s",
          }}
        >
          {Array.from({ length: c.n }).map((_, k) => (
            <circle
              key={k}
              cx={Math.round(
                c.cx + (r(ci * 50 + k) - 0.5) * 70,
              )}
              cy={Math.round(
                c.cy + (r(ci * 50 + k + 0.5) - 0.5) * 60,
              )}
              r="3.5"
              className={ci % 2 ? "fill-amber" : "fill-live"}
            />
          ))}

          <circle
            cx={c.cx}
            cy={c.cy}
            r="9"
            className="fill-none stroke-foreground"
            strokeWidth="1.5"
          />

          <text
            x={c.cx}
            y={c.cy - 40}
            textAnchor="middle"
            className="fill-muted-foreground font-mono text-[9px]"
          >
            SEGMENT {ci + 1}
          </text>
        </g>
      ))}

      <text
        x="12"
        y="250"
        className="fill-muted-foreground font-mono text-[8px]"
      >
        {portfolioCopy.projects.illustrativeData.toUpperCase()}
      </text>
    </svg>
  );
}

export function Projects({
  onVideo,
}: {
  onVideo: () => void;
}) {
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:px-14 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Heading
          eyebrow={portfolioCopy.projects.eyebrow}
          title={portfolioCopy.projects.title}
        />

        <div className="space-y-16 md:space-y-24">
          <div
            aria-hidden="true"
            className="absolute bottom-32 left-1/2 top-56 hidden w-px bg-gradient-to-b from-transparent via-live/25 to-transparent md:block"
          />
          {projects.map((p) => (
            <Installation
              key={p.id}
              p={p}
              onVideo={onVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- education ---------- */

export function Education() {
  return (
    <section
      id="education"
      className="relative px-6 py-24 md:px-14 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Heading
          eyebrow={portfolioCopy.education.eyebrow}
          title={portfolioCopy.education.title}
        />

        <ol className="relative space-y-4 before:absolute before:bottom-8 before:left-[0.6875rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-live/60 before:via-live/20 before:to-transparent">
          {education.map((e, i) => (
            <li
              key={e.title}
              className="relative pl-10"
            >
              <span
                aria-hidden="true"
                className="absolute left-2 top-7 h-3 w-3 rounded-full border-2 border-background bg-live shadow-[0_0_18px_var(--live)]"
              />

              <Reveal delay={i * 70}>
                <article className="rounded-2xl border border-border/80 bg-card/55 p-5 transition-colors duration-300 hover:border-live/35 hover:bg-card/80 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-live/25 bg-live-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-live">
                      {e.tag}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {e.when}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold sm:text-xl">{e.title}</h3>
                  <p className="mt-1 text-sm text-foreground/80 sm:text-base">
                    {e.place}
                  </p>
                  {e.sub && (
                    <p className="mt-1 text-sm text-muted-foreground">{e.sub}</p>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-24 md:px-14 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-live/20 bg-card/60 shadow-[0_32px_90px_-54px_var(--live)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--live-soft),transparent_55%)]"
        />
        <Reveal className="relative px-6 py-12 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
          <div className="eyebrow mb-5">{portfolioCopy.contact.eyebrow}</div>

          <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl">
            {portfolioCopy.contact.titlePrefix}{" "}
            <span className="light-sweep">{portfolioCopy.contact.titleAccent}</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            {portfolioCopy.contact.introduction}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => play("click")}
              className="btn-live"
            >
              <GithubIcon /> {portfolioCopy.contact.github}
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => play("click")}
              className="btn-ghost"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>

          <a
            href="#home"
            onClick={() => play("click")}
            className="mt-12 inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-live"
          >
            <ArrowUp aria-hidden="true" className="h-4 w-4" /> {portfolioCopy.contact.backToTop}
          </a>

          <p className="mt-8 border-t border-border/70 pt-6 font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
            © {new Date().getFullYear()} AKASH R · {portfolioCopy.contact.footer.toUpperCase()}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
