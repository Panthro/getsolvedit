"use client";

import { ideasConfig } from "@/lib/ideas";
import type { CampaignQuery } from "@/lib/campaign-query";
import { BrandLogo } from "@/components/BrandLogo";
import { LandingAnalytics } from "../LandingAnalytics";
import {
  LandingDotBenefitsList,
  LandingFooter,
  LandingHeader,
  LandingMainWide,
} from "../primitives";
import { TrackedWaitlistCta } from "../TrackedLinks";

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
          className="h-6 w-6 text-amber-400"
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
      className="contain-layout rounded-2xl border border-slate-700/80 bg-slate-800/80 p-6 shadow-2xl backdrop-blur-sm"
      aria-hidden
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-slate-200">Google review request</p>
          <p className="text-sm text-slate-500">Sent 12 min after job closed</p>
        </div>
        <StarRow />
      </div>
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/80 p-4">
        <p className="text-sm leading-relaxed text-slate-300">
          &ldquo;Thanks for the great work today! Mind leaving us a quick Google review?&rdquo;{" "}
          <span className="text-amber-400/90">[link]</span>
        </p>
      </div>
      <p className="mt-4 text-sm font-medium text-emerald-400/90">↑ New 5★ review this week</p>
    </div>
  );
}

export function ReviewsLanding({ slug, campaignQuery }: ReviewsLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.reviews;
  const { mkt, src } = campaignQuery;
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <LandingHeader className="border-b border-slate-800">
        <BrandLogo
          tone="dark"
          suffix={
            <span className="hidden font-sans text-sm font-normal text-slate-500 sm:inline">
              Reviews
            </span>
          }
        />
        <TrackedWaitlistCta
          slug={slug}
          campaignQuery={campaignQuery}
          position="nav"
          variantTag={variant.tag}
          className="border-0 bg-transparent p-0 font-inherit text-base font-semibold text-amber-400 hover:text-amber-300 active:text-amber-200 sm:text-sm"
        >
          Join waitlist →
        </TrackedWaitlistCta>
      </LandingHeader>

      <LandingMainWide>
        <div className="grid min-w-0 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex min-w-0 justify-center lg:order-1 lg:justify-start">
            <div className="relative min-w-0 w-full max-w-md">
              <div
                className="absolute -inset-6 rounded-full bg-amber-500/10 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <ReviewCard />
              </div>
            </div>
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500/90">
              Plumbers · Cleaners · Mechanics
            </p>
            <h1 className="mb-5 break-words text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
              {variant.headline}
            </h1>
            <p className="mb-8 max-w-xl break-words text-base leading-relaxed text-slate-400 sm:text-lg">
              {variant.subheadline}
            </p>
            <TrackedWaitlistCta
              slug={slug}
              campaignQuery={campaignQuery}
              position="hero"
              variantTag={variant.tag}
              ctaLabel={variant.cta}
              className="mb-10 inline-flex w-full touch-manipulation items-center justify-center rounded-xl bg-amber-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition-colors duration-200 ease-out hover:bg-amber-400 active:bg-amber-300 sm:w-auto sm:text-lg"
            >
              {variant.cta}
            </TrackedWaitlistCta>
            <LandingDotBenefitsList
              lines={variant.benefits}
              rowClassName="text-slate-300"
              bulletClassName="mt-1.5 h-2 w-2 bg-amber-400"
            />
          </div>
        </div>
      </LandingMainWide>

      <LandingFooter
        slug={slug}
        className="border-t border-slate-800"
        rowClassName="text-sm text-slate-500"
        brandTone="mutedDark"
        contactLinkClassName="text-amber-500/90 underline underline-offset-2 hover:text-amber-400"
      />
    </div>
  );
}
