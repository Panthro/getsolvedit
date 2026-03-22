"use client";

import { useMemo } from "react";
import { ideasConfig } from "@/lib/ideas";
import { buildTallyHref } from "@/lib/tally";
import type { CampaignQuery } from "@/lib/campaign-query";
import { BrandLogo } from "@/components/BrandLogo";
import { LandingAnalytics } from "../LandingAnalytics";
import { TrackedContactEmailLink, TrackedWaitlistLink } from "../TrackedLinks";
import { MenuQrIllustration } from "./MenuQrIllustration";

export type MenuLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

export function MenuLanding({ slug, campaignQuery }: MenuLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.menu;
  const { mkt, src } = campaignQuery;
  const tallyHref = useMemo(
    () => buildTallyHref({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/40 to-stone-100 text-stone-900 flex flex-col">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <header className="border-b border-stone-200/90 bg-white/80 backdrop-blur-sm px-5 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <BrandLogo
            tone="light"
            suffix={
              <span className="hidden sm:inline text-stone-500 text-sm font-normal font-sans">
                · QR Menu
              </span>
            }
          />
          <TrackedWaitlistLink
            href={tallyHref}
            slug={slug}
            position="nav"
            variantTag={variant.tag}
            className="text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            Join waitlist →
          </TrackedWaitlistLink>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
            <div>
              <p className="text-amber-800/90 text-sm font-semibold uppercase tracking-widest mb-4">
                For restaurants & cafés
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[2.65rem] font-bold text-stone-900 leading-[1.12] tracking-tight mb-5">
                {variant.headline}
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-9 max-w-xl">
                {variant.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                <TrackedWaitlistLink
                  href={tallyHref}
                  slug={slug}
                  position="hero"
                  variantTag={variant.tag}
                  ctaLabel={variant.cta}
                  className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-md shadow-amber-900/15"
                >
                  {variant.cta}
                </TrackedWaitlistLink>
                <span className="text-stone-500 text-sm">
                  €9/mo · No card to browse the waitlist
                </span>
              </div>
              <ul className="space-y-4 text-stone-700">
                {variant.benefits.map((line, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-600 shrink-0" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-col items-center lg:items-end">
              <div
                className="absolute inset-0 bg-amber-200/25 blur-3xl rounded-full scale-110 pointer-events-none -z-10"
                aria-hidden
              />
              <div className="w-full max-w-sm space-y-5">
                <MenuQrIllustration />
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm shadow-stone-900/5">
                  <p className="text-stone-500 text-xs font-medium uppercase tracking-wider mb-2">
                    Tonight&apos;s service
                  </p>
                  <p className="text-stone-900 font-semibold">Menu v3 · uploaded 6:12 PM</p>
                  <p className="text-stone-600 text-sm mt-1.5 leading-snug">
                    Every table QR already points at the latest PDF — no reprints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white/60 px-5 sm:px-8 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-600 text-sm">
          <span className="inline-flex items-baseline gap-1.5">
            <span>© 2025</span>
            <BrandLogo tone="mutedLight" size="sm" />
          </span>
          <span>
            Questions?{" "}
            <TrackedContactEmailLink
              slug={slug}
              className="text-amber-800 hover:text-amber-900 underline underline-offset-2"
            >
              sara@getsolvedit.com
            </TrackedContactEmailLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
