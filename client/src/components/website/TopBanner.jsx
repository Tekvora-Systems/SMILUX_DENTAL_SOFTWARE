import React, { useState } from 'react';

export default function TopBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="w-full bg-[#7B4DFF] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2.5 max-w-7xl mx-auto">
          {/* Spacer */}
          <div className="w-6 shrink-0 hidden sm:block" />

          {/* Centre */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 flex-1 text-center">
            <span className="inline-flex items-center gap-1.5 rounded bg-white/20 border border-white/25 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffb703] animate-pulse shrink-0" />
              Limited Offer
            </span>
            <span className="text-[13px] font-semibold leading-snug">
              Save 20% on all annual plans — offer ends Friday.
            </span>
            <button
              type="button"
              onClick={() => { const el = document.querySelector('#pricing'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1 rounded bg-white/15 border border-white/30 hover:bg-white/25 px-3 py-1 text-[12px] font-bold transition-colors cursor-pointer shrink-0"
            >
              See Plans
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          {/* Close */}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setDismissed(true)}
            className="shrink-0 flex items-center justify-center w-6 h-6 rounded hover:bg-white/15 transition-colors cursor-pointer"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
