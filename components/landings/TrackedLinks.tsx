"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";

type TrackedWaitlistLinkProps = {
  href: string;
  slug: string;
  position: "nav" | "hero";
  variantTag: string;
  ctaLabel?: string;
  className?: string;
  children: ReactNode;
};

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
