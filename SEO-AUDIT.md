# nasiruddin.net — SEO, AEO & GEO Audit

**Date:** 8 September 2026
**Stack:** Next.js 16.1.6, App Router
**Scope:** 22 findings across 4 severity tiers, based on a direct read of the repository (`app/`, `components/`, `models/`, `lib/`, `public/`). No live crawl was run — verify indexing status and Core Web Vitals in Google Search Console after fixes ship.

## Verdict

The foundation is better than most portfolio sites — server-rendered pages, per-route metadata, sitewide Person/WebSite schema, and a `robots.txt` that already allow-lists AI crawlers. But three routing gaps mean a meaningful slice of the site's own content is currently unreachable by anyone, human or bot, and several multi-megabyte unoptimized images are actively working against Core Web Vitals.

## Scorecard

| Area | Grade | Why |
|---|---|---|
| Technical SEO | D+ | Broken routes reachable from the sitemap itself |
| On-Page SEO | C | Solid metadata, but 4 pages ship with no H1 |
| Performance | D | 2.4MB hero image served unoptimized |
| AEO | C− | No FAQ content or answer-shaped schema yet |
| GEO | C+ | AI crawlers are welcomed in, then hit the same 404s |

---

## Executive summary

1. Every News & Blog article link points at a route that doesn't exist.
2. The Photos page is nine broken images.
3. The homepage's priority image is a 2.4MB PNG served with optimization turned off.
4. Four pages have no H1 at all.
5. An hreflang alternate points at a page that has never existed.

---

## Critical (4)

Breaks crawling, indexing, or the page for real visitors right now.

### 01 — Sitemap and article cards link to a missing dynamic route
**Where:** `sitemap.js:27,34` · `app/components/PressCard.jsx:23` · `app/components/RecentPress.jsx` (via PressCard)

**Issue:** `sitemap()` generates a URL per news/blog item as `/news-blogs/${item.id}`, and every `PressCard` links there too. No `app/news-blogs/[id]` folder exists, so every one of those URLs 404s.

**Impact:** Google (and every AI crawler this site explicitly invites in via `robots.js`) discovers these URLs straight from `sitemap.xml` and finds them broken — that's a direct crawl-budget and trust hit, not a stray internal link. Visitors clicking any article from the homepage or the News & Blogs page land on a 404.

**Fix:** Build `app/news-blogs/[id]/page.jsx` (mirror `app/projects/[id]/page.jsx`'s pattern) with `generateMetadata` pulling title/description from the News or Blog document, plus `Article`/`NewsArticle` JSON-LD once it exists.

### 02 — Photos page: 100% broken images
**Where:** `app/photos/page.jsx:7-17`

**Issue:** The `photos` array hardcodes `/ab4.jpg`, `/ab5.jpg`, `/abdulla-1.jpg`, `/abdullah2.jpg`, `/heroBG.jpeg` — none of these files are in `/public` (confirmed by directory listing).

**Impact:** An entire indexed, sitemap-listed page renders nothing but broken-image icons. Zero chance of image-search traffic from a page whose entire purpose is photos, and a bad trust signal for anyone who lands on it directly.

**Fix:** Point the array at real files in `/public` (e.g. reuse `about_img.png`, `betopiagroup.jpg`, `graduation.jpg`) or upload the intended photoset and update the paths.

### 03 — Multi-megabyte hero image shipped with Next.js image optimization disabled
**Where:** `app/components/AboutSection.jsx:54-61` · `public/about_img.png` (2.4MB)

**Issue:** The homepage's about-image `<Image>` carries both `unoptimized` and `priority`. `unoptimized` tells Next.js to skip resizing, compression, and modern-format (WebP/AVIF) conversion entirely — on the exact image marked as highest-priority to load first. The same `unoptimized` pattern repeats on project thumbnails (`ProjectSection.jsx`) and the Photos gallery.

**Impact:** Largest Contentful Paint — a Google ranking signal — is directly governed by how fast this element paints. A 2.4MB PNG loaded at full resolution on mobile is a guaranteed poor LCP score in PageSpeed Insights / Search Console's Core Web Vitals report.

**Fix:** Remove `unoptimized` everywhere it's applied to local files in `/public` (it's typically only needed for remote/animated sources). Re-export the source PNGs as compressed JPEG/WebP before upload — several files in `/public` exceed 500KB (`betopiagroupnews2.png` 2.0MB, `nasirHeroBG.png` 1.4MB, `diit_project.png` 904KB, `diu_media.png` 824KB, `diunews1.png` 712KB).

