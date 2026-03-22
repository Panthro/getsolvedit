export type CampaignQuery = {
  mkt?: string;
  lang?: string;
  src?: string;
};

function firstString(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export function parseCampaignQuery(
  sp: Record<string, string | string[] | undefined>
): CampaignQuery {
  return {
    mkt: firstString(sp.mkt),
    lang: firstString(sp.lang),
    src: firstString(sp.src),
  };
}
