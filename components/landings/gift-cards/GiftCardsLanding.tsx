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

export type GiftCardsLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function GiftCardVisual() {
  return (
    <div className="relative contain-layout" aria-hidden>
      <div className="mx-auto max-w-sm rotate-[-2deg] rounded-2xl border border-rose-700/50 bg-gradient-to-br from-rose-900 via-rose-800 to-amber-900 p-8 text-rose-50 shadow-2xl transition-transform duration-300 ease-out hover:rotate-0 motion-reduce:transition-none motion-reduce:hover:rotate-[-2deg]">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-rose-200/80">Gift card</p>
        <p className="mb-2 font-serif text-3xl text-rose-50 sm:text-4xl">€50</p>
        <p className="mb-8 text-sm text-rose-200/90">Your business name · Valid 12 months</p>
        <div className="flex items-center justify-between border-t border-rose-600/40 pt-6">
          <span className="text-xs text-rose-300/80">Code · GIFT-8K2M</span>
          <span className="text-2xl">✦</span>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -bottom-4 -right-2 h-24 w-24 rounded-full bg-amber-400/20 blur-2xl"
        aria-hidden
      />
    </div>
  );
}

export function GiftCardsLanding({ slug, campaignQuery }: GiftCardsLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants["gift-cards"];
  const { mkt, src } = campaignQuery;
  return (
    <div className="flex min-h-screen flex-col bg-[#1a0a0f] text-rose-50">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <LandingHeader className="border-b border-rose-900/40">
        <BrandLogo
          tone="dark"
          suffix={
            <span className="hidden font-sans text-sm font-normal text-rose-400/70 sm:inline">
              Gift cards
            </span>
          }
        />
        <TrackedWaitlistCta
          slug={slug}
          campaignQuery={campaignQuery}
          position="nav"
          variantTag={variant.tag}
          className="border-0 bg-transparent p-0 font-inherit text-base font-semibold text-amber-300 hover:text-amber-200 active:text-amber-100 sm:text-sm"
        >
          Join waitlist →
        </TrackedWaitlistCta>
      </LandingHeader>

      <LandingMainWide>
        <div className="grid min-w-0 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex min-w-0 justify-center lg:order-1 lg:justify-start">
            <GiftCardVisual />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400/90">
              Salons · Bakeries · Wellness
            </p>
            <h1 className="mb-5 break-words text-3xl font-bold leading-[1.08] tracking-tight text-rose-50 sm:text-4xl md:text-5xl">
              {variant.headline}
            </h1>
            <p className="mb-8 max-w-xl break-words text-base leading-relaxed text-rose-200/70 sm:text-lg">
              {variant.subheadline}
            </p>
            <TrackedWaitlistCta
              slug={slug}
              campaignQuery={campaignQuery}
              position="hero"
              variantTag={variant.tag}
              ctaLabel={variant.cta}
              className="mb-10 inline-flex w-full touch-manipulation items-center justify-center rounded-xl bg-amber-500 px-8 py-4 text-base font-semibold text-rose-950 shadow-lg shadow-amber-900/30 transition-colors duration-200 ease-out hover:bg-amber-400 active:bg-amber-300 sm:w-auto sm:text-lg"
            >
              {variant.cta}
            </TrackedWaitlistCta>
            <LandingDotBenefitsList
              lines={variant.benefits}
              rowClassName="text-rose-100/85"
              bulletClassName="mt-1.5 h-2 w-2 bg-amber-400"
            />
          </div>
        </div>
      </LandingMainWide>

      <LandingFooter
        slug={slug}
        className="border-t border-rose-900/40"
        rowClassName="text-sm text-rose-400/70"
        brandTone="mutedDark"
        contactLinkClassName="text-amber-400/90 underline underline-offset-2 hover:text-amber-300"
      />
    </div>
  );
}
