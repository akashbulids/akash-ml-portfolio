import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Github, Linkedin, Play, ExternalLink, Volume2, VolumeX, Car, Plane, MessageSquareText, Users } from "lucide-react";
import photo from "@/assets/akash.png.asset.json";
import poster from "@/assets/used-car-poster.jpg.asset.json";
import { profile, skills, projects, education, sections, type Project } from "@/content/portfolio";
import { play, isMuted, setMuted, onMuted } from "@/lib/sound";
import { PALETTES, onPalette, getPaletteIndex } from "@/lib/theme-engine";

/* ---------- reveal on scroll ---------- */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h2 className="text-4xl font-semibold md:text-6xl">{title}</h2>
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
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => { a(); b(); io.disconnect(); };
  }, []);
  return (
    <>
      <nav aria-label="Main" className="panel fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 md:top-6">
        <a href="#home" className="hidden px-3 font-display text-sm font-semibold tracking-widest sm:block">AR<span className="text-live">.</span></a>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => play("click")}
            aria-current={active === s.id ? "true" : undefined}
            className={`rounded-full px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors md:px-3 md:text-[11px] ${active === s.id ? "bg-live-soft text-live" : "text-muted-foreground hover:text-foreground"}`}
          >
            {s.label}
          </a>
        ))}
        <button aria-label={muted ? "Unmute interface sounds" : "Mute interface sounds"} aria-pressed={muted} onClick={() => { setMuted(!muted); if (muted) setTimeout(() => play("select"), 0); }} className="ml-1 rounded-full p-2 text-muted-foreground hover:text-live">
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </nav>
      {/* environment map */}
      <div aria-hidden className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 2xl:flex">
        {sections.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em]">
            <span className={`transition-opacity ${active === s.id ? "text-live opacity-100" : "opacity-0"}`}>W{i + 1} · {s.label.toUpperCase()}</span>
            <span className={`h-px transition-all ${active === s.id ? "w-8 bg-live" : "w-3 bg-muted-foreground/40"}`} />
          </div>
        ))}
        <div className="mt-4 font-mono text-[9px] tracking-[0.2em] text-muted-foreground">{PALETTES[pal]!.name.toUpperCase()}</div>
      </div>
    </>
  );
}

/* ---------- hero ---------- */
function RoleTicker() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600); return () => clearInterval(id); }, []);
  return (
    <div className="h-9 overflow-hidden [perspective:600px] md:h-11" aria-live="polite">
      <div key={i} className="flex items-center font-display text-2xl text-live md:text-3xl">
        {profile.roles[i]!.split(" ").map((w, k) => (
          <span key={k} className="word-in mr-[0.3em] inline-block" style={{ animationDelay: `${k * 110}ms` }}>{w}</span>
        ))}
        <span className="caret ml-1 inline-block h-7 w-[3px] bg-live" />
      </div>
    </div>
  );
}

export function Hero() {
  const go = (id: string) => { play("click"); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pb-16 pt-28 md:px-14">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="[perspective:800px]">
          <div className="eyebrow word-in mb-6">World 01 · The Digital City</div>
          <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl xl:text-8xl">
            {["Hi,", "I'm"].map((w, k) => (
              <span key={w} className="word-in mr-[0.25em] inline-block" style={{ animationDelay: `${200 + k * 120}ms` }}>{w}</span>
            ))}
            <span className="word-in light-sweep inline-block" style={{ animationDelay: "460ms" }}>Akash R.</span>
          </h1>
          <div className="mt-6"><RoleTicker /></div>
          <p className="word-in mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "700ms" }}>{profile.intro}</p>
          <div className="word-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: "850ms" }}>
            <button onClick={() => go("projects")} className="btn-live">Explore my work</button>
            <button onClick={() => go("education")} className="btn-ghost">Discover my journey</button>
          </div>
        </div>
        <Workstation />
      </div>
      <a href="#about" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-live">
        SCROLL <ArrowDown className="floaty h-4 w-4" />
      </a>
    </section>
  );
}

