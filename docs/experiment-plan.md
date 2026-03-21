# Micro-SaaS Experiment Plan
**Agent-Operated Lean Validation — v1.0**

> **Purpose:** Run cheap, parallel experiments across multiple micro-SaaS ideas to identify which ones attract genuine market interest — before writing a single line of product code. The AI agent operates each step autonomously after one-time human setup.

> **Human involvement:** One-time credential provisioning and tool setup. After that, the agent handles prospecting, outreach, landing page updates, and measurement independently.

---

## 1. Principles & Constraints

### Design principles

- **Outcomes over output** — the goal is learning, not building. No product code until a clear demand signal exists.
- **Parallel experiments** — all ideas run simultaneously, not sequentially, to compress the feedback loop.
- **Disposable infrastructure** — domains, emails, and pages used here are experiment assets, not brand assets. Losing any of them is acceptable.
- **Agent-first operations** — every repeatable task must be operable by the AI agent via API, with no human in the loop.
- **Cheapest viable tooling** — optimise for speed of setup and low monthly cost, not for scale or reliability.

### Constraints

- Budget ceiling: ~€50–60/month total across all tools.
- Human time: setup only (~4–6 hours one-time). Zero recurring manual effort expected.
- No per-idea domains, mailboxes, or social accounts. One identity covers all experiments.
- No product must be built to validate. A landing page and a reply to a cold email are sufficient signals.

---

## 2. Experiment Identity

> **Status: COMPLETE.** Domain, mailbox, and persona are live. See AGENTS.md for credentials and tool details.

All experiments run under a single neutral identity — one domain, one email address, one persona.

| Field | Value |
|---|---|
| Domain | getsolvedit.com |
| Mailbox | sara@getsolvedit.com |
| Persona name | Sara Morgan |
| Cold email platform | Instantly.ai |
| Landing page | https://www.getsolvedit.com |

### Email persona rules

- Human-sounding name, gender-neutral
- Mailbox on custom domain (not plain Gmail)
- Inbox warm-up running 14 days before first send
- Plain-text emails only — no HTML, no logos, no tracking pixels in body
- Replies forward to owner's real inbox
- All operations via API — no manual UI interaction

---

## 3. Stack

> **Status: COMPLETE.** All tools are live. See AGENTS.md for API key variable names.

| Component | Tool | Cost/mo |
|---|---|---|
| Domain | getsolvedit.com (Vercel DNS) | ~€1 |
| Email inbox | Google Workspace Business Starter | ~€7 |
| Cold email platform | Instantly.ai | ~€35 |
| Landing page | Next.js on Vercel (free tier) | €0 |
| Lead prospecting | Apollo.io (free tier) | €0 |
| Waitlist form | Tally.so (free tier) | €0 |
| Analytics | PostHog (free tier, cookieless mode) | €0 |
| Email verification | Hunter.io (free tier) | €0 |
| **Total** | | **~€43/mo** |

### Landing page architecture

One Next.js deployment. Slug-based routing. Content driven by `config/ideas.json`.

- `getsolvedit.com/` → default variant
- `getsolvedit.com/{slug}?mkt={market}&lang={lang}&src=cold-email` → campaign variant
- All params pass through to Tally form as hidden fields
- Tally form ID: `7RZy7Z`
- PostHog tracks `pageview` and `cta_clicked` events with `{slug, mkt}` properties

To update a landing page variant: edit `config/ideas.json`, commit, push to `main`. Vercel redeploys automatically.

---

## 4. Campaign Matrix

> **Status: PROSPECTING IN PROGRESS.** Lead lists being built during warm-up window.

8 campaigns across 5 ideas. Each needs ~120–150 contacts exported from Apollo (target 100 sendable after verification).

| Campaign ID | Landing page slug | Market | Language | Target businesses |
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

## 5. Agent Task Breakdown

### Phase 1 — Setup (Human, one-time) ✅ COMPLETE

- [x] Register domain and configure DNS MX records
- [x] Create mailbox sara@getsolvedit.com
- [x] Connect mailbox to Instantly and start warm-up
- [x] Create Apollo.io, Tally.so, PostHog accounts
- [x] Deploy landing page to Vercel with custom domain
- [x] Configure PostHog (cookieless), Tally form with hidden fields
- [ ] Provide agent with all API keys as environment variables
- [ ] Downgrade Google Workspace from Business Plus to Business Starter (before day 14 of trial)

