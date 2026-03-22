import type { ComponentType } from "react";
import type { CampaignQuery } from "@/lib/campaign-query";
import { GenericLanding } from "./GenericLanding";
import { MenuLanding } from "./menu/MenuLanding";

export type LandingComponentProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

const customLandings: Partial<
  Record<string, ComponentType<LandingComponentProps>>
> = {
  menu: MenuLanding,
};

export function getLandingComponent(
  slug: string
): ComponentType<LandingComponentProps> {
  return customLandings[slug] ?? GenericLanding;
}
