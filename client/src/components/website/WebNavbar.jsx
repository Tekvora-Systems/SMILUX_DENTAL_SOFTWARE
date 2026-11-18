import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ─── Icons (inline, no external dep) ──────────────────────────────────────
const I = {
  calendar:   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>,
  tooth:      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  mpesa:      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75" /></svg>,
  shield:     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  users:      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  chart:      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  inventory:  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  sms:        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
  person:     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>,
  building:   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  branch:     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15" /></svg>,
  sparkle:    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  lab:        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01.197 3.197l-1.07 1.07a2.25 2.25 0 01-3.197 0l-5.023-5.023a2.25 2.25 0 010-3.197l1.07-1.07a2.25 2.25 0 013.197 0L19.8 15z" /></svg>,
  api:        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
};

// ─── Features mega-menu data ───────────────────────────────────────────────
const FEATURES_MENU = {
  clinical: [
    { label: 'Appointment Scheduling', desc: 'Smart calendar with dentist availability & auto SMS/WhatsApp reminders', icon: I.calendar },
    { label: 'FDI Dental Charting', desc: 'Interactive odontogram — cavities, crowns, root canals & full history', icon: I.tooth },
    { label: 'Clinical Records', desc: 'Digital patient files, medical history, allergies & visit notes', icon: I.lab },
    { label: 'Treatment Plans', desc: 'Staged estimates, digital consent forms & progress tracking', icon: I.sparkle },
  ],
  financial: [
    { label: 'Invoicing & Receipts', desc: 'Professional invoices, discounts, tax & payment receipts', icon: I.mpesa },
    { label: 'M-Pesa STK Push', desc: 'Daraja API integration — trigger payments & auto-reconcile', icon: I.mpesa },
    { label: 'SHA & Insurance', desc: 'Kenya SHA pre-auth, claims submission & policy management', icon: I.shield },
    { label: 'Expense Tracking', desc: 'Clinic costs, supplier bills & profit & loss overview', icon: I.chart },
  ],
  operations: [
    { label: 'Staff & Roles (RBAC)', desc: 'Granular permissions for owners, dentists, receptionists & labs', icon: I.users },
    { label: 'Inventory Management', desc: 'Stock levels, FEFO expiry alerts & purchase orders', icon: I.inventory },
    { label: 'SMS & WhatsApp', desc: 'Automated reminders, recall campaigns & bulk broadcasts', icon: I.sms },
    { label: 'Analytics & Reports', desc: 'Revenue dashboards, patient volume trends & dentist KPIs', icon: I.chart },
  ],
  highlighted: {
    title: 'New: M-Pesa C2B + eTIMS',
    desc: 'Automate KRA eTIMS tax receipts alongside every M-Pesa payment. Zero manual effort.',
    cta: 'Learn more →',
    href: '#features',
  },
};

