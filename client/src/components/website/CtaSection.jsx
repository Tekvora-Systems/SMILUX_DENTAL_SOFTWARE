import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Reveal, RevealGroup, RevealItem, fadeUp, EASE } from './motion.jsx';

const PERKS = [
  '14-day free trial — no card required',
  'Full feature access from day one',
  'Free data migration from paper / Excel',
  'Onboarding call with our team',
];

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <section id="about" className="w-full bg-white border-t border-[#E7E7E7] px-4 sm:px-6 lg:px-8 py-6">
      <div
        className="w-full bg-[linear-gradient(180deg,#F6F3FF_0%,#DED0FF_100%)] rounded-[16px] border overflow-hidden relative"
        style={{ boxShadow: '0 2px 16px rgba(123,77,255,0.10), 0 1px 3px rgba(0,0,0,0.06)' }}
      >
        {/* Soft purple blobs */}
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#118bb0]/8 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#e8368f]/6 blur-3xl pointer-events-none"
        />

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 py-14">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              {/* Badge */}
              <Reveal className="inline-flex items-center gap-2 rounded border border-purple-200 bg-white/60 px-3 py-1 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-[#118bb0] uppercase tracking-wide">Start today · Free for 14 days</span>
              </Reveal>

              <Reveal as="h2" delay={0.05} className="text-[32px] sm:text-[40px] font-extrabold text-[#222323] tracking-tight leading-tight">
                Your clinic deserves<br />
                <span className="text-[#118bb0]">modern software.</span>
              </Reveal>

              <Reveal as="p" delay={0.1} className="mt-4 text-[14px] text-[#595959] leading-relaxed max-w-md">
                Stop juggling WhatsApp, paper files, and Excel. Run your entire dental practice from one place — built in Kenya, for Kenya.
              </Reveal>

              <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={() => navigate('/register')}
                  className="h-10 px-5 text-[13.5px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#118bb0] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.10)] hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                >
                  Create Your Free Clinic
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={() => navigate('/login')}
                  className="h-10 px-5 text-[13.5px] font-semibold text-[#0f5d77] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] transition-all cursor-pointer"
                >
                  I already have an account
                </motion.button>
              </Reveal>

              <Reveal as="p" delay={0.2} className="mt-6 text-[11px] text-[#595959]">
                Built and maintained by{' '}
                <span className="font-semibold text-[#222323]">Tekvora Systems Ltd, Nairobi</span>
              </Reveal>
            </div>

            {/* Right — perks card */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="bg-white border border-purple-200/60 rounded shadow-[0px_1px_2px_rgba(0,0,0,0.06),0px_1px_3px_rgba(0,0,0,0.04)] p-6"
            >
              <p className="text-[11px] font-bold text-[#595959] uppercase tracking-widest mb-4">What&apos;s included</p>
              <RevealGroup as="ul" className="space-y-3">
                {PERKS.map((p) => (
                  <RevealItem as="li" key={p} className="flex items-center gap-3 text-[13px] text-[#222323]">
                    <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded bg-purple-100 border border-purple-200">
                      <svg className="h-3 w-3 text-[#118bb0]" fill="none" viewBox="0 0 18 18">
                        <path d="M3.75 9L7.5 12.75L14.25 5.25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </RevealItem>
                ))}
              </RevealGroup>

              <div className="mt-6 pt-5 border-t border-purple-100 grid grid-cols-3 gap-3 text-center">
                {[['500+', 'Clinics'], ['120K+', 'Patients'], ['99.9%', 'Uptime']].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-[20px] font-extrabold text-[#118bb0]">{v}</div>
                    <div className="text-[11px] text-[#595959] font-medium mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
