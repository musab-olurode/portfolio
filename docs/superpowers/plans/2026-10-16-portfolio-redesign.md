# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild musab.dev as a static, editorial one-page portfolio plus a printable `/resume`, on the latest Next.js,
hosted on Cloudflare Workers static assets.

**Architecture:** Next.js App Router with `output: 'export'`. All copy lives in one typed content module that both `/`
and `/resume` read. A few small client components handle the theme, the overlap clock, reveals and the pinned work run;
everything else is server-rendered at build time. The `out/` folder is deployed with Wrangler as an assets-only Worker.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4 (CSS-first), `next/font/google` (Instrument Serif and
Geist), Vitest for units, `@playwright/test` for e2e plus the screenshot and PDF scripts, and Wrangler 4.

**Spec:** `docs/superpowers/specs/2026-10-16-portfolio-redesign-design.md`. The mockup is artboard D at
https://claude.ai/artifact/DkPTUDkBWctETdKykWUcJv, and its source is in the scratchpad canvas,
`project/Combined.dc.html`. The spec wins over the mockup.

## Global Constraints

- Contact email everywhere: `me@musab.dev`. The string `olurodemusab@gmail.com` must not appear anywhere in `src/`,
  `public/` or `scripts/`.
- Site URL: `https://musab.dev` (`metadataBase`, canonical, OG, the résumé's Portfolio link).
- Titles: ICC = **Senior Full Stack Engineer**; Studio 14 = **Senior Frontend Developer**.
- Canoo wording: "senior engineer on the team, across the app, website and backend". Never "I built Canoo" alone.
- Location: no "Ilorin", "Nigeria", "Kwara" or "+234" in the hero, taglines, footer or résumé header. Use "Remote" /
  "GMT+1". "University of Ilorin" and the Scrapays row are allowed.
- "7+ years" (never "6 years").
- Tokens (light): ground `#f3f3f0`, ink `#141414`, soft `#4a4a46`, step `#e9e9e4`, step-2 `#e4e4df`, accent `#0f5c3f`
  (white text). Tokens (dark): ground `#1a2039`, surface `#212846`, ink `#f9a3c0`, soft `#b9879c`, accent fill `#f9a3c0`
  with `#1a2039` text. CV band: `#1a2039` in light, `#212846` in dark; ink `#f9a3c0`, soft `#b9879c`.
- Fonts: Instrument Serif 400 (display), Geist 400/500 (text). No other faces.
- House rules (the design-taste-frontend skill): headings ≤ 2 lines at every width; no eyebrows, monospace, 01/02
  numbering, hairline rules, gradients, resting shadows, glass, emoji or icon cards; one button shape (square corners);
  body ≥ 16px in full ink.
- Motion: transform/opacity only; every animation has a `prefers-reduced-motion: reduce` fallback; content is visible
  with JS off.
- Package manager: **npm** (yarn is not installed on this machine). Delete `yarn.lock` and commit `package-lock.json`.
- Prettier: keep the existing `.prettierrc` (tabs, single quotes, JSX single quotes, width 120).
- Use context7 to check docs for Next.js 16, Tailwind 4 and Wrangler before writing config.
- Commits: no `Co-Authored-By` trailer and no "Generated with Claude Code" line.

## Review Focus

1. **A visitor whose time zone has no overlap, or is unknown or invalid** (e.g. Tokyo, Los Angeles, `Intl` returning
   `UTC` or garbage). Expected: a graceful sentence, no `NaN`, no crash, and no hydration warning. Covered in Task 3
   (unit) and Task 6 (e2e).
2. **JS disabled or `prefers-reduced-motion: reduce`.** Expected: every section's text and images visible, nothing stuck
   at `opacity: 0`, and the theme toggle still works without a circle animation. Covered in Task 9 (e2e).
3. **Phone width (390px).** Expected: no horizontal scroll, the name fits, the pinned run is released into a stacked
   list, and the email fits the width. Covered in Task 11 (e2e + inspector).
4. **A browser without View Transitions, and a reload after toggling.** Expected: the theme switches instantly, persists
   in `localStorage`, and loads with no flash of the wrong theme. Covered in Task 4 (unit) and Task 9 (e2e with
   `startViewTransition` deleted).
5. **Static hosting paths on Cloudflare.** Expected: `/resume` and `/resume/` both serve the résumé, an unknown path
   serves the 404 page with status 404, and the PDF link resolves. Covered in Task 12 (`wrangler dev` checks).

---

## File structure

```
src/app/layout.tsx              root layout: fonts, metadata, no-flash theme script, analytics beacon
src/app/page.tsx                home: composes sections
src/app/resume/page.tsx         résumé (print A4), reads content
src/app/resume/resume.module.css A4 page styles ported from styles/Page.module.scss
src/app/not-found.tsx           404
src/app/opengraph-image.tsx     static OG card (next/og)
src/app/globals.css             Tailwind 4 import, @theme tokens, light/dark vars, view-transition CSS, motion keyframes
src/content/profile.ts          ALL copy and data (typed)
src/lib/overlap.ts              working-hours overlap maths
src/lib/theme.ts                resolveTheme / applyTheme / switchTheme
src/components/ThemeToggle.tsx  client
src/components/OverlapLine.tsx  client
src/components/CountUp.tsx      client
src/components/Reveal.tsx       client (IntersectionObserver → data-shown)
src/components/sections/Hero.tsx, Figures.tsx, PinnedWork.tsx, AlsoBuilt.tsx, CvBand.tsx, Footer.tsx
scripts/capture-screenshots.mjs Playwright → public/work/*.webp
scripts/build-resume-pdf.mjs    Playwright → public/musab-olurode-resume.pdf
tests/unit/*.test.ts            Vitest
tests/e2e/*.spec.ts             @playwright/test against `npx serve out`
wrangler.jsonc
```

Delete: `src/pages/**`, `src/components/{Nav,Page}.tsx`, `src/components/icons/**`, `src/helpers/**`, `src/hooks/**`,
`src/types/**`, `styles/**`, `tailwind.config.js`, `postcss.config.js` (replace it with the Tailwind 4 one),
`.eslintrc.json`, `public/*.png` tech logos and flags, `public/blob.svg`, `public/underline-large.svg`,
`public/vercel.svg`, `public/fonts/space-grotesk/**`, `yarn.lock`. Keep `public/favicon.ico` and `public/avatar.jpg`
(the latter is unused; delete it if nothing references it).

---

### Task 1: Upgrade and scaffold the static Next 16 app

**Files:**

- Modify: `package.json`, `tsconfig.json`, `next.config.js` → `next.config.ts`, `.gitignore` (add `/test-results`,
  `/playwright-report`, `.wrangler`, `.taste-skill`)
- Create: `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `wrangler.jsonc`,
  `src/app/layout.tsx` (minimal), `src/app/page.tsx` (placeholder `<h1>Mus'ab Olurode</h1>`), `src/app/globals.css`,
  `tests/unit/smoke.test.ts`, `tests/e2e/smoke.spec.ts`
- Delete: everything in the delete list above

**Interfaces:**

- Produces: scripts `dev`, `build` (`next build`, output in `out/`), `lint`, `test` (`vitest run`), `e2e`
  (`playwright test`), `serve` (`npx serve out -l 4173`), `preview` (`wrangler dev`), `deploy`
  (`npm run build && wrangler deploy`), `screenshots`, `resume:pdf`. The Playwright `webServer` runs
  `npm run build && npm run serve` on port 4173 with `baseURL: http://localhost:4173`.

- [ ] **Step 1:** Remove the old dependencies and delete the files listed above. Install the latest stable `next`,
      `react` and `react-dom`, and as dev deps `typescript`, `@types/react`, `@types/react-dom`, `@types/node`,
      `tailwindcss`, `@tailwindcss/postcss`, `eslint`, `eslint-config-next`, `prettier`, `vitest`, `@playwright/test`,
      `serve` and `wrangler`, all with npm. If the newest TypeScript major isn't supported by Next 16 yet (check the
      `next build` output and context7), pin the newest supported 5.x/6.x and note it in the commit message.
