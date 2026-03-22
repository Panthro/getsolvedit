"use client";

import { useMemo } from "react";
import { ideasConfig } from "@/lib/ideas";
import { buildTallyHref } from "@/lib/tally";
import type { CampaignQuery } from "@/lib/campaign-query";
import { LandingAnalytics } from "../LandingAnalytics";
import { TrackedContactEmailLink, TrackedWaitlistLink } from "../TrackedLinks";

export type MenuLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function QrTile() {
  return (
    <div
      className="aspect-square rounded-2xl bg-stone-900 p-4 shadow-2xl ring-1 ring-white/10"
      aria-hidden
    >
      <div className="h-full w-full rounded-lg bg-white p-3 grid grid-cols-6 gap-1">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-sm ${i % 3 === 0 || i % 7 === 0 ? "bg-stone-900" : "bg-stone-100"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function MenuLanding({ slug, campaignQuery }: MenuLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.menu;
  const { mkt, src } = campaignQuery;
  const tallyHref = useMemo(
    () => buildTallyHref({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <header className="border-b border-amber-900/30 px-5 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400/90 font-semibold tracking-tight text-lg">
              getsolvedit
            </span>
            <span className="hidden sm:inline text-stone-500 text-sm">· QR Menu</span>
          </div>
          <TrackedWaitlistLink
            href={tallyHref}
            slug={slug}
            position="nav"
            variantTag={variant.tag}
            className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            Join waitlist →
          </TrackedWaitlistLink>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <p className="text-amber-500/90 text-sm font-medium uppercase tracking-widest mb-4">
                For restaurants & cafés
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[2.75rem] font-bold text-stone-50 leading-[1.1] tracking-tight mb-6">
                One QR on every table.
                <span className="block text-stone-400 font-normal text-3xl sm:text-4xl mt-2">
                  Swap the menu whenever you want.
                </span>
              </h1>
              <p className="text-lg text-stone-400 leading-relaxed mb-10 max-w-xl">
                Upload a new PDF — your printed QR stays the same. No reprints, no new stickers,
                no chasing the printer before service.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                <TrackedWaitlistLink
                  href={tallyHref}
                  slug={slug}
                  position="hero"
                  variantTag={variant.tag}
                  ctaLabel={variant.cta}
                  className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                >
                  {variant.cta}
                </TrackedWaitlistLink>
                <span className="text-stone-500 text-sm">€9/mo · No card to browse the waitlist</span>
              </div>
              <ul className="space-y-4 text-stone-300">
                {variant.benefits.map((line, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full scale-110 pointer-events-none" />
              <div className="relative w-full max-w-sm space-y-6">
                <QrTile />
                <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm">
                  <p className="text-stone-500 text-xs uppercase tracking-wider mb-2">
                    Tonight’s service
                  </p>
                  <p className="text-stone-200 font-medium">Menu v3 · uploaded 6:12 PM</p>
                  <p className="text-stone-500 text-sm mt-1">All table QR codes already point here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-800 px-5 sm:px-8 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-sm">
          <span>© 2025 getsolvedit</span>
          <span>
            Questions?{" "}
            <TrackedContactEmailLink
              slug={slug}
              className="text-amber-500/80 hover:text-amber-400 underline underline-offset-2"
            >
              sara@getsolvedit.com
            </TrackedContactEmailLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
