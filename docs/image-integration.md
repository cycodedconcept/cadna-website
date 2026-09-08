# CADNA image integration

The root `AGENTS.md` is an implementation brief, not a shell script. Its instructions were applied to the existing React 18 / Vite 5 application, retaining React Router, CSS modules, Framer Motion, the four concierge routes, packages, pricing, FAQ, contact links and request flow.

## Source review and placement

Source: the supplied `test-img.zip`. All 17 image files were inspected; macOS archive metadata was excluded. Original archive files were extracted outside the project and remain unchanged. Only selected web exports are shipped in `public/images/cadna/`.

| Supplied asset | Original dimensions | Treatment / placement |
| --- | --- | --- |
| LEADERSHIP TEAM.png | 1536 × 1024 | Homepage hero; responsive WebP; JPEG social preview |
| A THINKTANK TEAM.jpeg | 1024 × 1024 | Business card and division hero |
| TEAM BONDING MEETING.jpeg | 2048 × 1365 | Education card and division hero |
| CLOSED DOOR BRIEF SESSION.jpeg | 1024 × 1024 | Financial card and division hero |
| CONCIERGE OFFICER.jpeg | 1024 × 1024 | Technology card and division hero |
| TEAM WORK CASUALLY.jpeg | 1536 × 1024 | Homepage “Why CADNA” section |
| BOARDROOM.jpeg | 1024 × 1024 | About hero |
| WE LISTEN.jpeg | 1327 × 947 | Contact / diagnostic hero |
| CADNA WEB IMAGES EXPLANATORY ICONS.png | 976 × 103 | Strategy, talent, capital and technology icons isolated as small PNGs, preserving original colors |
| CADNA WEB IMAGE 02.png | 1536 × 1024 | Exact duplicate of leadership asset; omitted |
| CADNA WEB IMAGES BUSINESS CONCIERGE IMAGE.png | 1536 × 180 | Small montage; standalone photos provide better quality |
| CADNA WEB IMAGES TECHNOLOGY CONCIERGE IMAGES.png | 1131 × 189 | Small montage with embedded interface labels; office photo used for the hero |
| CADNA WEB IMAGES EXPLANATORY IMAGES.png | 991 × 237 | Small diagram montage; existing accessible seven-step process retained |
| ChatGPT Image Sep 3, 2026, 10_44_49 AM.png | 1536 × 1024 | Composite reference sheet; duplicate/small visuals omitted |
| Cadna gsl black.png | 2281 × 627 | Existing white CADNA logo retained for the navy theme |
| CADNA GSL Company Seal.png | 1254 × 1254 | Reviewed; not needed for the selected sections |
| Sign 1.png | 2484 × 1747 | Reviewed; signature has no suitable editorial placement |

## Quality and loading

Photographs use 480 px and 768 px variants plus a 1024–1536 px export appropriate to the source. Sharp was used as a temporary preparation tool, with Lanczos resizing, modest sharpening and WebP quality 83. No runtime or project dependencies were added. No images were enlarged beyond native resolution, and no faces, branding or embedded content were regenerated.

The largest shipped image is the 1536 px leadership WebP, about 172 KiB versus the 2.24 MiB source PNG (92.5% smaller). All exports, including alternative sizes, four small PNG icons and the social JPEG, total about 1.71 MiB; a page loads the sizes selected by the browser, not every variant.

`src/data/images.js` holds the image descriptions and responsive sources. `ResponsiveImage` supplies intrinsic dimensions, descriptive alt text, `srcSet`, `sizes`, async decoding and lazy loading. Above-the-fold hero photos load eagerly with high fetch priority. Decorative icons have empty alt text. CSS uses `object-fit: cover` with responsive framing and readable overlays.

`ServiceCards` is shared by Home and About; the four division pages share their image data with those cards. The blue brand accent and existing logo are retained, with navy surfaces, finance-specific dark tones and a subtle grid on the technology page. Keyboard focus, reduced motion and the skip-to-content link are supported. Previously global article, footer-small and request-form selectors are now scoped to prevent cross-page visual effects.

## Run and deployment

- `npm run dev -- --host 127.0.0.1` starts the local site.
- `npm run build` creates the production `dist/` output.
- Set `VITE_SITE_URL` to the deployed origin before building to emit absolute Open Graph and Twitter image URLs in the initial HTML. A descriptive 1200 × 630 JPEG preview, image dimensions and image alt metadata are included. Client-side page titles and descriptions update on navigation; route-specific previews for crawlers that do not execute JavaScript would need prerendering or server rendering.
- The existing form still requires `VITE_API_URL` for live submissions. Form navigation and validation can be checked without sending a request.

## Verification

Chrome checks cover every existing route (`/`, `/about`, `/packages`, `/faq`, `/contact`, `/request`, and all four `/concierge/*` routes) at 1440, 768, 390 and 320 px. Checks include image decoding, horizontal overflow, one main landmark and h1, and runtime errors. Desktop and mobile screenshots were reviewed for framing, spacing, typography and card consistency. Interaction checks cover the Services menu, FAQ accordion, request validation, all four form steps and preservation of form data when going back. No live form submission is made during verification.

Result: the production build and asset-reference checks pass. All ten routes pass the four-width layout/image review, with additional homepage checks at 1024 and 1920 px. The final targeted browser run reports no console errors, failed requests, broken images or overflow, and all interaction checks pass. The mobile Services menu was corrected so hover handling cannot cancel a tap; Escape closes navigation and returns focus to its control.
