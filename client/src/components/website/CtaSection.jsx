import React from 'react';
import { useNavigate } from 'react-router-dom';

const PERKS = [
  { icon: '✓', text: '14-day free trial — no card required' },
  { icon: '✓', text: 'Full feature access from day one' },
  { icon: '✓', text: 'Free data migration from paper / Excel' },
  { icon: '✓', text: 'Onboarding call with our team' },
];

export default function CtaSection() {
  const navigate = useNavigate();
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#1c2536]">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Start today · Free for 14 days</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Your clinic deserves<br />
          <span className="text-[#9C7AFF]">modern software.</span>
        </h2>

        <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
          Stop juggling WhatsApp, paper files, and Excel. Run your entire dental practice from one place — built in Kenya, for Kenya.
        </p>

        {/* Perks */}
        <div className="mt-8 grid sm:grid-cols-2 gap-2.5 max-w-lg mx-auto text-left">
          {PERKS.map((p) => (
            <div key={p.text} className="flex items-center gap-2.5 text-sm text-slate-300">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs shrink-0">
                {p.icon}
              </span>
              {p.text}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 text-base font-bold text-white rounded-xl bg-[linear-gradient(135deg,#9C7AFF_0%,#6C44E0_100%)] hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-purple-900/50 flex items-center justify-center gap-2"
          >
            Create Your Free Clinic
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 text-base font-semibold text-slate-300 border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
          >
            I already have an account
          </button>
        </div>

        {/* Tekvora credit */}
        <p className="mt-10 text-xs text-slate-600">
          Built and maintained by{' '}
          <span className="font-semibold text-slate-500">Tekvora Systems Ltd, Nairobi</span>
        </p>
      </div>
    </section>
  );
}