- [ ] **Step 2:** `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: false`,
      `reactStrictMode: true`.
- [ ] **Step 3:** `wrangler.jsonc`:
      `{ "name": "musab-dev", "compatibility_date": "2026-10-16", "assets": { "directory": "./out", "not_found_handling": "404-page" } }`,
      with no `main` and no binding.
- [ ] **Step 4: Write the smoke tests.** In `tests/unit/smoke.test.ts`, `expect(1).toBe(1)` proves Vitest runs. In
      `tests/e2e/smoke.spec.ts`, `test('home renders')` visits `/`, expects `getByRole('heading', { level: 1 })` to
      contain "Mus'ab Olurode", and collects console errors, expecting `[]`.
- [ ] **Step 5:** Run `npm run build && npm test && npx playwright install chromium && npm run e2e`. Expected: the build
      writes `out/index.html`, and both suites PASS.
- [ ] **Step 6:** Run `npm run lint`. Expected: 0 errors.
- [ ] **Step 7: Commit** with `chore: upgrade to Next 16 static export, Tailwind 4, npm, Cloudflare config`.

### Task 2: Content module

**Files:**

- Create: `src/content/profile.ts`, `tests/unit/content.test.ts`

**Interfaces:**

- Produces:

```ts
export type Role = {
	company: string;
	title: string;
	type: string;
	region: string;
	start: string;
	end: string;
	bullets: string[];
};
export type Project = {
	slug: 'canoo' | 'newborn' | 'cematchmaker' | 'worldkite' | 'ericc' | 'scrapays';
	name: string;
	line: string;
	org: string;
	years: string;
	url: string;
	image: string;
	imageAlt: string;
	stack?: string;
	subsite?: { name: string; url: string };
};
export type AlsoBuilt = { name: string; kind: string; year: string; url?: string };
export const profile: {
	name: string;
	tagline: string;
	promise: string;
	now: string;
	stackShort: string;
	email: 'me@musab.dev';
	site: 'https://musab.dev';
	links: { github: string; linkedin: string; x: string };
	resumePdf: '/musab-olurode-resume.pdf';
	yearsLabel: '7+ years';
};
export const figures: { since: 2019; teams: 5; countries: 4; canooMembers: 1_000_000 };
export const roles: Role[]; // order: ICC, Studio 14, Montech, Scrapays, Binary (spec "Content" table)
export const projects: Project[]; // order and captions: spec section 3
export const alsoBuilt: AlsoBuilt[]; // spec section 4, with its URLs
export const skills: string[]; // spec "Skills" list
export const education: { school: string; degree: string; dates: string };
export const summary: string; // résumé professional summary
```

