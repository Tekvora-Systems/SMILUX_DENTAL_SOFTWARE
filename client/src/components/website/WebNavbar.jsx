import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About', href: '#about' },
];

function DropdownItem({ label, desc, icon }) {
  return (
    <button type="button" className="w-full flex items-start gap-3 px-3 py-2.5 rounded hover:bg-purple-50 transition-colors text-left group cursor-pointer">
      <div className="shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded bg-purple-100 text-[#7B4DFF] group-hover:bg-[#7B4DFF] group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[13px] font-semibold text-[#222323] leading-tight">{label}</div>
        <div className="text-[11px] text-[#595959] mt-0.5 leading-tight">{desc}</div>
      </div>
    </button>
  );
}

export default function WebNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setSolutionsOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false); setSolutionsOpen(false);
    if (href.startsWith('#')) { const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <header className={`w-full bg-white border-b border-[#E7E7E7] transition-all duration-150 ${scrolled ? 'shadow-[0px_1px_3px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.05)]' : 'shadow-[0px_1px_2px_rgba(0,0,0,0.04)]'}`}>
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {NAV_LINKS.slice(0, 2).map((l) => (
                <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                  className="px-3 py-1.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-100 rounded transition-all duration-150 cursor-pointer">
                  {l.label}
                </button>
              ))}

              {/* Solutions dropdown */}
              <div ref={dropRef} className="relative">
                <button type="button" onClick={() => setSolutionsOpen(v => !v)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-semibold rounded transition-all duration-150 cursor-pointer ${solutionsOpen ? 'text-[#7B4DFF] bg-purple-50' : 'text-[#595959] hover:text-[#222323] hover:bg-slate-100'}`}>
                  Solutions
                  <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {solutionsOpen && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-72 bg-white border border-[#E7E7E7] rounded shadow-[0px_4px_16px_rgba(0,0,0,0.10),0px_1px_3px_rgba(0,0,0,0.06)] p-2 z-50">
                    <div className="px-3 pt-1 pb-2">
                      <span className="text-[10px] font-bold text-[#595959] uppercase tracking-widest">By Practice Type</span>
                    </div>
                    <DropdownItem label="Solo & Private Clinics" desc="Appointments, charting & invoicing for 1–2 chair practices"
                      icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>} />
                    <DropdownItem label="Growing Dental Clinics" desc="Multi-dentist scheduling, lab orders & SHA insurance"
                      icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></svg>} />
                    <DropdownItem label="Multi-Branch Groups" desc="Central HQ, warehouse, consolidated analytics & API"
                      icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>} />
                  </div>
                )}
              </div>

              {NAV_LINKS.slice(2).map((l) => (
                <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                  className="px-3 py-1.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-100 rounded transition-all duration-150 cursor-pointer">
                  {l.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {/* Login */}
              <button type="button" onClick={() => navigate('/login')}
                className="h-[32px] px-4 text-[13px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] hover:border-[#D8D8DF] active:scale-[0.998] transition-all cursor-pointer">
                Login
              </button>
              {/* Start Free Trial */}
              <button type="button" onClick={() => navigate('/register')}
                className="h-[32px] px-4 text-[13px] font-semibold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:brightness-105 active:scale-[0.998] transition-all cursor-pointer">
                Start Free Trial
              </button>
              {/* Book a Demo */}
              <button type="button" onClick={() => scrollTo('#about')}
                className="h-[32px] px-4 text-[13px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] hover:border-[#D8D8DF] active:scale-[0.998] transition-all cursor-pointer flex items-center gap-1.5">
                
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden w-full border-t border-[#E7E7E7] bg-white px-4 pb-4 pt-2 space-y-0.5 shadow-[0px_4px_12px_rgba(0,0,0,0.07)]">
            {[...NAV_LINKS, { label: 'Solutions', href: '#features' }].map((l) => (
              <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                className="w-full text-left px-3 py-2.5 text-[13px] font-semibold text-[#595959] hover:text-[#222323] hover:bg-slate-50 rounded transition-colors cursor-pointer">
                {l.label}
              </button>
            ))}
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
      </header> 
  );
}
