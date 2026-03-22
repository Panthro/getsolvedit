"use client";

import { useMemo } from "react";
import { ideasConfig } from "@/lib/ideas";
import { buildTallyHref } from "@/lib/tally";
import type { CampaignQuery } from "@/lib/campaign-query";
import { LandingAnalytics } from "../LandingAnalytics";
import { TrackedContactEmailLink, TrackedWaitlistLink } from "../TrackedLinks";

export type ReviewsLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function StarRow() {
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-6 h-6 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard() {
  return (
    <div
      className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-sm"
      aria-hidden
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-slate-200 font-medium">Google review request</p>
          <p className="text-slate-500 text-sm">Sent 12 min after job closed</p>
        </div>
        <StarRow />
      </div>
      <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-700/50">
        <p className="text-slate-300 text-sm leading-relaxed">
          &ldquo;Thanks for the great work today! Mind leaving us a quick Google review?&rdquo;{" "}
          <span className="text-amber-400/90">[link]</span>
        </p>
      </div>
      <p className="text-emerald-400/90 text-sm mt-4 font-medium">↑ New 5★ review this week</p>
    </div>
  );
}

export function ReviewsLanding({ slug, campaignQuery }: ReviewsLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.reviews;
  const { mkt, src } = campaignQuery;
  const tallyHref = useMemo(
    () => buildTallyHref({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <header className="border-b border-slate-800 px-5 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-slate-100 tracking-tight text-lg">getsolvedit</span>
            <span className="hidden sm:inline text-slate-500 text-sm">Reviews</span>
          </div>
          <TrackedWaitlistLink
            href={tallyHref}
            slug={slug}
            position="nav"
            variantTag={variant.tag}
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Join waitlist →
          </TrackedWaitlistLink>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md">
                <div
                  className="absolute -inset-6 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"
                  aria-hidden
                />
                <div className="relative">
                  <ReviewCard />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-amber-500/90 text-sm font-semibold uppercase tracking-widest mb-3">
                Plumbers · Cleaners · Mechanics
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.08] tracking-tight mb-5">
                {variant.headline}
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                {variant.subheadline}
              </p>
              <TrackedWaitlistLink
                href={tallyHref}
                slug={slug}
                position="hero"
                variantTag={variant.tag}
                ctaLabel={variant.cta}
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-amber-500/20 mb-10"
              >
                {variant.cta}
              </TrackedWaitlistLink>
              <ul className="space-y-4">
                {variant.benefits.map((line, i) => (
                  <li key={i} className="flex gap-3 items-start text-slate-300">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 px-5 sm:px-8 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
          <span>© 2025 getsolvedit</span>
          <span>
            Questions?{" "}
            <TrackedContactEmailLink
              slug={slug}
              className="text-amber-500/90 hover:text-amber-400 underline underline-offset-2"
            >
              sara@getsolvedit.com
            </TrackedContactEmailLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
