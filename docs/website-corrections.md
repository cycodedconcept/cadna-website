# Website corrections — September 2026

## Source and scope

Implemented the requested changes in `WEBSITE CORRECTIONS.pdf` (2 pages). Used the referenced `MASTER PRD REVISED.pdf` (235 pages, found in Documents) for the leadership, client logos, subscription offerings, quote intake and website legal copy. The master document's broader build commands were treated as background material; this revision preserves the existing React/Vite architecture and makes no backend changes.

## Changes

| Correction | Implementation |
| --- | --- |
| Connected by CADNA alignment | Eyebrow on its own row; heading, centered description and link vertically aligned below it. |
| Concierge and technology cards | Four cards per desktop row, two at tablet widths, one on small phones. Existing components, images and reveal animations retained. |
| Audience and industry engagement | Expandable growth priorities and sector support, visual card treatments, a new editorial image and industry filters. Controls work with mouse, touch and keyboard. |
| Growth in practice | Three cards in a desktop row. Ekodrop uses new logistics imagery explicitly labeled illustrative. The two new case studies remain clearly identified as forthcoming. |
| Leadership | Five management profiles and five advisers, selectable on both Home and About. Eight actual portraits extracted from PRD pages 82–86, rendered in grayscale without inventing portraits. |
| Trusted by | Twenty-one supplied logos extracted from PRD pages 87–89 with transparency preserved, plus the additional organizations named on page 90. Expand/collapse controls keep the initial section compact. |
| Capital CTAs | Book a Diagnostic, Make a Request and One-Time Service Request. Debt Financing expands into the five requested options. Links preserve the selected service in the request. |
| Technology CTAs | Get Quote, Make a Request and One-Time Service Request; product quote links preserve product context. |
| Pricing and subscriptions | Full LITE/BASIC/PRO/ENTERPRISE offerings from pricing architecture pages 101–104. Paid plans are annual; LITE is free. Full plan cards live on the existing Packages page, with a Home teaser and navigation link. Removed old public price ranges, monthly plans and unlimited-request claims. |
| Quote intake | Existing four-step request form now collects business details, selected services, other support areas, funding amount where applicable, stage, budget, timeline, support level and preferred plan. |
| Request acknowledgment | Typed name, explicit consent, unique request reference, timestamp and SHA-256 record digest; download/email handoff. Editing the brief invalidates its prior acknowledgment. |
| Legal copy | `/terms` and `/privacy`, using the supplied website-facing text from pages 166–185. Editorial notes removed and existing contact details substituted for placeholders. Linked from requests and footer. |
| Images | Three new editorial scenes, exported in 480/768/1200px WebP sizes with alt text, responsive loading and lazy loading. Real portraits and logos come from the PRD. |

## Commercial behavior

The pricing architecture explicitly calls its numeric values **internal launch anchors, not website prices** (pages 101, 112 and 114). Public plans therefore use Get Quote or Custom, and the form prepares an intake brief for a tailored quotation. No internal fee table was shipped to the browser. The source also gives conflicting Enterprise anchors (₦12M on pages 103/113 and ₦15M in the page 113 summary), which must be reconciled before implementing a backend quote engine.

The free/complimentary diagnostic wording was removed because the revised architecture defines a paid Growth Diagnostic. Scope and quotation are confirmed before commitment.

## Content and integrations still needed

- The two additional case studies promised in the corrections PDF, including client identity, challenge, intervention, solution, verified outcome and appropriate imagery.
- Portrait of **Julius Adebowale**, whose profile is in the revised PRD but photo is absent from page 83. The document calls Julius **Director of Product**, which is the title used. **Cyril Okeleke's** subsequently supplied portrait was integrated on 17 September 2026.
- Verified LinkedIn profile URLs. Existing unavailable-profile indicators remain.
- Higher-resolution source logos where possible, particularly Flip Farm Resort (60 × 80px) and Tower College (197 × 46px). These are displayed compactly without enlarging their source assets.
- Backend quote calculation/review, request persistence, customer authentication, document version storage, audit trails, subscription activation and signing-provider integration. The existing form only prepares local files and opens the user's email client; it does not submit to a server.
- Binding acceptance of quotations, engagement agreements, invoices and transaction-specific schedules remains dependent on those integrations and completed scopes/fee schedules. The local acknowledgment explicitly covers the request and website terms. It is not represented as a digitally signed commercial agreement, and CADNA's sample signature/seal are not automatically applied to unapproved documents.

## Validation

- Production build: `npm run build`.
- Browser checks cover desktop card rows, ecosystem alignment, filters, disclosure controls, all leadership groups and logos, finance service preselection, annual plan selection, form validation, acknowledgment generation/download/edit invalidation, route/image loading, mobile layouts/navigation and reduced-motion/animated behavior.
- Passed 84 browser assertions across the desktop/request and remaining route/mobile checks. No browser runtime errors. Screenshots reviewed for desktop and phone layouts.
- `git diff --check` passed. No new runtime dependencies were required.
- The tracked `dist/` output was regenerated with the final production build.

## Follow-up visual refinements

Implemented the subsequent typed requests:

- **Trusted by:** continuous, slow left-to-right carousel using the 21 supplied logos. Identical tracks create a seamless loop. Hover stops movement; reduced-motion preferences show static logos. The pause/play button has been removed. Expanding replaces the carousel with the existing grid style, displaying all 27 listed organizations.
- **Network branding:** 25 organizations now have actual brand assets in their original colors. Four logos were sourced from [Renmoney](https://renmoney.com/), [Sthenic](https://www.sthenicfinance.com/), [The Burgeoning House](https://burgeoninghouse.ng/) and [Letshego](https://www.letshego.com/). Assets are stored locally. Renmoney uses a dark tile to preserve its white wordmark. Hallmack Finance and Manharttan Capital retain named tiles pending confirmation of the exact companies and their logos; similarly named businesses were not substituted.
- **Concierge service modules:** redesigned the shared `DivisionPage` cards as a two-column desktop layout with navy gradients, blue accents, service icons, clearer typography and circular quote arrows. This updates all four Business, Education, Financial and Technology pages. Phones use a single column. The five debt options and contextual quote links remain functional.
- **Leadership:** portraits extend edge to edge across cards on Home and About, including management and advisers. Text sits in its own padded body; portrait framing keeps faces visible.
- **Favicon:** replaced the full wordmark with a compact white C and blue dot on navy, delivered as a small SVG with a base-aware asset URL.

### Follow-up validation

- 46 focused browser assertions passed: motion direction and speed, pausing, expansion/collapse, all 27 organizations, service card reuse, contextual quote links, finance disclosures, portrait widths on both pages and groups, favicon loading, reduced-motion behavior, and overflow checks at 375/768/1024px plus desktop.
- Two additional checks verified that all 25 branded images load and that quote arrows are centered. Desktop and phone screenshots were reviewed; final refinements improved the Renmoney wordmark contrast and two portrait crops.
- Production build and whitespace checks passed. No runtime dependencies were added.

Public logo asset sources: [Renmoney SVG](https://framerusercontent.com/images/yDGvK9Yf288wkyR8U743ibF0.svg), [Sthenic SVG](https://www.sthenicfinance.com/images/SthenicLogo.svg), [Burgeoning House WebP](https://burgeoninghouse.ng/wp-content/uploads/2026/05/tbh-logo-300x91.webp), [Letshego PNG](https://www.letshego.com/sites/default/files/logo_0.png).
