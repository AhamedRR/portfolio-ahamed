import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile, sectionIds } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { cn } from "../utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const activeSection = useActiveSection(sectionIds);

  /* Track scroll state + reading progress */
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Lock body scroll + close on Escape while the mobile menu is open */
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Reading progress */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8"
      >
        {/* Monogram logo */}
        <a href="#home" className="group flex items-center gap-3" aria-label="Back to top — Rallydeen Roshan Ahamed">
          <span className="grid size-9 place-items-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 font-display text-sm font-bold tracking-tight text-cyan-300 transition-colors group-hover:bg-cyan-400/20">
            RR
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">
              Rallydeen Roshan
            </span>
            <span className="block font-mono text-[11px] leading-4 text-cyan-300/90">soc_analyst — {profile.locationShort.toLowerCase()}</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-cyan-300" : "text-slate-400 hover:text-slate-100"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px bg-cyan-300 transition-opacity",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-xs font-medium text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/20 sm:inline-flex lg:inline-flex"
          >
            Let&apos;s Talk
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="grid size-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300 lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-in-out lg:hidden",
          menuOpen ? "max-h-[26rem] opacity-100" : "max-h-0 border-b-0 opacity-0"
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                      : "border border-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                  )}
                >
                  {link.label}
                  <span aria-hidden="true" className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
                    {link.id}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