// ─── Solutions mega-menu data ──────────────────────────────────────────────
const SOLUTIONS_MENU = {
  byType: [
    { label: 'Solo & Private Clinics', desc: 'Everything a one-chair practice needs to go fully digital', icon: I.person },
    { label: 'Growing Dental Clinics', desc: 'Multi-dentist scheduling, lab orders & SHA insurance workflows', icon: I.building },
    { label: 'Multi-Branch Networks', desc: 'Central HQ dashboard, consolidated analytics & shared inventory', icon: I.branch },
    { label: 'Orthodontics Practices', desc: 'Progress tracking, retainer reminders & staged treatment billing', icon: I.sparkle },
    { label: 'Dental Labs', desc: 'Work order management, case tracking & supplier integrations', icon: I.lab },
    { label: 'Enterprise & Hospital Groups', desc: 'Custom RBAC, open API, SLA guarantee & dedicated support', icon: I.api },
  ],
  integrations: [
    { label: 'Safaricom M-Pesa', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Kenya SHA', color: 'bg-blue-100 text-blue-700' },
    { label: 'Jubilee Insurance', color: 'bg-orange-100 text-orange-700' },
    { label: 'WhatsApp Business', color: 'bg-green-100 text-green-700' },
    { label: 'KRA eTIMS', color: 'bg-red-100 text-red-700' },
    { label: 'Twilio SMS', color: 'bg-rose-100 text-rose-700' },
  ],
  footerLinks: ['Pricing', 'Case Studies', 'Help Centre', 'Contact Sales'],
};

// ─── Shared sub-components ─────────────────────────────────────────────────
function MegaItem({ icon, label, desc, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded text-left transition-all duration-150 cursor-pointer group ${active ? 'bg-purple-50' : 'hover:bg-purple-50/70'}`}
    >
      <div className={`shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded transition-all duration-150 ${active ? 'bg-[#7B4DFF] text-white' : 'bg-purple-100 text-[#7B4DFF] group-hover:bg-[#7B4DFF] group-hover:text-white'}`}>
        {icon}
      </div>
      <div>
        <div className="text-[13px] font-semibold text-[#222323] leading-tight">{label}</div>
        <div className="text-[11px] text-[#595959] mt-0.5 leading-snug">{desc}</div>
      </div>
    </button>
  );
}

function Triangle() {
  return (
    <div className="flex justify-center relative z-10">
      {/* border caret */}
      <div className="w-0 h-0 absolute top-0"
        style={{ borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: '9px solid #E7E7E7' }} />
      {/* white fill caret */}
      <div className="w-0 h-0 absolute top-[1px]"
        style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '8px solid #ffffff' }} />
    </div>
  );
}

function NavTrigger({ label, open, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-semibold rounded transition-all duration-150 cursor-pointer ${open ? 'text-[#7B4DFF] bg-purple-50' : 'text-[#595959] hover:text-[#222323] hover:bg-slate-100'}`}
    >
      {label}
      <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────────────
export default function WebNavbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [openMenu, setOpenMenu]       = useState(null); // 'features' | 'solutions' | null
  const [hoveredF, setHoveredF]       = useState(null);
  const [hoveredS, setHoveredS]       = useState(null);
  const featuresRef                   = useRef(null);
  const solutionsRef                  = useRef(null);
  const navigate                      = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close on outside click
  useEffect(() => {
    const fn = (e) => {
      const outside =
        (!featuresRef.current  || !featuresRef.current.contains(e.target)) &&
        (!solutionsRef.current || !solutionsRef.current.contains(e.target));
      if (outside) setOpenMenu(null);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false); setOpenMenu(null);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const MEGASTYLE = {
    boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
    animation: 'megaIn 0.17s cubic-bezier(0.16,1,0.3,1) forwards',
  };

  return (
    <header className={`w-full bg-white border-b border-[#E7E7E7] transition-all duration-150 ${scrolled ? 'shadow-[0px_1px_3px_rgba(0,0,0,0.08)]' : ''}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[52px] items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img src="/favicon.svg" alt="Smilux" className="h-8 w-8 group-hover:scale-105 transition-transform duration-150" />
            <div className="leading-none">
              <div className="text-[16px] font-extrabold tracking-tight text-[#222323]">Smilux<span className="text-[#e8368f]">.</span></div>
              <div className="text-[9px] font-bold text-[#595959] tracking-widest uppercase mt-0.5">Dental Software</div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">

            {/* Home */}
            <button type="button" onClick={() => scrollTo('#')}
              className="px-3 py-1.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-100 rounded transition-all duration-150 cursor-pointer">
              Home
            </button>

            {/* ── Features dropdown ── */}
            <div ref={featuresRef} className="relative"
              onMouseEnter={() => setOpenMenu('features')}
              onMouseLeave={() => setOpenMenu(null)}>
              <NavTrigger label="Features" open={openMenu === 'features'} />

              {openMenu === 'features' && (
                <div className="absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 z-50" style={{ width: '860px' }}>
                  <div className="pt-[9px] relative">
                    <Triangle />
                    <div className="bg-white border border-[#E7E7E7] rounded-[12px] overflow-hidden" style={MEGASTYLE}>

                      {/* 3-col feature grid */}
                      <div className="grid grid-cols-3 divide-x divide-[#E7E7E7]">

                        {/* Clinical */}
                        <div className="p-5">
                          <p className="text-[10px] font-bold text-[#7B4DFF] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7B4DFF] inline-block" />
                            Clinical
                          </p>
                          <div className="space-y-0.5">
                            {FEATURES_MENU.clinical.map((f, i) => (
                              <MegaItem key={f.label} {...f} onClick={() => scrollTo('#features')}
                                active={hoveredF === `c${i}`}
                                onMouseEnter={() => setHoveredF(`c${i}`)} onMouseLeave={() => setHoveredF(null)} />
                            ))}
                          </div>
                        </div>

                        {/* Financial */}
                        <div className="p-5">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                            Financial
                          </p>
                          <div className="space-y-0.5">
                            {FEATURES_MENU.financial.map((f, i) => (
                              <MegaItem key={f.label} {...f} onClick={() => scrollTo('#features')}
                                active={hoveredF === `f${i}`}
                                onMouseEnter={() => setHoveredF(`f${i}`)} onMouseLeave={() => setHoveredF(null)} />
                            ))}
                          </div>
                        </div>

                        {/* Operations */}
                        <div className="p-5">
                          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block" />
                            Operations
                          </p>
                          <div className="space-y-0.5">
                            {FEATURES_MENU.operations.map((f, i) => (
                              <MegaItem key={f.label} {...f} onClick={() => scrollTo('#features')}
                                active={hoveredF === `o${i}`}
                                onMouseEnter={() => setHoveredF(`o${i}`)} onMouseLeave={() => setHoveredF(null)} />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Highlighted new feature strip */}
                      <div className="border-t border-[#E7E7E7] bg-[linear-gradient(90deg,#F6F3FF,#EDE6FF)] px-6 py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#7B4DFF] text-white shrink-0">
                            {I.mpesa}
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-[#7B4DFF] text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 mr-2">New</span>
                            <span className="text-[13px] font-bold text-[#222323]">{FEATURES_MENU.highlighted.title}</span>
                            <span className="text-[12px] text-[#595959] ml-2 hidden lg:inline">{FEATURES_MENU.highlighted.desc}</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => scrollTo('#features')}
                          className="shrink-0 text-[12px] font-bold text-[#7B4DFF] hover:underline cursor-pointer">
                          {FEATURES_MENU.highlighted.cta}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Solutions dropdown ── */}
            <div ref={solutionsRef} className="relative"
              onMouseEnter={() => setOpenMenu('solutions')}
              onMouseLeave={() => setOpenMenu(null)}>
              <NavTrigger label="Solutions" open={openMenu === 'solutions'} />

              {openMenu === 'solutions' && (
                <div className="absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 z-50" style={{ width: '760px' }}>
                  <div className="pt-[9px] relative">
                    <Triangle />
                    <div className="bg-white border border-[#E7E7E7] rounded-[12px] overflow-hidden" style={MEGASTYLE}>

                      <div className="grid grid-cols-[1fr_220px]">

                        {/* Left: by practice type */}
                        <div className="p-5 border-r border-[#E7E7E7]">
                          <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest mb-3">By Practice Type</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                            {SOLUTIONS_MENU.byType.map((s, i) => (
                              <MegaItem key={s.label} {...s} onClick={() => scrollTo('#features')}
                                active={hoveredS === i}
                                onMouseEnter={() => setHoveredS(i)} onMouseLeave={() => setHoveredS(null)} />
                            ))}
                          </div>
                        </div>

                        {/* Right: integrations + CTA */}
                        <div className="p-5 bg-slate-50/60 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest">Integrations</p>
                              <button type="button" onClick={() => scrollTo('#features')} className="text-[11px] font-bold text-[#7B4DFF] hover:underline cursor-pointer">All →</button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {SOLUTIONS_MENU.integrations.map((t) => (
                                <span key={t.label} className={`inline-flex items-center rounded border border-transparent px-2 py-0.5 text-[11px] font-semibold ${t.color}`}>
                                  {t.label}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Mini CTA */}
                          <div className="mt-5 rounded-[8px] bg-[linear-gradient(135deg,#F6F3FF,#DED0FF)] border border-purple-200 p-4">
                            <p className="text-[12px] font-bold text-[#222323] mb-1">Start for free today</p>
                            <p className="text-[11px] text-[#595959] mb-3">14-day trial · no credit card</p>
                            <button type="button" onClick={() => navigate('/register')}
                              className="w-full h-8 text-[12px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] rounded hover:brightness-105 active:scale-[0.998] transition-all cursor-pointer">
                              Get Started →
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Footer strip */}
                      <div className="border-t border-[#E7E7E7] bg-slate-50/80 px-5 py-2.5 flex items-center gap-1">
                        {SOLUTIONS_MENU.footerLinks.map((l, i) => (
                          <React.Fragment key={l}>
                            <button type="button" onClick={() => scrollTo('#')}
                              className="text-[12px] font-semibold text-[#595959] hover:text-[#7B4DFF] transition-colors cursor-pointer px-1">
                              {l}
                            </button>
                            {i < SOLUTIONS_MENU.footerLinks.length - 1 && (
                              <span className="text-slate-300 select-none">|</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Plain links */}
            {[{ label: 'Pricing', href: '#pricing' }, { label: 'Testimonials', href: '#testimonials' }].map((l) => (
              <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                className="px-3 py-1.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-100 rounded transition-all duration-150 cursor-pointer">
                {l.label}
              </button>
            ))}
          </nav>

          {/* ── Desktop CTAs ── */}
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
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5" /></svg>
              Book a Demo
            </button>
          </div>

          {/* ── Mobile burger ── */}
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
        <div className="md:hidden w-full border-t border-[#E7E7E7] bg-white px-4 pb-5 pt-2 shadow-[0px_4px_12px_rgba(0,0,0,0.07)]">
          <button type="button" onClick={() => { setMenuOpen(false); scrollTo('#'); }}
            className="w-full text-left px-3 py-2.5 text-[13px] font-semibold text-[#595959] hover:bg-slate-50 rounded">Home</button>

          <p className="text-[10px] font-bold text-[#7B4DFF] uppercase tracking-widest px-3 pt-3 pb-1">Features</p>
          {[...FEATURES_MENU.clinical, ...FEATURES_MENU.financial, ...FEATURES_MENU.operations].map((f) => (
            <button key={f.label} type="button" onClick={() => { setMenuOpen(false); scrollTo('#features'); }}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded transition-colors cursor-pointer">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-purple-100 text-[#7B4DFF]">{f.icon}</div>
              <span className="text-[13px] font-semibold text-[#222323]">{f.label}</span>
            </button>
          ))}

          <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest px-3 pt-3 pb-1">Solutions</p>
          {SOLUTIONS_MENU.byType.map((s) => (
            <button key={s.label} type="button" onClick={() => { setMenuOpen(false); scrollTo('#features'); }}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded transition-colors cursor-pointer">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-purple-100 text-[#7B4DFF]">{s.icon}</div>
              <span className="text-[13px] font-semibold text-[#222323]">{s.label}</span>
            </button>
          ))}

          <div className="border-t border-[#E7E7E7] mt-3 pt-2">
            {[{ label: 'Pricing', href: '#pricing' }, { label: 'Testimonials', href: '#testimonials' }].map((l) => (
              <button key={l.label} type="button" onClick={() => { setMenuOpen(false); scrollTo(l.href); }}
                className="w-full text-left px-3 py-2.5 text-[13px] font-semibold text-[#595959] hover:bg-slate-50 rounded">
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
              className="w-full h-9 text-[13px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded hover:bg-[#F2F5F7] transition-all cursor-pointer">
              Book a Demo
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
}
