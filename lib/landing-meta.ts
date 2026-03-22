import type { Metadata } from "next";
import { ideasConfig } from "@/lib/ideas";

/** Optional overrides when a custom landing’s on-page copy differs from `ideas.json`. */
const metadataOverrides: Partial<
  Record<string, { title: string; description: string }>
> = {};

export function resolveLandingMetadata(slug: string): Metadata {
  const variant = ideasConfig.variants[slug];
  if (!variant) {
    return {};
  }
  const override = metadataOverrides[slug];
  return {
    title: override?.title ?? `getsolvedit — ${variant.headline}`,
    description: override?.description ?? variant.subheadline,
    robots: { index: false, follow: false },
  };
}
