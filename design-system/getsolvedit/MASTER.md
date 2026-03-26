# Design System Master File (GetSolvedIt)

## Binding hierarchy (read first)

| Priority | Source | Role |
|----------|--------|------|
| **1** | [`.impeccable.md`](../../.impeccable.md) (repo root) | **Canonical** brand, users, tone, typography (Outfit / `font-brand`), wordmark colors, generic vs custom landing strategy, design principles. |
| **2** | [`AGENTS.md`](../../AGENTS.md) | Campaign matrix, persona (Sara Morgan), **no** fake scarcity or misleading product claims, Tally + PostHog wiring. |
| **3** | `design-system/getsolvedit/pages/[page].md` | **Optional** per-page overrides; if present, overrides sections below that contradict it. |
| **4** | This file (below the horizontal rule) | **Supplementary** ideas from UI Pro Max: checklists, generic SaaS patterns, and generator suggestions — **not** a mandate to retheme the live site. |

### Non‑negotiables (from `.impeccable.md` + `AGENTS.md`)

- **Clarity over cleverness**; **founder-credible**; calm confidence — not hype or intimidation.
- **No fake scarcity**: do not add countdowns, fabricated waitlist counts, or urgency tricks unless real and policy-approved.
- **Typography in app:** **Outfit** (600–800) as `font-brand`; body via Tailwind sans stack — **not** Plus Jakarta Sans unless the project explicitly migrates.
- **Brand anchor:** `BrandLogo` — sky / violet / amber wordmark; do not replace with generator “primary indigo” without an intentional rebrand.
- **Surfaces:** Generic landing = white + blue-600 CTA pattern; custom slugs = **vertical-specific** palettes (stone/amber, teal, etc.) as already implemented.
- **Conversion plumbing:** Preserve `TrackedWaitlistCta`, `LandingAnalytics`, `buildTallyHref` / embed hidden fields (`idea`, `mkt`, `lang`, `src`).

### Where the generator disagrees with the repo

| UI Pro Max suggestion | GetSolvedIt stance |
|------------------------|---------------------|
| Indigo `#6366F1` / emerald CTA system | **Reference only.** Implement colors in Tailwind per slug / generic template; see `.impeccable.md`. |
| Plus Jakarta Sans | **Do not use** unless you deliberately change `app/layout.tsx` and agree with design owner. |
| “Vibrant & block-based” / youth energy | **Poor fit** for SMB owner trust; prefer **approachable + legible** per `.impeccable.md`. |
| Scarcity, waitlist count, countdown, referral | **Reject** unless aligned with `AGENTS.md` and honest. |
| Sticky form / long scroll pattern | **Optional** if pages grow; current landings are short. |

---

> **PAGE OVERRIDES:** When building a page, check `design-system/getsolvedit/pages/[page-name].md` first.  
> If it exists, its rules **override** the supplementary sections below.  
> **`.impeccable.md` still overrides everything** for brand and tone.

---

**Project:** GetSolvedIt  
**Generated:** 2026-03-26 (UI Pro Max) — **rebinder applied:** 2026-03-26  
**Category:** Micro SaaS / campaign landings

---

## Supplementary reference — Global Rules (generator)

> **Note:** CSS variables and hex values here are **illustrative**. The production app uses **Tailwind** classes and **`globals.css`** utilities (`page-x`, `modal-backdrop`, etc.), not necessarily these variable names.

### Color Palette (reference — not live tokens)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#6366F1` | `--color-primary` |
| Secondary | `#818CF8` | `--color-secondary` |
| CTA/Accent | `#10B981` | `--color-cta` |
| Background | `#F5F3FF` | `--color-background` |
| Text | `#1E1B4B` | `--color-text` |

**Color Notes (generator):** Indigo primary + emerald CTA

### Typography (reference — live site uses Outfit)

- **Generator suggested heading/body:** Plus Jakarta Sans  
- **Actual implementation:** See `.impeccable.md` — **Outfit** via Next.js `next/font/google`.

**CSS Import (generator example only):**

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component specs (reference snippets)

> Prefer **Tailwind** in React components. Avoid `transform: translateY` on primary buttons if it causes **layout shift**; use **color/opacity** transitions (see repo polish pass: `duration-200 ease-out`).

### Buttons

```css
/* Primary Button — illustrative */
.btn-primary {
  background: #10B981;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: color, background-color 200ms ease;
  cursor: pointer;
}
```

### Cards / inputs / modals

Generator examples omitted where they duplicate Tailwind patterns already used (`rounded-2xl`, modal overlay in `WaitlistModalDialog`, etc.). Add page-level specs under `pages/` if needed.

---

## Style guidelines (generator — filter through `.impeccable.md`)

**Style (tool):** Vibrant & Block-based — **treat as optional inspiration only**; SMB trust and founder tone take precedence.

**Key effects (tool):** Large gaps, bold hover — align with **motion** and **reduced-motion** rules already in the codebase.

### Page pattern (generator — adapted)

**Pattern name:** Waitlist / coming soon

| Tool idea | GetSolvedIt adaptation |
|-----------|-------------------------|
| Email above fold | ✅ Hero + **TrackedWaitlistCta** (modal or link). |
| Product teaser | ✅ Illustrations / mock cards on custom slugs. |
| Social proof / count / countdown | ⚠️ Only if **honest** and approved; default **no** fake metrics. |
| Sticky CTA | Optional future enhancement. |

---

## Anti-patterns (tool + project)

- ❌ Complex onboarding flow  
- ❌ Cluttered layout  
- ❌ **Emojis as icons** — prefer SVG (decorative mock copy may use symbols; keep UI chrome clean).  
- ❌ **Missing `cursor-pointer`** on clickable controls (use `TrackedWaitlistCta` / links).  
- ❌ **Layout-shifting hovers** on critical CTAs.  
- ❌ **Low-contrast** body text — target **WCAG AA** (see `.impeccable.md`).  
- ❌ **Instant** state changes — use **150–300ms** transitions.  
- ❌ **Invisible focus** — keep focus rings on nav, hero, mailto, modal close.  

---

## Pre-delivery checklist

- [ ] No emojis used as **icons** for chrome (SVG for UI icons).  
- [ ] `cursor-pointer` / button semantics on interactive elements.  
- [ ] Hover/focus/active states; transitions **~200ms**, **ease-out**.  
- [ ] Light surfaces: text contrast **≥ 4.5:1** for body where possible.  
- [ ] **`prefers-reduced-motion`** respected for decorative motion.  
- [ ] Responsive: **375px → 1440px**, no horizontal scroll.  
- [ ] **PostHog** + **Tally** params unchanged when styling.  
