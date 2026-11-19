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
                className="h-10 px-6 text-[13.5px] font-bold"
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><title>hand-money-linear</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M17.4142 10.4142C18 9.82843 18 8.88562 18 7C18 5.11438 18 4.17157 17.4142 3.58579M17.4142 3.58579C16.8284 3 15.8856 3 14 3L10 3C8.11438 3 7.17157 3 6.58579 3.58579C6 4.17157 6 5.11438 6 7C6 8.88562 6 9.82843 6.58579 10.4142C7.17157 11 8.11438 11 10 11H14C15.8856 11 16.8284 11 17.4142 10.4142M17.4142 10.4142V10.4142ZM17.4142 3.58579V3.58579ZM6.58579 3.58579V3.58579ZM6.58579 10.4142V10.4142Z"/><path stroke-linecap="round" d="M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z"/><path stroke-linecap="round" d="M18 6C16.3431 6 15 4.65685 15 3"/><path stroke-linecap="round" d="M18 8C16.3431 8 15 9.34315 15 11"/><path stroke-linecap="round" d="M6 6C7.65685 6 9 4.65685 9 3"/><path stroke-linecap="round" d="M6 8C7.65685 8 9 9.34315 9 11"/><path stroke-linecap="round" d="M5 20.3884H7.25993C8.27079 20.3884 9.29253 20.4937 10.2763 20.6964C12.0166 21.0549 13.8488 21.0983 15.6069 20.8138C16.4738 20.6734 17.326 20.4589 18.0975 20.0865C18.7939 19.7504 19.6469 19.2766 20.2199 18.7459C20.7921 18.216 21.388 17.3487 21.8109 16.6707C22.1736 16.0894 21.9982 15.3762 21.4245 14.943C20.7873 14.4619 19.8417 14.462 19.2046 14.9433L17.3974 16.3084C16.697 16.8375 15.932 17.3245 15.0206 17.4699C14.911 17.4874 14.7962 17.5033 14.6764 17.5172M12.7518 17.5326C13.4312 17.5968 14.0434 17.5829 14.5668 17.5292C14.6038 17.5254 14.6403 17.5214 14.6764 17.5172M14.6764 17.5172C14.8222 17.486 14.9669 17.396 15.1028 17.2775C15.746 16.7161 15.7866 15.77 15.2285 15.1431C15.0991 14.9977 14.9475 14.8764 14.7791 14.7759C11.9817 13.1074 7.62942 14.3782 5 16.2429M14.6764 17.5172C14.6399 17.525 14.6033 17.5292 14.5668 17.5292"/><rect width="3" height="8" x="2" y="14" rx="1.5"/></g></svg>
              Safaricom M-Pesa STK Push
              </span>
              <span className="text-white/20">•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12"><title>interlocking-rings-fill-12</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M2.5 9C1.6 8.4 1 7.4 1 6.2C1 4.5 2.5 3 4.2 3C6 3 7.4 4.3 7.5 6m2-2.5c.9.6 1.5 1.6 1.5 2.7C11 8 9.5 9.5 7.8 9.5s-3.1-1.3-3.2-3"/></svg>
                 SHA &amp; Insurance Claims
              </span>
              <span className="text-white/20">•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><title>chart-bold-duotone</title><path fill="currentColor" fill-rule="evenodd" d="M14 20.5V4.25C14 3.52169 13.9984 3.05091 13.9518 2.70403C13.908 2.37872 13.8374 2.27676 13.7803 2.21967C13.7232 2.16258 13.6213 2.09197 13.296 2.04823C12.9491 2.00159 12.4783 2 11.75 2C11.0217 2 10.5509 2.00159 10.204 2.04823C9.87872 2.09197 9.77676 2.16258 9.71967 2.21967C9.66258 2.27676 9.59197 2.37872 9.54823 2.70403C9.50159 3.05091 9.5 3.52169 9.5 4.25V20.5H14Z" clip-rule="evenodd"/><path fill="currentColor" d="M1.75 20.5H3.5V8.75C3.5 8.33579 3.83579 8 4.25 8H7.25C7.66421 8 8 8.33579 8 8.75V20.5H15.5V13.75C15.5 13.3358 15.8358 13 16.25 13H19.25C19.6642 13 20 13.3358 20 13.75V20.5H21.75C22.1642 20.5 22.5 20.8358 22.5 21.25C22.5 21.6642 22.1642 22 21.75 22H1.75C1.33579 22 1 21.6642 1 21.25C1 20.8358 1.33579 20.5 1.75 20.5Z" opacity=".5"/></svg>
                 Interactive FDI Charting
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
