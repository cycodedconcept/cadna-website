# CADNA content migration

Applied the current root `AGENTS.md` content brief to the existing components and routes. The frontend architecture, navy/blue styling, motion system and frontend-only brief flow are retained.

## Approved content applied

- Hero supporting copy now uses “transform ideas,” with the additional CADNA description and both approved CTAs.
- Statistics have the requested heading and values: ₦35B+, 150+ businesses supported, 83% retention and 10+ years experience. Count-up and reduced-motion behavior are preserved.
- Ecosystem heading and narrative are replaced. All four existing interactive nodes now display their approved descriptions, while retaining keyboard controls and the mobile vertical flow.
- Business, Education, Financial and Technology Concierge cards use the exact approved descriptions and four services each. The same data drives navigation, cards and division pages.
- Division service descriptions replace the old module/price pairings because the revised service scopes do not have approved individual prices. The separate Packages & Pricing page is retained.
- The comparison includes Technology Provider, Marketing Partner and Multiple Advisors, with the approved headline and CADNA approach.
- The five-stage process uses the approved descriptions and “From Challenge To Growth” heading.
- AssessAcad, GadaFunds, Logistics Platform and CADNA-Mart use the approved product descriptions on their cards and detail pages.
- Consumer Businesses is added as the ninth industry, with an icon, description, hover state and working conversation link.
- Case studies use the label “CADNA intervention.” Existing sourced Ekodrop information is retained; the unavailable case study remains explicitly forthcoming.
- Leadership profiles now support photo, name, position, expertise, biography and LinkedIn fields. Personal LinkedIn links will render when supplied; missing profiles are not linked to invented destinations.
- Insight cards retain images, category, pending publication dates, calculated reading time and working Read More links. The final CTA uses the approved description.
- Footer names and homepage metadata are synchronized with the migrated copy.

## Assets and deferred content

The supplied archive was reviewed during the initial asset integration; its 17 images and placement decisions are documented in `image-integration.md`. The selected responsive WebP files, dimensions, alt text, lazy loading and priority hero loading are retained. Current WebP dimensions were checked again during this pass.

Leadership imagery remains in the hero, thinktank imagery supports Business Concierge, team imagery supports Education Concierge, the private briefing image supports Financial Concierge, and the dedicated technology artwork remains on Technology Concierge. Existing supplied icons are reused.

Each technology mockup is one 298 × 189 panel of the supplied 596 × 378 composite. CSS now caps these individual previews at 298px, avoiding enlargement. No source artwork was regenerated or unnecessarily recompressed.

The user confirmed that individual leadership portraits, personal LinkedIn URLs and approved article publication details will be provided later. Their fields remain clearly marked and ready to populate. No identities, publication dates or case-study outcomes were fabricated.

## Verification

The production build and `git diff --check` pass. Chrome completed 28 route/viewport checks: the homepage at 1440, 1280, 1024, 768, 480 and 375px, plus About, all concierge pages, all product detail pages, the Ekodrop case study and an insight detail page at both 1440 and 375px.

No horizontal overflow, broken images, JavaScript errors or unrevealed content was found. Assertions verify the exact statistics, concierge names, four services per division, four ecosystem descriptions, nine industries, leadership expertise/LinkedIn fields and Read More links. Ecosystem keyboard selection, live reduced-motion changes, mobile navigation, the Consumer Businesses conversation link and final CTA routing pass.

Desktop and mobile hero, ecosystem, leadership and industry screenshots were reviewed. These checks use Chrome viewport emulation, not physical devices. The verified local preview is `http://localhost:5174/`; changes have not been deployed.
