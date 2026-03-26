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

export type RemindersLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function CalendarCard() {
  return (
    <div
      className="contain-layout overflow-hidden rounded-2xl bg-white shadow-xl shadow-teal-900/10 ring-1 ring-teal-900/5"
      aria-hidden
    >
      <div className="flex items-center justify-between bg-teal-700 px-4 py-3 text-white">
        <span className="text-sm font-medium">This week</span>
        <span className="text-xs opacity-90">Mar</span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-sm font-bold text-teal-800">
            24
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">2:30 PM · Alex</p>
            <p className="text-xs text-slate-500">Reminder sent · ✓ Confirmed</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">SMS preview</p>
          <p className="text-sm leading-snug text-slate-700">
            Hi Alex — reminder: you&apos;re booked tomorrow at 2:30 PM. Reply C to confirm or X to
            cancel.
          </p>
        </div>
      </div>
    </div>
  );
}

export function RemindersLanding({ slug, campaignQuery }: RemindersLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.reminders;
  const { mkt, src } = campaignQuery;
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-50/80 to-slate-50 text-slate-900">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <LandingHeader className="border-b border-teal-900/10 bg-white/70 backdrop-blur-sm">
        <BrandLogo
          tone="light"
          suffix={
            <span className="hidden font-sans text-sm font-normal text-slate-500 sm:inline">
              Reminders
            </span>
          }
        />
        <TrackedWaitlistCta
          slug={slug}
          campaignQuery={campaignQuery}
          position="nav"
          variantTag={variant.tag}
          className="border-0 bg-transparent p-0 font-inherit text-base font-semibold text-teal-700 hover:text-teal-800 active:text-teal-900 sm:text-sm"
        >
          Join waitlist →
        </TrackedWaitlistCta>
      </LandingHeader>

      <LandingMainWide>
        <div className="grid min-w-0 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-700">
              Groomers · Salons · Tutors
            </p>
            <h1 className="mb-5 break-words text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              {variant.headline}
            </h1>
            <p className="mb-8 max-w-xl break-words text-base leading-relaxed text-slate-600 sm:text-lg">
              {variant.subheadline}
            </p>
            <TrackedWaitlistCta
              slug={slug}
              campaignQuery={campaignQuery}
              position="hero"
              variantTag={variant.tag}
              ctaLabel={variant.cta}
              className="mb-10 inline-flex w-full touch-manipulation items-center justify-center rounded-xl bg-teal-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-teal-900/15 transition-colors duration-200 ease-out hover:bg-teal-800 active:bg-teal-900 sm:w-auto sm:text-lg"
            >
              {variant.cta}
            </TrackedWaitlistCta>
            <LandingDotBenefitsList
              lines={variant.benefits}
              rowClassName="text-slate-700"
              bulletClassName="mt-1.5 h-2 w-2 bg-teal-500"
            />
          </div>
          <div className="flex min-w-0 justify-center lg:justify-end">
            <div className="relative min-w-0 w-full max-w-md">
              <div className="absolute -inset-4 rounded-full bg-teal-200/30 blur-2xl" aria-hidden />
              <div className="relative space-y-6">
                <CalendarCard />
                <p className="text-center text-sm text-slate-500">
                  No app for your clients — just a normal text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LandingMainWide>

      <LandingFooter
        slug={slug}
        className="border-t border-teal-900/10 bg-white/80"
        rowClassName="text-sm text-slate-500"
        brandTone="mutedLight"
        contactLinkClassName="text-teal-700 underline underline-offset-2 hover:text-teal-800"
      />
    </div>
  );
}
