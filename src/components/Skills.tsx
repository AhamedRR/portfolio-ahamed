import { useRef, useState, type KeyboardEvent } from "react";
import { Cpu, HeartHandshake } from "lucide-react";
import { softSkills, technicalSkillCategories } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

type TabKey = "technical" | "soft";

const tabs: { key: TabKey; label: string; icon: typeof Cpu }[] = [
  { key: "technical", label: "Technical Skills", icon: Cpu },
  { key: "soft", label: "Soft Skills", icon: HeartHandshake },
];

export function Skills() {
  const [activeTab, setActiveTab] = useState<TabKey>("technical");
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({ technical: null, soft: null });

  /** Roving-tabindex keyboard navigation: arrows move between the two tabs */
  const onTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const order: TabKey[] = ["technical", "soft"];
    const currentIndex = order.indexOf(activeTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % order.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + order.length) % order.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = order.length - 1;

    const next = order[nextIndex];
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="skills" className="scroll-mt-24 border-y border-slate-800/60 bg-slate-900/30 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="skills"
          title="Skills & Capabilities"
          description="The tools I operate daily in the SOC — and the human skills that make them effective."
        />

        {/* Tabs */}
        <Reveal delay={100} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Skill categories"
            onKeyDown={onTabListKeyDown}
            className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-slate-800 bg-slate-950/80 p-1.5"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  ref={(el) => {
                    tabRefs.current[tab.key] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-medium transition-all duration-200 sm:px-6 sm:text-sm",
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)]"
                      : "text-slate-400 hover:text-slate-100"
                  )}
                >
                  <tab.icon className="size-4" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panels */}
        <div className="mt-12">
          {activeTab === "technical" ? (
            <div
              key="panel-technical"
              role="tabpanel"
              id="panel-technical"
              aria-labelledby="tab-technical"
              className="grid animate-fade-in-up gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {technicalSkillCategories.map((category) => (
                <article
                  key={category.title}
                  className="group rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors group-hover:border-cyan-400/40">
                      <category.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-slate-100">{category.title}</h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={category.title}>
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-slate-800 bg-slate-950/70 px-2.5 py-1 font-mono text-[11.5px] text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <div
              key="panel-soft"
              role="tabpanel"
              id="panel-soft"
              aria-labelledby="tab-soft"
              className="grid animate-fade-in-up gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {softSkills.map((skill) => (
                <article
                  key={skill.title}
                  className="group flex gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/35"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-colors group-hover:border-emerald-400/40">
                    <skill.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-100">{skill.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{skill.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
