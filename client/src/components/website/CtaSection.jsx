import React from 'react';
import { useNavigate } from 'react-router-dom';

const PERKS = [
  '14-day free trial — no card required',
  'Full feature access from day one',
  'Free data migration from paper / Excel',
  'Onboarding call with our team',
];

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    /* White outer so the dark inner card has visible side gaps matching the footer */
    <section id="about" className="w-full bg-white border-t border-[#E7E7E7] px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full bg-[linear-gradient(180deg,#1c2536_0%,#0d1117_100%)] rounded-[16px] overflow-hidden relative"
        style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.14)' }}>

        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#7B4DFF]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#e8368f]/8 blur-3xl pointer-events-none" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(to right,white 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 py-14">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Start today · Free for 14 days</span>
              </div>

              <h2 className="text-[32px] sm:text-[40px] font-extrabold text-white tracking-tight leading-tight">
                Your clinic deserves<br />
                <span className="text-[#9C7AFF]">modern software.</span>
              </h2>

              <p className="mt-4 text-[14px] text-slate-400 leading-relaxed max-w-md">
                Stop juggling WhatsApp, paper files, and Excel. Run your entire dental practice from one place — built in Kenya, for Kenya.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={() => navigate('/register')}
                  className="h-10 px-5 text-[13.5px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.12)] hover:brightness-110 active:scale-[0.998] transition-all cursor-pointer flex items-center gap-2">
                  Create Your Free Clinic
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <button onClick={() => navigate('/login')}
                  className="h-10 px-5 text-[13.5px] font-semibold text-slate-300 border border-white/10 rounded hover:bg-white/5 transition-colors cursor-pointer">
                  I already have an account
                </button>
              </div>

              <p className="mt-6 text-[11px] text-slate-600">
                Built and maintained by <span className="font-semibold text-slate-500">Tekvora Systems Ltd, Nairobi</span>
              </p>
            </div>

            {/* Right — perks card */}
            <div className="bg-white/5 border border-white/10 rounded p-6">
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4">What's included</p>
              <ul className="space-y-3">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[13px] text-slate-300">
                    <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 border border-emerald-500/30">
                      <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 18 18">
                        <path d="M3.75 9L7.5 12.75L14.25 5.25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                {[['500+','Clinics'],['120K+','Patients'],['99.9%','Uptime']].map(([v,l]) => (
                  <div key={l}>
                    <div className="text-[18px] font-extrabold text-white">{v}</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
