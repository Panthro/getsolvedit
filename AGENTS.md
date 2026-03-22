# AGENTS.md — getsolvedit Experiment Operator Guide

This file is the authoritative reference for any AI agent operating this project. It contains everything needed to run, update, and measure the micro-SaaS validation experiments without human involvement after initial setup.

---

## Key Documents

| File | Purpose |
|---|---|
| `AGENTS.md` | This file — quick-start reference for any agent |
| `docs/experiment-plan.md` | Full plan: principles, phases, decision rules, signal thresholds |
| `docs/idea-bank.csv` | All 16 ideas with scores, targets, assumptions, and agent notes |
| `config/ideas.json` | Landing page variants — edit this to update copy, add slugs |

---

## What This Project Is

A lean demand-validation experiment running across 5 micro-SaaS ideas for small businesses. The goal is to identify which idea has the strongest market signal — measured by cold email reply rates and landing page waitlist signups — **before writing any product code**.

One domain, one email persona, one landing page, one Tally form. All 8 campaigns share the same infrastructure.

**Owner:** Rafa (panthro.rafael@gmail.com)
**Persona:** Sara Morgan (sara@getsolvedit.com)
**Domain:** https://www.getsolvedit.com
**Vercel team:** https://vercel.com/get-solved-it
**GitHub repo:** https://github.com/Panthro/getsolvedit

---

## Stack

| Tool | Purpose | Notes |
|---|---|---|
| **Vercel** | Landing page hosting | Free tier. Auto-deploys on push to `main`. Custom domain: getsolvedit.com |
| **Next.js (App Router, TypeScript)** | Landing page framework | Slug-based routing. One route per campaign variant. |
| **Google Workspace** | Sara's email inbox | sara@getsolvedit.com. Business Starter plan. |
| **Instantly.ai** | Cold email sending + warm-up | Sara's inbox connected. Warm-up must run 14 days before first send. |
| **Apollo.io** | Lead prospecting | Free tier (50 exports/month). Used to build lead lists per campaign. |
| **Tally.so** | Waitlist form | Form ID: `7RZy7Z`. URL: https://tally.so/r/7RZy7Z. Hidden fields: idea, mkt, lang, src. |
| **PostHog** | Product analytics | Cookieless mode (persistence: memory). Tracks pageviews and cta_clicked events with idea/mkt properties. |

---

## Environment Variables Required

These must be set in the agent's runtime or as Vercel environment variables:

```
INSTANTLY_API_KEY        — Instantly.ai API key for campaign operations
APOLLO_API_KEY           — Apollo.io API key for lead list export
POSTHOG_API_KEY          — PostHog project API key (also embedded in landing page)
TALLY_WEBHOOK_SECRET     — Tally webhook secret for verifying submissions
```

---

## Landing Page

**Live URL:** https://www.getsolvedit.com
**Repo path:** `/`
**Key file:** `config/ideas.json`

### How it works

The landing page reads the URL slug and renders the matching variant from `config/ideas.json`. All remaining URL params (`mkt`, `lang`, `src`) pass through to the Tally form as hidden fields.

- `getsolvedit.com/` → default variant
- `getsolvedit.com/{slug}?mkt=es&lang=es&src=cold-email` → campaign variant

### Adding or editing a variant

Edit `config/ideas.json`. Each entry requires:

```json
"your-slug": {
  "tag": "Product Name · €X/mo",
  "headline": "...",
  "subheadline": "...",
  "benefits": ["...", "...", "..."],
  "cta": "Get early access — €X/mo"
}
```

Then commit and push to `main` — Vercel redeploys automatically. No other changes needed.

### Updating the Tally form ID

Change `tallyFormId` in `config/ideas.json` and push.

---

## Campaign Matrix

All 8 active campaigns. Each maps to a landing page slug + market + language.

| Campaign ID | Slug | Market | Language | Cold email target |
|---|---|---|---|---|
| `menu-es` | `/menu` | Spain | Spanish | Restaurants, cafés, bars |
| `menu-uk` | `/menu` | UK | English | Restaurants, cafés, bars |
| `reminders-ch` | `/reminders` | Switzerland | English/German | Dog groomers, hairdressers, tutors |
| `reminders-uk` | `/reminders` | UK | English | Dog groomers, hairdressers, tutors |
| `reviews-es` | `/reviews` | Spain | Spanish | Plumbers, cleaners, mechanics |
| `reviews-uk` | `/reviews` | UK | English | Plumbers, cleaners, mechanics |
| `waivers-uk` | `/waivers` | UK | English | Surf schools, climbing gyms, yoga studios |
| `gift-cards-es` | `/gift-cards` | Spain | Spanish | Salons, bakeries, massage therapists |

### Cold email URL format

```
https://www.getsolvedit.com/{slug}?mkt={market}&lang={lang}&src=cold-email
```

Example: `https://www.getsolvedit.com/menu?mkt=es&lang=es&src=cold-email`

---

## Email Persona

