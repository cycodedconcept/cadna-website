# Leadership previews — 17 September 2026

## Scope and behavior

Extended the existing leadership flower layout and profile dialog on Home and About. The React/Vite architecture, existing team data and portrait buttons are preserved.

- While the leadership portraits are visible, the selected group's profiles rotate at ten-second intervals.
- Each automatic preview expands gently, displays the existing portrait, role, expertise and biography for five seconds, then shrinks slightly and fades out.
- Hovering over a preview or focusing its controls holds it for reading. “Keep profile open” opens the existing modal with no reading timeout.
- Clicking any portrait opens that person's modal. Close, Escape and clicking outside dismiss it with a fade; keyboard focus returns to the portrait.
- Visitors can pause/resume previews. Automatic previews do not take focus, lock scrolling or block interaction with other portraits.
- Rotation stops offscreen, in hidden browser tabs, during manual profile viewing and when reduced motion is requested. Switching leadership groups resets the profile order.

## Files and components

- Updated `src/components/LeadershipSection.jsx`: visibility-aware rotation, reading timeout, pause/resume and group handling.
- Created `src/components/LeadershipSpotlight.jsx`: automatic preview, shared profile content and promotion to the manual dialog.
- Updated `src/components/LeadershipProfileDialog.jsx`: animated closing and existing accessible modal behavior.
- Updated `src/components/LeadershipSection.module.css`: responsive preview, toolbar, controls and entry/exit animations.
- Regenerated tracked production output in `dist/`. No components were removed and no runtime dependencies were added.

## Content, accessibility and performance

Profile content is reused from the existing CADNA data. Cyril Okeleke's supplied portrait was added on 17 September 2026 as responsive 480px/960px WebP assets, replacing his initials in both team sections and his profile popups. Julius Adebowale still needs a supplied portrait; existing missing LinkedIn indicators remain. No team details were invented.

Automatic previews are non-modal and do not steal focus. Manual dialogs retain native keyboard focus containment and return focus on dismissal. Interactive targets are at least 44px. Timers and visibility listeners clean up on unmount; background/offscreen rotation is suspended. Existing SEO metadata and static page generation are preserved.

The dialog now ignores stale close events from React Strict Mode's effect cleanup, preventing immediate dismissal in development. Explicit Tab/Shift+Tab wrapping also keeps focus within profiles that only have a single interactive control.

## Validation

- `npm install --no-audit --no-fund`: dependencies already up to date.
- Production build and the four existing regression tests passed; no lint script exists.
- Real-time Chrome check: preview visible after approximately 10 seconds and removed after approximately 15.5 seconds, including entry/exit animation.
- 54 real-browser checks passed for all ten profiles, keyboard focus containment/restoration, Home/About behavior, nine viewport widths (320–1920px), mobile automatic previews, dismissal and reduced motion. Desktop and phone screenshots reviewed; no runtime errors.
- Real-time promotion check passed: “Keep profile open” opens the modal, Escape closes it and focus returns to the matching portrait.
- 22 additional clock-assisted browser checks passed for the ten-second cadence, five-second dismissal, profile order, hover/read holds, manual overrides, pause/resume, section visibility and hidden-tab handling. Animation appearance and completion were checked separately with real elapsed time.
- `git diff --check` passed. Validation used desktop Chrome with viewport emulation; Safari and physical devices were not tested.