- Résumé bullets: reuse the existing `/resume` bullets (`src/pages/resume/index.tsx` in git history,
  `git show HEAD~2:src/pages/resume/index.tsx`). The ICC bullets are new, per the spec. Links: github
  `https://github.com/musab-olurode`, linkedin `https://www.linkedin.com/in/musab-olurode/`, x
  `https://twitter.com/_RedDxt`.

- [ ] **Step 1: Write the failing tests** in `tests/unit/content.test.ts`:
  - `profile.email === 'me@musab.dev'`
  - `roles.find(r => r.company.startsWith('Institute')).title === 'Senior Full Stack Engineer'`; Studio 14
    `=== 'Senior Frontend Developer'`, `start 'Aug 2022'`, `end 'Jul 2025'`
  - `roles.map(r => r.company)` equals the five companies in order
  - `projects.map(p => p.slug)` equals `['canoo','newborn','cematchmaker','worldkite','ericc','scrapays']`; newborn
    `subsite.url === 'https://pansaa.newborntoolkit.org/'`; Sandwell `url === 'https://www.sandwell.gov.uk/SBG/'`
  - the Canoo `line` matches `/senior engineer on the team/i` and not `/^I built Canoo/`
  - for `[profile.tagline, profile.promise, profile.now, summary]`, none matches `/Ilorin|Nigeria|Kwara|\+234/`
  - `JSON.stringify({profile, roles, projects, summary})` does not match `/6 years|olurodemusab@gmail\.com/`
  - the wedding entry's `url === 'https://naseeb-by-qadr.pages.dev/'`; Gender Lens
    `url === 'https://gender-lens-wp.s14staging.uk/'`; Montech `url === undefined`
