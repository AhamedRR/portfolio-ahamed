import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

interface TermLine {
  prompt: "$" | ">" | "+";
  text: string;
}

const LINES: TermLine[] = [
  { prompt: "$", text: "whoami" },
  { prompt: ">", text: "rallydeen.roshan — soc analyst" },
  { prompt: "$", text: "uptime --career" },
  { prompt: ">", text: "3+ yrs cybersecurity · 2+ yrs 24/7 soc ops" },
  { prompt: "$", text: "clients --managed" },
  { prompt: ">", text: "10+ organizations · escalations handled" },
  { prompt: "$", text: "run threat_scan --deep" },
  { prompt: "+", text: "[ OK ] triage · detect · respond — all clear" },
];

const TYPE_SPEED = 30;
const LINE_PAUSE = 340;

/** Types the terminal lines character by character; instant when reduced motion is preferred. */
function useTypedLines() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLineIndex(LINES.length - 1);
      setCharIndex(LINES[LINES.length - 1].text.length);
      return;
    }

    if (lineIndex >= LINES.length) return;

    const current = LINES[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (charIndex < current.text.length) {
      // Prompt lines (commands) type slower than output lines
      const speed = current.prompt === "$" ? TYPE_SPEED + 14 : TYPE_SPEED;
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (lineIndex < LINES.length - 1) {
      timeout = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, LINE_PAUSE);
    }

    return () => clearTimeout(timeout);
  }, [lineIndex, charIndex]);

  return { lineIndex, charIndex };
}

const promptColor: Record<TermLine["prompt"], string> = {
  $: "text-cyan-300",
  ">": "text-slate-500",
  "+": "text-emerald-300",
};

const textColor: Record<TermLine["prompt"], string> = {
  $: "text-slate-100",
  ">": "text-slate-400",
  "+": "text-emerald-300",
};

export function TerminalCard() {
  const { lineIndex, charIndex } = useTypedLines();
  const done = lineIndex === LINES.length - 1 && charIndex >= LINES[LINES.length - 1].text.length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 shadow-[0_24px_80px_-24px_rgba(2,6,23,0.9)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-900/70 px-4 py-3">
        <span aria-hidden="true" className="size-3 rounded-full bg-rose-500/70" />
        <span aria-hidden="true" className="size-3 rounded-full bg-amber-400/70" />
        <span aria-hidden="true" className="size-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-slate-500">roshan@delta-soc : ~</span>
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-widest text-slate-600 sm:block">
          zsh · soc-session
        </span>
      </div>

      {/* Terminal body */}
      <div className="min-h-[19rem] space-y-2 px-5 py-5 font-mono text-[13px] leading-relaxed sm:min-h-[20rem]">
        {LINES.slice(0, lineIndex + 1).map((line, i) => {
          const isActive = i === lineIndex;
          const rendered = isActive ? line.text.slice(0, charIndex) : line.text;
          return (
            <p key={i} className="flex gap-2.5">
              <span aria-hidden="true" className={cn("shrink-0 select-none font-semibold", promptColor[line.prompt])}>
                {line.prompt}
              </span>
              <span className={textColor[line.prompt]}>
                {rendered}
                {isActive && !done && (
                  <span aria-hidden="true" className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-[3px] animate-blink bg-cyan-300" />
                )}
              </span>
            </p>
          );
        })}
        {done && (
          <p className="flex gap-2.5">
            <span aria-hidden="true" className="shrink-0 select-none font-semibold text-cyan-300">
              $
            </span>
            <span aria-hidden="true" className="inline-block h-[15px] w-[7px] translate-y-[3px] animate-blink bg-cyan-300" />
          </p>
        )}
      </div>

      {/* Scanline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-px animate-scan-y bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
      />
    </div>
  );
}