### 04 — "Load more" on the homepage press section links to a page that doesn't exist
**Where:** `app/components/RecentPress.jsx:25`

**Issue:** The button links to `/news`. The actual route is `/news-blogs`.

**Impact:** Anyone using the one navigation path built specifically to see more press coverage hits a 404 instead.

**Fix:** Change the `href` to `/news-blogs`.

---

## High priority (6)

Not crawl-breaking, but measurably suppressing rankings, CTR, or crawl efficiency.

### 05 — No H1 on /projects, /contact, /news-blogs, or /photos
**Where:** `app/components/AnimatedHeading.jsx:41`

**Issue:** Every page title on the site runs through `AnimatedHeading`, which hardcodes an `<h2>`. Home, About, Experience, CV, and the project/search pages each separately declare a real `<h1>` elsewhere on the page — these four don't, anywhere.

**Impact:** The H1 is still one of the clearest single-element relevance signals a page can send. These four pages currently send none.

**Fix:** Add an `as`-style prop to `AnimatedHeading` (default `h2`) and set it to `h1` once per page on these four routes.

### 06 — Project URLs are raw MongoDB ObjectIds
**Where:** `models/Project.js` · `app/projects/[id]/page.jsx`

**Issue:** `Project` has no `slug` field, so every case-study URL looks like `/projects/671fa2e9c8b4a1f0d3e5b721` instead of `/projects/betopia-group-website`.

**Impact:** URLs are a (small) ranking signal and a real CTR signal — a keyword-bearing slug in the search snippet reads as relevant; a hex string reads as untrustworthy or auto-generated.

**Fix:** Add a `slug` field, generate it from the title on save, and resolve `[id]` by slug with an id fallback for existing links.

### 07 — Sitemap omits /photos entirely
**Where:** `app/sitemap.js:7`

**Issue:** `staticRoutes` lists `"", "/about", "/projects", "/news-blogs", "/contact", "/cv", "/experience"` — `/photos` is missing.

**Impact:** Once the broken-image issue above is fixed, this page has real image-search potential — but it's invisible to the sitemap that's supposed to surface it.

**Fix:** Add `"/photos"` to the array.

### 08 — hreflang alternate references a nonexistent page
**Where:** `app/layout.js:19-24`

**Issue:** `alternates.languages` declares `en-US → /en-US`. There is no `/en-US` route anywhere in the app — the entire site is served at root-level English paths.

**Impact:** An invalid hreflang target is exactly the kind of thing Search Console's International Targeting / hreflang reports flag, and it signals a language variant to Google that will 404 if followed.

