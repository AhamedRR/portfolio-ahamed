import { education } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="education"
          title="Education"
          description="Academic foundation in information technology with a dedicated cyber security specialization."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 100}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -top-12 -right-12 size-32 rounded-full bg-cyan-400/5 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="grid size-12 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <item.icon className="size-6" aria-hidden="true" />
                </span>

                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-slate-100">{item.degree}</h3>
                <p className="mt-2 text-sm font-medium text-cyan-300">{item.institution}</p>
                {item.detail && <p className="mt-2 text-sm text-slate-400">{item.detail}</p>}

                {item.period ? (
                  <p className="mt-5 inline-flex rounded-full border border-slate-800 bg-slate-950/70 px-3.5 py-1.5 font-mono text-[11px] text-slate-400">
                    {item.period}
                  </p>
                ) : (
                  <p className="mt-5 inline-flex rounded-full border border-slate-800/60 bg-slate-950/40 px-3.5 py-1.5 font-mono text-[11px] text-slate-500">
                    Completed
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
