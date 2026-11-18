import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ─── Mega-menu data ────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    label: 'Appointment Scheduling',
    desc: 'Smart calendar, dentist roster & auto-reminders',
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>,
    href: '#features',
  },
  {
    label: 'Dental Charting (FDI)',
    desc: 'Interactive odontogram with full clinical history',
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    href: '#features',
  },
  {
    label: 'Invoicing & Payments',
    desc: 'M-Pesa STK Push, receipts & auto-reconciliation',
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75" /></svg>,
    href: '#features',
  },
  {
    label: 'SHA & Insurance',
    desc: 'Kenya SHA pre-auth, claims & policy tracking',
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    href: '#features',
  },
  {
    label: 'Staff & Roles',
    desc: 'RBAC for owners, dentists, receptionists & more',
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    href: '#features',
  },
  {
    label: 'Analytics & Reports',
    desc: 'Revenue trends, patient volume & expense dashboards',
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    href: '#features',
  },
];

const BY_SPECIALTY = [
  {
    label: 'Solo & Private Clinics',
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>,
  },
  {
    label: 'Growing Dental Groups',
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75" /></svg>,
  },
  {
    label: 'Multi-Branch Networks',
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15" /></svg>,
  },
  {
    label: 'Orthodontics Practices',
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  },
];

const FOOTER_LINKS = ['Pricing', 'Testimonials', 'Help Centre', 'Contact Us'];

