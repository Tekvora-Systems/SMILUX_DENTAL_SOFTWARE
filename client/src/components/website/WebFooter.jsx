import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LINKS = {
  Product: [['Features', '#features'], ['Pricing', '#pricing'], ['Integrations', '#'], ['Changelog', '#'], ['Roadmap', '#']],
  Solutions: [['General Dentistry', '#'], ['Orthodontics', '#'], ['Multi-Branch', '#'], ['Dental Labs', '#']],
  Company: [['About Tekvora', '#about'], ['Blog', '#'], ['Careers', '#'], ['Contact Us', '#'], ['Referral Program', '/referral']],
  Legal: [['Privacy Policy', '#'], ['Terms of Service', '#'], ['Cookie Policy', '#'], ['HIPAA Compliance', '#']],
};

const SOCIALS = [
  { label: 'Twitter/X', href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.064 2.25H8.08l4.26 5.631 5.904-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg> },
  { label: 'LinkedIn', href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { label: 'Facebook', href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
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
    /* White outer — gives the rounded card side gaps */
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 pt-0">
      <footer
        className="w-full bg-[linear-gradient(180deg,#F6F3FF_0%,#DED0FF_100%)] rounded-t-[20px] overflow-hidden"
        style={{ boxShadow: '0 -2px 16px rgba(123,77,255,0.08), 0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#118bb0]/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#e8368f]/6 blur-3xl pointer-events-none" />

        {/* CTA strip */}
        <div className="w-full border-b border-purple-200/60 px-6 sm:px-10 py-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-[22px] font-extrabold text-[#222323] leading-snug">
                Ready to modernise your clinic?
              </h3>
              <p className="mt-1 text-[13px] text-[#595959]">
                Join 500+ dental practices in Kenya already running on Smilux.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => navigate('/register')}
                className="h-9 px-5 text-[13px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#118bb0] rounded  [0px_1px_2px_rgba(0,0,0,0.10)] hover:brightness-110 active:scale-[0.998] transition-all cursor-pointer"
              >
                Start 14-Day Free Trial
              </button>
              <button
                onClick={() => navigate('/login')}
                className="h-9 px-5 text-[13px] font-semibold text-[#0f5d77] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded  [0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] active:scale-[0.998] transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">

            {/* Brand column */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src="/favicon.svg" alt="Smilux" className="h-8 w-8" />
                <div>
                  <div className="text-[16px] font-extrabold text-[#222323] tracking-tight">
                    Smilux<span className="text-[#e8368f]">.</span>
                  </div>
                  <div className="text-[9px] font-bold text-[#595959] uppercase tracking-widest">Dental Software</div>
                </div>
              </Link>

              <p className="text-[13px] text-[#595959] leading-relaxed max-w-xs">
                Kenya&apos;s leading dental practice management platform — from solo practices to multi-branch groups.
              </p>

              {/* Socials */}
              <div className="mt-4 flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label} href={s.href} aria-label={s.label}
                    className="flex h-7 w-7 items-center justify-center rounded border border-purple-200 bg-white/60 text-[#595959] hover:bg-[#118bb0] hover:text-white hover:border-[#118bb0] transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {['HIPAA Ready', 'SHA Kenya', 'M-Pesa'].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded border border-purple-200 bg-white/60 px-2.5 py-0.5 text-[11px] font-semibold text-[#0f5d77]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group}>
                <h4 className="text-[10px] font-bold text-[#222323] uppercase tracking-widest mb-3">{group}</h4>
                <ul className="space-y-2">
                  {items.map(([label, href]) => (
                    <li key={label}>
                      {href.startsWith('#')
                        ? <button type="button" onClick={() => scrollTo(href)} className="text-[13px] text-[#595959] hover:text-[#118bb0] transition-colors text-left cursor-pointer">{label}</button>
                        : <Link to={href} className="text-[13px] text-[#595959] hover:text-[#118bb0] transition-colors">{label}</Link>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-5 border-t border-purple-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-[#595959]">
              © {new Date().getFullYear()} Smilux Dental Software. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-[12px] text-[#595959]">
              <span>
                A product of{' '}
                <a
                  href="https://tekvora.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#118bb0] hover:underline"
                >
                  Tekvora Systems
                </a>
              </span>
              <span className="h-3 w-px bg-purple-300" />
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><title>broadcast</title><defs><mask id="SVGGzBIqcAm"><g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4"><path fill="#555" d="M24 28.63a4.54 4.54 0 0 0 4.546-4.532A4.54 4.54 0 0 0 24 19.567a4.54 4.54 0 0 0-4.545 4.53A4.54 4.54 0 0 0 24 28.63Z" /><path strokeLinecap="round" d="M16 15c-5.333 4.97-5.333 13.03 0 18m16 0c5.333-4.97 5.333-13.03 0-18M9.858 10c-7.81 7.786-7.81 20.41 0 28.196m28.284 0c7.81-7.786 7.81-20.41 0-28.196" /></g></mask></defs><path fill="#2acd3a" d="M0 0h48v48H0z" mask="url(#SVGGzBIqcAm)" /></svg>
                All systems operational
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}