- [ ] **Step 2:** `npm test`. Expected: FAIL (module not found).
- [ ] **Step 3:** Write `src/content/profile.ts` with the spec's exact copy.
- [ ] **Step 4:** `npm test`. Expected: PASS.
- [ ] **Step 5: Commit** with `feat: add typed profile content`.

### Task 3: Working-hours overlap

**Files:**

- Create: `src/lib/overlap.ts`, `tests/unit/overlap.test.ts`

**Interfaces:**

- Produces: `export const MY_TZ = 'Africa/Lagos'` (UTC+1, no DST; internal only, never displayed);
  `export function getOverlap(now: Date, visitorTz: string | undefined): { myTime: string; overlapHours: number; visitorPlace: string | null }`;
  `export function overlapSentence(o: ReturnType<typeof getOverlap>): string`.
- Rules: each side works 09:00–17:00 local on the visitor's calendar day. `overlapHours` is a whole number, 0–8.
  `myTime` is `HH:MM` 24h. `visitorPlace` is the city part of the IANA zone with `_` → space (`America/Toronto` →
  `Toronto`); `null` for an invalid zone, `UTC`/`Etc/*`, or `MY_TZ` itself. An invalid zone is computed as UTC.
- `overlapSentence`: hours > 0 →
  `` `That's ${n} hour${n===1?'':'s'} of overlap with your workday${place ? ` in ${place}` : ''}.` ``; 0 →
  `"Our workdays don't overlap, but I shift my hours to meet the team."`; 8 hours with `visitorPlace === null` (visitor
  is in my zone, or one with the same offset and no usable name) → `"We'd share the whole workday."`.

- [ ] **Step 1: Write the failing tests**, all with `now = new Date('2026-10-16T13:20:00Z')` unless noted:
  - `getOverlap(now,'America/Toronto')` → `{ myTime: '14:20', overlapHours: 3, visitorPlace: 'Toronto' }`
  - `new Date('2026-12-01T13:20:00Z')`, Toronto → `overlapHours: 2`
  - `'Europe/London'` → 8; `'Asia/Tokyo'` → 0; `'America/Los_Angeles'` → 0 with `visitorPlace 'Los Angeles'`
  - `'Not/AZone'` → `visitorPlace: null`, `overlapHours: 7`, no throw; `undefined` behaves the same
  - `overlapSentence` returns the three sentences above for overlap 3/Toronto, 0, and 8 with `MY_TZ`
- [ ] **Step 2:** `npm test -- overlap`. Expected: FAIL.
- [ ] **Step 3:** Implement with `Intl.DateTimeFormat(...).formatToParts` offsets (no date library), wrapping the zone
      lookup in try/catch.
- [ ] **Step 4:** `npm test -- overlap`. Expected: PASS.
- [ ] **Step 5: Commit** with `feat: add working-hours overlap`.

### Task 4: Theme logic and toggle

**Files:**

- Create: `src/lib/theme.ts`, `src/components/ThemeToggle.tsx`, `tests/unit/theme.test.ts`
- Modify: `src/app/layout.tsx` (an inline `<script>` in `<head>` that runs `resolveTheme` logic before paint and sets
  `data-theme` on `<html>`, plus `suppressHydrationWarning` on `<html>`), `src/app/globals.css` (view-transition CSS)

**Interfaces:**

- Produces: `export type Theme = 'light' | 'dark'`; `export const THEME_KEY = 'theme'`;
  `export function resolveTheme(stored: string | null, prefersDark: boolean): Theme`;
  `export function applyTheme(t: Theme): void` (sets `document.documentElement.dataset.theme` and stores it, both in
  try/catch); `export function switchTheme(next: Theme, origin: { x: number; y: number }): Promise<void>`.
- `switchTheme`: if `document.startViewTransition` exists and reduced motion is off, call it with `applyTheme`, then on
  `transition.ready` animate `document.documentElement` with `clipPath` from `circle(0 at x y)` to `circle(R at x y)` (R
  = distance to the farthest corner), 600 ms, `cubic-bezier(0.2, 0, 0, 1)`,
  `pseudoElement: '::view-transition-new(root)'`. Otherwise call `applyTheme` directly. CSS:
  `::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }`.