// ─── Nav links (non-dropdown) ──────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function WebNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const megaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close on outside click
  useEffect(() => {
    const fn = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false); setMegaOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`w-full bg-white border-b border-[#E7E7E7] transition-all duration-150 ${scrolled ? 'shadow-[0px_1px_3px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.05)]' : 'shadow-[0px_1px_2px_rgba(0,0,0,0.04)]'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[52px] items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img src="/favicon.svg" alt="Smilux" className="h-8 w-8 group-hover:scale-105 transition-transform duration-150" />
            <div className="leading-none">
              <div className="text-[16px] font-extrabold tracking-tight text-[#222323]">
                Smilux<span className="text-[#e8368f]">.</span>
              </div>
              <div className="text-[9px] font-bold text-[#595959] tracking-widest uppercase mt-0.5">Dental Software</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">

            {/* Solutions mega trigger */}
            <div ref={megaRef} className="relative">
              <button
                type="button"
                onClick={() => setMegaOpen(v => !v)}
                className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-semibold rounded transition-all duration-150 cursor-pointer ${megaOpen ? 'text-[#7B4DFF] bg-purple-50' : 'text-[#595959] hover:text-[#222323] hover:bg-slate-100'}`}
              >
                Solutions
                <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* ── Mega dropdown ── */}
              {megaOpen && (
                <div
                  className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden"
                  style={{
                    width: '780px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                    animation: 'megaIn 0.18s cubic-bezier(0.16,1,0.3,1) forwards',
                  }}
                >
                  <div className="grid grid-cols-[1fr_200px]">

                    {/* ── Left: 2-col solutions grid ── */}
                    <div className="p-5 border-r border-[#E7E7E7]">
                      <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest mb-3">By Feature</p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                        {SOLUTIONS.map((s, i) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => scrollTo(s.href)}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className={`flex items-start gap-3 px-3 py-2.5 rounded text-left transition-all duration-150 cursor-pointer group ${hovered === i ? 'bg-purple-50' : 'hover:bg-purple-50/60'}`}
                          >
                            <div className={`shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded transition-all duration-150 ${hovered === i ? 'bg-[#7B4DFF] text-white' : 'bg-purple-100 text-[#7B4DFF]'}`}>
                              {s.icon}
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold text-[#222323] leading-tight">{s.label}</div>
                              <div className="text-[11px] text-[#595959] mt-0.5 leading-snug">{s.desc}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ── Right: By Specialty ── */}
                    <div className="p-5 bg-slate-50/60">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest">By Specialty</p>
                        <button type="button" onClick={() => scrollTo('#features')} className="text-[11px] font-bold text-[#7B4DFF] hover:underline cursor-pointer">
                          View all →
                        </button>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {BY_SPECIALTY.map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => scrollTo('#features')}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded text-left hover:bg-white hover:shadow-[0px_1px_2px_rgba(0,0,0,0.06)] transition-all duration-150 cursor-pointer group"
                          >
                            <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded bg-white border border-[#E7E7E7] text-[#7B4DFF] group-hover:bg-[#7B4DFF] group-hover:text-white group-hover:border-[#7B4DFF] transition-all duration-150">
                              {s.icon}
                            </div>
                            <span className="text-[13px] font-semibold text-[#222323] leading-tight">{s.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Footer strip ── */}
                  <div className="border-t border-[#E7E7E7] bg-slate-50/80 px-5 py-2.5 flex items-center gap-1">
                    {FOOTER_LINKS.map((l, i) => (
                      <React.Fragment key={l}>
                        <button type="button" onClick={() => scrollTo('#' + l.toLowerCase().replace(/\s/g, '-'))}
                          className="text-[12px] font-semibold text-[#595959] hover:text-[#7B4DFF] transition-colors cursor-pointer px-1">
                          {l}
                        </button>
                        {i < FOOTER_LINKS.length - 1 && <span className="text-[#E7E7E7] select-none">|</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Regular nav links */}
            {NAV_LINKS.map((l) => (
              <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                className="px-3 py-1.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-100 rounded transition-all duration-150 cursor-pointer">
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button type="button" onClick={() => navigate('/login')}
              className="h-[32px] px-4 text-[13px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] hover:border-[#D8D8DF] active:scale-[0.998] transition-all cursor-pointer">
              Login
            </button>
            <button type="button" onClick={() => navigate('/register')}
              className="h-[32px] px-4 text-[13px] font-semibold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:brightness-105 active:scale-[0.998] transition-all cursor-pointer">
              Start Free Trial
            </button>
            <button type="button" onClick={() => scrollTo('#about')}
              className="h-[32px] px-4 text-[13px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] hover:border-[#D8D8DF] active:scale-[0.998] transition-all cursor-pointer flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
              </svg>
              Book a Demo
            </button>
          </div>

          {/* Mobile burger */}
          <button type="button" onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex items-center justify-center h-8 w-8 rounded border border-[#E7E7E7] bg-white text-[#595959] hover:bg-slate-50 transition-colors cursor-pointer">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden w-full border-t border-[#E7E7E7] bg-white px-4 pb-4 pt-2 shadow-[0px_4px_12px_rgba(0,0,0,0.07)]">
          {/* Solutions list */}
          <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest px-3 pt-2 pb-1">Solutions</p>
          {SOLUTIONS.map((s) => (
            <button key={s.label} type="button" onClick={() => scrollTo(s.href)}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-purple-50 rounded transition-colors cursor-pointer">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-purple-100 text-[#7B4DFF]">{s.icon}</div>
              <span className="text-[13px] font-semibold text-[#222323]">{s.label}</span>
            </button>
          ))}
          <div className="border-t border-[#E7E7E7] mt-2 pt-2">
            {NAV_LINKS.map((l) => (
              <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                className="w-full text-left px-3 py-2.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-50 rounded transition-colors cursor-pointer">
                {l.label}
              </button>
            ))}
          </div>
          <div className="pt-3 flex flex-col gap-2 border-t border-[#E7E7E7] mt-2">
            <button type="button" onClick={() => { setMenuOpen(false); navigate('/login'); }}
              className="w-full h-9 text-[13px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded hover:bg-[#F2F5F7] transition-all cursor-pointer">
              Login
            </button>
            <button type="button" onClick={() => { setMenuOpen(false); navigate('/register'); }}
              className="w-full h-9 text-[13px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] rounded hover:brightness-105 transition-all cursor-pointer">
              Start Free Trial
            </button>
            <button type="button" onClick={() => { setMenuOpen(false); scrollTo('#about'); }}
              className="w-full h-9 text-[13px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded hover:bg-[#F2F5F7] transition-all cursor-pointer flex items-center justify-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5" /></svg>
              Book a Demo
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
        }
      `}</style>
    </header>
  );
}
