import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Reveal } from './motion.jsx';

export default function FeaturesSection() {
  const navigate = useNavigate();

  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CARDS = [
    {
      title: 'Precision Dental Charting',
      desc: 'Interactive FDI dental odontogram, digital patient clinical records, periodontal scoring, and automated appointment reminders.',
      linkText: 'Explore clinical workflows',
      linkHref: '#about',
      renderVisual: () => (
        <div className="w-full h-full bg-gradient-to-b from-[#f0f9fb] to-white rounded border border-cyan-100/80 p-3.5 flex flex-col justify-between overflow-hidden relative  -sm">
          {/* Card Header Bar */}
          <div className="flex items-center justify-between border-b border-cyan-100 pb-2">
            <div className="flex items-center gap-1.5"> 
              <span className="text-[11px] font-bold text-[#222323]">Alice Wanjiku</span>
            </div>
            <span className="text-[10px] font-semibold text-[#118bb0] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              FDI Standard Chart
            </span>
          </div>

          {/* Odontogram Teeth Strip */}
          <div className="py-2">
            <div className="text-[10px] font-medium text-gray -500 mb-1 flex justify-between">
              <span>Maxillary (Upper)</span>
              <span className="text-[9px] text-[#118bb0]">Teeth 11–18</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {[
                { num: '14', status: 'Caries', bg: 'bg-rose-50 border-rose-200 text-rose-700' },
                { num: '13', status: 'Healthy', bg: 'bg-white border-gray -200 text-gray -600' },
                { num: '12', status: 'Healthy', bg: 'bg-white border-gray -200 text-gray -600' },
                { num: '11', status: 'Restored', bg: 'bg-cyan-50 border-cyan-200 text-[#0f5d77]' },
                { num: '21', status: 'Restored', bg: 'bg-cyan-50 border-cyan-200 text-[#0f5d77]' },
                { num: '22', status: 'Scaling', bg: 'bg-amber-50 border-amber-200 text-amber-700' },
              ].map((t) => (
                <div
                  key={t.num}
                  className={`border rounded p-1 text-center transition-all ${t.bg}`}
                >
                  <div className="text-[11px] font-bold leading-tight">{t.num}</div>
                  <div className="text-[8px] truncate mt-0.5">{t.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Procedure Tag */}
          <div className="bg-white border border-gray -200/90 rounded p-2 flex items-center justify-between  -[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#118bb0] flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#222323] leading-tight">Root Canal &amp; Crown</p>
                <p className="text-[9px] text-gray -500">Tooth 14 · Dr. Kamau · Completed</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Signed
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Instant M-Pesa & SHA Billing',
      desc: 'Trigger instant Lipa Na M-Pesa STK prompts directly from invoices, submit Kenya SHA insurance claims, and auto-reconcile.',
      linkText: 'Explore smart billing',
      linkHref: '#about',
      renderVisual: () => (
        <div className="w-full h-full bg-gradient-to-b from-[#f0f9fb] to-white rounded border border-cyan-100/80 p-3.5 flex flex-col justify-between overflow-hidden relative  -sm">
          {/* M-Pesa Push Prompt UI */}
          <div className="bg-white border border-emerald-200 rounded p-2.5  -sm">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5"> 
                <span className="text-[11px] font-bold text-emerald-800">Safaricom Daraja STK Push</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between bg-emerald-50/60 rounded px-2.5 py-1.5">
              <div>
                <p className="text-[9px] text-emerald-700">Prompting 0722 ••• 849</p>
                <p className="text-[14px] font-extrabold text-[#222323]">KES 4,500.00</p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-white border border-emerald-200 rounded px-2 py-0.5">
                PIN Sent
              </span>
            </div>
          </div>

          {/* SHA Pre-auth & Claim */}
          <div className="bg-white border border-cyan-200/90 rounded p-2.5  -sm mt-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5"> 
                <span className="text-[11px] font-bold text-[#222323]">Kenya SHA Integration</span>
              </div>
              <span className="text-[9px] font-bold text-[#118bb0] bg-cyan-50 px-1.5 py-0.5 rounded">
                Pre-Auth #9482
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray -600 mt-1">
              <span>Benefit: Comprehensive Dental</span>
              <span className="font-bold text-[#118bb0]">Approved ✓</span>
            </div>
          </div>

          {/* eTIMS Receipt Tag */}
          <div className="flex items-center justify-between text-[10px] text-gray -500 px-1">
            <span>KRA eTIMS Digital Invoice</span>
            <span className="font-mono text-[9px] text-gray -400">RC-2026-0984</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Practice Intelligence & Ops',
      desc: 'Real-time clinic revenue analytics, FEFO stock management with expiry alerts, automated supplier orders, and multi-branch control.',
      linkText: 'Explore clinic operations',
      linkHref: '#about',
      renderVisual: () => (
        <div className="w-full h-full bg-gradient-to-b from-[#f0f9fb] to-white rounded border border-cyan-100/80 p-3.5 flex flex-col justify-between overflow-hidden relative  -sm">
          {/* Revenue KPI */}
          <div className="bg-white border border-gray -200/90 rounded p-2.5  -sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray -500">Month-to-Date Revenue</p>
                <p className="text-[16px] font-extrabold text-[#222323]">KES 648,500</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                ↑ 14.8%
              </span>
            </div>
            {/* Mini Bar Chart representation */}
            <div className="flex items-end gap-1.5 h-8 mt-2 pt-1 border-t border-gray -100">
              <div className="w-1/6 bg-cyan-100 rounded-t h-[40%]" />
              <div className="w-1/6 bg-cyan-200 rounded-t h-[65%]" />
              <div className="w-1/6 bg-cyan-300 rounded-t h-[55%]" />
              <div className="w-1/6 bg-[#5bb4ce] rounded-t h-[75%]" />
              <div className="w-1/6 bg-[#118bb0] rounded-t h-[95%]" />
              <div className="w-1/6 bg-[#0e7394] rounded-t h-[80%]" />
            </div>
          </div>

          {/* FEFO Stock Alert */}
          <div className="bg-amber-50/70 border border-amber-200 rounded p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-600 text-xs font-bold">⚠</span>
              <div>
                <p className="text-[10px] font-bold text-amber-900 leading-tight">FEFO Stock Warning</p>
                <p className="text-[9px] text-amber-700">Articaine 1:100K · 4 boxes left</p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-white bg-amber-600 px-1.5 py-0.5 rounded cursor-pointer">
              Reorder
            </span>
          </div>

          {/* Branch Roster */}
          <div className="flex items-center justify-between text-[10px] text-gray -500 px-1">
            <span>Branch: Nairobi Central</span>
            <span className="font-semibold text-[#118bb0]">4 Dentists on Roster</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white flex flex-col items-center">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center gap-12">
        {/* ── Heading Container ── */}
        <div className="w-full max-w-[1216px] flex flex-col items-center text-center">
          <Reveal as="h2" className="text-[34px] sm:text-[42px] lg:text-[48.8px] font-bold text-[#222323] leading-[1.08] tracking-[-0.38px] text-center max-w-[850px]">
            Run your entire dental clinic with complete clarity
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-[16px] text-[#464747] leading-[22px] text-center max-w-[580px] mt-2 tracking-[0.0075px]">
            Bring clinical charting, M-Pesa billing, SHA claims, and clinic operations together in one seamless platform.
          </Reveal>
        </div>

        {/* ── 3-Card Grid Container ── */}
        <div className="w-full max-w-[1416px] grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="box-border flex flex-col justify-between items-center p-6 gap-4 border border-gray-200 rounded bg-white hover:border-[#118bb0] hover: -[0_12px_32px_rgba(17,139,176,0.12)] transition-all duration-200 group cursor-default"
              style={{ minHeight: '532.7px' }}
            >
              {/* Card Top Portion */}
              <div className="w-full flex flex-col items-center">
                {/* 256px Visual Mockup Container */}
                <div className="w-full h-[256px] rounded bg-[#f8fafc] border border-gray -100 flex items-center justify-center overflow-hidden relative mb-4">
                  {card.renderVisual()}
                </div>

                {/* Heading 3 */}
                <h3 className="text-[22px] sm:text-[25px] font-bold text-[#222323] leading-[28px] text-center tracking-[-0.23px] mt-1">
                  {card.title}
                </h3>

                {/* Description Paragraph */}
                <p className="text-[15px] sm:text-[16px] text-[#464747] leading-[22px] text-center mt-3 max-w-[345px]">
                  {card.desc}
                </p>
              </div>

              {/* Card Bottom Link with Arrow */}
              <div className="w-full flex items-center justify-center pt-2 mt-auto">
                <button
                  type="button"
                  onClick={() => scrollTo(card.linkHref)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-medium leading-[24px] text-[#118bb0] group-hover:text-[#0e7394] transition-colors cursor-pointer"
                >
                  <span>{card.linkText}</span>
                  <span className="text-[16px] leading-[24px] transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Button (Book a Demo) ── */}
        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('#about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('/register');
            }}
            className="flex flex-row justify-center items-center py-2 px-4 h-10 rounded bg-[#118bb0] hover:bg-[#0e7394] text-white font-medium text-[16px] leading-[24px] tracking-[-0.31px]  -[0px_1px_2px_rgba(0,0,0,0.08)] hover: -[0px_4px_12px_rgba(17,139,176,0.25)] transition-all cursor-pointer"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
