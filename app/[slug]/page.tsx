import { LandingPage } from "@/components/LandingPage";
import { ideasConfig } from "@/lib/ideas";
import { parseCampaignQuery } from "@/lib/campaign-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(ideasConfig.variants)
    .filter((k) => k !== "default")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const variant = ideasConfig.variants[slug];
  if (!variant) {
    return {};
  }
  return {
    title: `getsolvedit — ${variant.headline}`,
    description: variant.subheadline,
    robots: { index: false, follow: false },
  };
}

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  if (!ideasConfig.variants[slug]) {
    notFound();
  }
  const sp = await searchParams;
  return <LandingPage slug={slug} campaignQuery={parseCampaignQuery(sp)} />;
}
