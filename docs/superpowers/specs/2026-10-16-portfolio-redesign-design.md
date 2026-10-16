# Portfolio redesign — design

Date: 2026-10-16 · Owner: Mus'ab Olurode · Repo: this one (`musab-olurode-portfolio`)

Mockups (Claude Design canvas): https://claude.ai/artifact/DkPTUDkBWctETdKykWUcJv. Artboard **D (Combined)** is the approved direction; A, B and C are the sources it borrows from.

## Intent

Mus'ab sends this site with job applications. It is out of date: it shows four old roles with vague bullets, misses his current role, and its dates disagree with the résumé page. A recruiter or hiring manager should get **who he is, what he builds and how good he is within ten seconds**, and then find the detail if they keep reading.

The core message: **he builds the whole product: app, website and backend.** The proof is Canoo, a national-scale product with 1M members.

## Goals

- One-page portfolio at `/` in an editorial look: simple, minimal, straight to the point.
- Correct, current content taken from LinkedIn plus the existing résumé (see Content).
- `/resume`: the same classic résumé layout as today, with updated content, printable to A4, and the source of the downloadable PDF.
- Tasteful motion: not static, not overkill (see Motion).
- Light and dark themes, with an animated theme switch.
- All dependencies upgraded to their latest versions.

## Non-goals

- No blog, CMS, contact form or backend.
- No LinkedIn changes yet. That is a separate follow-up after the site ships.

## Anti-goals (it fails if…)

- It looks like a generic template: icon cards, gradients, pill badges, glassy nav, emoji.
- The location (Ilorin / Nigeria) is a headline. Mus'ab has seen prejudice against Nigerian developers and wants to be judged on skills. **Don't hide it, don't feature it.** Use "Remote" or "GMT+1" in the hero, taglines and footer. Nigeria may appear where it is simply a fact (the University of Ilorin, the Scrapays employer).
- It claims Canoo as a solo build. He was **part of the team, effectively the most senior developer, and worked on every layer**. Wording: "senior engineer on the team, across the app, website and backend". Never "I built Canoo" alone.
- The motion gets in the way of reading, scroll-jacks, or plays on every scroll.

## Constraints

