import { getLandingComponent } from "@/components/landings/registry";
import { parseCampaignQuery } from "@/lib/campaign-query";
import { resolveLandingMetadata } from "@/lib/landing-meta";
import type { Metadata } from "next";

export const metadata: Metadata = resolveLandingMetadata("default");

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const slug = "default";
  const Cmp = getLandingComponent(slug);
  return <Cmp slug={slug} campaignQuery={parseCampaignQuery(sp)} />;
}
