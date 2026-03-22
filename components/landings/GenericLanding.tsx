"use client";

import { useMemo } from "react";
import { ideasConfig } from "@/lib/ideas";
import { buildTallyHref } from "@/lib/tally";
import type { CampaignQuery } from "@/lib/campaign-query";
import { LandingAnalytics } from "./LandingAnalytics";
import { TrackedContactEmailLink, TrackedWaitlistLink } from "./TrackedLinks";

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export type GenericLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

export function GenericLanding({ slug, campaignQuery }: GenericLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.default;
  const { mkt, src } = campaignQuery;

  const tallyHref = useMemo(
    () => buildTallyHref({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-gray-900 font-semibold text-lg tracking-tight">
            getsolvedit
          </span>
          <TrackedWaitlistLink
            href={tallyHref}
            slug={slug}
            position="nav"
            variantTag={variant.tag}
            className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Join waitlist →
          </TrackedWaitlistLink>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full">
          <div className="mb-6">
            <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              {variant.tag}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            {variant.headline}
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed mb-10">{variant.subheadline}</p>

          <ul className="space-y-4 mb-12">
            {variant.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <TrackedWaitlistLink
              href={tallyHref}
              slug={slug}
              position="hero"
              variantTag={variant.tag}
              ctaLabel={variant.cta}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-sm"
            >
              {variant.cta}
            </TrackedWaitlistLink>
            <span className="text-gray-400 text-sm">No credit card · Cancel anytime</span>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-gray-400 text-sm">© 2025 getsolvedit</span>
          <span className="text-gray-400 text-sm">
            Questions?{" "}
            <TrackedContactEmailLink
              slug={slug}
              className="text-gray-500 hover:text-gray-700 underline underline-offset-2"
            >
              sara@getsolvedit.com
            </TrackedContactEmailLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