- `ThemeToggle`: a `<button>` with the label "Dark" or "Light" (the theme it switches to) and
  `aria-label="Switch to dark theme"` / `"Switch to light theme"`. It reads the current theme from `data-theme` after
  mount and passes the button centre as the origin.

- [ ] **Step 1: Write the failing tests**: `resolveTheme('dark', false) === 'dark'`;
      `resolveTheme(null, true) === 'dark'`; `resolveTheme(null, false) === 'light'`;
      `resolveTheme('purple', true) === 'dark'`. With jsdom, `switchTheme('dark', {x:0,y:0})` when `startViewTransition`
      is undefined sets `data-theme="dark"` and `localStorage.theme === 'dark'`. When `localStorage.setItem` throws, it
      still sets `data-theme`.
- [ ] **Step 2:** `npm test -- theme`. Expected: FAIL.
- [ ] **Step 3:** Implement `theme.ts`, `ThemeToggle.tsx`, the head script and the CSS.
- [ ] **Step 4:** `npm test -- theme`. Expected: PASS.
- [ ] **Step 5: Commit** with `feat: add theme switching with view-transition reveal`.

### Task 5: Layout, tokens, metadata, OG, analytics

**Files:**

- Modify: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/app/opengraph-image.tsx`, `src/app/not-found.tsx`, `tests/e2e/meta.spec.ts`

**Interfaces:**

- Consumes: `profile` (Task 2).
- Produces: CSS custom properties
  `--ground --ink --soft --step --step-2 --accent --accent-ink --band --band-ink --band-soft`, mapped in `@theme` to
  Tailwind colours (`bg-ground`, `text-ink`, …). The fonts are exposed as `--font-display` and `--font-text`, with
  utilities `font-display` and `font-text`. The token values are from Global Constraints, switched by
  `[data-theme="dark"]`.
- Metadata: `title "Mus'ab Olurode — Full-stack engineer"`; description
  `"Full-stack engineer with 7+ years building web apps, mobile apps and the backends behind them."`;
  `metadataBase new URL('https://musab.dev')`; `alternates.canonical '/'`. The OG image is 1200×630 with the name in
  Instrument Serif and the promise line, on the light tokens; export `dynamic = 'force-static'`.
- Analytics: render the Cloudflare Web Analytics beacon
  `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"…"}'>` only when
  `process.env.NEXT_PUBLIC_CF_BEACON_TOKEN` is set.

- [ ] **Step 1: Write the failing e2e test** `meta.spec.ts`: on `/`, `<title>` matches the title above;
      `link[rel=canonical]` has href `https://musab.dev/`; `meta[property="og:image"]` exists and its URL returns 200
      from the static server. On `/does-not-exist`, the 404 page text "Page not found" is visible.
- [ ] **Step 2:** `npm run e2e -- meta`. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** `npm run e2e -- meta`. Expected: PASS.
- [ ] **Step 5: Commit** with `feat: add layout tokens, metadata, OG image and 404`.

### Task 6: Hero and figures

**Files:**

- Create: `src/components/sections/Hero.tsx`, `src/components/sections/Figures.tsx`, `src/components/OverlapLine.tsx`,
  `src/components/CountUp.tsx`, `tests/e2e/hero.spec.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**

- Consumes: `profile`, `figures` (Task 2); `getOverlap`, `overlapSentence` (Task 3); `ThemeToggle` (Task 4).
- `OverlapLine` server-renders `It's —:— in my working day (GMT+1).` with no overlap sentence, then fills both in on
  mount and updates every 60 s. `CountUp({ value: number; format?: (n: number) => string })` renders the final value in
  HTML and animates from 0 only on first view, when motion is allowed.
- Layout as in artboard D sections 1–2, with sizes on the five type steps: name `clamp(64px, 15vw, 218px)` on one line
  from 768px (it may wrap to two below that); statement `clamp(28px, 3vw, 44px)`; figures paragraph
  `clamp(32px, 4.4vw, 64px)`. The hero is `min-height: 100svh`. The top bar holds the tagline at left and Work, CV and
  ThemeToggle at right. The Hire me `<a href="mailto:me@musab.dev">` is at least 44px tall.

