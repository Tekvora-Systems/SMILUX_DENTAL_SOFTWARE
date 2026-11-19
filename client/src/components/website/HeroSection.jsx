import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { staggerContainer, fadeUp, fadeDown, EASE } from './motion.jsx';
import Button from '../UI/Button.jsx';

export default function HeroSection() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Subtle parallax effect on background image
  const bgY = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <section className="w-full pt-2 sm:pt-4 pb-2 sm:pb-4 px-3 sm:px-6 lg:px-8">
      {/* ── Hero Card Container (Rectangle with rounded card sides & image overlay) ── */}
      <div className="relative max-w-8xl mx-auto rounded overflow-hidden">
        {/* Background Image with subtle parallax */}
        <div
          style={{ y: bgY }}
          className="absolute inset-0 -top-10 -bottom-10 w-full h-[calc(100%+80px)] pointer-events-none"
        >
          <img
            src="/images/hero-bg.png"
            alt="Dental Healthcare Professionals"
            className="w-full h-full object-cover object-contain  brightness-[0.85]"
          />
        </div>

        {/* Dark Rich Gradient Overlay */}
        <div className="absolute inset-0  bg-gradient-to-b from-[#090514]/40 via-[#12092c]/40 to-[#090514]/50 backdrop-blur-[0.5px]" />

        {/* Centered Content */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24">
          <motion.div
            className="max-w-4xl mx-auto flex flex-col items-center text-center"
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.12, 0.05)}
          >


            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight"
            >
              Run Your Entire<br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-200 to-teal-100">
                Dental Clinic
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 320 10"
                  fill="none"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                >
                  <motion.path
                    d="M2 8 Q80 2 160 6 Q240 10 318 4"
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                  />
                </motion.svg>
              </span>
              {' '}from One Place
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[15px] sm:text-[17px] text-white leading-[1.7] max-w-2xl mx-auto"
            >
              Smilux is a complete dental practice management system built specifically for Kenyan clinics.
              From the moment a patient walks in to the moment their M-Pesa receipt lands in their inbox,
              every touchpoint is handled. No more juggling WhatsApp, paper files, and Excel spreadsheets.
              Everything your clinic needs, in one beautifully simple platform.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/register')}
                className="h-10 px-6 text-[13.5px] font-bold shadow-[0_4px_14px_rgba(17,139,176,0.35)]"
              >
                Start 14-Day Free Trial
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => scrollTo('#features')}
                className="h-10 px-6 text-[13.5px] font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><title>sprint-demo</title><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M6 3h12a3.5 3.5 0 0 1 3.5 3.5V13a3.5 3.5 0 0 1-3.5 3.5H6A3.5 3.5 0 0 1 2.5 13V6.5A3.5 3.5 0 0 1 6 3" /><path d="m12.319 7.513l1.504.981a1.5 1.5 0 0 1 0 2.512l-1.504.981A1.5 1.5 0 0 1 10 10.731V8.769a1.5 1.5 0 0 1 2.319-1.256M10 16.5L9 21m5-4.5l1 4.5m-7.5 0h9" /></g></svg>
                Book a Demo
              </Button>
            </motion.div>

            {/* Feature Pills Strip */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[12px] text-cyan-100/90 pt-6 border-t border-white/10 w-full max-w-2xl"
            >
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Safaricom M-Pesa STK Push
              </span>
              <span className="text-white/20">•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                SHA &amp; Insurance Claims
              </span>
              <span className="text-white/20">•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Interactive FDI Charting
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
