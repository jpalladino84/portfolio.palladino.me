# Portfolio Site Design — portfolio.palladino.me

**Date:** 2026-08-17
**Status:** Approved

## Purpose

A personal portfolio site to showcase the projects hosted under the
`palladino.me` domain, served at `https://portfolio.palladino.me`. The
site is a hand-authored, single-page showcase: a hero intro, social
links, and a responsive grid of project cards.

## Goals

- Simple to maintain: adding a project is a small, self-contained edit.
- Zero server cost and minimal moving parts.
- Fast, accessible, minimal & clean aesthetic that lets project
  screenshots carry the visual weight.

## Non-Goals (YAGNI — easy to add later)

- Tech-tag filtering.
- Per-project detail pages.
- Dark mode / theme toggle.
- A CMS or admin UI.

## Stack & Hosting

- **Astro** static site generator, **TypeScript**.
- Styling via plain scoped CSS in Astro components plus a small set of
  CSS custom properties for theme tokens. No CSS framework. Zero
  client JS by default.
- **GitHub Pages** hosting, deployed by a **GitHub Actions** workflow
  on push to `main`.
- New repo: `jpalladino84/portfolio.palladino.me`.
- `public/CNAME` contains `portfolio.palladino.me` so Pages serves the
  custom domain.
- **DNS (manual, out of band):** a `CNAME` record `portfolio` →
  `jpalladino84.github.io` must be configured at the domain registrar.
  Documented in the README; not automated by this project.

## Content Model

Projects are data so adding one is a tiny edit.

- An Astro **content collection** at `src/content/projects/`, one
  Markdown file per project (frontmatter carries the fields; body
  unused for now).
- Typed schema (`src/content/config.ts`):
  - `title: string` (required)
  - `blurb: string` (required — one or two sentences)
  - `thumbnail: image()` (required — optimized via Astro's image pipeline)
  - `liveUrl?: string (url)`
  - `sourceUrl?: string (url)`
  - `order?: number` (controls grid ordering; default sorts by title)
- Thumbnail images live in `src/assets/` alongside content and are
  optimized at build.

## Page Layout (single page, top to bottom)

1. **Hero** — name + short tagline.
2. **Social links** — GitHub, LinkedIn, email, and
   `blog.palladino.me`. Rendered in the hero and repeated in the footer.
3. **Project grid** — responsive card grid. Each card: thumbnail,
   title, blurb, and "Live" / "Source" links (each link shown only
   when its URL is present).
4. **Footer** — social links + copyright.

## Components

Small, single-purpose components under `src/components/`:

- `Hero.astro` — name, tagline, embeds `SocialLinks`.
- `SocialLinks.astro` — configurable row of links; used in hero + footer.
- `ProjectCard.astro` — one project's thumbnail, title, blurb, links.
- `ProjectGrid.astro` — loads the projects collection, sorts, renders cards.
- `Footer.astro` — social links + copyright.
- `src/layouts/BaseLayout.astro` — html shell, `<head>`, global styles,
  meta/SEO tags.

Site-level config (name, tagline, social URLs) centralized in a single
`src/config.ts` so placeholders are easy to find and replace.

## Data Flow

Build time only. Astro reads the `projects` content collection and
`src/config.ts`, renders static HTML + optimized images. No runtime
data fetching, no client JS.

## Error Handling / Validation

- Content schema is enforced by Astro/Zod at build; a malformed
  project entry fails the build with a clear error.
- Optional links render conditionally, so missing `liveUrl`/`sourceUrl`
  simply omit that link rather than producing a dead link.

## Testing / Verification

- CI runs `astro check` (TypeScript + content schema validation) and a
  production `astro build`; both must pass before the deploy step.
- Seed 2–3 example project entries so the grid renders and layout is
  reviewable from first build.

## Placeholders to fill later

- Exact tagline text.
- LinkedIn URL and contact email.
- Real project entries (replacing the seed examples).
