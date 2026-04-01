# OpenClaw Skills Required

Install these skills in your OpenClaw instance before the agent can operate this project autonomously.

## Required

| Skill | Purpose | Notes |
|---|---|---|
| **Agent Browser** | Visit business websites, extract emails and owner names during prospecting | Core prospecting tool |
| **Telegram** | Send daily status updates and weekly reports to Rafa | Replaces email reporting |

## Already Available (no install needed)

| Skill | Purpose |
|---|---|
| **web_search** (Brave) | Search for local businesses by type and city — already configured as default search provider |
| **File system** | Read/write leads CSVs, copy JSON, reports, measurement log — built into OpenClaw |
| **HTTP / fetch** | Call Instantly, Hunter, and PostHog APIs directly — built into OpenClaw |


## Skill install checklist

- [ ] Agent Browser installed and tested
- [ ] Telegram skill installed and connected to Rafa's account
- [ ] Brave Search confirmed as default `web_search` provider
- [ ] `.env.production` contains: `INSTANTLY_API_KEY`, `HUNTER_API_KEY`, `POSTHOG_API_KEY`
- [ ] Cron set to run daily (suggested: 08:00 local time)
