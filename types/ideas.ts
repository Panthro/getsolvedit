export type IdeaVariant = {
  tag: string;
  headline: string;
  subheadline: string;
  benefits: string[];
  cta: string;
};

export type IdeasFile = {
  tallyFormId: string;
  variants: Record<string, IdeaVariant>;
};