- [ ] **Step 1: Write the failing e2e tests**:
  - The `h1` is "Mus'ab Olurode"; `getByRole('link', { name: 'Hire me' })` has href `mailto:me@musab.dev`; the text
    "Senior Full Stack Engineer, Institute for Canadian Citizenship" is visible.
  - With `test.use({ timezoneId: 'Asia/Tokyo' })`, the page shows "Our workdays don't overlap" and has no `NaN`.
  - With `timezoneId: 'Europe/London'`, it shows "8 hours of overlap".
  - There are no console errors, and no warning containing "hydrat".
- [ ] **Step 2:** `npm run e2e -- hero`. Expected: FAIL.
- [ ] **Step 3:** Implement the components.
- [ ] **Step 4:** `npm run e2e -- hero`. Expected: PASS.
- [ ] **Step 5: Commit** with `feat: add hero, figures sentence and live overlap line`.

### Task 7: Project screenshots

**Files:**

- Create: `scripts/capture-screenshots.mjs`,
  `public/work/{canoo-web,canoo-app-1,canoo-app-2,newborn,cematchmaker,worldkite,ericc,scrapays}.webp`,
  `public/work/SOURCES.md`

**Interfaces:**

- Produces: the image paths referenced by `projects[].image` (Task 2): `/work/<slug>.webp`, with Canoo using
  `/work/canoo-web.webp` plus `canoo-app-1/2` for the app.
- The script uses Playwright Chromium at 1440×1800 (desktop), waits for `networkidle` plus 1.5 s, dismisses cookie
  banners by clicking the most privacy-preserving option (reject/decline) when one is found, and writes PNG to a tmp
  folder. Convert to WebP at quality 80, 1200px wide, with `sharp` (a dev dependency) inside the same script. URLs:
  `https://canoo.ca/`, `https://newborntoolkit.org/`, `https://cematchmaker.com/`, `https://worldkite.co.uk/`,
  `https://ericchelpdesk.org/`, `https://scrapays.com/`.
- Canoo app: take two screenshots from its public App Store or Google Play listing (no member data) and record the
  source URLs in `SOURCES.md`. If neither listing can be fetched, show only `canoo-web` and say so in the final report.

- [ ] **Step 1:** Run `npm run screenshots`. Expected: 6 WebP files of 150–600 KB each.
- [ ] **Step 2:** Open each image with the Read tool. Expected: the real site is visible, with no consent banner, error
      page or blank frame. Re-capture any that fail, with a longer wait or a clip.
- [ ] **Step 3:** Get the Canoo app images and fill in `SOURCES.md`.
- [ ] **Step 4: Commit** with `feat: add project screenshots`.

### Task 8: Pinned work, Also built, CV band, Footer

**Files:**

- Create: `src/components/sections/{PinnedWork,AlsoBuilt,CvBand,Footer}.tsx`, `tests/e2e/sections.spec.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**

- Consumes: `projects`, `alsoBuilt`, `roles`, `profile` (Task 2), and the images (Task 7).
- `PinnedWork`: from 1024px up, a wrapper `height: calc(var(--n) * 100svh)` holding a
  `position: sticky; top: 0; height: 100svh` stage. The pinned title "Web, mobile and backend." is set at
  `clamp(56px, 13vw, 190px)` in serif. Each project is a full-height panel with a 4:5 `next/image`, name (h3), line and
  `org · years`, linking to `url` (new tab, `rel="noreferrer"`). Below 1024px there's no sticky: a stacked list of 16:10
  images with captions. The section has `id="work"` and an `h2` "Selected work" that is visually hidden on desktop (the
  pinned title is decorative text, `aria-hidden`).
- `AlsoBuilt`: an `h2` "Also built" and rows as in artboard D. A row with a `url` is an `<a>`. `:hover`/`:focus-within`
  on the list dims the sibling rows to `--soft`.
- `CvBand` (`id="cv"`): an `h2` "Seven years, five teams"; each role shows company (serif), then
  `title · type/region · start to end`; and a "Download the résumé" link to `profile.resumePdf`.
- `Footer`: "Hiring for web, mobile or backend? Write to me."; the display email link `mailto:me@musab.dev`, sized
  `clamp(40px, 9.5vw, 140px)` to fit at 390px; and the meta row: GitHub, LinkedIn, X · Résumé (PDF) · the current year.

- [ ] **Step 1: Write the failing e2e tests**:
  - Six project names are visible in order; the PANSAA subsite link is present.
  - Each project link has its `url`.
  - "Naseeb by Qadr" links to `https://naseeb-by-qadr.pages.dev/`.
  - "Senior Frontend Developer" appears in `#cv`.
  - Every `a[href^="mailto:"]` equals `mailto:me@musab.dev`.
  - The page HTML does not contain `gmail`.
  - The résumé link's href `/musab-olurode-resume.pdf` is present.
  - At a 390×844 viewport, `document.documentElement.scrollWidth <= 390` and no element under `#work` has computed
    `position: sticky`.
