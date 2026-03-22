import type { ComponentType } from "react";
import type { CampaignQuery } from "@/lib/campaign-query";
import { GiftCardsLanding } from "./gift-cards/GiftCardsLanding";
import { GenericLanding } from "./GenericLanding";
import { MenuLanding } from "./menu/MenuLanding";
import { RemindersLanding } from "./reminders/RemindersLanding";
import { ReviewsLanding } from "./reviews/ReviewsLanding";
import { WaiversLanding } from "./waivers/WaiversLanding";

export type LandingComponentProps = {
  slug: string;
  campaignQuery: CampaignQuery;
};

const customLandings: Partial<
  Record<string, ComponentType<LandingComponentProps>>
> = {
  menu: MenuLanding,
  reminders: RemindersLanding,
  reviews: ReviewsLanding,
  waivers: WaiversLanding,
  "gift-cards": GiftCardsLanding,
};

export function getLandingComponent(
  slug: string
): ComponentType<LandingComponentProps> {
  return customLandings[slug] ?? GenericLanding;
}
