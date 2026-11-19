import React, { useState, useRef, useEffect } from 'react';
import SEO from '../../components/common/SEO.jsx';
import TopBanner from '../../components/website/TopBanner.jsx';
import WebNavbar from '../../components/website/WebNavbar.jsx';
import HeroSection from '../../components/website/HeroSection.jsx';
import IntegrationsSection from '../../components/website/IntegrationsSection.jsx';
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
    <div className="w-full min-h-screen bg-mesh font-sans">
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

          {/* ── Integrations Section ── */}
          <IntegrationsSection />

          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <CtaSection />
        </main>

        <WebFooter />
      </div>
    </div>
  );
}
