import { MessageSquareText, Radar, ShieldCheck, Siren, Users } from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const focusAreas = [
  { icon: Radar, label: "Managed SOC Operations" },
  { icon: ShieldCheck, label: "Threat Detection & Alert Investigation" },
  { icon: Siren, label: "Incident Response & Escalation" },
  { icon: Users, label: "Shift Coordination & Mentoring" },
  { icon: MessageSquareText, label: "Client Communication & Reporting" },
];

const profileFields = [
  { key: "name", value: "Rallydeen Roshan Ahamed" },
  { key: "role", value: "SOC Analyst" },
  { key: "company", value: "Delta Spike (Private) Limited" },
  { key: "location", value: profile.location },
  { key: "email", value: profile.email },
  { key: "open_to", value: "SOC / Cybersecurity roles" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Narrative */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="about"
              title="About Me"
            />

            <Reveal delay={100}>
              <p className="mt-6 leading-relaxed text-slate-400">
                I&apos;m a cybersecurity professional specializing in{" "}
                <span className="text-slate-200">Security Operations Center (SOC) activities</span> — threat detection,
                alert investigation, incident response, endpoint security, and client communication. My day-to-day work
                sits at the front line of defense: monitoring environments, triaging alerts, and turning raw signals
                into clear, actionable answers.
              </p>
              <p className="mt-4 leading-relaxed text-slate-400">
                In managed SOC operations, I support{" "}
                <span className="text-slate-200">multiple clients simultaneously</span> — investigating security events,
                escalating complex incidents, assisting junior analysts, coordinating shifts, and preparing structured
                incident reports that clients can act on. I&apos;m at my best in a live operations environment where
                accuracy, speed, and calm judgment matter most.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Core focus areas">
                {focusAreas.map((area) => (
                  <li
                    key={area.label}
                    className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-300 transition-colors hover:border-cyan-400/30"
                  >
                    <area.icon className="size-4 shrink-0 text-cyan-300" aria-hidden="true" />
                    {area.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Analyst profile panel */}
          <Reveal delay={140} className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-3.5">
                <span className="font-mono text-xs text-slate-400">analyst_profile.json</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
                  active
                </span>
              </div>
              <dl className="space-y-3.5 px-5 py-6 font-mono text-[13px]">
                {profileFields.map((field) => (
                  <div key={field.key} className="flex flex-wrap gap-x-3 gap-y-1">
                    <dt className="w-24 shrink-0 text-cyan-300/80">&quot;{field.key}&quot;:</dt>
                    <dd className="min-w-0 flex-1 break-words text-slate-300">
                      &quot;{field.value}&quot;
                    </dd>
                  </div>
                ))}
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <dt className="w-24 shrink-0 text-cyan-300/80">&quot;focus&quot;:</dt>
                  <dd className="min-w-0 flex-1 text-slate-300">
                    [ <span className="text-emerald-300">&quot;detection&quot;</span>,{" "}
                    <span className="text-emerald-300">&quot;response&quot;</span>,{" "}
                    <span className="text-emerald-300">&quot;reporting&quot;</span> ]
                  </dd>
                </div>
              </dl>
              <div className="border-t border-slate-800/80 bg-slate-950/60 px-5 py-3.5">
                <p className="font-mono text-[11px] text-slate-500">
                  <span className="text-cyan-300">$</span> mission: keep every client environment one step ahead of the threat.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