function Workstation() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (!ref.current || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  };
  return (
    <div className="relative [perspective:1200px]" onPointerMove={onMove} onPointerLeave={() => ref.current && (ref.current.style.transform = "")}>
      <div ref={ref} className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
        <div className="absolute -inset-6 rounded-2xl bg-live-soft blur-3xl" />
        <figure className="panel relative overflow-hidden p-2">
          <img src={photo.url} alt="Akash R working on a laptop at his desk" className="aspect-[4/3.6] w-full rounded-md object-cover object-top" fetchPriority="high" />
          <div className="pointer-events-none absolute inset-x-2 bottom-2 h-1/3 rounded-b-md" style={{ background: "var(--gradient-fade)" }} />
          <figcaption className="absolute bottom-5 left-6 font-mono text-[10px] tracking-[0.25em] text-silver">WORKSPACE · LIVE</figcaption>
        </figure>
        <div className="panel absolute -left-8 top-10 hidden w-52 p-3 font-mono text-[10px] leading-5 md:block" style={{ transform: "translateZ(60px)" }}>
          <div className="text-muted-foreground"># model.py</div>
          <div><span className="text-live">from</span> sklearn <span className="text-live">import</span> ensemble</div>
          <div>model.fit(X_train, y_train)</div>
          <div className="text-amber">→ ready to predict</div>
        </div>
        <div className="panel absolute -right-4 -top-6 hidden p-3 md:block" style={{ transform: "translateZ(90px)" }}>
          <svg width="90" height="44" viewBox="0 0 90 44" className="text-live" fill="none" stroke="currentColor">
            <polyline points="0,40 15,30 30,34 45,18 60,22 75,8 90,12" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ---------- about ---------- */
export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-14">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="World 02 · The Personal Data Chamber" title="About me" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex items-center justify-center">
            <div className="relative h-72 w-72 [perspective:800px] md:h-96 md:w-96" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="absolute inset-0 rounded-full border border-live/40" style={{ animation: `spin-slow ${14 + i * 6}s linear infinite`, transform: `rotateX(60deg) rotateY(${i * 45}deg)`, inset: `${i * 10}%` }} />
              ))}
              <div className="absolute inset-[38%] rounded-full bg-live/30 blur-xl" />
              <div className="absolute inset-[44%] rounded-full bg-live" />
            </div>
          </Reveal>
          <Reveal delay={150} className="panel p-8 md:p-10">
            {profile.about.map((p) => <p key={p} className="mb-5 leading-relaxed text-foreground/90 md:text-lg">{p}</p>)}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Info title="Career interests" items={profile.interests} />
              <Info title="Technical interests" items={profile.technical} />
              <Info title="Education" items={["BE, Computer Science & Engineering", "Diploma, Electronics & Communication"]} />
              <Info title="Training" items={["ML & Data Science — Boston Institute of Analytics, Bengaluru"]} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="eyebrow mb-2 !text-[10px] !text-amber">{title}</div>
      <ul className="space-y-1 text-sm text-muted-foreground">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

