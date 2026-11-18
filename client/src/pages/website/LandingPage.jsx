import React, { useState, useRef, useEffect } from 'react';
import SEO from '../../components/common/SEO.jsx';
import TopBanner from '../../components/website/TopBanner.jsx';
import WebNavbar from '../../components/website/WebNavbar.jsx';
import HeroSection from '../../components/website/HeroSection.jsx';
import FeaturesSection from '../../components/website/FeaturesSection.jsx';
import PricingSection from '../../components/website/PricingSection.jsx';
import TestimonialsSection from '../../components/website/TestimonialsSection.jsx';
import CtaSection from '../../components/website/CtaSection.jsx';
import WebFooter from '../../components/website/WebFooter.jsx';

export default function LandingPage() {
  const fixedRef = useRef(null);
  const [topOffset, setTopOffset] = useState(0);

  // Measure the combined height of banner + navbar whenever either renders/dismisses
  useEffect(() => {
    const measure = () => {
      if (fixedRef.current) setTopOffset(fixedRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (fixedRef.current) ro.observe(fixedRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900 antialiased overflow-x-hidden">
      <SEO
        title="Smilux Dental Software — Kenya's #1 Dental Practice Management System"
        description="Appointments, dental charting, M-Pesa payments, SHA insurance, and analytics — all in one platform built for Kenyan dental clinics."
      />

      {/* Fixed header block: banner + navbar */}
      <div ref={fixedRef} className="fixed top-0 left-0 right-0 z-50 w-full">
        <TopBanner />
        <WebNavbar />
      </div>

      {/* Push content below the fixed header */}
      <div style={{ paddingTop: topOffset }}>
        <main>
          <HeroSection />

          {/* Integrations strip */}
          <div className="w-full border-y border-[#E7E7E7] bg-slate-50 py-5">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-[10px] font-bold text-[#595959] uppercase tracking-widest mb-4">
                Trusted integrations &amp; partnerships
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                  <div className="h-7 w-7 rounded bg-emerald-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  </div>
                  Safaricom M-Pesa
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                  <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                  </div>
                  Kenya SHA
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                  <div className="h-7 w-7 rounded bg-orange-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                  </div>
                  Jubilee Insurance
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                  <div className="h-7 w-7 rounded bg-green-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </div>
                  WhatsApp Business
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                  <div className="h-7 w-7 rounded bg-red-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
                  </div>
                  Twilio SMS
                </div>
              </div>
            </div>
          </div>

          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <CtaSection />
        </main>

        <WebFooter />
      </div>
    </div>
  );
}
