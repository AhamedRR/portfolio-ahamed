import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { navLinks, profile } from "../data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/70 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3" aria-label="Back to top">
              <span className="grid size-9 place-items-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 font-display text-sm font-bold text-cyan-300">
                RR
              </span>
              <span>
                <span className="block font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">
                  {profile.displayName}
                </span>
                <span className="block font-mono text-[11px] text-cyan-300/90">SOC Analyst | Cybersecurity</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">
              Defending client environments through 24/7 monitoring, sharp investigations, and calm, structured incident
              response.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.name}`}
                className="grid size-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
              >
                <Mail className="size-4" aria-hidden="true" />
              </a>
              <a
                href={profile.phoneHref}
                aria-label={`Call ${profile.name}`}
                className="grid size-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
              >
                <Phone className="size-4" aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.name} on LinkedIn`}
                className="grid size-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
              >
                <LinkedinIcon aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-slate-400">Quick Links</h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-slate-400">Contact</h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-500 transition-colors hover:text-cyan-300">
                  <Mail className="size-4 shrink-0 text-cyan-300/60" aria-hidden="true" />
                  <span className="break-all">{profile.email}</span>
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="flex items-center gap-3 text-slate-500 transition-colors hover:text-cyan-300">
                  <Phone className="size-4 shrink-0 text-cyan-300/60" aria-hidden="true" />
                  {profile.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-500 transition-colors hover:text-cyan-300"
                >
                  <LinkedinIcon className="size-4 shrink-0 text-cyan-300/60" aria-hidden="true" />
                  <span className="break-all">{profile.linkedinDisplay}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <MapPin className="size-4 shrink-0 text-cyan-300/60" aria-hidden="true" />
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 py-6 sm:flex-row">
          <p className="font-mono text-xs text-slate-600">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-slate-700">
            <span className="text-cyan-400/60">$</span> designed &amp; built with vigilance
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
