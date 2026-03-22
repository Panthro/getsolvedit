"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type LandingAnalyticsProps = {
  slug: string;
  variantTag: string;
  variantHeadline: string;
  mkt?: string;
  src?: string;
};

export function LandingAnalytics({
  slug,
  variantTag,
  variantHeadline,
  mkt,
  src,
}: LandingAnalyticsProps) {
  useEffect(() => {
    posthog.capture("landing_page_viewed", {
      slug,
      variant_tag: variantTag,
      variant_headline: variantHeadline,
      mkt: mkt ?? null,
      src: src ?? null,
    });
  }, [slug, variantTag, variantHeadline, mkt, src]);

  return null;
}
