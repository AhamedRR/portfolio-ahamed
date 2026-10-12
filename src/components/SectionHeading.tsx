import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Small mono kicker rendered above the title, e.g. "about" -> // about */
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">
        {"//"} {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 leading-relaxed text-slate-400">{description}</p>}
      <div
        aria-hidden="true"
        className={cn(
          "mt-6 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent",
          align === "center" && "mx-auto"
        )}
      />
    </Reveal>
  );
}