- [ ] **Step 2:** `npm run e2e -- sections`. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** `npm run e2e -- sections`. Expected: PASS. The PDF link is allowed to 404 until Task 10.
- [ ] **Step 5: Commit** with `feat: add pinned work, also built, CV band and footer`.

### Task 9: Motion layer

**Files:**

- Create: `src/components/Reveal.tsx`, `tests/e2e/motion.spec.ts`
- Modify: `src/app/globals.css`, the section components, `Hero.tsx`, `PinnedWork.tsx`

**Interfaces:**

- `Reveal({ children, delay?: number, as?: keyof JSX.IntrinsicElements })`: it sets `data-reveal` on mount and
  `data-shown` once ≥ 15% is visible (one IntersectionObserver per element, disconnected after it fires). CSS hides only
  `[data-reveal]:not([data-shown])` (`opacity: 0; translate: 0 24px`) and transitions over 700 ms with
  `cubic-bezier(0.2, 0, 0, 1)`, the delay coming from `--d`. Because the attribute is added by JS, content with JS off
  is never hidden.
- Stagger: within a section, the heading is delay 0, the text 80 ms and the picture 160 ms.
- Hero load: each name line is wrapped in `overflow: hidden` with an inner span animating `translate: 0 105%` → `0` over
  900 ms; the second line starts 110 ms later. The promise, Now/Stack and button fade up after 500 ms. Pure CSS
  keyframes.
- Pinned panels: the image enters from `scale: 1.04; opacity: 0` via Reveal.
- Buttons: `:active { scale: 0.97 }`. Links: underline offset animation on hover.
- `@media (prefers-reduced-motion: reduce)`: every `translate` and `scale` is 0, and durations are ≤ 150 ms (opacity
  only). `switchTheme` already skips the circle.

- [ ] **Step 1: Write the failing e2e tests**:
  - With `javaScriptEnabled: false`, every `h2` and `img` in `main` has computed opacity `"1"`.
  - With `reducedMotion: 'reduce'`, scrolling to the bottom leaves no element with opacity `< 1` after 300 ms.
  - With `startViewTransition` deleted via `addInitScript`, clicking the theme toggle sets `html[data-theme="dark"]`,
    and after a reload it is still `dark` before any click. Also check that the computed background of `body` equals
    `rgb(26, 32, 57)` within 100 ms of `DOMContentLoaded`.
- [ ] **Step 2:** `npm run e2e -- motion`. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** `npm run e2e`. Expected: all suites PASS.
- [ ] **Step 5: Commit** with `feat: add motion layer with reduced-motion fallbacks`.

### Task 10: Résumé page and PDF

**Files:**

- Create: `src/app/resume/page.tsx`, `src/app/resume/resume.module.css`, `scripts/build-resume-pdf.mjs`,
  `public/musab-olurode-resume.pdf`, `tests/e2e/resume.spec.ts`

**Interfaces:**

