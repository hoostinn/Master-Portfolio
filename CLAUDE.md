# CLAUDE.md — Justin Park Portfolio Website

Persistent context for every Claude session on this project.
Read this entire file before writing any code, creating any file, or making any suggestions.

---

## Project Overview

Personal portfolio website for Justin Park — CS graduate, software engineer, product-minded builder.

**Primary audience:** SWE recruiters
**Secondary audience:** TPM/PM hiring managers

The site must work for both without explicitly calling out the split. Lead with engineering credibility. Let the leadership and product thinking surface naturally through project descriptions and the About page.

**The one thing every visitor should walk away knowing:**
Justin is a strong technical engineer who thinks like a product person and leads well.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro |
| Styling | Tailwind CSS (custom config with design tokens below) |
| Language | TypeScript |
| Deployment | Vercel |
| Package manager | npm |
| Domain | justinjpark.dev |

No React islands unless interactivity is genuinely required (modals, theme toggle, contact form). Prefer Astro components. Keep the bundle lean.

---

## Run & Test Commands

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Type check
npx astro check

# Lint
npm run lint
```

Always run `npm run build` before committing. Dev mode masks Astro build errors.

---

## File Layout

```
/
├── public/
│   ├── favicon.ico
│   └── assets/
│       ├── resume.pdf              # Always keep current. Never link externally.
│       └── profile.jpg             # Justin's photo. Replace file to update. No code changes needed.
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── ProjectCard.astro       # Small card used in grid below featured
│   │   ├── ProjectFeatured.astro   # Large featured card (OTTER)
│   │   ├── ProjectModal.astro      # Modal popup with full project detail
│   │   ├── Badge.astro             # Stack/tech badges
│   │   ├── ThemeToggle.astro       # Dark/light mode toggle
│   │   ├── ContactForm.astro       # Contact form with validation
│   │   └── ProfileCard.astro       # About page hero card — image left, text right
│   ├── layouts/
│   │   └── BaseLayout.astro        # Shared head, nav, footer, theme
│   ├── pages/
│   │   ├── index.astro             # Home / Hero
│   │   ├── about.astro             # About + story + resume download
│   │   ├── projects.astro          # Featured + grid + modals
│   │   └── contact.astro           # Contact form
│   ├── content/
│   │   └── projects/               # ONE markdown file per project
│   │       ├── otter.md            # featured: true, order: 1
│   │       ├── friendsync.md       # featured: true, order: 2
│   │       └── ocr-form-parser.md  # featured: true, order: 3
│   ├── scripts/
│   │   └── modal.ts                # Modal open/close logic
│   └── styles/
│       └── global.css              # CSS custom properties, base resets
├── astro.config.mjs
├── tailwind.config.mjs             # All design tokens defined here
├── tsconfig.json
└── CLAUDE.md
```

---

## Pages

### Home (index.astro)
- **Hero:** Name, one-line pitch, two CTA buttons (View Projects → /projects, Contact Me → /contact)
- **Skills strip:** Icon badges for core stack — keep it visual, scannable, no walls of text
- **Featured preview:** Show the 3 project cards (OTTER large, FriendSync + OCR smaller)
- Nothing below the fold on first load should be required reading — it's a hook, not a resume

### About (about.astro)
- Tell the story in first person, prose — not bullet points
- Cover: product-minded SWE, CSUMB CS grad, AI tooling + workflow automation interests
- Include a timeline or milestone strip (graduation, Facilitron, OTTER ship date, certs)
- Resume download button links to `/assets/resume.pdf` — opens in new tab
- Subtle nod to long-term TPM/PM interest without making it the headline

#### Profile Card (top of About page)
The first thing a visitor sees on the About page is a feature card with Justin's photo and intro.

**Layout:** Two-column card — image on the left, text on the right. Stacks to single column on mobile (image centered above text).

**Image:**
- Source: `/public/assets/profile.jpg` — Justin provides this file, do not use a placeholder in commits
- Shape: square with rounded corners (`rounded-2xl`)
- Size: fixed width on desktop (~280–320px), full width on mobile
- Subtle sage-toned border or shadow to lift it off the card background
- Alt text: `"Photo of Justin Park"`

**Text (right side), top to bottom:**
1. **Name** — `Justin Park` — large, bold, heading level
2. **Title** — `Software Engineer` — primary sage color, medium weight
3. **Bio** — 3–4 sentences in first person. Pull from the humanized About section we wrote. Covers: what he builds, where he works now, what he cares about.
4. **Resume download button** — accent peach color, opens `/assets/resume.pdf` in new tab. Label: `Download Resume`

**Card styling:**
- Background: `surface` (light) / `dark-surface` (dark)
- Border: `border` color token, 1px
- Padding: generous (`p-8` or `p-10`)
- Rounded corners: `rounded-2xl`
- Subtle fade-in on page load (respects `prefers-reduced-motion`)

**Component:** `ProfileCard.astro` in `/src/components/`
To update the photo: replace `/public/assets/profile.jpg`. No code changes needed.

#### What I Do + Tech Stack (below Profile Card, on About page)

A two-part mini section that sits directly below the profile card. Compact, scannable, no prose walls.

**Layout:** Two columns side by side on desktop — "What I Do" on the left, "Tech Stack" on the right. Stacks vertically on mobile, What I Do on top.

**Component:** `AboutMini.astro` in `/src/components/`

---

**Left column — What I Do**

Section label: `What I Do` in muted text, small caps or uppercase tracking.

Four items, each with a small sage-colored icon and a short label + one-line description:

| Icon | Label | Description |
|---|---|---|
| 🛠 | Build AI-Assisted Tools | Ship software that uses AI and automation to reduce manual work and improve how people work |
| 🖥 | Develop Full-Stack Applications | End-to-end from database to UI, across desktop and web platforms |
| ⚙️ | Automate Workflows | Identify inefficiencies and replace them with scripts, pipelines, and systems that scale |
| 👥 | Lead and Ship as a Team | Coordinate engineers, manage GitHub workflows, and bring projects from idea to production |

Styling: each item is a small row — icon + bold label on one line, description in muted text below. Generous line spacing. No borders between items.

---

**Right column — Tech Stack**

Section label: `Tech Stack` in muted text, small caps or uppercase tracking.

Grouped by category. Each group has a category label in primary sage color, followed by badge tags.

```
Frontend & Desktop
React · Electron · TypeScript · JavaScript · HTML · CSS · Tailwind CSS · Figma

