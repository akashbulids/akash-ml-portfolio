
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
  Server,
  Database,
  Menu,
  X,
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
import { play, isMuted, setMuted, onMuted, getVolume, setVolume } from "@/lib/sound";
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
  const [muted, setM] = useState(true);
  const [volume, setVolumeValue] = useState(0.35);
  const [pal, setPal] = useState(getPaletteIndex());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setM(isMuted());
    setVolumeValue(getVolume());

    const a = onMuted(setM);
    const b = onPalette(setPal);

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setScrollProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    const io = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
          (es) =>
            es.forEach(
              (e) => e.isIntersecting && setActive(e.target.id),
            ),
          { rootMargin: "-45% 0px -50% 0px" },
        );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io?.observe(el);
    });

    return () => {
      a();
      b();
      io?.disconnect();
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <>
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      >
        <span className="block h-full bg-live shadow-[0_0_12px_var(--live)] transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>
      <nav
        aria-label="Main navigation"
        className={`panel fixed left-1/2 top-4 z-50 flex w-[min(52rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center justify-between gap-2 rounded-2xl px-2 py-2 transition-colors md:top-6 md:rounded-full md:px-3 ${
          scrolled ? "border-live/20 bg-background/95" : "bg-background/70"
        }`}
      >
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="shrink-0 px-2 font-display text-xs font-semibold tracking-[0.14em] sm:text-sm"
        >
          AR<span className="mx-1 text-live">/</span><span className="hidden sm:inline">AKASH R</span>
        </a>

        <div
          id="primary-navigation"
          className={`${mobileOpen ? "grid" : "hidden"} absolute left-0 right-0 top-[calc(100%+0.6rem)] grid-cols-2 gap-1 rounded-2xl border border-border/80 bg-card p-2 shadow-[var(--shadow-panel)] sm:static sm:flex sm:flex-1 sm:items-center sm:justify-center sm:gap-0.5 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none md:gap-1`}
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => {
                play("click");
                setMobileOpen(false);
              }}
              aria-current={active === s.id ? "location" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-xl px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors sm:min-h-9 sm:rounded-full sm:px-2 sm:py-1.5 md:px-3 md:text-[11px] ${
                active === s.id
                  ? "bg-live-soft text-live"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <button
          ref={menuButton}
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-live-soft hover:text-live sm:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
        </button>

        <button
          type="button"
          aria-label={
            muted ? "Turn interface sounds on" : "Turn interface sounds off"
          }
          aria-pressed={muted}
          onClick={() => {
            setMuted(!muted);
            if (muted) setTimeout(() => play("select"), 0);
          }}
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-full px-2 text-muted-foreground transition-colors hover:text-live sm:px-2.5"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
          <span className="font-mono text-[8px] tracking-[0.08em] sm:text-[9px]">
            SOUND: {muted ? "OFF" : "ON"}
          </span>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          aria-label="Interface sound volume"
          aria-valuetext={`${Math.round(volume * 100)} percent`}
          onChange={(event) => {
            const value = Number(event.currentTarget.value);
            setVolumeValue(value);
            setVolume(value);
          }}
          className="sound-volume h-1 w-12 shrink-0 cursor-pointer accent-live sm:w-16"
        />
      </nav>

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

function RoleTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % profile.roles.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="role-ticker mt-5 flex min-h-8 items-center gap-3">
      <span aria-hidden="true" className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
        {portfolioCopy.hero.roleLabel}
      </span>
      <span key={index} aria-hidden="true" className="role-ticker__label font-mono text-xs font-medium uppercase tracking-[0.1em] text-live sm:text-sm">
        {profile.roles[index]}
      </span>
      <span className="sr-only">Areas of interest: {profile.roles.join(", ")}.</span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative flex min-h-screen items-center overflow-x-clip px-6 pb-16 pt-28 md:px-14"
    >
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-atmosphere__field" />
        <div className="hero-atmosphere__signal" />
        <svg className="hero-atmosphere__network" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M760 30 900 170l-74 180 238 46 156-142 140 204" />
          <path d="m830 350 138 221 234 41 116 198" />
          <path d="m1064 396 72 215-234-40-76 220" />
          <circle cx="900" cy="170" r="4" />
          <circle cx="826" cy="350" r="3" />
          <circle cx="1064" cy="396" r="4" />
          <circle cx="1220" cy="254" r="3" />
          <circle cx="1202" cy="612" r="4" />
          <circle cx="1432" cy="458" r="3" />
          <circle cx="1438" cy="810" r="4" />
        </svg>
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-5">
        <div>
          <div className="eyebrow word-in mb-7">
            {portfolioCopy.hero.eyebrow}
          </div>

          <h1 aria-label={portfolioCopy.hero.accessibleTitle} className="hero-title font-semibold uppercase">
            {portfolioCopy.hero.titleLines.map((line, index) => (
              <span
                key={line}
                className={`word-in block ${index === 1 ? "text-live" : index > 1 ? "hero-title__accent" : ""}`}
                style={{ animationDelay: `${100 + index * 120}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <h2 className="mt-7 max-w-xl text-lg font-medium leading-snug text-foreground/90 md:text-2xl">
            {profile.headline}
          </h2>

          <RoleTicker />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {profile.location}
          </p>

          <p
            className="word-in mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "500ms" }}
          >
            {profile.intro}
          </p>

          <p className="mt-5 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.13em] text-foreground/75 sm:text-xs">
            {portfolioCopy.hero.statement}
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
        <path d="M74 38h68M74 38v68m284-68h68v68M74 394v68h68m284 0h68v-68" />
        <path d="M42 250h34m348 0h34M250 18v24m0 416v24" />
        <path d="M74 132h24M402 368h24" strokeDasharray="2 7" />
        <circle className="profile-stage__node" cx="142" cy="38" r="3" />
        <circle className="profile-stage__node profile-stage__node--warm" cx="426" cy="394" r="3" />
      </svg>

      <figure className="profile-stage__frame panel relative mx-auto w-[78%] overflow-hidden rounded-sm p-2">
          <img
            src={photo}
            alt="Akash R working on a laptop at his desk"
            className="aspect-[4/5] w-full rounded-[2px] object-cover object-top"
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

      <div aria-hidden="true" className="profile-stage__code absolute bottom-[7%] left-0 hidden w-52 border-l border-live/50 pl-3 font-mono text-[10px] leading-5 md:block">
          {portfolioCopy.hero.visualCode.map((line, index) => (
            <div key={line} className={index === 0 ? "text-muted-foreground" : index === 3 ? "text-amber" : ""}>
              {line}
            </div>
          ))}
      </div>

      <div aria-hidden="true" className="profile-stage__chart absolute right-0 top-[13%] hidden border-l border-live/50 pl-3 pr-1 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground md:block">
          <span className="text-live">{portfolioCopy.hero.signalLabel}</span>
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
      className="section-editorial relative px-6 py-28 md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <Heading
          eyebrow={portfolioCopy.about.eyebrow}
          title={portfolioCopy.about.title}
        />

        <div className="grid items-center gap-10 md:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal className="about-portrait">
            <figure className="about-portrait__frame relative mx-auto max-w-sm overflow-hidden border border-live/45 p-2">
              <img
                src={photo}
                alt="Akash R, aspiring Machine Learning Engineer"
                loading="lazy"
                decoding="async"
                className="about-portrait__image aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="absolute inset-x-2 bottom-2 flex items-end justify-between bg-gradient-to-t from-[#08080B]/95 via-[#08080B]/50 to-transparent px-4 pb-4 pt-16 font-mono text-[9px] uppercase tracking-[0.13em] text-[#E7DDE0]">
                <span>{profile.name}</span>
                <span className="text-live">{profile.location}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="about-content">
          <Reveal className="about-story">
            {profile.about.map((p) => (
              <p
                key={p}
                className="mb-6 max-w-3xl font-display text-xl leading-relaxed text-foreground/90 md:text-2xl"
              >
                {p}
              </p>
            ))}
            <div className="about-compute mt-10" aria-hidden="true">
              <svg viewBox="0 0 620 112" fill="none">
                <path d="M8 56h112l52-35h112l55 35h112l52-35h109" />
                <path d="M8 56h112l52 35h112l55-35h112l52 35h109" />
                <path d="M172 21v70m112-70v70m55-35v35m112-35V21m52 70V21" />
                {[[8, 56], [120, 56], [172, 21], [172, 91], [284, 21], [284, 91], [339, 56], [451, 56], [503, 21], [503, 91], [612, 56]].map(([cx, cy], index) => (
                  <circle key={index} cx={cx} cy={cy} r={index === 0 || index === 10 ? 3 : 2} />
                ))}
              </svg>
            </div>
          </Reveal>

          <ol className="about-principles divide-y divide-border/70">
            {portfolioCopy.about.principles.map((principle, index) => (
              <li key={principle.number} className="about-principle py-5 first:pt-0 last:pb-0">
                <Reveal delay={index * 90} className="grid grid-cols-[3.5rem_1fr] gap-4">
                  <span className="font-mono text-sm text-live">{principle.number}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{principle.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{principle.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- skills ---------- */

export function Skills() {
  return (
    <section
      id="skills"
      className="skills-environment relative overflow-hidden px-6 py-24 md:px-14 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Heading
          eyebrow={portfolioCopy.skills.eyebrow}
          title={portfolioCopy.skills.title}
        />

        <p className="mb-8 max-w-2xl text-muted-foreground md:text-lg">
          {portfolioCopy.skills.introduction}
        </p>

        <div className="skills-grid">
          {skills.map((category, categoryIndex) => {
            const Icon = SKILL_ICONS[category.id];
            return (
              <Reveal key={category.id} delay={categoryIndex * 65}>
                <article className={`skill-card skill-card--${category.id}`}>
                  <div className="skill-card__heading">
                    <span className="skill-card__icon">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3>{category.label}</h3>
                  </div>
                  <ul className="skill-card__skills" aria-label={`${category.label} skills`}>
                    {category.items.map((item, itemIndex) => (
                      <li key={item} style={{ animationDelay: `${itemIndex * 45}ms` }}>
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
  programming: CodeXml,
  libraries: ChartNoAxesColumnIncreasing,
  ml: BrainCircuit,
  nlp: MessageSquareText,
  deployment: Server,
  databases: Database,
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
        className={`project-case project-case--${p.id} group grid items-center gap-6 md:grid-cols-2 md:gap-12 xl:gap-20 ${
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
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E7DDE0]/25 bg-live text-primary-foreground shadow-[0_0_40px_-8px_var(--live)] transition-transform duration-300 group-hover:scale-110">
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
          {!p.hasVideo && p.shape !== "clusters" && (
            <span className="absolute bottom-6 right-7 rounded-sm border border-border/70 bg-background/80 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
              {portfolioCopy.projects.illustrativeData}
            </span>
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

          <div className="mb-6">
            <p className="project-tech-label mb-2">{portfolioCopy.projects.technologies}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {p.technologies.map((technology) => (
                <li key={technology} className="project-tech-tag">{technology}</li>
              ))}
            </ul>
          </div>

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
              className={`cluster-viz__dot cluster-viz__dot--${ci}`}
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
      className="section-editorial relative px-6 py-24 md:px-14 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Heading
          eyebrow={portfolioCopy.projects.eyebrow}
          title={portfolioCopy.projects.title}
        />

        <div className="mb-14 flex flex-col gap-5 border-y border-border/70 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {portfolioCopy.projects.introduction}
          </p>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost w-fit"
          >
            <GithubIcon /> {portfolioCopy.projects.githubProfile}
          </a>
        </div>

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

/* ---------- machine-learning workflow ---------- */

export function Pipeline() {
  const [selected, setSelected] = useState(0);
  const stage = portfolioCopy.pipeline.stages[selected]!;

  return (
    <section
      id="pipeline"
      aria-labelledby="pipeline-title"
      className="pipeline-environment relative overflow-hidden px-6 py-20 md:px-14 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10">
          <div className="eyebrow mb-4">{portfolioCopy.pipeline.eyebrow}</div>
          <h2 id="pipeline-title" className="text-4xl font-semibold leading-tight md:text-6xl">
            {portfolioCopy.pipeline.title}
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            {portfolioCopy.pipeline.introduction}
          </p>
        </Reveal>

        <div className="pipeline-viz-wrap mb-8">
          <svg
            role="img"
            aria-label={portfolioCopy.pipeline.visualizationLabel}
            viewBox="0 0 1000 280"
            className="pipeline-viz"
            data-stage={stage.id}
          >
            <path className="pipeline-viz__axis" d="M56 140h888" />
            <g className="pipeline-viz__layer pipeline-viz__layer--raw">
              {portfolioCopy.pipeline.visuals.raw.map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="5" />
              ))}
            </g>
            <g className="pipeline-viz__layer pipeline-viz__layer--cleaned">
              {portfolioCopy.pipeline.visuals.cleaned.map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="5" />
              ))}
            </g>
            <g className="pipeline-viz__layer pipeline-viz__layer--features">
              {portfolioCopy.pipeline.visuals.features.map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="5" />
              ))}
            </g>
            <g className="pipeline-viz__connections">
              <path d="m218 112 48-8m54 60 50-18m240-41 48 20m-280 1 117 1m-117 0 42 22" />
            </g>
            <g className="pipeline-viz__layer pipeline-viz__layer--deployment">
              {portfolioCopy.pipeline.visuals.deployment.map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="5" />
              ))}
            </g>
            <rect className="pipeline-viz__result" x="395" y="54" width="210" height="170" rx="2" />
            <text className="pipeline-viz__result-label" x="500" y="126" textAnchor="middle">MODEL OUTPUT</text>
            <text className="pipeline-viz__result-value" x="500" y="157" textAnchor="middle">Deployment</text>
          </svg>
          <p className="pipeline-viz__caption">{portfolioCopy.pipeline.visualizationLabel}</p>
        </div>

        <ol className="pipeline-steps relative grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-2">
          <li aria-hidden="true" className="pipeline-steps__track hidden lg:block" />
          {portfolioCopy.pipeline.stages.map((item, index) => (
            <li key={item.id} className="relative">
              <button
                type="button"
                aria-pressed={selected === index}
                aria-describedby="pipeline-stage-description"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setSelected(index);
                }}
                onFocus={() => setSelected(index)}
                onClick={() => {
                  setSelected(index);
                  play("select");
                }}
                className={`pipeline-step group flex min-h-24 w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 lg:min-h-0 lg:flex-col lg:items-start lg:gap-5 lg:border-0 lg:bg-transparent lg:p-2 lg:hover:translate-y-0 lg:focus-visible:translate-y-0 ${
                  selected === index
                    ? "border-live/40 bg-live-soft/60 shadow-[0_16px_40px_-28px_var(--live)] lg:shadow-none"
                    : "border-border/70 bg-card/40 hover:border-live/30 lg:border-transparent lg:bg-transparent"
                }`}
              >
                <span className={`pipeline-step__node relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border font-mono text-xs transition-colors ${
                  selected === index
                    ? "border-live bg-background text-live shadow-[0_0_28px_-10px_var(--live)]"
                    : "border-border bg-card text-muted-foreground group-hover:border-live/50 group-hover:text-live"
                }`}>
                  0{index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold leading-snug lg:text-sm">
                    {item.title}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
                    Stage 0{index + 1}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div id="pipeline-stage-description" className="pipeline-detail mt-5 rounded-2xl border border-border/70 bg-card/45 p-5 md:p-6">
          <div className="eyebrow mb-2 !text-[10px]">{stage.title}</div>
          <p className="max-w-3xl leading-relaxed text-foreground/85">{stage.description}</p>
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
      className="section-editorial relative px-6 py-24 md:px-14 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Heading
          eyebrow={portfolioCopy.education.eyebrow}
          title={portfolioCopy.education.title}
        />

        <ol className="journey-timeline">
          {education.map((e, i) => (
            <li key={e.title} className="journey-timeline__entry">
              <span aria-hidden="true" className="journey-timeline__node" />
              <Reveal delay={i * 70}>
                <article className="journey-entry">
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
      className="contact-section relative px-6 py-24 md:px-14 md:py-32"
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
