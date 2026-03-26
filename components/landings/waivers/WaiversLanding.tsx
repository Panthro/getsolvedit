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

export type WaiversLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function WaiverPreview() {
  return (
    <div
      className="contain-layout rounded-2xl border border-emerald-700/30 bg-emerald-950/40 p-6 shadow-2xl ring-1 ring-white/5"
      aria-hidden
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-xl font-bold text-emerald-300">
          ✓
        </div>
        <div>
          <p className="font-semibold text-emerald-100">Participant waiver</p>
          <p className="text-sm text-emerald-400/70">Signed on phone · PDF stored</p>
        </div>
      </div>
      <div className="space-y-3 rounded-xl border border-emerald-800/40 bg-black/25 p-4">
        <div className="h-2 w-3/4 rounded bg-emerald-900/80" />
        <div className="h-2 w-full rounded bg-emerald-900/60" />
        <div className="h-2 w-5/6 rounded bg-emerald-900/60" />
        <div className="mt-2 flex items-center justify-between border-t border-emerald-800/50 pt-4">
          <span className="text-xs uppercase tracking-wider text-emerald-500/80">Signature</span>
          <span className="font-['Georgia',serif] text-2xl italic text-emerald-200/90">Jordan M.</span>
        </div>
      </div>
    </div>
  );
}

export function WaiversLanding({ slug, campaignQuery }: WaiversLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.waivers;
  const { mkt, src } = campaignQuery;
  return (
    <div className="flex min-h-screen flex-col bg-[#0c1412] text-emerald-50">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <LandingHeader className="border-b border-emerald-900/40">
        <BrandLogo
          tone="dark"
          suffix={
            <span className="hidden font-sans text-sm font-normal text-emerald-600/80 sm:inline">
              Waivers
            </span>
          }
        />
        <TrackedWaitlistCta
          slug={slug}
          campaignQuery={campaignQuery}
          position="nav"
          variantTag={variant.tag}
          className="border-0 bg-transparent p-0 font-inherit text-base font-semibold text-emerald-400 hover:text-emerald-300 active:text-emerald-200 sm:text-sm"
        >
          Join waitlist →
        </TrackedWaitlistCta>
      </LandingHeader>

      <LandingMainWide>
        <div className="grid min-w-0 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Surf · Climb · Yoga · Studios
            </p>
            <h1 className="mb-5 break-words text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
              {variant.headline}
            </h1>
            <p className="mb-8 max-w-xl break-words text-base leading-relaxed text-emerald-100/70 sm:text-lg">
              {variant.subheadline}
            </p>
            <TrackedWaitlistCta
              slug={slug}
              campaignQuery={campaignQuery}
              position="hero"
              variantTag={variant.tag}
              ctaLabel={variant.cta}
              className="mb-10 inline-flex w-full touch-manipulation items-center justify-center rounded-xl bg-emerald-500 px-8 py-4 text-base font-semibold text-emerald-950 shadow-lg shadow-emerald-900/40 transition-colors duration-200 ease-out hover:bg-emerald-400 active:bg-emerald-300 sm:w-auto sm:text-lg"
            >
              {variant.cta}
            </TrackedWaitlistCta>
            <LandingDotBenefitsList
              lines={variant.benefits}
              rowClassName="text-emerald-100/85"
              bulletClassName="mt-1.5 h-2 w-2 bg-emerald-400"
            />
          </div>
          <div className="flex min-w-0 justify-center lg:justify-end">
            <div className="relative min-w-0 w-full max-w-md">
              <div
                className="pointer-events-none absolute -inset-8 rounded-full bg-emerald-600/15 blur-3xl"
                aria-hidden
              />
              <WaiverPreview />
            </div>
          </div>
        </div>
      </LandingMainWide>

      <LandingFooter
        slug={slug}
        className="border-t border-emerald-900/40"
        rowClassName="text-sm text-emerald-700"
        brandTone="mutedDark"
        copyrightClassName="text-emerald-600/90"
        contactLinkClassName="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
      />
    </div>
  );
}
