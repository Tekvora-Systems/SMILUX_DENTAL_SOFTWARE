import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Integrations', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  Solutions: [
    { label: 'General Dentistry', href: '#' },
    { label: 'Orthodontics', href: '#' },
    { label: 'Multi-Branch Clinics', href: '#' },
    { label: 'Dental Labs', href: '#' },
  ],
  Company: [
    { label: 'About Tekvora', href: '#about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Referral Program', href: '/referral' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'HIPAA Compliance', href: '#' },
  ],
};

const SOCIALS = [
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.064 2.25H8.08l4.26 5.631 5.904-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function WebFooter() {
  const navigate = useNavigate();

  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0d1117] text-slate-400">
      {/* Top CTA strip */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-white leading-snug">
              Ready to modernise your clinic?
            </h3>
            <p className="mt-1 text-slate-400 text-sm">
              Join 500+ dental practices in Kenya already running on Smilux.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3 text-sm font-bold text-white rounded-xl bg-[linear-gradient(135deg,#9C7AFF,#6C44E0)] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-purple-900/40"
            >
              Start 14-Day Free Trial
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 text-sm font-semibold text-slate-300 border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group mb-4">
              <img src="/favicon.svg" alt="Smilux" className="h-9 w-9" />
              <div>
                <div className="text-xl font-extrabold text-white tracking-tight">
                  Smilux<span className="text-[#e8368f]">.</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Dental Software</div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Kenya's leading dental practice management platform — built for modern clinics from solo practices to multi-branch groups.
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-500 hover:bg-[#7B4DFF]/20 hover:text-[#9C7AFF] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {['HIPAA Ready', 'SHA Kenya', 'M-Pesa'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('#') ? (
                      <button
                        onClick={() => scrollTo(l.href)}
                        className="text-sm text-slate-500 hover:text-slate-200 transition-colors text-left"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <Link
                        to={l.href}
                        className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Tekvora Systems Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