- **Name:** Sara Morgan
- **Email:** sara@getsolvedit.com
- **Tone:** Friendly, direct, non-salesy. Writes as a solo founder testing an idea.
- **Never:** claim the product is live, make pricing commitments, use HTML emails, add logos or tracking pixels in the body.

---

## Cold Email Rules

- Max **50 emails/day** total across all campaigns (one inbox)
- Stagger campaign starts by **24 hours** to avoid day-one spikes
- Plain text only — no HTML, no images, no footers with logos
- Under **130 words** per email
- One link only — the campaign URL
- **Pause immediately** if bounce rate exceeds 5% on any campaign

### Email structure

1. **Subject line** — reference a specific recognisable pain, not the product
2. **Sentence 1** — observed pain (specific to their business type)
3. **Sentence 2** — what the tool does in plain language
4. **Sentence 3** — low-commitment CTA ("Would this be useful to you?")
5. **Sign-off** — Sara Morgan

---

## Lead Prospecting (Apollo.io)

Target **120–150 contacts per campaign** (buffer for bounces — aim for 100 sendable).

### Apollo search filters per campaign

| Campaign | Industry filter | Role filter | Location |
|---|---|---|---|
| `menu-*` | Restaurants / Food & Beverage | Owner, Manager | Spain / UK |
| `reminders-*` | Health & Beauty / Pet Services / Education | Owner | Switzerland / UK |
| `reviews-*` | Construction / Consumer Services | Owner, Director | Spain / UK |
| `waivers-uk` | Sports / Recreation | Owner, Manager | UK |
| `gift-cards-es` | Health & Beauty / Food & Beverage | Owner | Spain |

After export: verify emails with Hunter.io free tier. Discard hard-bounce-risk addresses. Deduplicate across all campaigns — the same contact must never appear in more than one campaign.

### Artefacts to produce

Save cleaned lead lists as: `leads/{campaign-id}.csv`

---

## Measurement

### Signal thresholds

| Metric | Tool | Advance signal | Kill signal |
|---|---|---|---|
| Email open rate | Instantly | >35% | <20% |
| Reply rate | Instantly | >3% | <1% |
| Landing page visits | PostHog | >40% of email clicks | <20% of clicks |
| Waitlist signups | Tally | ≥2 per campaign | 0 after 100 sends |

### Weekly report (every 7 days)

Pull metrics from Instantly API, PostHog API, and Tally. Compute signal score per campaign:

```
signal_score = (open_rate × 0.30) + (reply_rate × 0.40) + (signup_rate × 0.30)
```

Rank all campaigns. Flag kills. Save report as `reports/week-{N}.md`. Send summary to panthro.rafael@gmail.com.

---

## Decision Rules

### Advance to build
An idea advances if it meets **at least two** of:
- Reply rate >3% in at least one market
- At least 3 waitlist signups
- At least one reply asking "how does this work?" or "is this available yet?"

### Kill
Kill after 100 sends if:
- Zero waitlist signups AND reply rate <1%
- Open rate <20% — fix subject line and retry once before killing

### Iterate
If open rate >35% but reply rate <2%: the problem is the email body or landing page, not the idea. Generate a new copy variant and re-run with remaining contacts.

---

## File Structure

```
/
├── AGENTS.md                  ← this file
├── app/
│   ├── layout.tsx             ← root layout + global CSS
│   ├── page.tsx               ← default landing (getsolvedit.com/)
│   └── [slug]/page.tsx        ← campaign variants (SSG)
├── config/
│   └── ideas.json             ← landing page variants + Tally form ID
├── components/
│   └── LandingPage.tsx        ← client UI (PostHog + Tally links)
├── lib/
│   ├── ideas.ts               ← typed access to ideas.json
│   └── campaign-query.ts      ← normalize URL search params for Tally
├── types/
│   └── ideas.ts               ← JSON shape types
├── styles/
│   └── globals.css
├── leads/                     ← agent-generated lead CSVs (gitignored)
│   └── {campaign-id}.csv
├── copy/                      ← agent-generated email copy (gitignored)
│   └── {campaign-id}.json
├── reports/                   ← agent-generated weekly reports
│   └── week-{N}.md
└── log/
    └── measurement.json       ← running metrics log
```

---

## What the Agent Must Not Do

- Do not build any product feature, backend, or database schema
- Do not send more than 50 emails/day total from Sara's inbox
- Do not contact the same person twice across any campaign
- Do not impersonate a real company — Sara describes the product as "something I'm building"
- Do not make pricing commitments in cold emails
- Do not revert changes to `config/ideas.json` — it may have been intentionally edited

---

## Reminders for Next Session

- [ ] Downgrade Google Workspace from Business Plus to Business Starter before day 14 of trial
- [ ] Build Apollo lead lists for all 8 campaigns (do during warm-up window)
- [ ] Write cold email copy for all 8 campaigns (do during warm-up window)
- [ ] Wait for Instantly warm-up to complete (14 days from Sara's inbox connection date)
- [ ] Stagger campaign launches by 24h once warm-up is done
