"use client";

import type { ReactNode } from "react";
import { BrandLogo, type BrandLogoTone } from "@/components/BrandLogo";
import { TrackedContactEmailLink } from "@/components/landings/TrackedLinks";
import { cn } from "@/lib/cn";

export type LandingFooterProps = {
  slug: string;
  className: string;
  maxWidth?: "narrow" | "wide";
  /** Classes on the inner flex row (text color, size). */
  rowClassName: string;
  brandTone: BrandLogoTone;
  contactLinkClassName: string;
  /** Extra classes on the © + logo span (e.g. tone override). */
  copyrightClassName?: string;
  /** Default matches campaign landings; generic uses `compact`. */
  density?: "comfortable" | "compact";
  children?: ReactNode;
};

const maxW = {
  narrow: "max-w-2xl",
  wide: "max-w-6xl",
} as const;

export function LandingFooter({
  slug,
  className,
  maxWidth = "wide",
  rowClassName,
  brandTone,
  contactLinkClassName,
  copyrightClassName,
  density = "comfortable",
  children,
}: LandingFooterProps) {
  return (
    <footer
      className={cn(
        "page-x mt-auto",
        density === "compact" ? "py-6" : "py-8",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left",
          maxW[maxWidth],
          rowClassName
        )}
      >
        {children ?? (
          <>
            <span
              className={cn(
                "inline-flex items-baseline gap-1.5",
                copyrightClassName
              )}
            >
              <span>© 2026</span>
              <BrandLogo tone={brandTone} size="sm" />
            </span>
            <span>
              Questions?{" "}
              <TrackedContactEmailLink
                slug={slug}
                className={contactLinkClassName}
              >
                sara@getsolvedit.com
              </TrackedContactEmailLink>
            </span>
          </>
        )}
      </div>
    </footer>
  );
}
