import type { ReactNode } from "react";

export function LandingMainWide({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl page-x py-12 sm:py-16 md:py-20">
        {children}
      </div>
    </main>
  );
}
