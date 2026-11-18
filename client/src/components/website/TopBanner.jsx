import React, { useState } from 'react';

export default function TopBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="relative z-[60] w-full">
      {/* Main banner */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          background: '#7B4DFF',
          color: 'white',
          height: dismissed ? '0px' : '36px',
          transition: 'height 380ms cubic-bezier(.22,1.4,.36,1)',
        }}
      >
        {/* Dot-grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,0.45) 0% 25%, transparent 0% 50%)',
            backgroundSize: '3px 3px',
            maskImage: 'linear-gradient(90deg, black, transparent 35%, transparent 65%, black)',
            WebkitMaskImage: 'linear-gradient(90deg, black, transparent 35%, transparent 65%, black)',
          }}
        />

        {/* Shimmer sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/4 animate-[bannerShine_3.5s_ease-in-out_infinite]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-screen-2xl items-center justify-center gap-2 px-10 py-2 text-center text-[13px] font-medium">
          {/* Badge */}
          <span
            className="shrink-0 rounded-full px-1.5 py-px text-[9px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(255,255,255,0.20)' }}
          >
            Offer
          </span>

          {/* Message */}
          <span className="min-w-0 truncate">
            <span className="max-sm:hidden">
              Save 20% on all annual plans — upgrade your clinic to Smilux Professional today.{' '}
            </span>
            <span className="sm:hidden">Save 20% on annual plans · </span>
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector('#pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold underline underline-offset-2 hover:no-underline cursor-pointer"
            >
              See Plans →
            </button>
          </span>

          {/* Close */}
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setDismissed(true)}
            className="absolute top-1/2 right-2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded transition-colors duration-150 cursor-pointer"
            style={{ '--hover-bg': 'rgba(255,255,255,0.20)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.20)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Re-open tab — appears after dismiss */}
      <button
        type="button"
        aria-label="Show announcement"
        title="Show announcement"
        onClick={() => setDismissed(false)}
        className="absolute top-0 right-6 z-20 flex h-[18px] w-8 origin-top items-center justify-center rounded-b-md shadow-[0_2px_1px_rgba(0,0,0,0.06),0_4px_8px_rgba(0,0,0,0.16)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(.34,1.5,.4,1)] cursor-pointer"
        style={{
          background: '#7B4DFF',
          color: 'white',
          transform: dismissed ? 'scaleY(1)' : 'scaleY(0)',
          opacity: dismissed ? 1 : 0,
          pointerEvents: dismissed ? 'auto' : 'none',
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 2a2 2 0 0 0-2 2v18l8-5.33L20 22V4a2 2 0 0 0-2-2H6z" />
        </svg>
      </button>

      <style>{`
        @keyframes bannerShine {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(500%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
}
