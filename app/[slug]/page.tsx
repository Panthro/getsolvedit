import { getLandingComponent } from "@/components/landings/registry";
import { ideasConfig } from "@/lib/ideas";
import { resolveLandingMetadata } from "@/lib/landing-meta";
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
  if (!ideasConfig.variants[slug]) {
    return {};
  }
  return resolveLandingMetadata(slug);
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
  const Cmp = getLandingComponent(slug);
  return <Cmp slug={slug} campaignQuery={parseCampaignQuery(sp)} />;
}
