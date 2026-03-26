import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type LandingHeaderProps = {
  /** Use `nav` for simple chrome without a landmark heading. */
  as?: "header" | "nav";
  className: string;
  maxWidth?: "narrow" | "wide";
  /** Tailwind gap utilities for the inner flex row. */
  innerGapClassName?: string;
  children: ReactNode;
};

const maxW = {
  narrow: "max-w-2xl",
  wide: "max-w-6xl",
} as const;

export function LandingHeader({
  as,
  className,
  maxWidth = "wide",
  innerGapClassName = "gap-x-3 gap-y-2",
  children,
}: LandingHeaderProps) {
  const Tag = (as ?? "header") as ElementType;
  return (
    <Tag className={cn("page-x py-3 sm:py-4", className)}>
      <div
        className={cn(
          maxW[maxWidth],
          "mx-auto flex min-w-0 flex-wrap items-center justify-between",
          innerGapClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