### Phase 2 — Prospecting (Agent, weeks 1–2 during warm-up)

While the inbox warms up, the agent builds all lead lists in parallel. No emails are sent yet.

For each campaign:
1. Query Apollo API with filters: business type, city/country, role
2. Export 120–150 contacts per campaign
3. Verify emails with Hunter.io API — discard hard-bounce-risk addresses
4. Deduplicate across all campaigns — same contact must not appear in more than one campaign
5. Save cleaned list to `leads/{campaign-id}.csv`
6. Log lead count to `log/measurement.json`

### Phase 3 — Content Generation (Agent, week 2)

#### Email copy (one per campaign)

Plain text. Under 130 words. No links except the CTA. Signed "Sara Morgan".

- Subject line: reference a specific recognisable pain — not the product name
- Sentence 1: observed pain (specific to their business type)
- Sentence 2: what the tool does in plain language
- Sentence 3: single low-commitment CTA — "Would this be useful to you?"
- One link only: the campaign URL
- For Spanish campaigns: write naturally in Spanish, not machine-translated English

Save all copy to `copy/{campaign-id}.json` with keys: `subject`, `body`.

#### Landing page

Landing page variants are already live. To update: edit `config/ideas.json` and push.

Verify each variant renders correctly after any config change by fetching the URL and checking the expected headline text is present.

### Phase 4 — Outreach (Agent, week 3+)

For each campaign:
1. Create campaign in Instantly via API with lead list and email copy
2. Set daily send limit: respect ~30–50 emails/day total across all campaigns
3. Stagger campaign starts by 24 hours to avoid day-one spikes
4. Monitor daily — pause immediately if bounce rate exceeds 5%
5. Log daily metrics to `log/measurement.json`

### Phase 5 — Measurement (Agent, ongoing, weeks 3–6)

Every 7 days:
1. Pull metrics from Instantly API (open rate, reply rate, bounce rate per campaign)
2. Pull CTA click counts from PostHog API (by slug and mkt)
3. Pull waitlist signups from Tally API (by idea hidden field)
4. Compute signal score per campaign:

```
signal_score = (open_rate × 0.30) + (reply_rate × 0.40) + (signup_rate × 0.30)
```

5. Rank campaigns by signal score
6. Apply decision rules (see Section 6)
7. Save report to `reports/week-{N}.md`
8. Email summary to panthro.rafael@gmail.com

---

## 6. Decision Rules

Applied automatically after 100 sends per campaign.

### Advance to build

Advance if the idea meets **at least two** of:
- Reply rate >3% in at least one market
- At least 3 waitlist signups
- At least one reply asking "how does this work?" or "is this available yet?"

### Kill

Kill (pause campaign, mark as dead in measurement log) if:
- Zero waitlist signups AND reply rate <1% after 100 sends
- Open rate <20% — fix subject line and retry once before killing

### Iterate

If open rate >35% but reply rate <2%: the problem is the email body or landing page, not the idea. Generate a new copy variant, update `copy/{campaign-id}.json`, re-run with remaining contacts.

### Signal thresholds reference

| Signal | Tool | Proceed | Kill |
|---|---|---|---|
| Email open rate | Instantly | >35% | <20% |
| Reply rate | Instantly | >3% | <1% |
| Landing page visits | PostHog | >40% of email clicks | <20% of clicks |
| Waitlist signups | Tally | ≥2 per campaign | 0 after 100 sends |

---

## 7. What the Agent Must Not Do

- Do not build any product feature, backend, or database schema
- Do not send more than 50 emails/day total from Sara's inbox
- Do not contact the same person twice across any campaign
- Do not claim the product is live or make pricing commitments in emails
- Do not impersonate a real company — Sara describes it as "something I'm building"
- Do not revert `config/ideas.json` — it may have been intentionally updated

---

## 8. Cost Summary

| Tool | Monthly cost |
|---|---|
| Domain (amortised) | ~€1 |
| Google Workspace Starter | ~€7 |
| Instantly.ai | ~€35 |
| Everything else | €0 (free tiers) |
| **Total** | **~€43/mo** |

Two full months of experimentation costs ~€86 total. If no idea shows signal by week 6, shut down. If one idea advances, the same infrastructure transitions into the early product phase.
