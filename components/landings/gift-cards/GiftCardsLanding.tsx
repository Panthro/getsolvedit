"use client";

import { useMemo } from "react";
import { ideasConfig } from "@/lib/ideas";
import { buildTallyHref } from "@/lib/tally";
import type { CampaignQuery } from "@/lib/campaign-query";
import { LandingAnalytics } from "../LandingAnalytics";
import { TrackedContactEmailLink, TrackedWaitlistLink } from "../TrackedLinks";

export type GiftCardsLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function GiftCardVisual() {
  return (
    <div className="relative" aria-hidden>
      <div className="rounded-2xl p-8 shadow-2xl bg-gradient-to-br from-rose-900 via-rose-800 to-amber-900 text-rose-50 border border-rose-700/50 max-w-sm mx-auto rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
        <p className="text-rose-200/80 text-xs uppercase tracking-[0.2em] mb-6">Gift card</p>
        <p className="font-serif text-3xl sm:text-4xl mb-2 text-rose-50">€50</p>
        <p className="text-rose-200/90 text-sm mb-8">Your business name · Valid 12 months</p>
        <div className="flex items-center justify-between pt-6 border-t border-rose-600/40">
          <span className="text-xs text-rose-300/80">Code · GIFT-8K2M</span>
          <span className="text-2xl">✦</span>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-2 w-24 h-24 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
    </div>
  );
}

export function GiftCardsLanding({ slug, campaignQuery }: GiftCardsLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants["gift-cards"];
  const { mkt, src } = campaignQuery;
  const tallyHref = useMemo(
    () => buildTallyHref({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  return (
    <div className="min-h-screen bg-[#1a0a0f] text-rose-50 flex flex-col">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <header className="border-b border-rose-900/40 px-5 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-rose-100 tracking-tight text-lg">getsolvedit</span>
            <span className="hidden sm:inline text-rose-400/70 text-sm">Gift cards</span>
          </div>
          <TrackedWaitlistLink
            href={tallyHref}
            slug={slug}
            position="nav"
            variantTag={variant.tag}
            className="text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors"
          >
            Join waitlist →
          </TrackedWaitlistLink>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <GiftCardVisual />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-amber-400/90 text-sm font-semibold uppercase tracking-widest mb-3">
                Salons · Bakeries · Wellness
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-rose-50 leading-[1.08] tracking-tight mb-5">
                {variant.headline}
              </h1>
              <p className="text-lg text-rose-200/70 leading-relaxed mb-8 max-w-xl">
                {variant.subheadline}
              </p>
              <TrackedWaitlistLink
                href={tallyHref}
                slug={slug}
                position="hero"
                variantTag={variant.tag}
                ctaLabel={variant.cta}
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-rose-950 font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-amber-900/30 mb-10"
              >
                {variant.cta}
              </TrackedWaitlistLink>
              <ul className="space-y-4">
                {variant.benefits.map((line, i) => (
                  <li key={i} className="flex gap-3 items-start text-rose-100/85">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-rose-900/40 px-5 sm:px-8 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-rose-400/70 text-sm">
          <span>© 2025 getsolvedit</span>
          <span>
            Questions?{" "}
            <TrackedContactEmailLink
              slug={slug}
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2"
            >
              sara@getsolvedit.com
            </TrackedContactEmailLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
