# Rallydeen Roshan Ahamed — Portfolio

A premium, fully responsive, dark-themed personal portfolio for **Rallydeen Roshan Ahamed**, SOC Analyst & Cybersecurity Professional. Built with **React 19 + Vite + Tailwind CSS v4**, with Lucide icons, interactive Skills tabs, an experience timeline, and a Web3Forms-powered contact form.

---

## Features

- Permanent dark slate theme (`slate-950` backgrounds, cyan/emerald accents) — no light mode, by design
- Responsive navbar with reading-progress bar, active-section highlighting, and an accessible mobile menu
- Hero with animated terminal (typewriter effect), radar motif, stack marquee, and a **client-side generated CV download** (real PDF, zero dependencies)
- About section with an `analyst_profile.json`-styled panel
- **Skills section with exactly two interactive tabs** — Technical Skills / Soft Skills — fully keyboard accessible (arrow keys, roving tabindex, ARIA tabs)
- Experience timeline, education cards, and certifications grid with an **“In Progress”** state for Microsoft SC-200
- Contact section with validation, loading/success/error states, and a **Web3Forms** integration
- Clickable `mailto:`, `tel:`, and LinkedIn links everywhere; dynamic copyright year in the footer
- SEO metadata via `react-helmet-async`, skip link, focus indicators, and `prefers-reduced-motion` support

## Project structure

```
├── index.html                  # Meta, fonts, favicon
├── .env.example                # Web3Forms key placeholder (copy to .env)
├── public/
│   └── favicon.svg             # Shield monogram favicon
└── src/
    ├── main.tsx                # Entry (HelmetProvider)
    ├── App.tsx                 # Page composition + SEO
    ├── index.css               # Tailwind v4 theme, animations, a11y styles
    ├── vite-env.d.ts           # import.meta.env typing
    ├── data/
    │   └── portfolio.ts        # ALL content (profile, skills, experience, …)
    ├── hooks/
    │   └── useActiveSection.ts # Scroll-spy for navbar
    ├── utils/
    │   ├── cn.ts               # clsx + tailwind-merge helper
    │   └── downloadCv.ts       # Dependency-free PDF CV generator
    └── components/
        ├── Navbar.tsx          # Sticky nav, progress bar, mobile menu
        ├── Hero.tsx            # Headline, CTAs, stats, marquee
        ├── TerminalCard.tsx    # Typewriter terminal visual
        ├── About.tsx
        ├── Skills.tsx          # Two-tab skills (Technical / Soft)
        ├── Experience.tsx      # Vertical timeline
        ├── Education.tsx
        ├── Certifications.tsx
        ├── Contact.tsx         # Web3Forms form + info cards
        ├── Footer.tsx
        ├── Reveal.tsx          # IntersectionObserver scroll reveal
        ├── SectionHeading.tsx  # Shared section header
        └── icons/LinkedinIcon.tsx
```

## Getting started

Install dependencies and start the dev server (Yarn is used throughout):

```bash
yarn
yarn dev
```

Open the printed local URL (default http://localhost:5173).

## Contact form (Web3Forms) setup

The contact form posts to the official Web3Forms endpoint and only reports success when the API confirms it.

1. **Get your Access Key** — go to https://web3forms.com, enter the email address that should receive messages (e.g. `ahamedroshan426@gmail.com`), and Web3Forms instantly issues an Access Key for that address. Messages go to the email configured in your Web3Forms dashboard.
2. **Create your env file**:

   ```bash
   cp .env.example .env
   ```

3. **Set the key** inside `.env`:

   ```bash
   VITE_WEB3FORMS_ACCESS_KEY=your_real_access_key
   ```

4. **Restart the dev server** so Vite picks up the variable:

   ```bash
   yarn dev
   ```

5. **Test the form** — fill it in and submit. You should see the success banner and receive the message in the inbox tied to your Web3Forms key.

> **Security note:** Vite inlines `VITE_*` variables into the client-side bundle. That is expected here — the Web3Forms access key is designed for public, frontend-only use. Never place private server secrets in `VITE_*` variables, and never commit your real `.env` (already covered by `.gitignore`).

If the key is missing, the form shows a clear configuration warning instead of attempting a request.

## The “Download CV” button

The hero button generates a real, valid single-page PDF **in the browser** (`src/utils/downloadCv.ts`) — no library, no static file to host, and it works on every deployment. To customize the CV content, edit that file. If you prefer a designed PDF instead, drop it at `public/cv/Rallydeen_Roshan_Ahamed_CV.pdf` and swap the button’s `onClick` for an `<a href="/cv/Rallydeen_Roshan_Ahamed_CV.pdf" download>` link.

## Production build

```bash
yarn build      # outputs dist/
yarn preview    # preview the production build locally
```

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project → Import** the repo. Vercel auto-detects Vite (build command `yarn build`, output `dist`).
3. Add the environment variable before deploying: **Settings → Environment Variables** → `VITE_WEB3FORMS_ACCESS_KEY` = your key (select Production/Preview as desired).
4. Deploy. Any future change to the key requires a redeploy to take effect.

The same steps apply to Netlify/Cloudflare Pages — build with `yarn build`, publish `dist`, and configure the same environment variable.

## Content & verification checklist before publication

- Confirm the LinkedIn URL: https://www.linkedin.com/in/ahmed-roshan-426-rr
- Confirm email (`ahamedroshan426@gmail.com`) and Sri Lankan phone (`+94 76 784 4747`)
- All section content lives in `src/data/portfolio.ts` — update it in one place