/* ---------- skills constellation ---------- */
export function Skills() {
  const [sel, setSel] = useState(skills[1]!.id);
  const W = 600, H = 420;
  const centers = skills.map((s, i) => {
    const a = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
    return { ...s, x: W / 2 + Math.cos(a) * 170, y: H / 2 + Math.sin(a) * 150 };
  });
  const active = centers.find((c) => c.id === sel) ?? centers[0]!;
  return (
    <section id="skills" className="relative px-6 py-32 md:px-14">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="World 03 · The Neural Constellation" title="Skills" />
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="group" aria-label="Skill constellation">
              {centers.map((a, i) => centers.slice(i + 1).map((b) => (
                <line key={a.id + b.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="stroke-live" strokeOpacity={a.id === sel || b.id === sel ? 0.5 : 0.08} style={{ transition: "stroke-opacity .5s" }} />
              )))}
              {active.items.map((it, k) => {
                const a = (k / active.items.length) * Math.PI * 2;
                const x = active.x + Math.cos(a) * 62, y = active.y + Math.sin(a) * 62;
                return (
                  <g key={sel + it}>
                    <line x1={active.x} y1={active.y} x2={x} y2={y} className="stroke-live" strokeDasharray="70" strokeDashoffset="70" style={{ animation: `dash .6s ${k * 60}ms forwards` }} />
                    <circle cx={x} cy={y} r="4" className="fill-amber" />
                  </g>
                );
              })}
              {centers.map((c) => (
                <g
                  key={c.id}
                  tabIndex={0}
                  role="button"
                  aria-pressed={c.id === sel}
                  aria-label={c.label}
                  onClick={() => { setSel(c.id); play("select"); }}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(c.id), play("select"))}
                  className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-foreground"
                  style={{ opacity: c.id === sel ? 1 : 0.55, transition: "opacity .4s" }}
                >
                  <circle cx={c.x} cy={c.y} r={c.id === sel ? 26 : 18} className="fill-background stroke-live" strokeWidth="2" style={{ transition: "r .4s" }} />
                  <circle cx={c.x} cy={c.y} r="6" className="fill-live" />
                  <text x={c.x} y={c.y + 46} textAnchor="middle" className="fill-foreground font-mono text-[12px] tracking-widest">{c.label.toUpperCase()}</text>
                </g>
              ))}
            </svg>
          </Reveal>
          <Reveal delay={150} className="panel p-8">
            <div className="eyebrow mb-3">Selected node</div>
            <h3 className="mb-6 text-3xl font-semibold">{active.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {active.items.map((i) => <li key={i} className="rounded-full border border-live/40 bg-live-soft px-3 py-1.5 text-sm">{i}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
              {skills.map((s) => <button key={s.id} onClick={() => { setSel(s.id); play("select"); }} className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${s.id === sel ? "bg-live text-primary-foreground" : "border border-border"}`}>{s.label}</button>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- projects ---------- */
const ICONS = { car: Car, plane: Plane, clusters: Users, speech: MessageSquareText };

function Installation({ p, onVideo }: { p: Project; onVideo: () => void }) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[p.shape];
  const flip = Number(p.index) % 2 === 0;
  return (
    <Reveal className={`relative grid items-center gap-8 md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div className="relative flex aspect-[4/3] items-center justify-center [perspective:900px]">
        <div className="absolute bottom-6 h-10 w-3/4 rounded-[50%] bg-live/20 blur-2xl" />
        {p.hasVideo ? (
          <button onClick={() => { play("open"); onVideo(); }} className="group panel relative w-full overflow-hidden p-2" aria-label="Play Used Car Price Estimation demo video">
            <img src={poster.url} alt="Used Car Price Estimation app screenshot" loading="lazy" className="aspect-video w-full rounded object-cover opacity-80 transition group-hover:opacity-100" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-live text-primary-foreground shadow-[0_0_50px_-5px_var(--live)] transition group-hover:scale-110"><Play className="ml-1 h-6 w-6" /></span>
            </span>
            <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.25em] text-silver">CINEMA · DEMO</span>
          </button>
        ) : p.shape === "clusters" ? (
          <ClusterViz />
        ) : (
          <div className="floaty relative h-48 w-48 [transform-style:preserve-3d]">
            {[0, 60, 120].map((r) => <div key={r} className="absolute inset-0 rounded-full border border-live/50" style={{ transform: `rotateY(${r}deg) rotateX(70deg)` }} />)}
            <div className="absolute inset-0 flex items-center justify-center"><Icon className="h-16 w-16 text-live" strokeWidth={1.2} /></div>
          </div>
        )}
      </div>
      <div>
        <div className="mb-3 flex items-center gap-4 font-mono text-xs tracking-[0.25em] text-muted-foreground">
          <span className="text-4xl font-light text-live">{p.index}</span> {p.kind.toUpperCase()}
        </div>
        <h3 className="mb-4 text-3xl font-semibold md:text-4xl">{p.title}</h3>
        <p className="mb-6 max-w-lg leading-relaxed text-muted-foreground">{p.summary}</p>
        <div className="flex flex-wrap gap-3">
          <a href={p.github} target="_blank" rel="noreferrer" onClick={() => play("click")} className="btn-live"><Github className="h-4 w-4" /> GitHub</a>
          <button onClick={() => { setOpen(!open); play(open ? "close" : "select"); }} aria-expanded={open} className="btn-ghost">{open ? "Hide details" : "Details"}</button>
          {p.backend && <a href={p.backend} target="_blank" rel="noreferrer" className="btn-ghost"><ExternalLink className="h-4 w-4" /> Backend</a>}
        </div>
        <div className={`grid transition-all duration-500 ${open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <ul className="panel space-y-2 overflow-hidden p-0 text-sm text-foreground/85 [&>li]:px-5 first:[&>li]:pt-5 last:[&>li]:pb-5">
            {p.details.map((d) => <li key={d}><span className="mr-2 text-amber">◆</span>{d}</li>)}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function ClusterViz() {
  const [hover, setHover] = useState<number | null>(null);
  const clusters = [
    { cx: 90, cy: 90, n: 18 }, { cx: 220, cy: 70, n: 14 }, { cx: 160, cy: 190, n: 20 }, { cx: 290, cy: 180, n: 12 },
  ];
  const r = (s: number) => { const x = Math.sin(s * 999) * 1e4; return x - Math.floor(x); };
  return (
    <svg viewBox="0 0 360 260" className="panel w-full p-4" role="img" aria-label="Illustrative K-means customer segments">
      {clusters.map((c, ci) => (
        <g key={ci} onMouseEnter={() => setHover(ci)} onMouseLeave={() => setHover(null)} onClick={() => setHover(ci)} style={{ opacity: hover === null || hover === ci ? 1 : 0.25, transition: "opacity .3s" }}>
          {Array.from({ length: c.n }).map((_, k) => (
            <circle key={k} cx={Math.round(c.cx + (r(ci * 50 + k) - 0.5) * 70)} cy={Math.round(c.cy + (r(ci * 50 + k + 0.5) - 0.5) * 60)} r="3.5" className={ci % 2 ? "fill-amber" : "fill-live"} />
          ))}
          <circle cx={c.cx} cy={c.cy} r="9" className="fill-none stroke-foreground" strokeWidth="1.5" />
          <text x={c.cx} y={c.cy - 40} textAnchor="middle" className="fill-muted-foreground font-mono text-[9px]">SEGMENT {ci + 1}</text>
        </g>
      ))}
      <text x="12" y="250" className="fill-muted-foreground font-mono text-[8px]">ILLUSTRATIVE · NOT REAL DATA</text>
    </svg>
  );
}

export function Projects({ onVideo }: { onVideo: () => void }) {
  return (
    <section id="projects" className="relative px-6 py-32 md:px-14">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="World 04 · The Project Exhibition" title="Selected projects" />
        <div className="relative space-y-28">
          <div aria-hidden className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-gradient-to-b from-transparent via-live/40 to-transparent md:block" />
          {projects.map((p) => <Installation key={p.id} p={p} onVideo={onVideo} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- education ---------- */
export function Education() {
  return (
    <section id="education" className="relative px-6 py-32 md:px-14">
      <div className="mx-auto max-w-5xl">
        <Heading eyebrow="World 05 · The Digital Journey" title="Education" />
        <ol className="relative">
          <svg aria-hidden className="absolute left-4 top-0 h-full w-16 md:left-1/2 md:-translate-x-1/2" viewBox="0 0 60 600" preserveAspectRatio="none">
            <path d="M30 0 C 60 150, 0 300, 30 450 S 30 600, 30 600" className="fill-none stroke-live" strokeOpacity=".5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          {education.map((e, i) => (
            <li key={e.title} className={`relative mb-16 pl-16 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
              <span className={`absolute left-[26px] top-6 h-4 w-4 rounded-full bg-live shadow-[0_0_24px_var(--live)] ${i % 2 ? "md:-left-2" : "md:-right-2 md:left-auto"}`} />
              <Reveal delay={i * 100} className="panel p-6">
                <div className="eyebrow mb-2 !text-amber">{e.tag} · {e.when}</div>
                <h3 className="text-xl font-semibold">{e.title}</h3>
                <p className="mt-1 text-muted-foreground">{e.place}</p>
                {e.sub && <p className="text-sm text-muted-foreground">{e.sub}</p>}
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
    <section id="contact" className="relative flex min-h-screen items-center px-6 py-32 md:px-14">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="eyebrow mb-6">World 06 · The Connection Portal</div>
          <h2 className="text-4xl font-semibold md:text-7xl">Let's build something <span className="light-sweep">intelligent.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">I'm looking for Machine Learning, AI/ML, NLP and Data Science internship opportunities. Thanks for exploring — let's connect.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" onClick={() => play("click")} className="btn-live"><Github className="h-4 w-4" /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={() => play("click")} className="btn-ghost"><Linkedin className="h-4 w-4" /> LinkedIn</a>
          </div>
          <button onClick={() => { play("click"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-20 inline-flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-live">
            <ArrowUp className="h-4 w-4" /> BACK TO TOP
          </button>
          <p className="mt-10 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">© {new Date().getFullYear()} AKASH R — THE AI UNIVERSE</p>
        </Reveal>
      </div>
    </section>
  );
}
