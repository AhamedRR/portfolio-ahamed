import { BadgeCheck, Hourglass } from "lucide-react";
import { certifications } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 border-y border-slate-800/60 bg-slate-900/30 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="certifications"
          title="Certifications"
          description="Continuous learning across threat intelligence, MITRE ATT&CK, incident response, and offensive techniques."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => {
            const inProgress = cert.status === "In Progress";
            return (
              <Reveal key={cert.title} delay={index * 70} className={cn(inProgress && "sm:col-span-2 lg:col-span-1")}>
                <article
                  className={cn(
                    "flex h-full flex-col rounded-2xl border bg-slate-900/80 p-6 transition-all duration-300 hover:-translate-y-1",
                    inProgress
                      ? "border-amber-400/25 hover:border-amber-400/45"
                      : "border-slate-800 hover:border-cyan-400/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-xl border",
                        inProgress
                          ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
                          : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                      )}
                    >
                      <cert.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider",
                        inProgress
                          ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                          : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      )}
                    >
                      {inProgress ? (
                        <Hourglass className="size-3" aria-hidden="true" />
                      ) : (
                        <BadgeCheck className="size-3" aria-hidden="true" />
                      )}
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-base font-semibold leading-snug text-slate-100">{cert.title}</h3>
                  <p className="mt-2 font-mono text-xs text-slate-400">{cert.issuer}</p>

                  {inProgress && (
                    <div className="mt-auto pt-5">
                      <div
                        role="img"
                        aria-label="Certification in progress"
                        className="relative h-1 overflow-hidden rounded-full bg-slate-800"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 w-1/3 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
                        />
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-500">{cert.note}</p>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
