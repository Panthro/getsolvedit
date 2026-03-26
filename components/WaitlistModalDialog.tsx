"use client";

import { useLayoutEffect, type RefObject } from "react";

export type WaitlistModalDialogProps = {
  embedSrc: string;
  onClose: () => void;
  dialogRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export function WaitlistModalDialog({
  embedSrc,
  onClose,
  dialogRef,
  closeButtonRef,
}: WaitlistModalDialogProps) {
  useLayoutEffect(() => {
    closeButtonRef.current?.focus();
  }, [closeButtonRef, embedSrc]);

  return (
    <div
      className="modal-overlay-pad modal-backdrop fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-stone-900/60"
      role="presentation"
      aria-hidden
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-title"
        className="relative flex w-full max-w-lg max-h-[min(92dvh,720px)] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl ring-1 ring-stone-200 sm:rounded-2xl"
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
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-stone-600 transition-colors duration-200 ease-out hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto min-w-0">
          <iframe
            src={embedSrc}
            title="Waitlist form"
            className="block w-full min-h-[min(480px,62dvh)] border-0 sm:min-h-[480px]"
          />
        </div>
      </div>
    </div>
  );
}
