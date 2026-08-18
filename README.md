# portfolio.palladino.me

Personal portfolio site, served at [portfolio.palladino.me](https://portfolio.palladino.me).
Built with [Astro](https://astro.build) + TypeScript, deployed to GitHub Pages.

## Local development

Requires Node.js 22+.

```sh
npm ci
npm run dev
```

Other scripts:

```sh
npm run check    # Astro + TypeScript + content-collection schema validation
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Deployment

Pushing to `main` triggers the "Deploy to GitHub Pages" GitHub Actions workflow, which
builds the site and publishes `dist/` to GitHub Pages.

### Manual setup (one-time, out of band)

These two steps aren't automated by this project and need to be done manually:

1. **DNS** — at the domain registrar for `palladino.me`, add a `CNAME` record:
   - Host: `portfolio`
   - Target: `jpalladino84.github.io`
2. **GitHub Pages** — in the repo settings, under **Pages**, set the source to
   **GitHub Actions**.

The custom domain is declared in [`public/CNAME`](./public/CNAME), which GitHub Pages
reads on deploy.
