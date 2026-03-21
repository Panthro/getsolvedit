<wizard-report>
# PostHog post-wizard report

The wizard has completed a full PostHog integration for the getsolvedit Next.js Pages Router project. PostHog is now initialized client-side via `instrumentation-client.js` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.js` to route events through `/ingest` to the EU PostHog region. Three business-critical events are tracked in `components/LandingPage.js`, covering the full conversion path from first visit to waitlist signup.

| Event | Description | File |
|---|---|---|
| `landing_page_viewed` | User views a landing page variant — top of the conversion funnel. Captures `slug`, `variant_tag`, `variant_headline`, `mkt`, and `src` UTM parameters. | `components/LandingPage.js` |
| `waitlist_cta_clicked` | User clicks a waitlist CTA link (nav or hero button). Primary conversion event. Captures `slug`, `position` (nav/hero), `variant_tag`, and `cta_label`. | `components/LandingPage.js` |
| `contact_email_clicked` | User clicks the contact email link in the footer. Captures `slug`. | `components/LandingPage.js` |

## Files changed

- **`instrumentation-client.js`** (new) — PostHog initialization with EU host, reverse proxy, and exception capture
- **`next.config.js`** — Added EU reverse proxy rewrites (`/ingest/*`) and `skipTrailingSlashRedirect`
- **`components/LandingPage.js`** — Added `posthog-js` import and three event captures
- **`.env.local`** — Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/145406/dashboard/580954
- **Conversion Funnel: View → Waitlist Click**: https://eu.posthog.com/project/145406/insights/Elk5MYMB
- **Landing Page Views by Variant**: https://eu.posthog.com/project/145406/insights/yVZwsGVE
- **Waitlist CTA Clicks by Variant**: https://eu.posthog.com/project/145406/insights/1qXR1HkF
- **CTA Clicks: Nav vs Hero**: https://eu.posthog.com/project/145406/insights/B9oqBCJq

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
