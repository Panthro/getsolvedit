import { LandingPage } from "@/components/LandingPage";
import { ideasConfig } from "@/lib/ideas";
import { parseCampaignQuery } from "@/lib/campaign-query";
import type { Metadata } from "next";

const variant = ideasConfig.variants.default;

export const metadata: Metadata = {
  title: `getsolvedit — ${variant.headline}`,
  description: variant.subheadline,
  robots: { index: false, follow: false },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <LandingPage slug="default" campaignQuery={parseCampaignQuery(sp)} />
  );
}
