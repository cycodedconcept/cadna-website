# CADNA product, UX and conversion implementation

## Inspection and plan — 16 September 2026

The root `AGENTS.md` now requests a complete product and conversion review. The existing site is React 18 with Vite 5, React Router 6, CSS Modules, Archivo/Archivo Expanded and Framer Motion. It has a homepage, About, four concierge pages, product and case-study detail pages, unpublished insight previews, packages, FAQ, contact, a detailed request builder and supplied legal documents. The request builder prepares documents locally; there is no submission API.

Preserve the existing services, routes, pricing disclosures, request acknowledgments, supplied imagery, industry/leadership filters and motion preferences. Keep the Trusted by pause button removed.

Implementation plan:

1. Clarify the hero's audience and practical offer, with Talk to CADNA as the primary action.
2. Organize navigation around About, Services, Solutions, Case Studies, Insights and Contact; retain the concierge dropdown and package access.
3. Add explicit business outcomes to the existing four service cards and a sourced Why CADNA section.
4. Emphasize the verified Ekodrop case study and existing client metrics/logos. Keep unpublished editorial material clearly identified.
5. Add a short contact form that prepares an email, with validation, review, copy/download and an honest handoff. Preserve the detailed request flow for quotes and diagnostics.
6. Refine spacing, typography, contrast, focus and responsive behavior within the existing visual system.
7. Add canonical/share metadata, crawl files and static page output; split secondary routes to reduce the initial JavaScript payload.
8. Build and review all page types, core interactions and the nine requested widths in Chrome.

## Content sources

- Existing `src/data/divisions.js`, `requests.js`, `subscriptions.js` and `growth.js` supply the service scope and audience segmentation.
- `prd-extracted.txt` lines 275–310 document the execution model, 2016 founding, funding demand, business count and retention. Lines 852–859 supply the Ekodrop challenge, intervention and outcomes.
- Existing client and leadership assets are retained. Social destinations come from `legacy/Site Footer.dc.html` and `legacy/CADNA Landing.dc.html`.
- No new client names, statistics, testimonials, service guarantees, article publication dates or team identities will be introduced.

## Delivered experience

- A readable, immediately visible hero explains the audience, the practical meaning of the operating-system positioning and the business outcomes. Its primary action is **Talk to CADNA**; **Explore Our Services** is secondary.
- Navigation follows About → Services → Solutions → Case Studies → Insights → Contact. Services retains the four concierge destinations and package access. The mobile menu, keyboard disclosure, Escape handling, active indicators and outside-click dismissal remain available.
- Each existing service card now includes a concise explanation, a business outcome and its real service list. The new Why CADNA section explains African business context, execution, accountability and operational systems using the supplied content.
- Existing metrics and client logos remain intact. The verified Ekodrop case study is featured with Challenge / Approach / Result and its supplied metrics. Unpublished client placeholders are retained in the data model without dominating the public proof section.
- Contact now offers six fields, three required, followed by an editable review and email/copy/download handoff. Validation is associated with each field and focuses the first error. Copying has real loading, success and failure states. Nothing is automatically sent or stored. The existing detailed request, financial preselection, plan choices, consent acknowledgment and document download are preserved.
- The footer includes consistent site navigation, existing contact details and the company social destinations found in the legacy source.

## Visual and accessibility changes

The navy identity and two existing font families are retained. The hero uses sentence case, a simpler action hierarchy and the supplied leadership scene. Services have clearer outcome labels; the case study has more space and a larger image; the closing CTA has one primary action. Decorative gradients and hover scaling are reduced. Section reveals use shorter, smaller movements.

The blue button color and the pricing cards' green, blue and gold accents were adjusted for contrast. Focus remains visible. Main landmarks accept skip-link and route-change focus; form errors reference their fields; headings, native form labels, keyboard controls, live states and reduced-motion support were verified. The logo has explicit dimensions, carousel images load lazily and the enlarged case study selects its full-resolution image.

## Search and loading

