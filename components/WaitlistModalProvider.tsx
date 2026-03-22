"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import posthog from "posthog-js";
import type { CampaignQuery } from "@/lib/campaign-query";
import { buildTallyEmbedSrc } from "@/lib/tally";

type OpenArgs = {
  position: "nav" | "hero";
  ctaLabel?: string;
};

type WaitlistModalContextValue = {
  openWaitlist: (args: OpenArgs) => void;
};

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(
  null
);

export function useWaitlistModal(): WaitlistModalContextValue | null {
  return useContext(WaitlistModalContext);
}

type WaitlistModalProviderProps = {
  slug: string;
  campaignQuery: CampaignQuery;
  variantTag: string;
  children: React.ReactNode;
};

export function WaitlistModalProvider({
  slug,
  campaignQuery,
  variantTag,
  children,
}: WaitlistModalProviderProps) {
  const [open, setOpen] = useState(false);

  const embedSrc = useMemo(
    () => buildTallyEmbedSrc({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  const openWaitlist = useCallback(
    (args: OpenArgs) => {
      posthog.capture("waitlist_cta_clicked", {
        slug,
        position: args.position,
        variant_tag: variantTag,
        ...(args.ctaLabel !== undefined ? { cta_label: args.ctaLabel } : {}),
      });
      setOpen(true);
    },
    [slug, variantTag]
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const value = useMemo(() => ({ openWaitlist }), [openWaitlist]);

  return (
    <WaitlistModalContext.Provider value={value}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-[2px]"
          role="presentation"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            className="relative flex w-full max-w-lg max-h-[min(90vh,720px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-stone-200 px-4 py-3 sm:px-5">
              <h2
                id="waitlist-modal-title"
                className="text-base font-semibold text-stone-900"
              >
                Join the waitlist
              </h2>
              <button
                type="button"
                onClick={close}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
              >
                Close
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <iframe
                src={embedSrc}
                title="Waitlist form"
                className="block w-full min-h-[480px] border-0"
              />
            </div>
          </div>
        </div>
      ) : null}
    </WaitlistModalContext.Provider>
  );
}
