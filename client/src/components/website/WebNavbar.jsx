import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ─── Icons ─────────────────────────────────────────────────────────────────
const I = {
  calendar: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>,
  tooth: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  mpesa: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>cash</title><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect width="18.5" height="11.5" x="2.75" y="4.75" strokeWidth="1.5" rx="2.5" /><circle cx="12" cy="10.5" r="2.5" strokeWidth="1.5" /><path strokeWidth="2" d="M5.75 10.5h.01m12.49 0h.01" /><path strokeWidth="1.5" d="M5.25 19.25h13.5" /></g></svg>,
  shield: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  users: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  chart: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  inventory: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  sms: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
  person: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>,
  building: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  branch: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15" /></svg>,
  sparkle: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  lab: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01.197 3.197l-1.07 1.07a2.25 2.25 0 01-3.197 0l-5.023-5.023a2.25 2.25 0 010-3.197l1.07-1.07a2.25 2.25 0 013.197 0L19.8 15z" /></svg>,
  api: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  records: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  plan: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>,
};

// ─── Mega menu data ─────────────────────────────────────────────────────────
const FEATURES_COLS = [
  {
    heading: 'Clinical', color: 'text-[#118bb0]', dot: 'bg-[#118bb0]',
    items: [
      { label: 'Appointment Scheduling', desc: 'Smart calendar, dentist roster & auto reminders', icon: I.calendar },
      { label: 'FDI Dental Charting', desc: 'Interactive odontogram with full clinical history', icon: I.tooth },
      { label: 'Clinical Records', desc: 'Digital patient files, history, allergies & notes', icon: I.records },
      { label: 'Treatment Plans', desc: 'Staged estimates, e-consent & progress tracking', icon: I.plan },
    ],
  },
  {
    heading: 'Financial', color: 'text-emerald-600', dot: 'bg-emerald-500',
    items: [
      { label: 'Invoicing & Receipts', desc: 'Professional invoices, discounts, tax & receipts', icon: I.mpesa },
      { label: 'M-Pesa STK Push', desc: 'Daraja API — trigger payments & auto-reconcile', icon: I.mpesa },
      { label: 'SHA & Insurance', desc: 'Kenya SHA pre-auth, claims & policy management', icon: I.shield },
      { label: 'Expense Tracking', desc: 'Clinic costs, supplier bills & P&L overview', icon: I.chart },
    ],
  },
  {
    heading: 'Operations', color: 'text-amber-600', dot: 'bg-amber-500',
    items: [
      { label: 'Staff & Roles (RBAC)', desc: 'Granular permissions for every clinic role', icon: I.users },
      { label: 'Inventory Management', desc: 'Stock levels, FEFO expiry alerts & purchase orders', icon: I.inventory },
      { label: 'SMS & WhatsApp', desc: 'Automated reminders, recalls & bulk broadcasts', icon: I.sms },
      { label: 'Analytics & Reports', desc: 'Revenue dashboards, patient volume & dentist KPIs', icon: I.chart },
    ],
  },
];

const SOLUTIONS_ITEMS = [
  { label: 'Solo & Private Clinics', desc: 'Everything a one-chair practice needs to go digital', icon: I.person },
  { label: 'Growing Dental Clinics', desc: 'Multi-dentist scheduling, lab orders & SHA workflows', icon: I.building },
  { label: 'Multi-Branch Networks', desc: 'Central HQ dashboard, consolidated analytics & inventory', icon: I.branch },
  { label: 'Orthodontics Practices', desc: 'Progress tracking, retainer reminders & staged billing', icon: I.sparkle },
  { label: 'Dental Labs', desc: 'Work order management, case tracking & supplier links', icon: I.lab },
  { label: 'Enterprise & Hospital Groups', desc: 'Custom RBAC, open API, SLA guarantee & dedicated support', icon: I.api },
];

