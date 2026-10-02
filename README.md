# ZenPen — zenpengh.com

Landing page for **ZenPen** (Zen Pen Enterprise), a Ghanaian online-first retail
business: Mobile Electronics & Accessories, Fashion & Apparel, Beauty & Personal Care.
Tagline: **Shop calm. Live bold.**

## Stack
- Next.js 16 static export (`out/`), Tailwind CSS 4, TypeScript
- Fonts self-hosted at build time (Bricolage Grotesque + Inter) — no Google CDN calls
- `public/send-inquiry.php` emails form submissions (runs on Namecheap cPanel PHP)
- Hosting: Namecheap shared hosting (cPanel / LiteSpeed), domain zenpengh.com

## Everyday commands
```bash
npm ci            # install exact dependency versions
npm run dev       # live-editing dev server
npm run build     # produce the static site in out/
npm run brand     # regenerate favicon, app icons, OG image, logo PNGs from assets/*.svg
node scripts/serve-out.mjs 7310   # preview the built out/ folder locally
```

## Where to change things
- **All business details and copy:** `lib/site.ts`. Text wrapped in `ph("…")` shows in
  **bold red ink** on the site = a proposal awaiting the owner's confirmation. Replace
  `ph("…")` with a plain `"…"` string once confirmed.
- When no red ink remains, set `isPreview: false` in `lib/site.ts` so search engines index the site.
- Colours: `app/globals.css` (`:root` tokens). Logo: `components/Logo.tsx` + `assets/*.svg`.

## Deploy (cPanel)
1. `npm run build`
2. Zip the contents of `out/` (`tar -a -c -f zenpen-site.zip -C out .`)
3. cPanel → File Manager → domain root for zenpengh.com → upload → extract (overwrite).
4. After SSL is active, uncomment the HTTPS-ENABLE lines in `public/.htaccess` and redeploy.
