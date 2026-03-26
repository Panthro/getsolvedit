"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import posthog from "posthog-js";
import { DocumentLang } from "@/components/DocumentLang";
import type { CampaignQuery } from "@/lib/campaign-query";
import { buildTallyEmbedSrc } from "@/lib/tally";

const WaitlistModalDialog = dynamic(
  () =>
    import("./WaitlistModalDialog").then((m) => ({
      default: m.WaitlistModalDialog,
    })),
  { ssr: false }
);

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

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "iframe",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) =>
      !el.closest("[aria-hidden=\"true\"]") &&
      !(el.hasAttribute("tabindex") && el.tabIndex < 0)
  );
}

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const embedSrc = useMemo(
    () => buildTallyEmbedSrc({ slug, campaignQuery }),
    [slug, campaignQuery]
  );

  const close = useCallback(() => {
    setOpen(false);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    queueMicrotask(() => {
      if (trigger?.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    });
  }, []);

  const openWaitlist = useCallback(
    (args: OpenArgs) => {
      const active = document.activeElement;
      triggerRef.current = active instanceof HTMLElement ? active : null;
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

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const root = dialogRef.current;
      if (!root) return;

      const list = getFocusableElements(root);
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const value = useMemo(() => ({ openWaitlist }), [openWaitlist]);

  return (
    <WaitlistModalContext.Provider value={value}>
      <DocumentLang lang={campaignQuery.lang} />
      {children}
      {open ? (
        <WaitlistModalDialog
          embedSrc={embedSrc}
          onClose={close}
          dialogRef={dialogRef}
          closeButtonRef={closeButtonRef}
        />
      ) : null}
    </WaitlistModalContext.Provider>
  );
}
