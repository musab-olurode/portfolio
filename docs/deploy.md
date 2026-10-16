# Deploying musab.dev to Cloudflare

The site is a static Next.js export (`out/`) served by an assets-only Cloudflare Worker named `musab-dev` (see
`wrangler.jsonc`).

## One-time setup (in your Cloudflare account)

1. **Log in from this machine:** `npx wrangler login`. This opens a browser to authorise Wrangler.
2. **First deploy:** `npm run deploy`. This builds `out/` and uploads it. Wrangler prints a `*.workers.dev` URL; open it
   and check the site.
3. **Custom domain:** Workers & Pages → `musab-dev` → Settings → Domains & Routes → Add → Custom domain → `musab.dev`.
   Repeat for `www.musab.dev` if you want it. The musab.dev zone must be on Cloudflare DNS for this step.
4. **Redirect the old domain:** on the `musabolurode.dev` zone, go to Rules → Redirect Rules → Create. Match all
   incoming requests, set a dynamic redirect to `concat("https://musab.dev", http.request.uri.path)`, status 301, and
   keep the query string. The zone must be on Cloudflare too; otherwise set the redirect at your registrar.
5. **Analytics:** Analytics & Logs → Web Analytics → add `musab.dev`. Proxied zones get it automatically. Or copy the
   site token and build with `NEXT_PUBLIC_CF_BEACON_TOKEN=<token> npm run deploy`.
6. **Retire Vercel:** once https://musab.dev serves from Cloudflare (check the `cf-ray` response header), delete the
   Vercel project so it stops building.

## Everyday commands

| Command                    | What it does                                                |
| -------------------------- | ----------------------------------------------------------- |
| `npm run dev`              | Local dev server                                            |
| `npm test` / `npm run e2e` | Unit tests / browser tests                                  |
| `npm run preview`          | Serve the built `out/` with Wrangler locally (port 8787)    |
| `npm run resume:pdf`       | Regenerate `public/musab-olurode-resume.pdf` from `/resume` |
| `npm run screenshots`      | Re-capture project screenshots into `public/work/`          |
| `npm run deploy`           | Build and deploy to Cloudflare                              |

After changing anything in `src/content/profile.ts` that appears on the résumé, run `npm run resume:pdf` before
deploying so the PDF matches.

## Regenerating the Canoo reel

The silent loop in the Canoo panel (`public/work/canoo-reel.{webm,mp4}` and its poster) is built in code with Remotion
in `video/`:

1. `node video/scripts/record-canoo.mjs`: records a fresh 4:5 scroll through canoo.ca into `video/public/canoo-web.webm`
   (gitignored).
2. `cd video && npm install && npm run render`: renders `video/out/canoo-reel.mp4` (14 s, 1080×1350, no audio).
   `npm run studio` previews it.
3. From the repo root, compress for the web:
   - `ffmpeg -i video/out/canoo-reel.mp4 -vf scale=864:1080 -c:v libx264 -preset veryslow -crf 30 -pix_fmt yuv420p -movflags +faststart -an public/work/canoo-reel.mp4`
   - `ffmpeg -i video/out/canoo-reel.mp4 -vf scale=864:1080 -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -an public/work/canoo-reel.webm`
   - Take the first frame as `public/work/canoo-reel-poster.webp`.
