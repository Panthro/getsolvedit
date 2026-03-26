import { cn } from "@/lib/cn";

export type LandingDotBenefitsListProps = {
  lines: string[];
  /** Full Tailwind classes for the dot (size, color, margin-top). */
  bulletClassName: string;
  /** Classes on the `<li>` (typically text color). */
  rowClassName: string;
};

export function LandingDotBenefitsList({
  lines,
  bulletClassName,
  rowClassName,
}: LandingDotBenefitsListProps) {
  return (
    <ul className="space-y-4">
      {lines.map((line, i) => (
        <li key={i} className={cn("flex gap-3 items-start", rowClassName)}>
          <span className={cn("shrink-0 rounded-full", bulletClassName)} />
          <span className="min-w-0 break-words leading-relaxed">{line}</span>
        </li>
      ))}
    </ul>
  );
}
