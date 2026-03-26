# Design system (GetSolvedIt)

This folder holds **persisted UI Pro Max output** plus project **override rules**.

## Resolution order

1. **`.impeccable.md` (repo root)** — Brand, audience, tone, and aesthetic direction for **getsolvedit**. **Wins** on any conflict with generator output.
2. **`design-system/getsolvedit/pages/<page>.md`** — Optional per-page overrides (see `MASTER.md` logic). Use for a specific slug or template when it must diverge.
3. **`design-system/getsolvedit/MASTER.md`** — Supplementary patterns, checklists, and **non-binding** reference colors/typography from the UI Pro Max tool. **Do not** treat its hex codes or fonts as source of truth unless they’ve been copied into the app on purpose.

## Operational constraints

See **`AGENTS.md`**: Sara persona, Tally/PostHog conventions, no fake product claims, stable waitlist analytics.

## Regenerate

From the repo root:

```bash
python3 /path/to/ui-ux-pro-max/scripts/search.py "SMB B2B landing waitlist founder trustworthy" --design-system --persist -p "GetSolvedIt" -f markdown -o "$(pwd)"
```

Then re-apply the **Binding hierarchy** block at the top of `getsolvedit/MASTER.md` if the script overwrites it.
