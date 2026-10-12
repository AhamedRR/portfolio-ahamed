import { ArrowRight, ChevronDown, FileDown, Mail, ShieldCheck } from "lucide-react";
import { heroStackMarquee, heroStats, profile } from "../data/portfolio";
import { downloadCv } from "../utils/downloadCv";
import { TerminalCard } from "./TerminalCard";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Backdrop: blueprint grid + restrained glows */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <div aria-hidden="true" className="absolute -top-40 left-1/4 size-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/3 -right-32 size-[26rem] rounded-full bg-emerald-500/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* Copy */}
          <div>
            <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 font-mono text-[11px] font-medium tracking-wide text-emerald-300 sm:text-xs">
              <span aria-hidden="true" className="size-2 shrink-0 animate-pulse-dot rounded-full bg-emerald-400" />
              <span className="truncate">Open to SOC &amp; security roles — {profile.locationShort}</span>
            </p>

            <h1 className="mt-7 font-display text-[2.65rem] leading-[1.06] font-bold tracking-tight text-slate-100 sm:text-6xl lg:text-[4.35rem]">
              Rallydeen
              <br />
              <span className="text-cyan-300">Roshan Ahamed</span>
              <span aria-hidden="true" className="ml-2 animate-blink text-cyan-400/80">_</span>
            </h1>

            <p className="mt-5 font-mono text-sm text-cyan-300/90 sm:text-base">
              <span aria-hidden="true" className="text-slate-600">[ </span>
              SOC Analyst <span aria-hidden="true" className="text-slate-600">|</span> Cybersecurity Professional
              <span aria-hidden="true" className="text-slate-600"> ]</span>
            </p>

            <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
              Cybersecurity professional with <strong className="font-semibold text-slate-200">3+ years of hands-on experience</strong>,
              including <strong className="font-semibold text-slate-200">2+ years in live 24/7 SOC operations</strong>. I work in managed
              SOC environments investigating security incidents, detecting and responding to threats, and handling client escalations
              across 10+ organizations.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#experience"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-cyan-300 hover:glow-cyan"
              >
                View My Experience
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={downloadCv}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-6 text-sm font-semibold text-slate-100 transition-all duration-200 hover:border-cyan-400/60 hover:text-cyan-300"
              >
                <FileDown className="size-4" aria-hidden="true" />
                Download CV
              </button>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-transparent px-6 text-sm font-semibold text-slate-400 transition-colors duration-200 hover:border-slate-700 hover:text-cyan-300"
              >
                <Mail className="size-4" aria-hidden="true" />
                Contact Me
              </a>
            </div>

            {/* Stats */}
            <ul className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-slate-800 border-y border-slate-800/80" aria-label="Career statistics">
              {heroStats.map((stat) => (
                <li key={stat.label} className="px-4 py-5 first:pl-0">
                  <p className="font-display text-3xl font-bold text-slate-100">
                    {stat.value.replace("+", "")}
                    <span className="text-cyan-300">+</span>
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase leading-4 tracking-wider text-slate-500 sm:text-[11px]">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual: radar orbit + typed terminal */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Radar rings */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-10 -right-4 size-56 rounded-full border border-cyan-400/15 sm:-right-10 sm:size-72">
              <div className="absolute inset-4 rounded-full border border-cyan-400/10" />
              <div className="absolute inset-10 rounded-full border border-cyan-400/10" />
              <div className="absolute inset-0 animate-radar-sweep rounded-full [background:conic-gradient(from_0deg,rgba(34,211,238,0.28),transparent_22%)]" />
              <div className="absolute inset-0 grid place-items-center">
                <ShieldCheck className="size-5 text-cyan-300/60" />
              </div>
            </div>

            <TerminalCard />

            {/* Floating tool chips */}
            <span aria-hidden="true" className="absolute -left-3 top-16 hidden animate-float-y rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 font-mono text-[11px] text-cyan-300 shadow-lg sm:block">
              KQL · XQL
            </span>
            <span aria-hidden="true" className="absolute -right-2 bottom-20 hidden animate-float-y-delayed rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 font-mono text-[11px] text-emerald-300 shadow-lg sm:block">
              EDR · SIEM · SOAR
            </span>
          </div>
        </div>

        {/* Stack marquee */}
        <div className="relative mt-16 overflow-hidden border-y border-slate-800/70 py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] sm:mt-20">
          <div className="flex w-max animate-marquee gap-10">
            {[...heroStackMarquee, ...heroStackMarquee].map((tool, i) => (
              <span key={`${tool}-${i}`} aria-hidden={i >= heroStackMarquee.length} className="flex items-center gap-10 whitespace-nowrap font-mono text-xs tracking-wide text-slate-500">
                {tool}
                <span className="text-cyan-400/50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-slate-500 transition-colors hover:text-cyan-300 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