- Contact email everywhere: **me@musab.dev** (replaces olurodemusab@gmail.com in every mailto, the footer and the résumé).
- **Hosting moves to Cloudflare** (Mus'ab's decision). See "Decided: hosting".
- The house style of the `design-taste-frontend` skill (`~/.claude/skills/design-taste-frontend`) applies. Run its `lint.mjs` and `inspect.mjs` gate, then the screenshot critique loop. The direction sheet saved at `.taste-skill/direction.json` came from that skill. The combined direction below overrides its palette and type where they differ.
- Keep the repo's Prettier config (tabs, single quotes, JSX single quotes, print width 120).
- Use context7 to check current docs for Next.js, Tailwind and the other libraries during the upgrade (per the user's global instructions).

## Decided: the stack

- Fresh rebuild in this repo on the **latest stable Next.js** (App Router), **React**, **TypeScript** and **Tailwind CSS** (current major, CSS-first config).
- Remove DaisyUI, `theme-change`, Sass (unless the résumé still needs it; prefer plain CSS/Tailwind), `@heroicons/react`, `react-intersection-observer` (use a tiny IntersectionObserver hook or CSS scroll-driven animation), and the unused tech-logo PNGs and `constants.ts` data.
- Upgrade ESLint to its current flat config with the Next.js preset. Remove `@vercel/analytics` (Vercel-only); use Cloudflare Web Analytics instead.
- Package manager: keep yarn (there is a `yarn.lock`), unless the builder has a strong reason.
- Fonts via `next/font/google`: **Instrument Serif** (display) and **Geist** (text). Two faces, no more.

## Decided: the visual direction (artboard D)

The base is the "paper editorial" look (C), borrowing one moment from A and one from B.

**Tokens.**
- Light: ground `#f3f3f0`, ink `#141414`, soft ink `#4a4a46`, tone step `#e9e9e4` / `#e4e4df`, accent `#0f5c3f` (deep green, used on the primary button only).
- Dark theme = A's palette: ground `#1a2039`, surface `#212846`, ink `#f9a3c0`, soft ink `#b9879c`. Accent in dark: pink fill with navy text.
- The CV band is navy and pink in both themes. *(My call: in dark mode the band uses the surface tone `#212846`, so it still stands apart from the `#1a2039` page.)*
- No thin rules, gradients, shadows at rest, eyebrow labels, monospace, or 01/02/03 numbering. Surfaces are separated by tone steps and space.

**Sections, in order** (copy as in artboard D, with the edits below):

1. **Hero.** Top bar: "Full-stack engineer · Remote" at left; Work, CV and the theme toggle at right. "Mus'ab Olurode" in Instrument Serif at full width (about 15vw, one line on desktop). At the bottom of the first screen: the promise "I build the whole product: the app, the website and the backend behind them." at statement size, "Now: Senior Full Stack Engineer, Institute for Canadian Citizenship", "Stack: TypeScript, React, Next.js, React Native, Node, NestJS", and a solid **Hire me** button (mailto).
2. **Figures sentence** (from A). "Since 2019 I have shipped for 5 teams in 4 countries. The latest, Canoo, has welcomed 1,000,000 newcomers to Canada, with me as the senior engineer on its app, site and backend." The figures are in full ink, the rest in soft ink. Beneath it, the **live overlap line**: "It's HH:MM in my working day (GMT+1). That's N hours of overlap with yours." Compute N from the visitor's time zone, assuming a 9–17 workday on both sides. Show the visitor's city where `Intl` provides a time-zone name, otherwise "your time". If N is 0, write a graceful line instead (e.g. "Our days don't overlap, but I adjust my hours for the team."). Server-render a sensible fallback, with no hydration mismatch.
3. **Pinned work** (from B). "Web, mobile and backend." is pinned (`position: sticky`) across a run of panels. Each panel is one project screenshot in a 4:5 frame, with the project name, a one-line description, the role/company and the year. Projects: **Canoo** (canoo.ca and the app), **Newborn Toolkit** (newborntoolkit.org, plus its PANSAA subsite pansaa.newborntoolkit.org), **CEMatchMaker** (cematchmaker.com), **WorldKite** (worldkite.co.uk), **Ericc Help Desk** (ericchelpdesk.org), **Scrapays** (scrapays.com). Screenshots: Mus'ab has approved using them. Capture real screenshots of the live sites in desktop view. For the Canoo app, use its public App Store / Google Play listing screenshots (Mus'ab's decision). Optimise them and store them in the repo with `next/image`. On a phone, the pin is released into a simple stacked list.
   Panel captions *(my call, taken only from existing résumé facts, no new metrics)*, newest first:
   - Canoo: "Free app opening Canada's museums, parks and concerts to newcomers. Senior engineer on the team across the app, canoo.ca and the backend." · ICC · 2025–now
   - Newborn Toolkit: "Implementation toolkit for small and sick newborn care, co-created by NEST360 and UNICEF, with the PANSAA partnership subsite." · Studio 14 · 2022–25 (secondary link: PANSAA → https://pansaa.newborntoolkit.org/)
   - CEMatchMaker: "Platform revamp: 35% faster, 40% more engagement." · Studio 14 · 2022–25
   - WorldKite: "Residency and tax tracker; page loads cut in half." · Studio 14 · 2022–25
   - Ericc Help Desk: "Admin panel for an NGO help desk; 25% less admin work." · Studio 14 · 2022–25
   - Scrapays: "First version of the recycling platform: web, Android app and real-time IoT tracking." · Scrapays · 2020–22
   Studio 14 projects use the employment span, not invented single years.
4. **Also built.** A quiet ledger: Sandwell Business Growth (council business-support site, Studio 14 → https://www.sandwell.gov.uk/SBG/), Gender Lens (gender-lens investing site for Plan International's Impact Lab, Studio 14), Montech (Web3 backends, 10,000+ concurrent users), a wedding website, Naseeb by Qadr (build; design by Qoreeb Abubakar), and this site (link to GitHub). Hovering a row dims the others. No image previews in this list. Links: wedding website → https://naseeb-by-qadr.pages.dev/; Gender Lens (Plan International Impact Lab) → https://gender-lens-wp.s14staging.uk/ (no separate production site could be found, so Mus'ab chose the staging URL); Montech has no link.
5. **CV band** (navy/pink). "Seven years, five teams", with each role: company, title, "Remote" plus region, and dates. A **Download the résumé** button links to the PDF.
6. **Footer.** "Hiring for web, mobile or backend? Write to me." The email **me@musab.dev** set at display size as one mailto link. A small row: GitHub, LinkedIn, X · Résumé (PDF) · year.

**Phone layout** is its own composition: the name may break to two lines, the pin is released, the ledgers become two-line rows, and the email is sized to fit the width.

## Content (source of truth)

Titles: Mus'ab asked for both the ICC and Studio 14 roles to reflect the senior level he worked at. Use **Senior Full Stack Engineer** (ICC) and **Senior Frontend Developer** (Studio 14) everywhere: the site, the résumé and, in the follow-up, LinkedIn, so all three match.

| Company | Title | Type / place | Dates |
| --- | --- | --- | --- |
| Institute for Canadian Citizenship (ICC) | Senior Full Stack Engineer | Contract · Remote (Canada) | Jul 2025 – present |
| Studio 14 | Senior Frontend Developer | Full-time · Remote (UK) | Aug 2022 – Jul 2025 |
| Montech Studios Inc. | Back End Developer | Full-time · Remote (US) | Feb 2022 – Jul 2022 |
| Scrapays Technologies | Fullstack Developer | Full-time · Nigeria | Jan 2020 – Aug 2022 |
| The Binary Agency | Software Engineer | Freelance | Jan 2019 – Jan 2020 |

Education: B.Sc. Computer Science, University of Ilorin, Sep 2019 – Aug 2024.

Skills (union of LinkedIn, the résumé and Contra): TypeScript, JavaScript, Kotlin, Flutter, Webflow, React, Next.js, React Native, Angular (AngularJS on LinkedIn), Node.js, NestJS, Laravel/PHP, Go, GraphQL, PostgreSQL, MySQL, MongoDB, Firebase, AWS, Docker, Tailwind CSS, web3.js, CMS, Git.

Achievement bullets are reused from the current `/resume` (Studio 14: CEMatchMaker 35% / 40%, WorldKite 50%, NGO admin panels 25%; Montech: 10,000+ concurrent users, 40% latency; Scrapays: 300% growth, IoT 50%; Binary: five projects, 95%). Sources also include Mus'ab's Contra profile (contra.com/musab_olurode_zll56c9i; its 2024 Wayback snapshot listed Gender Lens, Circular Economy Matchmaker and Sandwell Business Growth front-end builds). Canoo facts are public: 1M members, 2,000+ experiences on canoo.ca, a new website launched in 2026, app plus website plus backend.

"7+ years" replaces "6 years" everywhere.

## Decided: Motion

The rules: transform and opacity only, everything has a `prefers-reduced-motion` fallback (content shown, travel dropped), and nothing blocks reading or hides content if JS fails.

- **Theme switch (signature):** the View Transitions API (`document.startViewTransition`). The new theme reveals as an expanding circle from the toggle's position (a `clip-path: circle()` animation on `::view-transition-new(root)`, about 600 ms, strong ease-out). Fallback: an instant switch, or a short crossfade. Persist the choice in `localStorage`, default to `prefers-color-scheme`, and avoid a flash of the wrong theme on load (an inline script or `next-themes`; builder's choice).
- **Load:** each line of the name rises from behind its baseline (masked), then the promise, Now/Stack and the button fade up. All under 1 s.
- **Section entrances:** heading, then text, then picture, staggered 60–90 ms and rising 16–32 px, once per section.
- **Figures** count up once on entering view.
- **Pinned work:** the title holds; each screenshot rises and settles from a slight scale (1.04 → 1); the caption swaps with it.
- **Feedback:** button press, link underline on hover, ledger row dimming and a hover preview, the clock ticking each minute.

## Decided: /resume

- **Keep the current visual style exactly** (A4 page, centered header, navy section headings, maroon titles, single column). Update the content only, from the table above.
- Header: name; "Remote (GMT+1) | me@musab.dev | LinkedIn | GitHub | Portfolio (musab.dev)". The "Kwara, NGA" line and the phone number are removed (Mus'ab's decision).
- Professional summary: rewritten for 7+ years, leading with full-stack across web, mobile and backend, and mentioning the ICC/Canoo scale.
- Add the ICC role at the top. Bullets: senior engineer on the Canoo team, working across the React Native app, the Next.js website (canoo.ca) and the Node.js backend/CMS; the platform reached 1M members; the website relaunch. *(Bullet wording is my draft for Mus'ab to review; no invented metrics.)*
- Studio 14: title "Senior Frontend Developer", dates Aug 2022 – Jul 2025. ICC title: "Senior Full Stack Engineer".
- Remove the old `v1`/`v2` résumé pages *(my call; they're in git history)*.
- **PDF:** generate the PDF from `/resume` with a script (headless Chrome/Playwright `page.pdf`, A4) into `public/`, and point every résumé link at that file. Remove the `NEXT_PUBLIC_RESUME_URL` / Google Drive dependency. Add a "Download PDF" link on `/resume` (hidden in print).

## SEO and meta

Domain: **musab.dev** (attached to the Cloudflare Worker as a custom domain; musabolurode.dev redirects to it; use `https://musab.dev` for `metadataBase`, the canonical URL, OG URLs and the résumé's Portfolio link). Title "Mus'ab Olurode — Full-stack engineer"; a description using "7+ years, web, mobile and backend"; an Open Graph image (a simple typographic card generated with `next/og` in the site's style); favicon; canonical URL.

## Decided: hosting (Cloudflare)

- The site is fully static: build with Next.js `output: 'export'` to `out/`. Use `images.unoptimized` or pre-optimised images (`next/image` has no optimiser in a static export), a statically generated OG image, and `trailingSlash` set as needed.
- Deploy to **Cloudflare Workers static assets** (assets only, no Worker script), with a `wrangler.jsonc` holding `name`, `compatibility_date` and `assets: { directory: "./out", not_found_handling: "404-page" }`. Cloudflare's docs currently recommend vinext/OpenNext only for server-rendered Next apps; a static export needs neither.
- Install `wrangler` as a devDependency (it isn't installed globally), plus `deploy` and `preview` scripts. Mus'ab runs `wrangler login` himself.
- Custom domains: add musab.dev to the Worker (the domain's DNS must be on Cloudflare). Redirect musabolurode.dev → musab.dev with a Cloudflare redirect rule. Mus'ab does the account and DNS steps in his dashboard; the plan lists them as manual steps.
- Analytics: Cloudflare Web Analytics (enabled on the zone, or the beacon script).
- Vercel stays live until Cloudflare is serving musab.dev; then Mus'ab removes the Vercel project.

## Left to the builder

Component structure, the animation implementation (CSS scroll-driven animations vs a small hook; whether to use Motion/Framer), the exact screenshot capture method, the file layout, the image formats, and whether to use `next-themes`.

## Follow-up (separate, after ship)

Update LinkedIn: add descriptions for every role (ICC/Canoo first), align titles and dates, and refresh the About section (7+ years; drop Ionic/Flutter unless still true), following the same location and Canoo-wording rules.
