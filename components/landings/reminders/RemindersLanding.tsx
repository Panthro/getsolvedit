"use client";

import { ideasConfig } from "@/lib/ideas";
import type { CampaignQuery } from "@/lib/campaign-query";
import { BrandLogo } from "@/components/BrandLogo";
import { LandingAnalytics } from "../LandingAnalytics";
import {
  TrackedContactEmailLink,
  TrackedWaitlistCta,
} from "../TrackedLinks";

export type RemindersLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

function CalendarCard() {
  return (
    <div
      className="rounded-2xl bg-white shadow-xl shadow-teal-900/10 ring-1 ring-teal-900/5 overflow-hidden"
      aria-hidden
    >
      <div className="bg-teal-700 px-4 py-3 flex items-center justify-between text-white">
        <span className="text-sm font-medium">This week</span>
        <span className="text-xs opacity-90">Mar</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center text-sm font-bold">
            24
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">2:30 PM · Alex</p>
            <p className="text-xs text-slate-500">Reminder sent · ✓ Confirmed</p>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">SMS preview</p>
          <p className="text-sm text-slate-700 leading-snug">
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
    <div className="min-h-screen bg-gradient-to-b from-teal-50/80 to-slate-50 text-slate-900 flex flex-col">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <header className="border-b border-teal-900/10 bg-white/70 backdrop-blur-sm px-5 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <BrandLogo
            tone="light"
            suffix={
              <span className="hidden sm:inline text-slate-500 text-sm font-normal font-sans">
                Reminders
              </span>
            }
          />
          <TrackedWaitlistCta
            slug={slug}
            campaignQuery={campaignQuery}
            position="nav"
            variantTag={variant.tag}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors bg-transparent border-0 p-0 font-inherit"
          >
            Join waitlist →
          </TrackedWaitlistCta>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div>
              <p className="text-teal-700 text-sm font-semibold uppercase tracking-widest mb-3">
                Groomers · Salons · Tutors
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-5">
                {variant.headline}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                {variant.subheadline}
              </p>
              <TrackedWaitlistCta
                slug={slug}
                campaignQuery={campaignQuery}
                position="hero"
                variantTag={variant.tag}
                ctaLabel={variant.cta}
                className="inline-flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-teal-900/15 mb-10"
              >
                {variant.cta}
              </TrackedWaitlistCta>
              <ul className="space-y-4">
                {variant.benefits.map((line, i) => (
                  <li key={i} className="flex gap-3 items-start text-slate-700">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-teal-200/30 blur-2xl rounded-full" aria-hidden />
                <div className="relative space-y-6">
                  <CalendarCard />
                  <p className="text-center text-sm text-slate-500">
                    No app for your clients — just a normal text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-teal-900/10 bg-white/80 px-5 sm:px-8 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
          <span className="inline-flex items-baseline gap-1.5">
            <span>© 2025</span>
            <BrandLogo tone="mutedLight" size="sm" />
          </span>
          <span>
            Questions?{" "}
            <TrackedContactEmailLink
              slug={slug}
              className="text-teal-700 hover:text-teal-800 underline underline-offset-2"
            >
              sara@getsolvedit.com
            </TrackedContactEmailLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