- Consumes: `profile`, `roles`, `education`, `skills`, `summary` (Task 2).
- Port the old layout exactly: A4 210mm × 297mm white page, `@page { size: A4; margin: 15mm 0 }`, `font-sans`, a centred
  header, section headings `#003366` bold uppercase with a bottom border (allowed: the résumé is a document, so exclude
  `/resume` from the taste inspector), titles `#800000`, italic company and place, single column. Sections: Professional
  Summary, Core Competencies, Work Experience (from `roles`), Education, Projects, Additionals, References.
- Header line: `Remote (GMT+1) | me@musab.dev | LinkedIn Profile | Github | Portfolio`, where the links go to
  `profile.links` and `https://musab.dev`. There's no phone and no "Kwara, NGA".
- A "Download PDF" link at the top right links to `profile.resumePdf`, with `print:hidden`. The page is forced to light
  colours whatever the theme.
- `build-resume-pdf.mjs`: serves `out/` (reuse `serve` on a random port), opens `/resume` in Chromium, emulates `print`
  media, and runs `page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true })` into
  `public/musab-olurode-resume.pdf`. npm script: `resume:pdf` =
  `npm run build && node scripts/build-resume-pdf.mjs && npm run build` (the rebuild copies the PDF into `out/`).

- [ ] **Step 1: Write the failing e2e tests**:
  - `/resume` shows "Senior Full Stack Engineer" before "Senior Frontend Developer".
  - It contains `me@musab.dev`.
  - It does not contain `+234`, `Kwara` or `gmail`.
  - `/musab-olurode-resume.pdf` returns 200 with `content-type` `application/pdf`.
- [ ] **Step 2:** `npm run e2e -- resume`. Expected: FAIL.
- [ ] **Step 3:** Implement, then run `npm run resume:pdf`.
- [ ] **Step 4:** `npm run e2e -- resume`. Expected: PASS. Then Read the PDF (pages 1–2). Expected: two A4 pages at
      most, nothing clipped, and the layout matches the old résumé style.
- [ ] **Step 5: Commit** with `feat: rebuild résumé page and generate PDF`.

### Task 11: Design gate and look-and-fix

**Files:**

- Modify: whatever the critique finds

- [ ] **Step 1:** Run `node ~/.claude/skills/design-taste-frontend/scripts/lint.mjs src/app src/components`. Expected:
      no FAIL. Defend each WARN in one sentence or fix it.
- [ ] **Step 2:** Run `npm run build && npm run serve` (background), then
      `node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:4173/`. Expected: no FAIL at
      1440, 768 or 390. The image floor is met by the screenshots.
- [ ] **Step 3:** Read every screenshot in `.taste-skill/inspect/` and write the critique per `references/critique.md`.
      Fix the top three problems and re-run Step 2. Three rounds at most.
- [ ] **Step 4:** `npm run e2e && npm test && npm run lint`. Expected: all PASS.
- [ ] **Step 5: Commit** with `style: design gate fixes`.

### Task 12: Cloudflare preview and deploy handoff

**Files:**

- Create: `docs/deploy.md` (the manual steps below)
- Modify: `README.md` (dev/build/deploy commands)

- [ ] **Step 1:** `npm run build && npx wrangler dev --port 8787` (background). Run
      `curl -s -o /dev/null -w '%{http_code}'` against `/`, `/resume`, `/resume/`, `/musab-olurode-resume.pdf` and
      `/nope`. Expected: `200 200 200 200 404` (`/resume/` may answer with a 307 to `/resume`, which is fine), and the
      `/nope` body contains "Page not found".
- [ ] **Step 2:** Write `docs/deploy.md`. It covers `npx wrangler login`, then `npm run deploy`. In the dashboard:
      Workers → musab-dev → Settings → Domains & Routes → add the custom domain `musab.dev` (and `www.musab.dev`). A
      redirect rule on the musabolurode.dev zone sends everything to `https://musab.dev/$1` with a 301. Turn on Web
      Analytics for musab.dev, or set `NEXT_PUBLIC_CF_BEACON_TOKEN`. Remove the Vercel project once musab.dev serves
      from Cloudflare.
- [ ] **Step 3: Commit** with `docs: add Cloudflare deploy guide`.
- [ ] **Step 4:** Ask Mus'ab before running `npm run deploy` (it publishes the site); he runs `wrangler login` himself.
