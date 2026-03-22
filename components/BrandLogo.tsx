import type { ReactNode } from "react";

export type BrandLogoTone = "light" | "dark" | "mutedLight" | "mutedDark";

type BrandLogoProps = {
  /** Nav uses `md`, footers use `sm`. */
  size?: "md" | "sm";
  tone: BrandLogoTone;
  className?: string;
  /** e.g. product line after the logo */
  suffix?: ReactNode;
};

const toneStyles: Record<
  BrandLogoTone,
  { get: string; solved: string; it: string }
> = {
  light: {
    get: "text-sky-600",
    solved: "text-violet-600",
    it: "text-amber-600",
  },
  dark: {
    get: "text-sky-400",
    solved: "text-violet-300",
    it: "text-amber-400",
  },
  mutedLight: {
    get: "text-sky-500/90",
    solved: "text-violet-500/90",
    it: "text-amber-600/90",
  },
  mutedDark: {
    get: "text-sky-400/80",
    solved: "text-violet-300/80",
    it: "text-amber-400/80",
  },
};

export function BrandLogo({
  size = "md",
  tone,
  className = "",
  suffix,
}: BrandLogoProps) {
  const c = toneStyles[tone];
  const textSize = size === "sm" ? "text-sm" : "text-lg";

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      <span className={`font-brand font-extrabold tracking-tight ${textSize} inline-flex`}>
        <span className={c.get}>get</span>
        <span className={c.solved}>solved</span>
        <span className={c.it}>it</span>
      </span>
      {suffix}
    </span>
  );
}
