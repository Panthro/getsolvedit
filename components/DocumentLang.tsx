"use client";

import { useEffect } from "react";
import { normalizeDocumentLang } from "@/lib/document-lang";

type DocumentLangProps = {
  lang?: string;
};

/** Syncs `document.documentElement.lang` from campaign query (client). */
export function DocumentLang({ lang }: DocumentLangProps) {
  useEffect(() => {
    const resolved = normalizeDocumentLang(lang);
    const prev = document.documentElement.getAttribute("lang") ?? "en";
    document.documentElement.lang = resolved;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);

  return null;
}