Backend & Databases
Python · Spring Boot · PostgreSQL · MongoDB · Node.js · Supabase · REST APIs

DevOps & Cloud
AWS · Docker · GitHub Actions · CI/CD · Vercel · Git

AI & Automation
Claude API · Anthropic SDK · Agentic Workflows · LLM API Integration ·
Prompt Engineering · Tool Use / Function Calling · GitHub Copilot

Testing & Tools
Jest · Postman · FFmpeg · OCR · BeautifulSoup
```

Badge styling: small pill tags using `surface-alt` background and `text` color in light mode, `dark-surface-alt` and `dark-text` in dark mode. Category labels in `primary` / `dark-primary` color. No accent color on badges — accent is reserved for buttons and CTAs only.

**Hard rules for this section:**
- Never use "AI-Assisted Analytics" — vague, no project backing it
- Astro is valid to list here — this portfolio site is the evidence
- Whisper / ASR can appear under AI & Automation — OTTER backs it up
- Do not add skills with no shipped project behind them

### Projects (projects.astro)
- OTTER always renders as the large featured card at the top
- FriendSync and OCR Form Parser render as equal smaller cards in a 2-col grid below
- Clicking any card opens a modal with full project detail
- Adding or removing a project = add or delete its markdown file in `/src/content/projects/`
- `featured: false` hides a project from this page without deleting it
- `order` field controls sort order — OTTER is always order: 1

### Contact (contact.astro)
- Contact form: Name, Email, Message fields + Submit button
- Below the form: Email link, GitHub link, LinkedIn link
- No third-party form services unless explicitly requested — use Vercel serverless function or Formspree

---

## Project Content Schema

Every file in `/src/content/projects/` uses this exact frontmatter.
**This is the single source of truth. Never hardcode project data in page or component files.**

```yaml
---
title: string                  # Display name
slug: string                   # URL-safe identifier, matches filename
description: string            # 1 sentence. Recruiter-readable in 5 seconds.
role: string                   # "Lead Frontend Engineer" / "Solo Developer" etc.
team: string | null            # "8-person engineering team" or null
stack: string[]                # ["React", "Electron", "TypeScript", "Python"]
github: string | null          # Repo URL or null
demo: string | null            # Live URL or null
status: "shipped" | "in-progress" | "archived"
featured: boolean              # true = appears on /projects page
order: number                  # Sort order. OTTER = 1, always.
image: string | null           # Path to screenshot in /public/assets/ or null
highlights: string[]           # 3-5 bullet points for modal detail view
tpmNote: string | null         # Optional: product/leadership angle for TPM readers
---
```

To **add** a project: create a new `.md` file with this schema, set `featured: true`.
To **remove** a project: set `featured: false` or delete the file.
To **reorder**: change the `order` values.

---

## Project Files (Pre-filled)

### otter.md
```yaml
---
title: OTTER — Open Text Transcription Editing Resource
slug: otter
description: Open-source local-first desktop app that lets creators edit audio by editing text instead of waveforms, built with React, Electron, and Python.
role: Lead Frontend Engineer & Product Coordinator
team: 8-person engineering team
stack: ["React", "Electron", "TypeScript", "Python", "GitHub Actions", "Jest", "FFmpeg"]
github: https://github.com/OTTER-Capstone-ORG/OTTER
demo: null
status: shipped
featured: true
order: 1
image: /assets/otter-screenshot.png
highlights:
  - Led frontend UI/UX development and coordinated an 8-person engineering team
  - Built timeline-based transcript editing features with word-level audio sync
  - Integrated CI/CD workflows, automated testing with Jest and GitHub Actions
  - Local-first architecture — audio and text never leave the user's machine
  - Used Whisper-family ASR models for word-level timestamp generation
