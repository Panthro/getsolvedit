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
import { MenuQrIllustration } from "./MenuQrIllustration";

export type MenuLandingProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

export function MenuLanding({ slug, campaignQuery }: MenuLandingProps) {
  const variant = ideasConfig.variants[slug] ?? ideasConfig.variants.menu;
  const { mkt, src } = campaignQuery;
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-stone-50 via-amber-50/40 to-stone-100 text-stone-900">
      <LandingAnalytics
        slug={slug}
        variantTag={variant.tag}
        variantHeadline={variant.headline}
        mkt={mkt}
        src={src}
      />

      <LandingHeader className="border-b border-stone-200/90 bg-white/80 backdrop-blur-sm">
        <BrandLogo
          tone="light"
          suffix={
            <span className="hidden font-sans text-sm font-normal text-stone-500 sm:inline">
              · QR Menu
            </span>
          }
        />
        <TrackedWaitlistCta
          slug={slug}
          campaignQuery={campaignQuery}
          position="nav"
          variantTag={variant.tag}
          className="border-0 bg-transparent p-0 font-inherit text-base font-semibold text-amber-800 hover:text-amber-900 active:text-amber-950 sm:text-sm"
        >
          Join waitlist →
        </TrackedWaitlistCta>
      </LandingHeader>

      <LandingMainWide>
        <div className="grid min-w-0 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="min-w-0">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-800/90">
              For restaurants & cafés
            </p>
            <h1 className="mb-5 break-words text-3xl font-bold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl lg:text-[2.65rem]">
              {variant.headline}
            </h1>
            <p className="mb-8 max-w-xl break-words text-base leading-relaxed text-stone-600 sm:mb-9 sm:text-lg">
              {variant.subheadline}
            </p>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedWaitlistCta
                slug={slug}
                campaignQuery={campaignQuery}
                position="hero"
                variantTag={variant.tag}
                ctaLabel={variant.cta}
                className="inline-flex w-full touch-manipulation items-center justify-center rounded-xl bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-md shadow-amber-900/15 transition-colors duration-200 ease-out hover:bg-amber-700 active:bg-amber-800 sm:w-auto sm:text-lg"
              >
                {variant.cta}
              </TrackedWaitlistCta>
              <span className="self-center text-center text-sm text-stone-500 sm:self-auto sm:text-left">
                €9/mo · No card to browse the waitlist
              </span>
            </div>
            <LandingDotBenefitsList
              lines={variant.benefits}
              rowClassName="text-stone-700"
              bulletClassName="mt-2 h-1.5 w-1.5 bg-amber-600"
            />
          </div>

          <div className="relative flex min-w-0 flex-col items-center lg:items-end">
            <div
              className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-amber-200/25 blur-3xl"
              aria-hidden
            />
            <div className="w-full max-w-sm space-y-5">
              <MenuQrIllustration />
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm shadow-stone-900/5">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
                  Tonight&apos;s service
                </p>
                <p className="font-semibold text-stone-900">Menu v3 · uploaded 6:12 PM</p>
                <p className="mt-1.5 text-sm leading-snug text-stone-600">
                  Every table QR already points at the latest PDF — no reprints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LandingMainWide>

      <LandingFooter
        slug={slug}
        className="border-t border-stone-200 bg-white/60"
        rowClassName="text-sm text-stone-600"
        brandTone="mutedLight"
        contactLinkClassName="text-amber-800 underline underline-offset-2 hover:text-amber-900"
      />
    </div>
  );
}