const INTEGRATIONS = [
  { label: 'Safaricom M-Pesa', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { label: 'Kenya SHA', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  { label: 'Jubilee Insurance', cls: 'bg-orange-50 text-orange-700 border-orange-200' },
  { label: 'WhatsApp Business', cls: 'bg-green-50 text-green-700 border-green-200' },
  { label: 'KRA eTIMS', cls: 'bg-red-50 text-red-700 border-red-200' },
  { label: 'Twilio SMS', cls: 'bg-rose-50 text-rose-700 border-rose-200' },
];

// ─── MegaItem row ───────────────────────────────────────────────────────────
function MegaItem({ icon, label, desc, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="w-full flex items-start gap-3 px-3 py-2.5 rounded text-left transition-colors duration-150 cursor-pointer hover:bg-purple-50/80">
      <div className={`shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded transition-colors duration-150 ${hov ? 'bg-[#118bb0] text-white' : 'bg-purple-100 text-[#118bb0]'}`}>
        {icon}
      </div>
      <div>
        <div className="text-[13px] font-semibold text-[#222323] leading-tight">{label}</div>
        <div className="text-[11px] text-[#595959] mt-0.5 leading-snug">{desc}</div>
      </div>
    </button>
  );
}

// ─── Shared drop shadow + animation style ───────────────────────────────────
const CARD_STYLE = {
  boxShadow: '0 12px 40px rgba(0,0,0,0.11), 0 2px 6px rgba(0,0,0,0.06)',
  animation: 'megaIn 0.17s cubic-bezier(0.16,1,0.3,1) forwards',
};

// ─── Main component ─────────────────────────────────────────────────────────
export default function WebNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 'features' | 'solutions' | null
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) setOpenMenu(null);
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

  const triggerCls = (key) =>
    `flex items-center gap-1 px-3 py-1.5 text-[13px] font-semibold rounded transition-all duration-150 cursor-pointer whitespace-nowrap ${openMenu === key ? 'text-[#118bb0] bg-purple-50' : 'text-[#595959] hover:text-[#222323] hover:bg-slate-100'}`;

  return (
    <header
      ref={navbarRef}
      className={`w-full relative bg-white border-b border-[#E7E7E7] transition-all duration-150 ${scrolled ? ' [0px_1px_3px_rgba(0,0,0,0.08)]' : ''}`}
    >
      {/* ── Top bar ── */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[52px] items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img src="/favicon.svg" alt="Smilux" className="h-8 w-8 group-hover:scale-105 transition-transform duration-150" />
            <div className="leading-none">
              <div className="text-[16px] font-extrabold tracking-tight text-[#222323]">Smilux<span className="text-[#e8368f]">.</span></div>
              <div className="text-[9px] font-bold text-[#595959] tracking-widest uppercase mt-0.5">Dental Software</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">

            {/* Home */}
            <button type="button" onClick={() => scrollTo('#')}
              className="px-3 py-1.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-100 rounded transition-all duration-150 cursor-pointer whitespace-nowrap">
              Home
            </button>

            {/* Features trigger */}
            <button type="button"
              onMouseEnter={() => setOpenMenu('features')}
              className={triggerCls('features')}>
              Features
              <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === 'features' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Solutions trigger */}
            <button type="button"
              onMouseEnter={() => setOpenMenu('solutions')}
              className={triggerCls('solutions')}>
              Solutions
              <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === 'solutions' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Plain links */}
            {[{ label: 'Pricing', href: '#pricing' }, { label: 'Testimonials', href: '#testimonials' }].map((l) => (
              <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                className="px-3 py-1.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-100 rounded transition-all duration-150 cursor-pointer whitespace-nowrap">
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button type="button" onClick={() => navigate('/login')}
              className="h-[32px] px-4 text-[13px] font-semibold text-[#0f5d77] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded hover:bg-[#F2F5F7] active:scale-[0.998] transition-all cursor-pointer whitespace-nowrap">
              Login
            </button>
            <button type="button" onClick={() => navigate('/register')}
              className="h-[32px] px-4 text-[13px] font-semibold text-white bg-[linear-gradient(180deg,#1ba7ce_0%,#0e7394_100%)]   rounded   hover:brightness-105 active:scale-[0.998] transition-all cursor-pointer whitespace-nowrap">
              Start Free Trial
            </button>
            <button type="button" onClick={() => scrollTo('#about')}
              className="h-[32px] px-4 text-[13px] font-semibold text-[#0f5d77] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded  [0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] active:scale-[0.998] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><title>sprint-demo</title><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M6 3h12a3.5 3.5 0 0 1 3.5 3.5V13a3.5 3.5 0 0 1-3.5 3.5H6A3.5 3.5 0 0 1 2.5 13V6.5A3.5 3.5 0 0 1 6 3" /><path d="m12.319 7.513l1.504.981a1.5 1.5 0 0 1 0 2.512l-1.504.981A1.5 1.5 0 0 1 10 10.731V8.769a1.5 1.5 0 0 1 2.319-1.256M10 16.5L9 21m5-4.5l1 4.5m-7.5 0h9" /></g></svg>
              Book a Demo
            </button>
          </div>

          {/* Mobile burger */}
          <button type="button" onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex items-center justify-center h-8 w-8 rounded border border-[#E7E7E7] bg-white text-[#595959] hover:bg-slate-50 cursor-pointer">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mega dropdowns — fixed to viewport, never causes overflow ── */}
      {openMenu && (
        <div
          className="hidden md:block fixed left-0 right-0 z-50"
          style={{ top: navbarRef.current ? navbarRef.current.getBoundingClientRect().bottom : 52 }}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-3">

            {/* ── FEATURES panel ── */}
            {openMenu === 'features' && (
              <div className="bg-white border border-[#E7E7E7] rounded overflow-hidden" style={CARD_STYLE}>
                <div className="grid grid-cols-3 divide-x divide-[#E7E7E7]">
                  {FEATURES_COLS.map((col) => (
                    <div key={col.heading} className="p-5">
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 ${col.color}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><title>end-point-diamond</title><g fill="none"><path fill="#d7e0ff" d="M9 6.373c-.291.36-.291.885-.001 1.247c.215.27.44.54.693.794c.254.254.525.479.794.694c.362.29.887.29 1.248-.002c.266-.215.535-.44.787-.692s.477-.52.692-.787c.29-.36.29-.885.001-1.247a10 10 0 0 0-.693-.794a10 10 0 0 0-.794-.694a1 1 0 0 0-1.248.002a10 10 0 0 0-.787.692c-.252.252-.477.52-.692.787" /><path stroke="#4147d5" strokeLinecap="round" d="M.5 7h8" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M9 6.373c-.291.36-.291.885-.001 1.247c.215.27.44.54.693.794c.254.254.525.479.794.694c.362.29.887.29 1.248-.002c.266-.215.535-.44.787-.692s.477-.52.692-.787c.29-.36.29-.885.001-1.247a10 10 0 0 0-.693-.794a10 10 0 0 0-.794-.694a1 1 0 0 0-1.248.002a10 10 0 0 0-.787.692c-.252.252-.477.52-.692.787" /></g></svg>
                        {col.heading}
                      </p>
                      <div className="space-y-0.5">
                        {col.items.map((f) => (
                          <MegaItem key={f.label} {...f} onClick={() => scrollTo('#features')} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* New feature highlight */}
                <div className="border-t border-[#E7E7E7] bg-[linear-gradient(90deg,#F6F3FF,#EDE6FF)] px-6 py-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-[#118bb0] text-white shrink-0">{I.mpesa}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-[#118bb0] text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 mr-2">New</span>
                      <span className="text-[13px] font-bold text-[#222323]">M-Pesa C2B + KRA eTIMS</span>
                      <span className="text-[12px] text-[#595959] ml-2 hidden lg:inline">Automate tax receipts alongside every M-Pesa payment. Zero manual effort.</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => scrollTo('#features')}
                    className="shrink-0 text-[12px] font-bold text-[#118bb0] hover:underline cursor-pointer">
                    Learn more →
                  </button>
                </div>
              </div>
            )}

            {/* ── SOLUTIONS panel ── */}
            {openMenu === 'solutions' && (
              <div className="bg-white border border-[#E7E7E7] rounded overflow-hidden" style={CARD_STYLE}>
                <div className="grid grid-cols-[1fr_240px] divide-x divide-[#E7E7E7]">

                  {/* Left: 2-col practice types */}
                  <div className="p-5">
                    <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest mb-3">By Practice Type</p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                      {SOLUTIONS_ITEMS.map((s) => (
                        <MegaItem key={s.label} {...s} onClick={() => scrollTo('#features')} />
                      ))}
                    </div>
                  </div>

                  {/* Right: integrations + CTA */}
                  <div className="p-5 bg-slate-50/60 flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest">Integrations</p>
                        <button type="button" onClick={() => scrollTo('#features')} className="text-[11px] font-bold text-[#118bb0] hover:underline cursor-pointer">All →</button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {INTEGRATIONS.map((t) => (
                          <span key={t.label} className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold ${t.cls}`}>
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>


                  </div>
                </div>

                {/* Footer strip */}
                <div className="border-t border-[#E7E7E7] bg-slate-50/80 px-5 py-2.5 flex items-center gap-1">
                  {['Pricing', 'Case Studies', 'Help Centre', 'Contact Sales'].map((l, i, arr) => (
                    <React.Fragment key={l}>
                      <button type="button" onClick={() => scrollTo('#')}
                        className="text-[12px] font-semibold text-[#595959] hover:text-[#118bb0] transition-colors cursor-pointer ">
                        {l}
                      </button>
                      {i < arr.length - 1 && <span className="text-slate-300 select-none">|</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden w-full border-t border-[#E7E7E7] bg-white px-4 pb-5 pt-2  [0px_4px_12px_rgba(0,0,0,0.07)]">
          <button type="button" onClick={() => { setMenuOpen(false); scrollTo('#'); }}
            className="w-full text-left px-3 py-2.5 text-[13px] font-semibold text-[#595959] hover:bg-slate-50 rounded">Home</button>

          <p className="text-[10px] font-bold text-[#118bb0] uppercase tracking-widest px-3 pt-3 pb-1">Features</p>
          {FEATURES_COLS.flatMap(c => c.items).map((f) => (
            <button key={f.label} type="button" onClick={() => { setMenuOpen(false); scrollTo('#features'); }}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded cursor-pointer">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-purple-100 text-[#118bb0]">{f.icon}</div>
              <span className="text-[13px] font-semibold text-[#222323]">{f.label}</span>
            </button>
          ))}

          <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest px-3 pt-3 pb-1">Solutions</p>
          {SOLUTIONS_ITEMS.map((s) => (
            <button key={s.label} type="button" onClick={() => { setMenuOpen(false); scrollTo('#features'); }}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded cursor-pointer">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-purple-100 text-[#118bb0]">{s.icon}</div>
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
              className="w-full h-9 text-[13px] font-semibold text-[#0f5d77] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded hover:bg-[#F2F5F7] cursor-pointer">Login</button>
            <button type="button" onClick={() => { setMenuOpen(false); navigate('/register'); }}
              className="w-full h-9 text-[13px] font-bold text-white bg-[linear-gradient(180deg,#1ba7ce_0%,#0e7394_100%)]   rounded hover:brightness-105 cursor-pointer">Start Free Trial</button>
            <button type="button" onClick={() => { setMenuOpen(false); scrollTo('#about'); }}
              className="w-full h-9 text-[13px] font-semibold text-[#0f5d77] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded hover:bg-[#F2F5F7] cursor-pointer">Book a Demo</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.99); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </header>
  );
}
