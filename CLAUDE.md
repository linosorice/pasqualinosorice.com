# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website, blog and consulting site of Pasqualino Sorice (https://www.pasqualinosorice.com), positioned on "sviluppo agentico" consulting for tech teams. All copy is in Italian (`lang="it"`); the older posts are still in English until they are rewritten. Built with Next.js 16 App Router (Turbopack, React 19), Tailwind CSS v4 (via `@tailwindcss/postcss`) and MDX. Deployed on Vercel; analytics via Vercel Analytics and Speed Insights only (cookieless, no consent banner — do not reintroduce GTM/GA without one).

## Commands

Package manager is **pnpm**.

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # production build
pnpm start
pnpm lint       # ESLint flat config (eslint.config.mjs, eslint-config-next)
pnpm typecheck  # tsc --noEmit
```

- There is no test suite: `pnpm build`, `pnpm lint` and `pnpm typecheck` are the checks.
- A Husky pre-commit hook runs `lint-staged`, which formats every staged file with Prettier (config in `.prettierrc.yml`: no semicolons, single quotes incl. JSX, no trailing commas, `arrowParens: avoid`, width 100, Tailwind class sorting plugin).

## Architecture

### Blog content pipeline

Posts are `.mdx` files in `app/blog/posts/`; the filename is the slug. There is no CMS or content library — `app/blog/utils.ts` reads the directory with `fs` at build time and is the single source of post data for the blog index, the home page (`app/components/posts.tsx`), `app/blog/[slug]/page.tsx`, `app/sitemap.ts` and `app/rss/route.ts`.

- Frontmatter is parsed with `gray-matter`, so it must be valid YAML: a value containing `'` needs double quotes. Fields: `title`, `publishedAt` (`YYYY-MM-DD`), `summary`, optional `image`.
- `getBlogPosts()` hides posts whose `publishedAt` is in the future. Everything is statically generated (`dynamicParams = false` on posts, `force-static` on the `/rss` and `/llms.txt` route handlers, which would otherwise be dynamic and read the MDX files at runtime), so a scheduled post only appears after a new build. `.github/workflows/publish-scheduled-posts.yml` triggers a Vercel deploy hook (secret `VERCEL_DEPLOY_HOOK_URL`) every morning when a post is dated today.
- Posts are rendered with `next-mdx-remote/rsc` through `CustomMDX` (`app/components/mdx.tsx`), which maps headings to anchor-linked headings, links to internal/external variants, `code` to `sugar-high` highlighting, and exposes `<Image>` and `<Table>` components inside MDX. Syntax highlight colors are CSS variables (`--sh-*`) in `app/global.css`.
- Heading ids and the table of contents (built in `app/blog/[slug]/page.tsx` by scanning `##`–`######` lines of the raw MDX outside code fences) both go through `app/blog/slugify.ts`. Always use it for anchors so TOC links keep matching the rendered ids.
- Post images live in `public/` and are referenced from MDX with absolute paths (`![alt](/file.png)`); `img` is mapped to `next/image`, reading the dimensions from the file at build time.

### Site-wide

- Contacts and personal data (email, Cal.com booking link, social links, VAT number, portrait, remaining launch-offer slots shown on `/consulenza`) live in `app/config.ts`; pages, footer and CTAs read them from there.
- `<Todo>` (`app/components/todo.tsx`) marks copy or numbers still to be provided: it is highlighted in dev and previews and throws when `VERCEL_ENV=production`, so a production build fails while any placeholder is rendered. `bookingUrl: null` renders one inside every booking button.
- `ContactCta` (`app/components/cta.tsx`) is rendered on the home page, `/consulenza` and at the end of every post.
- Removed posts are listed in `next.config.js` and permanently redirected to `/blog`; when a post is rewritten under a new slug, add a redirect from the old one.

- `baseUrl` is exported from `app/sitemap.ts` and imported everywhere absolute URLs are needed (metadata, OG, JSON-LD, RSS, sitemap).
- `app/og/route.tsx` generates fallback Open Graph images from a `?title=` query param; post metadata uses it when no `image` frontmatter is set.
- `next.config.js` sets a strict Content-Security-Policy on all routes (`'self'` only for scripts, images, fonts; `'unsafe-eval'` only in dev). Adding external scripts, images, embeds or fonts requires updating that header.
- Imports use the `app/...` path (enabled by `baseUrl: "."` in `tsconfig.json`). TypeScript runs with `strict: false` but `strictNullChecks: true`.