tpmNote: Managed GitHub workflows, sprint timelines, and team communication across 8 engineers. Made tradeoffs around scope (editing intentionally excluded from PoC) to ship a working proof of concept on deadline.
---
```

### friendsync.md
```yaml
---
title: FriendSync
slug: friendsync
description: Full-stack social coordination app with production-grade architecture deployed via Docker and Heroku.
role: Full-Stack Developer
team: null
stack: ["Spring Boot", "React", "PostgreSQL", "Docker", "Heroku", "REST APIs"]
github: null
demo: null
status: shipped
featured: true
order: 2
image: null
highlights:
  - Built full-stack application with Spring Boot backend and React frontend
  - Containerized with Docker and deployed to production on Heroku
  - Designed RESTful API layer with PostgreSQL data persistence
  - Implemented user authentication and real-time coordination features
tpmNote: null
---
```

### ocr-form-parser.md
```yaml
---
title: OCR Form Parser
slug: ocr-form-parser
description: AI/ML tool that extracts structured data from PDFs and scanned forms using OCR, directly applied to real-world data workflows at Facilitron.
role: Developer
team: null
stack: ["Python", "OCR", "BeautifulSoup", "Pandas"]
github: null
demo: null
status: shipped
featured: true
order: 3
image: null
highlights:
  - Built OCR pipeline to extract structured data from unstructured PDF forms
  - Reduced manual processing time by 50% and saved 10+ hours per project
  - Applied directly to 30+ district database migrations at Facilitron
  - Automated PDF-to-spreadsheet workflows replacing manual data entry
tpmNote: Identified an operational bottleneck, proposed an automation solution, and shipped it — reducing implementation turnaround from 2-3 days to 1 day.
---
```

---

## Design System

### Typography
- **Font:** Atkinson Hyperlegible (clean, modern, maximum legibility)
- **Fallback:** system-ui, sans-serif
- **Scale:** Use Tailwind's default type scale. No custom sizes unless necessary.
- **Headings:** Bold weight. Clear hierarchy — one H1 per page.
- **Body:** Regular weight, 1.6 line height minimum for readability.

### Color System — Sage & Peach Palette

The 60-30-10 rule governs all color usage:
- **60% Neutrals** — backgrounds, sections, cards, layout structure
- **30% Primary (Sage)** — icons, project cards, active nav, section highlights, UI structure
- **10% Accent (Peach)** — buttons, links, hover states, important actions, highlights

Brightest and boldest draws attention first. Muted colors recede. Color guides users to what matters most.

Define all tokens in `tailwind.config.mjs`:

```js
// Light Mode
colors: {
  // Neutrals (60%)
  'bg':           '#FAFAF8',  // Page background
  'surface':      '#FFFFFF',  // Cards
  'surface-alt':  '#F1F4F1',  // Subtle sections
  'border':       '#E1E6E1',  // Dividers

  // Primary Sage (30%)
  'primary':      '#A8C3B0',
  'primary-hover':'#8FB79B',
  'primary-muted':'#CDE2D6',

  // Accent Peach (10%)
  'accent':       '#F2B6A0',
  'accent-hover': '#E89D85',

  // Text
  'text':         '#1F2937',
  'text-muted':   '#475467',
  'text-faint':   '#98A29A',
}

