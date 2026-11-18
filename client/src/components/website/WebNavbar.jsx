import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About', href: '#about' },
];

export default function WebNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.08)] border-b border-slate-200/60'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/favicon.svg" alt="Smilux" className="h-9 w-9 group-hover:scale-105 transition-transform" />
            <div className="leading-tight">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Smilux<span className="text-[#e8368f]">.</span>
              </span>
              <div className="text-[10px] font-semibold text-slate-400 -mt-0.5 tracking-wide uppercase">Dental Software</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-5 py-2 text-sm font-bold text-white rounded-lg bg-[linear-gradient(135deg,#9C7AFF_0%,#6C44E0_100%)] hover:brightness-110 active:scale-95 transition-all shadow-md shadow-purple-200"
            >
              Start Free Trial
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pb-5 pt-3 space-y-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {l.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-slate-100">
            <button
              onClick={() => { setMenuOpen(false); navigate('/login'); }}
              className="w-full px-4 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => { setMenuOpen(false); navigate('/register'); }}
              className="w-full px-4 py-2.5 text-sm font-bold text-white rounded-lg bg-[linear-gradient(135deg,#9C7AFF_0%,#6C44E0_100%)] hover:brightness-110 transition-all"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
