# CADNA motion system

The existing page layouts, content, navigation and responsive image system are preserved. Motion uses the installed Framer Motion dependency; no production dependencies were added.

## Shared components

`src/components/animations/` contains:

- `MotionProvider`: shared easing `[0.22, 1, 0.36, 1]`, responsive settings and live `prefers-reduced-motion` updates.
- `Reveal`: fades, directional reveals, stagger containers/items and button interactions. Scroll reveals run once at 20% visibility.
- `ImageReveal`: opacity, scale and desktop clipping reveal.
- `ParallaxImage`: desktop-only image movement from -12px to 12px; scroll tracking is unmounted on small screens, touch devices or reduced motion.
- `LineReveal`: paragraph lines share a reveal delay based on their rendered positions. Text remains available once to assistive technology. Mobile uses a whole-paragraph reveal.
- `CtaReveal`: a subtle background glow when the section becomes visible.

The homepage sequences its background, headline, description, buttons and caption. Solution cards reveal horizontally on desktop and have restrained lift, image zoom and arrow movement. About paragraphs reveal by line. Business imagery starts before its copy, finance uses slower transitions, education modules stagger, and technology has a limited floating icon and glow. The growth process now reveals five stages: Diagnose, Design, Connect, Execute and Scale. Statistics use motion values for counters, with their final values available to assistive technology.

The sticky navigation gains a solid glass background and shadow after 24px of scroll. React state changes only when crossing that threshold. Page navigation resets new routes to the top without moving the entire page wrapper.

## Responsive and accessibility behavior

At widths up to 850px or with a coarse pointer, movement drops to 10px and typical durations to 0.4 seconds. Parallax, desktop image masks and decorative technology animation are disabled. Reduced motion shows content immediately and disables decorative movement, including when the preference changes while the page is open.

Images retain responsive WebP sources, explicit dimensions and lazy loading below the fold. The Technology Concierge hero uses the supplied technology solutions image.

## Verification

Initial motion implementation checked locally on 9 September 2026 (before the subsequent frontend expansion; see `frontend-implementation.md` for that stage):

- Production build: `npm run build`.
- Chrome: all ten routes at 1440px, all ten with Pixel 7 emulation, and four main routes at an iPhone-sized 390px viewport. Mobile checks used Chrome's engine, not physical devices or iOS Safari.
- Reduced motion: all ten routes and changing the preference while the page is open.
- No JavaScript errors, broken images, horizontal overflow or unrevealed content after scrolling in these checks.
- Sticky navigation, parallax, new-route scroll reset, mobile services menu, FAQ expansion and request form progression passed. The form was not submitted.
- Reviewed screenshots of home, about, business and technology pages and a close view of the homepage partnership section.
- Recorded layout-shift totals were at most 0.0112 across the automated route checks; most routes were zero.

Safari verification remains outstanding: the installed Safari driver requires its disabled “Allow remote automation” setting. Playwright WebKit could not be installed on this machine's macOS version. Physical iPhone and Android checks remain outstanding.

Changes are local; production deployment is separate.
