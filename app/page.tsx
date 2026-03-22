import { getLandingComponent } from "@/components/landings/registry";
import { WaitlistModalProvider } from "@/components/WaitlistModalProvider";
import { ideasConfig } from "@/lib/ideas";
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
  const campaignQuery = parseCampaignQuery(sp);
  const variant = ideasConfig.variants.default;
  const Cmp = getLandingComponent(slug);
  return (
    <WaitlistModalProvider
      slug={slug}
      campaignQuery={campaignQuery}
      variantTag={variant.tag}
    >
      <Cmp slug={slug} campaignQuery={campaignQuery} />
    </WaitlistModalProvider>
  );
}