- `npm run build` now produces 21 static HTML documents, including a 404 document. Public pages contain their text before JavaScript runs. The detailed request page mounts in the browser to preserve query-prefilled state.
- Every generated document receives a unique title, description, canonical URL, Open Graph and Twitter metadata, and organization structured data based on existing company details.
- `dist/robots.txt` and a 16-entry `dist/sitemap.xml` are generated during the build. Unpublished articles, the request builder and missing-page documents are marked `noindex`; they are omitted from the sitemap.
- `VITE_SITE_URL` sets the production canonical origin. Its default is the Vercel URL supplied in `AGENTS.md`. `vercel.json` enables [clean URLs](https://vercel.com/docs/project-configuration) for the generated HTML pages.
- Secondary routes load on demand. The initial JavaScript is approximately **386.4 kB / 125.8 kB gzip**, down from **445.4 kB / 144.0 kB gzip**. The optimized logo is **10.4 kB**, down from **106.4 kB**. Existing responsive WebP photography remains in use. No runtime dependencies were added.

## File inventory

| Area | Files |
| --- | --- |
| New sections/forms | `src/components/WhyCadna.jsx`, `WhyCadna.module.css`, `CaseStudiesSection.jsx`, `ContactForm.jsx`, `ContactForm.module.css`, `src/pages/ContactPage.module.css` |
| Shared data/helpers | New `src/data/site.js`, `src/utils/contact.js`, `download.js`, `metadata.js`; updated `src/data/divisions.js`, `growth.js`, `subscriptions.js` |
| Homepage and shared UI | `src/components/Hero.jsx`, `ServiceCards.jsx`, `ServiceCards.module.css`, `GrowthCards.jsx`, `Growth.module.css`, `CTASection.jsx`, `TrustedBy.jsx`, `SiteNav.jsx`, `SiteNav.module.css`, `SiteFooter.jsx`, `SiteFooter.module.css`, `SubscriptionPlans.module.css`, `GrowthShowcase.jsx`, `animations/Reveal.jsx` |
| Pages and focus | `src/pages/HomePage.jsx`, `HomePage.module.css`, `ContactPage.jsx`, `RequestPage.jsx`, `RequestPage.module.css`; main-landmark focus in About, Packages, FAQ, Legal, ContentDetail and `src/components/DivisionPage.jsx` |
| Application and SEO | `src/App.jsx`, `src/main.jsx`, `src/components/PageMetadata.jsx`, `PageTransition.jsx`, `index.html`, `vite.config.js`; new `src/prerender.jsx`, `scripts/build.mjs`, `vercel.json` |
| Styling and assets | `src/styles/global.css`, `tokens.css`, new `src/assets/cadna-logo-white.webp`; regenerated `dist/` HTML, assets, sitemap and robots file |
| Verification | `package.json`, new `scripts/checks.test.mjs`, this implementation record |

**Components created:** WhyCadna, CaseStudiesSection and ContactForm. Existing page and UI components were updated in place. No working component was removed. The unused legacy `src/hooks/useReveal.js` hook was removed; the active Framer Motion reveal components remain. The user's `AGENTS.md` edits were preserved.

## Verified results

- Dependency installation completed with the existing lockfile; no package additions or upgrades.
- `npm run build`: passed, including static document generation.
- `npm test`: four regression tests passed, covering contact validation, safe email encoding, static metadata/content and sitemap exclusions. The repository has no lint script.
- Chrome: **180 route/viewport checks** across all 20 routes at **320, 375, 390, 414, 768, 1024, 1280, 1440 and 1920px**. No horizontal overflow or broken images; one main landmark and h1 per page.
- **38 interaction checks** passed: contact validation and edit/review, clipboard loading/success/failure, downloads, detailed request prefilling and acknowledgment, subscription disclosure, desktop/mobile navigation, filters, keyboard operation, counter completion, automatic story wraparound and live reduced-motion changes. No form test sent a message or made a submission POST.
- **99 internal link targets** checked, with same-page package anchors additionally checked against their correct page.
- Axe WCAG A/AA checks on 11 representative routes passed after correcting the pricing contrast. Further focused checks confirmed route focus, skip links at three mobile/tablet widths, malformed-fragment handling, package anchors, full-resolution case-study imagery and content available without JavaScript on five representative pages.
- Desktop, tablet and phone screenshots were reviewed. No runtime or hydration errors remained. `git diff --check` passed.
- Browser coverage uses installed Chrome and viewport emulation; Safari and physical devices were not tested. Work is local and has not been deployed.

## Content still awaiting CADNA input

- Portrait for Julius Adebowale, plus personal LinkedIn URLs for the leadership profiles. Cyril Okeleke's supplied portrait was integrated on 17 September 2026.
- Final approval/publication dates for the three existing editorial previews. They are explicitly unpublished and are not indexed.
- Any additional client case studies and approved outcomes; only the sourced Ekodrop story is featured.
- Brand assets for Hallmack Finance and Manharttan Capital; their existing named tiles remain.
- Live product destinations and availability confirmations for the four technology previews.
- The supplied privacy document still includes its existing `[Name/Office]` privacy-contact placeholder. Legal copy was preserved.

## Local preview

Use `npm run dev` during editing, or `npm run build` followed by `npm run preview` to review the generated production pages. The verified preview for this session is `http://127.0.0.1:5180/`.

## Card layout follow-up

- Added `CardGrid.module.css` as the shared layout for leadership, industry, audience, concierge service, technology, insight and one-time service cards. Desktop rows contain four equally sized cards; incomplete rows stay centered. The layout uses two columns at 1100px and below, and one at 600px and below.
- Management and Board of Advisors each display four cards followed by a centered fifth on both Home and About. The nine industry cards display 4 + 4 + 1; filtered industry groups also remain centered.
- Extracted the existing Business Concierge styling into `ConciergeCard.module.css`. All four concierge pages, industries, audience cards and one-time service cards now share the navy gradient, decorative circles, icon/number header and circular arrow link. Existing photos, content, filters, disclosures and request destinations are preserved.
- Verified 77 combinations across the seven affected pages and 11 viewport widths (320–1920px), including both sides of the responsive breakpoints. Row counts, equal widths, centered remaining cards, text containment, leadership tabs and industry filters passed. Matching industry/concierge styles, quote links and expandable support details were also checked. Axe reported no WCAG A/AA violations on five representative pages. Production build and the four existing regression tests passed.
