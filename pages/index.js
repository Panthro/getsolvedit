import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ideasConfig from "../config/ideas.json";

const CheckIcon = () => (
  <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const [variant, setVariant] = useState(ideasConfig.variants["default"]);
  const [params, setParams] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    const { idea, mkt, lang, src } = router.query;
    const selectedVariant = ideasConfig.variants[idea] || ideasConfig.variants["default"];
    setVariant(selectedVariant);
    setParams({ idea: idea || "", mkt: mkt || "", lang: lang || "", src: src || "" });
  }, [router.isReady, router.query]);

  const tallyUrl = () => {
    const base = `https://tally.so/r/${ideasConfig.tallyFormId}`;
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return query ? `${base}?${query}` : base;
  };

  return (
    <>
      <Head>
        <title>getsolvedit — Simple tools for small businesses</title>
        <meta name="description" content="Lightweight, affordable tools for small business owners. No complexity. Just things that work." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Nav */}
        <nav className="border-b border-gray-100 px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <span className="text-gray-900 font-semibold text-lg tracking-tight">getsolvedit</span>
            <a
              href={tallyUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Join waitlist →
            </a>
          </div>
        </nav>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-2xl w-full">
            {/* Tag */}
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                {variant.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              {variant.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              {variant.subheadline}
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-12">
              {variant.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={tallyUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-sm"
              >
                {variant.cta}
              </a>
              <span className="text-gray-400 text-sm">No credit card · Cancel anytime</span>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 px-6 py-6">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-gray-400 text-sm">© 2025 getsolvedit</span>
            <span className="text-gray-400 text-sm">
              Questions? <a href="mailto:sara@getsolvedit.com" className="text-gray-500 hover:text-gray-700 underline underline-offset-2">sara@getsolvedit.com</a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