// Dark Mode (class-based: dark:)
// Neutrals
'dark-bg':          '#111412',
'dark-surface':     '#1A1F1C',
'dark-surface-alt': '#232A26',
'dark-border':      '#343E39',

// Primary
'dark-primary':       '#8FB89B',
'dark-primary-hover': '#537F61',
'dark-primary-muted': '#6FA680',

// Accent (more saturated in dark mode)
'dark-accent':        '#FFBA9C',
'dark-accent-hover':  '#FF9472',

// Text
'dark-text':          '#E6ECE7',
'dark-text-muted':    '#B5BEB8',
'dark-text-faint':    '#88938D',
```

**Dark mode rules:**
- Reduce contrast slightly — never pure white text on dark backgrounds
- Use more saturated accent colors in dark mode
- Toggle via `class` strategy on `<html>` element (`dark:` prefix in Tailwind)
- Persist preference in localStorage

### Animation
- **Principle:** Subtle only. Purposeful, never decorative.
- **Fade-in on scroll:** Sections and cards fade in as they enter the viewport. Use Intersection Observer.
- **Smooth scrolling:** `scroll-behavior: smooth` on `html`
- **Hover transitions:** `transition-all duration-200 ease-in-out` on interactive elements
- **Modal:** Fade in + slight scale up on open. Fade out on close.
- **No:** parallax, autoplay, carousels, looping animations, bounce effects
- **Reduced motion:** Always respect `prefers-reduced-motion`. Wrap animations in a check.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## Component Conventions

### ProjectFeatured.astro (OTTER only)
- Full-width or near-full-width card
- Shows: title, description, role, team size, stack badges, status badge, GitHub link
- Prominent "View Details" button in accent color → opens modal
- If `image` is set, show screenshot on the right side

### ProjectCard.astro (FriendSync, OCR Parser)
- Compact card, equal height in a 2-col grid
- Shows: title, description, top 3 stack badges, status
- Hover: subtle border highlight in primary color, slight elevation
- Click anywhere → opens modal

### ProjectModal.astro
- Triggered by clicking any project card
- Shows: full title, role, team, all stack badges, all highlights as bullets
- If `tpmNote` is set, render it in a subtle callout block (visible to all — it adds context)
- GitHub and demo links if available
- Close on: X button, backdrop click, Escape key
- Trap focus while open (accessibility)

### ThemeToggle.astro
- Icon button in nav (sun/moon)
- Toggles `dark` class on `<html>`
- Persists to localStorage
- Defaults to system preference on first visit

---

## Hard Rules

1. **Single source of truth.** All project data lives in `/src/content/projects/` markdown files. Never hardcode project details in pages or components.
2. **Adding/removing projects = one file operation.** Set `featured: false` to hide, delete to remove entirely. No other files should need to change.
3. **OTTER is always order: 1.** Never render it as a small card. It always gets the featured large treatment.
4. **Semantic HTML only.** Use `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`. No `<div>` soup.
5. **No inline styles.** Tailwind utility classes only. New utilities go in `tailwind.config.mjs`.
6. **No placeholder content in commits.** Lorem ipsum and "Coming soon" are fine locally, never on main.
7. **Resume PDF in `/public/assets/resume.pdf`.** Always current. Never link to Google Drive or any external host.
8. **Accessibility non-negotiable.** All images need alt text. All interactive elements need visible focus states. Modals trap focus. Run Lighthouse before every major deploy. Target 90+ performance score.
9. **Respect `prefers-reduced-motion`.** Every animation must be wrapped.
10. **Dark mode is not optional.** Every new component must have dark mode styles. Test both before committing.
11. **`tpmNote` is always optional.** Never required to ship a project. Add it when there's a genuine product/leadership story to tell.

---

## TPM/PM Layer

This portfolio also serves TPM/PM hiring managers without advertising it.

The `tpmNote` field in each project's frontmatter captures the product and leadership angle. When rendered in the modal as a subtle callout, it gives TPM readers exactly what they're looking for without confusing SWE recruiters.

When writing or updating `tpmNote` content, always answer:
- What problem did you identify?
- What tradeoffs did you navigate?
- How did you coordinate people or workflow?
- What would you do differently?

OTTER's `tpmNote` is the most important one. Keep it sharp.

---

## Justin's Background (Quick Reference)

| Field | Value |
|---|---|
| Name | Justin Park |
| Location | Gilroy, CA |
| Email | justin.jpark4@gmail.com |
| Degree | B.S. Computer Science, Software Engineering — CSUMB, May 2026 |
| Current role | Engineering & Implementations Intern, Facilitron |
| Key projects | OTTER (open source, 8-person, React + Electron), FriendSync (full-stack, Docker + Heroku), OCR Form Parser (AI/ML, Python) |
| Certs | AWS Certified Cloud Practitioner (Mar 2026), AWS Generative AI Badge (Feb 2026) |
| Stack | React, Electron, TypeScript, Python, PostgreSQL, MongoDB, Docker, AWS, GitHub Actions, Spring Boot |
| Interests | AI tooling, workflow automation, creator platforms, developer productivity |
| Long-term | TPM / PM / Engineering Lead |
| Domain | justinjpark.dev |
| LinkedIn | linkedin.com/in/justinjpark |
| GitHub | github.com/OTTER-Capstone-ORG/OTTER |

---

## Resume & Skills Context (Reference for Copy and Content Decisions)

This section informs any copy written for the site — hero text, About page, project descriptions, skills section. Do not duplicate resume content verbatim; use it as the source of truth for what Justin has actually shipped and can defend.

### Target Roles (in priority order)
1. SWE — Developer Tooling
2. SWE — AI-Assisted Products
3. SWE — Creator Platforms
4. TPM / PM (secondary, surfaces through tpmNote and About page only)

### Skills Tiers

**Add confidently — all verified, hold up in interview:**
- Claude API, Anthropic SDK, Agentic Workflows
- LLM API Integration, Tool Use / Function Calling, Prompt Engineering
- Figma, Tailwind CSS, Vercel
- PostgreSQL, Node.js, Supabase

**Add with context — need a project or sentence to back up:**
- Astro (used on this portfolio site — this site IS the evidence)
- Whisper API / ASR integration (used in OTTER — name it explicitly)

**Do not add yet — no shipped project to back up:**
- Gemini API
- Next.js (unless used before site launch)

### AI-Assisted Development Cluster
Use this exact grouping when rendering the skills strip or About page stack:

> Claude API · Anthropic SDK · Agentic Workflows · LLM API Integration · Prompt Engineering · Tool Use / Function Calling · GitHub Copilot · AI Workflow Automation

Do NOT use: "AI-Assisted Analytics" — vague, no project backing it.

### Removed Projects
- **YouTube Insights Platform** — removed until a specific feature is shipped. Do not reference it anywhere on the site. If restored, it needs: one named AI model/API, one specific shipped feature, and a demo or screenshot.

### Portfolio Site as a Skills Signal
The portfolio itself (Astro + Tailwind + Vercel + TypeScript) is real evidence of those skills. Consider adding it as a project card with `featured: false` and `order: 4`, surfaced only if/when the other three slots are full.

### Hero Copy Constraint
The one-line pitch must NOT use "passionate," "dedicated," or "full-stack developer." Lead with what you build, not how you feel about building it.

Approved direction:
> "Software engineer building developer tools and AI-assisted products."

### About Page Copy Rules
- Write in first person, prose only — no bullet points on the About page
- Answer in order: what I build → where I work now → what I care about → where I'm headed
- TPM/PM interest gets one sentence max, near the end, not the headline
- Do not list coursework — that belongs on the resume only
- Milestone strip should include: CSUMB graduation (May 2026), Facilitron start (Jul 2025), OTTER ship date, AWS cert (Mar 2026)

### Ownership Language Rule
Never write bullets or copy that says "developed" or "worked on." Always use "shipped," "built," or "designed" to signal ownership. Every project description must name Justin's specific contribution, not the team's. "I shipped X" not "the team built Y."

### Hiring Manager 10-Second Scan
What lands immediately: OTTER (React + Electron is rare), 50% metric at Facilitron, AWS cert.
Biggest doubt: unclear what Justin personally shipped vs. coordinated. The ownership language rule above fixes this sitewide.
