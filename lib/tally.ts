import type { CampaignQuery } from "@/lib/campaign-query";
import { ideasConfig } from "@/lib/ideas";

function tallyParams(
  slug: string,
  campaignQuery: CampaignQuery,
  extra?: Record<string, string>
): URLSearchParams {
  const { mkt, lang, src } = campaignQuery;
  const params = new URLSearchParams();
  params.set("idea", slug);
  if (mkt) params.set("mkt", mkt);
  if (lang) params.set("lang", lang);
  if (src) params.set("src", src);
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      params.set(k, v);
    }
  }
  return params;
}

export function buildTallyHref(args: {
  slug: string;
  campaignQuery: CampaignQuery;
  tallyFormId?: string;
}): string {
  const { slug, campaignQuery } = args;
  const id = args.tallyFormId ?? ideasConfig.tallyFormId;
  const params = tallyParams(slug, campaignQuery);
  const base = `https://tally.so/r/${id}`;
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

/** Tally iframe embed; hidden fields use the same query keys as `/r/` links. */
export function buildTallyEmbedSrc(args: {
  slug: string;
  campaignQuery: CampaignQuery;
  tallyFormId?: string;
}): string {
  const { slug, campaignQuery } = args;
  const id = args.tallyFormId ?? ideasConfig.tallyFormId;
  const params = tallyParams(slug, campaignQuery, {
    dynamicHeight: "1",
    alignLeft: "1",
    hideTitle: "1",
  });
  return `https://tally.so/embed/${id}?${params.toString()}`;
}