**Fix:** Delete the `languages` block entirely (single-language sites don't need it), or point it at `"/"` as a self-referencing alternate if the intent was just to declare the locale.

### 09 — /admin/* isn't excluded from crawling
**Where:** `app/robots.js` · `proxy.js`

**Issue:** `proxy.js` correctly redirects unauthenticated requests to `/admin/login` — but `robots.js` only disallows `/api/` and `/dashboard/`, not `/admin/`, and the login page has no `noindex` meta.

**Impact:** Every crawler that finds an internal link to `/admin`, `/admin/projects`, etc. gets redirected to a real, 200-status, indexable login page — wasted crawl budget on pages with no search value, and needless public surfacing of the admin surface.

**Fix:** Add `"/admin/"` to the `disallow` list in `robots.js`, and add `robots: { index: false }` to metadata in `app/admin/login/page.jsx` as a belt-and-suspenders measure.

### 10 — Sitewide image weight is out of proportion to the content
**Where:** `/public/*.png`, `*.jpg`

**Issue:** Several source images used across the site are 700KB–2.4MB PNGs/JPEGs never run through compression: `about_img.png` 2.4MB, `betopiagroupnews2.png` 2.0MB, `nasirHeroBG.png` 1.4MB, `diit_project.png` 904KB, `diu_media.png` 824KB, `diunews1.png` 712KB.

**Impact:** Even where `unoptimized` isn't set, Next.js's image pipeline can only do so much with a bloated source file — total page weight and mobile load time both suffer, which affects both rankings and real user bounce rate.

**Fix:** Re-export each as a compressed JPEG or WebP at the actual display resolution before adding to `/public`. Target well under 300KB for content photos, under 150KB for thumbnails.

---

## Medium (7)

Worth cleaning up — each trims a bit of ranking or trust potential rather than blocking anything outright.

### 11 — Structured data stops at Person + WebSite
**Where:** `app/layout.js:75-110`

The two sitewide JSON-LD blocks are a solid base, but no page adds its own: no `BreadcrumbList` anywhere, no `CreativeWork`/`Project` schema on case studies, no `Article`/`NewsArticle` on press items (once that route exists), no `FAQPage`.

**Fix:** Layer page-specific JSON-LD on top of the existing global blocks rather than replacing them — see the AEO/GEO sections below for which schema types matter most here.

### 12 — Generic alt text on several images
**Where:** `app/components/Sidebar.jsx:125` ("Logo") · `app/components/PressCard.jsx:35` ("Press Image") · `app/projects/[id]/page.jsx:141` ("Feature View") · `app/photos/page.jsx:73` ("Professional Photo 1"…)

Fallback alt text describes the element's role, not its content — none of it would help the image rank for anything.

**Fix:** Use descriptive, specific fallbacks: e.g. "Nasir Uddin logo", "{title} — feature screenshot", "Nasir Uddin professional headshot {n}".

### 13 — Every project/news/blog page shares one generic Open Graph image
**Where:** `app/layout.js:32-40` · `app/projects/[id]/page.jsx:9-22`

`generateMetadata` on the project detail page sets title and description per project, but never overrides `openGraph.images` — every project link shared on social or pasted into an AI chat renders the same site-wide `ogimg.png` instead of that project's own cover image.

**Fix:** Pass `project.coverImage || project.image` into an `openGraph.images` override in each `generateMetadata`.

### 14 — Internal search results are indexable
**Where:** `app/search/page.js`

`/search?q=` has no canonical and no `noindex`. Query-parameter search pages are the textbook case Google's own documentation asks sites to keep out of the index.

**Fix:** Add `robots: { index: false, follow: true }` to the page's metadata.

### 15 — /photos has no canonical, /cv's canonical only lives in the page, not the layout
**Where:** `app/photos/layout.js` · `app/cv/layout.js`

Most routes set `alternates.canonical`; `/photos` never does at either the layout or page level.

**Fix:** Add `alternates: { canonical: "/photos" }` to `app/photos/layout.js`.

### 16 — Duplicate metadata declarations between layout and page
**Where:** `app/projects/layout.js` + `page.js` · `app/cv/layout.js` + `page.jsx`

Both files define near-identical `title`/`description` for the same route. Harmless functionally (the page-level one wins), but it's dead weight that will drift out of sync the next time one gets edited and not the other.

**Fix:** Keep metadata in one place per route — the page file, since it already needs to exist for the content.

### 17 — No privacy policy or terms page behind two data-collecting forms
**Where:** `app/components/Footer.jsx:79-85`

The footer's "Privacy Policy" and "Terms of Use" both link to `#`. Meanwhile the site runs a newsletter signup and a contact form, both collecting personal data.

**Impact:** This is a genuine trust/E-E-A-T gap — Google's quality guidance explicitly looks for this on sites collecting personal information, and it's the kind of thing a human reader (or a hiring manager) notices too.

**Fix:** Publish a real, short privacy policy page and link it from the footer.

---

## Low / polish (5)

Small inconsistencies and dead UI — worth a pass, none of them urgent on their own.

### 18 — Contact and project-inquiry forms don't actually submit anywhere
**Where:** `app/contact/ContactClient.jsx:42-44` · `app/projects/[id]/page.jsx:215-263`

The Contact page form calls `console.log` and an `alert()` on submit with no backend call. The project detail page's inquiry form has no `onSubmit` handler at all, so clicking "Send inquiry" just reloads the page.

**Impact:** Not a ranking factor directly, but every lead this site is built to capture is currently going nowhere — worth flagging alongside the SEO work since it undercuts the whole point of ranking well.

### 19 — Social share buttons and newsletter subscribe are non-functional
**Where:** `app/projects/[id]/page.jsx:93-104` · `app/components/Footer.jsx:49-54`

The four share icons on project pages link to `#`; the footer's newsletter "Subscribe" is a `type="button"` with no click handler.

### 20 — Sitemap lastmod is always "now," never the real content date
**Where:** `app/sitemap.js:9`

Static routes get `lastModified: new Date().toISOString()` — a fresh timestamp on every build/request rather than when the page's content actually changed.

**Fix:** Fine to leave as-is if it's simpler, but if freshness signals matter to you, hardcode real dates or drop the field for static routes (Google treats a missing lastmod as "unknown," which is more honest than a fake one).

### 21 — Twitter handle in metadata should be double-checked
**Where:** `app/layout.js:46`

`twitter.creator: "@nasiruddin"` — worth confirming this is actually your handle before it ships; a wrong or unclaimed handle in card metadata just does nothing rather than helping.

### 22 — Homepage title diverges slightly from the site-wide default
**Where:** `app/page.js:8` vs `app/layout.js:7`

Root layout default: "Software Engineer & Digital Marketer." Home page override: "Software Engineer & Full-Stack Digital Marketer." Minor, but worth picking one phrasing for brand consistency across the SERP snippet and every other surface that falls back to the default.

---

## AEO — Answer Engine Optimization

**What this means here:** Google's AI Overviews, Bing Copilot, and voice assistants don't rank a page and send a click — they lift a short, self-contained answer straight out of it. Pages win here by stating facts in plain, quotable sentences and by marking them up as explicit question/answer or entity data, not by having good prose alone.

**Gap — No FAQ content or FAQPage schema anywhere on the site.** There isn't a single explicit Q&A block — "Who is Nasir Uddin?", "What technologies does he work with?", "Is he available for hire?" — anywhere in the codebase. This is the single highest-leverage AEO addition available: a short FAQ section on `/about` or the homepage, marked up with `FAQPage` JSON-LD, gives an answer engine exactly the shape of content it prefers to quote.

**Gap — Person schema understates the current role.** (`app/layout.js:85-88`) The sitewide `Person` schema sets `worksFor.name: "Self-Employed"`, while the CV page (`app/cv/page.jsx:156-164`) states the current role is Software Engineer & Executive at Betopia Group. An answer engine asked "where does Nasir Uddin work" will trust the structured data over the prose — right now that data point is wrong. Add `alumniOf` (from the education records already in the CMS) and correct `worksFor` while you're in there.

**Opportunity — Lead paragraphs aren't written as lift-out answers.** The About page's opening line is strong copy but reads as narrative, not a self-contained definition. A single added sentence near the top — "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, Bangladesh, working at Betopia Group" — gives an answer engine a clean, factual sentence to extract verbatim instead of having to synthesize one.

---

## GEO — Generative Engine Optimization

**What this means here:** This is about how ChatGPT, Perplexity, Claude, and Gemini describe Nasir Uddin when someone asks them directly — governed by whether their crawlers can reach the content at all, and by how much structured, unambiguous entity data (JSON-LD) they find when they do.

**Strength — robots.js already explicitly welcomes AI crawlers.** (`app/robots.js:9-12`) GPTBot, ChatGPT-User, Google-Extended, Claude-Web, anthropic-ai, PerplexityBot, and CCBot are all explicitly allowed. Most sites either block these by default or never think about them — this is already ahead of the curve and worth keeping as-is.

**Undercut by finding #01 — The welcome mat leads straight to the same broken routes.** Every AI crawler listed above discovers URLs the same way Googlebot does — through `sitemap.xml` and internal links. Right now that means they hit the identical `/news-blogs/[id]` 404s as everyone else (finding #01) and the same broken image set on `/photos` (finding #02). Explicitly allowing these crawlers only pays off once the content they're being pointed at actually resolves — this is the same fix, twice the payoff.

**Gap — Two JSON-LD blocks is thin entity data for a generative engine to work with.** Generative engines lean on structured data more heavily than traditional search, precisely because it's unambiguous. `Person` + `WebSite` gives them a name, a job title, and a search action — it doesn't give them a single project, a single piece of experience, or a single skill in machine-readable form. Adding `CreativeWork` schema to project pages and enriching the `Person` block (see AEO section above) would directly change how completely tools like Perplexity or ChatGPT can answer "what has Nasir Uddin built?"

---

## Page-by-page matrix

| Route | H1 | Canonical | In sitemap | Page-specific schema | Notes |
|---|---|---|---|---|---|
| `/` | Yes | Yes | Yes | Global only | About-section image is the 2.4MB unoptimized file (#03) |
| `/about` | Yes | Yes | Yes | Global only | Best content depth on the site |
| `/experience` | Yes | Yes | Yes | Global only | — |
| `/projects` | **No** | Yes | Yes | Global only | Missing H1 (#05) |
| `/projects/[id]` | Yes | Yes | Yes, per item | None | ObjectId URL (#06); dead form & share buttons (#18–19) |
| `/news-blogs` | **No** | Yes | Yes | None | Every card links to a 404 (#01); missing H1 (#05) |
| `/news-blogs/[id]` | **Missing route** | — | Generated, but 404s | None | Does not exist — the site's biggest single gap (#01) |
| `/contact` | **No** | Yes | Yes | None | Missing H1 (#05); form has no backend (#18) |
| `/cv` | Yes | Yes | Yes | None | Duplicate metadata w/ layout (#16) |
| `/photos` | **No** | **No** | **No** | None | All 9 images broken (#02); missing from sitemap (#07) |
| `/search` | Yes | **No** | Correctly excluded | None | Should be explicitly noindexed (#14) |
| `/admin/*` | n/a | No | Correctly excluded | None | Auth-gated by proxy.js, but not disallowed in robots.js (#09) |

---

## Suggested order of attack

Roughly sequenced by impact-per-hour of work — the first four are all small edits with outsized effect.

1. **(5 min)** Fix the RecentPress "load more" link (`/news` → `/news-blogs`)
2. **(15 min)** Point `/photos` at real files, or remove the placeholders
3. **(10 min)** Add `/photos` to `sitemap.js`; remove the invalid `en-US` hreflang
4. **(1–2 hrs)** Remove `unoptimized` from local-file `<Image>` usages; recompress the 6 oversized PNGs/JPEGs
5. **(30 min)** Give `AnimatedHeading` an `as` prop and set a real H1 on 4 pages
6. **(10 min)** Add `/admin/` to robots.js disallow + noindex on the login page
7. **(Half day)** Build `app/news-blogs/[id]/page.jsx`
8. **(1–2 hrs)** Add noindex to `/search`; per-project OG images; fix generic alt text
9. **(Half day)** Add slug field + slug-based URLs for projects
10. **(Half day)** Wire up the contact / inquiry forms to an actual endpoint
11. **(1–2 hrs)** Write and publish a real privacy policy page
12. **(1 day)** Add FAQ section + FAQPage schema; enrich Person schema (`worksFor`, `alumniOf`); add CreativeWork schema to project pages
