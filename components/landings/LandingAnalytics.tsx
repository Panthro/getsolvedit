"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/** Dedupes page-view capture within the same JS session (e.g. React Strict Mode dev double-mount). */
const seenLandingViews = new Set<string>();

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
    const dedupeKey = [
      slug,
      variantTag,
      variantHeadline,
      mkt ?? "",
      src ?? "",
    ].join("|");

    if (seenLandingViews.has(dedupeKey)) return;
    seenLandingViews.add(dedupeKey);

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
