import { Helmet } from "react-helmet-async";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { profile } from "./data/portfolio";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Helmet prioritizeSeoTags>
        <title>{`${profile.name} | SOC Analyst & Cybersecurity Professional`}</title>
        <meta
          name="description"
          content="Portfolio of Rallydeen Roshan Ahamed — SOC Analyst and cybersecurity professional with 3+ years of experience across managed 24/7 SOC operations, threat detection, incident response, and endpoint security."
        />
      </Helmet>

      {/* Skip link for keyboard / screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
