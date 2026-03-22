"use client";

import { useMemo } from "react";
import { ideasConfig } from "@/lib/ideas";
import { buildTallyHref } from "@/lib/tally";
import type { CampaignQuery } from "@/lib/campaign-query";
import { BrandLogo } from "@/components/BrandLogo";
import { LandingAnalytics } from "../LandingAnalytics";
import { TrackedContactEmailLink, TrackedWaitlistLink } from "../TrackedLinks";

export type WaiversLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function WaiverPreview() {
  return (
    <div
      className="rounded-2xl bg-emerald-950/40 border border-emerald-700/30 p-6 shadow-2xl ring-1 ring-white/5"
      aria-hidden
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 text-xl font-bold">
          ✓
        </div>
        <div>
          <p className="text-emerald-100 font-semibold">Participant waiver</p>
          <p className="text-emerald-400/70 text-sm">Signed on phone · PDF stored</p>
        </div>
      </div>
      <div className="space-y-3 rounded-xl bg-black/25 p-4 border border-emerald-800/40">
        <div className="h-2 bg-emerald-900/80 rounded w-3/4" />
        <div className="h-2 bg-emerald-900/60 rounded w-full" />
        <div className="h-2 bg-emerald-900/60 rounded w-5/6" />
        <div className="pt-4 mt-2 border-t border-emerald-800/50 flex items-center justify-between">
          <span className="text-emerald-500/80 text-xs uppercase tracking-wider">Signature</span>
          <span className="font-['Georgia',serif] text-2xl text-emerald-200/90 italic">
            Jordan M.
          </span>
        </div>
      </div>
    </div>
  );
}

export function WaiversLanding({ slug, campaignQuery }: WaiversLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.waivers;
  const { mkt, src } = campaignQuery;
  const tallyHref = useMemo(
    () => buildTallyHref({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  return (
    <div className="min-h-screen bg-[#0c1412] text-emerald-50 flex flex-col">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <header className="border-b border-emerald-900/40 px-5 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <BrandLogo
            tone="dark"
            suffix={
              <span className="hidden sm:inline text-emerald-600/80 text-sm font-normal font-sans">
                Waivers
              </span>
            }
          />
          <TrackedWaitlistLink
            href={tallyHref}
            slug={slug}
            position="nav"
            variantTag={variant.tag}
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Join waitlist →
          </TrackedWaitlistLink>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div>
              <p className="text-emerald-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Surf · Climb · Yoga · Studios
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.08] tracking-tight mb-5">
                {variant.headline}
              </h1>
              <p className="text-lg text-emerald-100/70 leading-relaxed mb-8 max-w-xl">
                {variant.subheadline}
              </p>
              <TrackedWaitlistLink
                href={tallyHref}
                slug={slug}
                position="hero"
                variantTag={variant.tag}
                ctaLabel={variant.cta}
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-900/40 mb-10"
              >
                {variant.cta}
              </TrackedWaitlistLink>
              <ul className="space-y-4">
                {variant.benefits.map((line, i) => (
                  <li key={i} className="flex gap-3 items-start text-emerald-100/85">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div
                  className="absolute -inset-8 bg-emerald-600/15 blur-3xl rounded-full pointer-events-none"
                  aria-hidden
                />
                <WaiverPreview />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-emerald-900/40 px-5 sm:px-8 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-700 text-sm">
          <span className="text-emerald-600/90 inline-flex items-baseline gap-1.5">
            <span>© 2025</span>
            <BrandLogo tone="mutedDark" size="sm" />
          </span>
          <span>
            Questions?{" "}
            <TrackedContactEmailLink
              slug={slug}
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              sara@getsolvedit.com
            </TrackedContactEmailLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
