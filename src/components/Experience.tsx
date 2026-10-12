import { Briefcase, ChevronRight } from "lucide-react";
import { experience } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="career"
          title="Work Experience"
          description="Four roles across managed SOC operations — from Blue Team internship foundations to leading client-facing investigations."
        />

        <ol className="relative mx-auto mt-14 max-w-4xl space-y-8 border-l border-slate-800 pl-8 sm:space-y-10 sm:pl-12">
          {experience.map((job, index) => (
            <li key={`${job.role}-${job.period}`} className="relative">
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-8 -left-8 grid size-[17px] -translate-x-1/2 place-items-center rounded-full border-2 bg-slate-950 sm:-left-12",
                  job.current ? "border-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.55)]" : "border-slate-700"
                )}
              >
                <span className={cn("size-[5px] rounded-full", job.current ? "bg-cyan-300" : "bg-slate-600")} />
              </span>

              <Reveal delay={index * 60}>
                <article className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-900/80 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 hidden size-11 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 sm:grid">
                        <Briefcase className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-slate-100">
                          {job.role}
                          {job.current && (
                            <span className="ml-3 inline-flex translate-y-[-1px] items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 align-middle font-mono text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                              <span aria-hidden="true" className="size-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-cyan-300">
                          {job.company}
                          {job.note && (
                            <span className="ml-2 font-mono text-xs font-normal text-slate-500">· {job.note}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <p className="rounded-full border border-slate-800 bg-slate-950/70 px-3.5 py-1.5 font-mono text-[11px] whitespace-nowrap text-slate-400">
                      {job.period}
                    </p>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                        <ChevronRight className="mt-0.5 size-4 shrink-0 text-cyan-300/70" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Tools used as ${job.role}`}>
                    {job.stack.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-md border border-slate-800 bg-slate-950/70 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
