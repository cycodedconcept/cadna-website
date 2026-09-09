# Homepage growth showcase

`GrowthShowcase` appears immediately after “How CADNA Works” and before the technology portfolio. It adapts the supplied 9 September screen recording: a centred phone, full photographic backgrounds, three changing stories and numbered circular progress indicators.

The CADNA version tells a growth journey through Clarity, Connection and Growth. It reuses the supplied listening, boardroom and education WebP images. The phone is a responsive HTML/CSS illustration, labelled as a journey illustration; it does not imply that a customer portal or mobile app has launched. Links lead to the existing growth request, solutions and business concierge pages.

Stories rotate every nine seconds and loop continuously on desktop and mobile while visible. The progress animation drives advancement, so there is no animation-frame React state or polling timer. Hovering, focusing controls and selecting a story do not stop rotation, and there is no play/pause button. Playback suspends while the section is outside the viewport or the tab is hidden, then resumes automatically. Arrow keys, Home and End navigate the numbered controls.

Mobile/coarse-pointer visitors get simpler transitions without the staggered phone reveals. Reduced-motion visitors choose stories manually, with crossfades and decorative reveals disabled. Background images retain responsive sources and lazy loading. No libraries, external media requests or backend features were added.

Local browser review artifacts are in `/private/tmp/cadna-showcase-review/`.

Initial verification: production build and whitespace checks passed. Chrome checks covered all three stories at 1440, 1280, 1024, 850, 768, 480, 375 and 320px, with no clipped phone content, overlapping footer, broken images or horizontal overflow on fresh loads. Numbered selection, keyboard navigation, timed advancement, live reduced-motion changes and all three CTA destinations passed. Safari and physical-device testing were not performed for this addition.

Continuous-loop update: the production build and focused Chrome checks passed. A complete 1 → 2 → 3 → 1 cycle continued with the pointer over the section and a selector focused. Mobile wraparound, manual selection, keyboard navigation, reduced motion and automatic resumption after scrolling back into view also passed. Only the three story selectors remain; the play/pause control has been removed.
