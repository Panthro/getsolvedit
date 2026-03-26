"use client";

import { ideasConfig } from "@/lib/ideas";
import type { CampaignQuery } from "@/lib/campaign-query";
import { BrandLogo } from "@/components/BrandLogo";
import { LandingAnalytics } from "./LandingAnalytics";
import { LandingFooter, LandingHeader } from "./primitives";
import { TrackedWaitlistCta } from "./TrackedLinks";

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

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <LandingHeader
        as="nav"
        className="border-b border-gray-100"
        maxWidth="narrow"
        innerGapClassName="gap-x-4 gap-y-3"
      >
        <BrandLogo tone="light" />
        <TrackedWaitlistCta
          slug={slug}
          campaignQuery={campaignQuery}
          position="nav"
          variantTag={variant.tag}
          className="border-0 bg-transparent p-0 font-inherit text-base font-medium text-blue-600 hover:text-blue-700 active:text-blue-800 sm:text-sm"
        >
          Join waitlist →
        </TrackedWaitlistCta>
      </LandingHeader>

      <main className="flex-1 flex flex-col items-center justify-center page-x py-12 sm:py-16 md:py-20 min-w-0">
        <div className="max-w-2xl w-full min-w-0">
          <div className="mb-6">
            <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              {variant.tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6 break-words">
            {variant.headline}
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 sm:mb-10 break-words">
            {variant.subheadline}
          </p>

          <ul className="space-y-4 mb-10 sm:mb-12">
            {variant.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-gray-700 text-base sm:text-lg min-w-0 break-words">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <TrackedWaitlistCta
              slug={slug}
              campaignQuery={campaignQuery}
              position="hero"
              variantTag={variant.tag}
              ctaLabel={variant.cta}
              className="inline-flex w-full touch-manipulation justify-center rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-semibold text-white shadow-sm transition-colors duration-200 ease-out hover:bg-blue-700 active:bg-blue-800 sm:w-auto sm:text-lg"
            >
              {variant.cta}
            </TrackedWaitlistCta>
            <span className="self-center text-center text-sm text-gray-500 sm:self-auto sm:text-left">
              No credit card · Cancel anytime
            </span>
          </div>
        </div>
      </main>

      <LandingFooter
        slug={slug}
        className="border-t border-gray-100"
        maxWidth="narrow"
        rowClassName="text-sm text-gray-600"
        brandTone="mutedLight"
        contactLinkClassName="text-gray-500 underline underline-offset-2 hover:text-gray-700"
        density="compact"
      />
    </div>
  );
}
