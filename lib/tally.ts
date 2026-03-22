import type { CampaignQuery } from "@/lib/campaign-query";
import { ideasConfig } from "@/lib/ideas";

export function buildTallyHref(args: {
  slug: string;
  campaignQuery: CampaignQuery;
  tallyFormId?: string;
}): string {
  const { slug, campaignQuery } = args;
  const id = args.tallyFormId ?? ideasConfig.tallyFormId;
  const { mkt, lang, src } = campaignQuery;
  const params = new URLSearchParams();
  params.set("idea", slug);
  if (mkt) params.set("mkt", mkt);
  if (lang) params.set("lang", lang);
  if (src) params.set("src", src);
  const base = `https://tally.so/r/${id}`;
  return params.toString() ? `${base}?${params.toString()}` : base;
}
