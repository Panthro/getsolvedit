"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import posthog from "posthog-js";
import { useWaitlistModal } from "@/components/WaitlistModalProvider";
import type { CampaignQuery } from "@/lib/campaign-query";
import { buildTallyHref } from "@/lib/tally";

type TrackedWaitlistLinkProps = {
  href: string;
  slug: string;
  position: "nav" | "hero";
  variantTag: string;
  ctaLabel?: string;
  className?: string;
  children: ReactNode;
};

/** Opens Tally in a new tab; use when no `WaitlistModalProvider` is present. */
export function TrackedWaitlistLink({
  href,
  slug,
  position,
  variantTag,
  ctaLabel,
  className,
  children,
}: TrackedWaitlistLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        posthog.capture("waitlist_cta_clicked", {
          slug,
          position,
          variant_tag: variantTag,
          ...(ctaLabel !== undefined ? { cta_label: ctaLabel } : {}),
        })
      }
    >
      {children}
    </a>
  );
}

type TrackedWaitlistCtaProps = {
  slug: string;
  campaignQuery: CampaignQuery;
  position: "nav" | "hero";
  variantTag: string;
  ctaLabel?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Prefer this on landings: opens embedded Tally in a modal when wrapped in
 * `WaitlistModalProvider`; otherwise falls back to a tracked new-tab link.
 */
export function TrackedWaitlistCta({
  slug,
  campaignQuery,
  position,
  variantTag,
  ctaLabel,
  className,
  children,
}: TrackedWaitlistCtaProps) {
  const modal = useWaitlistModal();
  const tallyHref = useMemo(
    () => buildTallyHref({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  if (modal) {
    return (
      <button
        type="button"
        className={[className, "cursor-pointer"].filter(Boolean).join(" ")}
        onClick={() => modal.openWaitlist({ position, ctaLabel })}
      >
        {children}
      </button>
    );
  }

  return (
    <TrackedWaitlistLink
      href={tallyHref}
      slug={slug}
      position={position}
      variantTag={variantTag}
      ctaLabel={ctaLabel}
      className={className}
    >
      {children}
    </TrackedWaitlistLink>
  );
}

type TrackedContactEmailLinkProps = {
  slug: string;
  className?: string;
  children: ReactNode;
};

export function TrackedContactEmailLink({
  slug,
  className,
  children,
}: TrackedContactEmailLinkProps) {
  return (
    <a
      href="mailto:sara@getsolvedit.com"
      className={className}
      onClick={() => posthog.capture("contact_email_clicked", { slug })}
    >
      {children}
    </a>
  );
}
