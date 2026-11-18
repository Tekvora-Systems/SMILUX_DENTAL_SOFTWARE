import React, { useState } from 'react';

const INTEGRATIONS = [
  {
    name: 'Safaricom M-Pesa',
    desc: 'Trigger instant STK Push payments from invoices and auto-reconcile every receipt in real time.',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1280px-M-PESA_LOGO-01.svg.png',
    bg: '#00A651', lightBg: '#E6F7EE',
  },
  {
    name: 'Kenya SHA',
    desc: 'Submit Social Health Authority pre-authorisations and insurance claims without leaving Smilux.',
    iconUrl: 'https://media.licdn.com/dms/image/v2/D4D0BAQHjBoAbnPGZgQ/company-logo_400_400/B4DaDIasFmGkAY-/0/1790068834997/social_health_authority_logo?e=1796860800&v=beta&t=8vZytDFZ4TdAyaitxOYg5sdSrt4VRQ5DB-4cAu_eM4k',
    bg: '#1D4ED8', lightBg: '#EFF6FF',
  },
  {
    name: 'WhatsApp Business',
    desc: 'Send automated appointment reminders, recall campaigns, and payment confirmations via WhatsApp.',
    iconUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/WhatsApp_Logo_green.svg/960px-WhatsApp_Logo_green.svg.png',
    bg: '#25D366', lightBg: '#E8FDF2',
  },
  {
    name: 'Twilio SMS',
    desc: 'Send bulk patient SMS reminders, appointment confirmations, and urgent clinic broadcasts.',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Twilio-logo-red.svg/1280px-Twilio-logo-red.svg.png',
    bg: '#F22F46', lightBg: '#FFF1F3',
  },
  {
    name: 'BlessedTexts',
    desc: 'Send faith-based patient encouragement messages, appointment blessings, and wellness check-ins.',
    iconUrl: 'https://blessedtexts.com/icons/apple-touch-icon.png',
    bg: '#7C3AED', lightBg: '#F5F3FF',
  },
];

function IntegrationCard({ item }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="shrink-0 w-[420px] bg-white border border-[#E7E7E7] hover:bg-slate-50/40 transition-colors duration-200 group cursor-default">
      <div className="flex items-center gap-5 px-8 py-7">

        {/* Logo box — 64×64 so images are clearly visible */}
        <div
          className="shrink-0 flex items-center justify-center   overflow-hidden transition-transform duration-300 group-hover:scale-105"
          style={{
            width: '64px',
            height: '64px', 
          }}
        >
          {failed ? (
            <span className="text-white font-black text-2xl">{item.name[0]}</span>
          ) : (
            <img
              src={item.iconUrl}
              alt={item.name}
              style={{  height: '48px', objectFit: 'contain' }}
              onError={() => setFailed(true)}
            />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[#222323] mb-1.5 leading-tight">{item.name}</p>
          <p className="text-[12.5px] text-[#595959] leading-relaxed">{item.desc}</p>
        </div>

      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  // Quadruple the 5 items so the marquee always fills wide screens
  const loop = [...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section id="integrations" className="w-full py-16 bg-white border-y border-[#E7E7E7]">

      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="text-[11px] font-bold text-[#7B4DFF] uppercase tracking-widest mb-3">Integrations</p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h2 className="text-[32px] sm:text-[40px] font-extrabold text-[#222323] tracking-tight leading-tight">
              Works seamlessly with<br className="hidden sm:block" />
              your existing tools
            </h2>
            <p className="mt-3 text-[15px] text-[#595959] leading-relaxed max-w-2xl">
              Smilux connects natively with Kenya's most critical payment, insurance,
              and communication platforms. Everything built-in — no plugins, no extra
              setup, no developer needed.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-purple-50 border border-purple-200 rounded px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#7B4DFF] animate-pulse shrink-0" />
            <span className="text-[12px] font-bold text-[#7B4DFF]">5 integrations · all native</span>
          </div>
        </div>
      </div>

      {/* 2-row marquee */}
      <div className="relative w-full ">
        {/* Side fade masks */}
        <div className="absolute top-0 left-0 w-24 md:w-56 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-56 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden border-b border-[#E7E7E7] integ-row">
          <div className="flex integ-left" style={{ animationDuration: '40s' }}>
            {loop.map((item, i) => <IntegrationCard key={`r1-${i}`} item={item} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right (starts halfway so it covers the gap) */}
        <div className="overflow-hidden integ-row">
          <div className="flex integ-right" style={{ animationDuration: '40s' }}>
            {loop.map((item, i) => <IntegrationCard key={`r2-${i}`} item={item} />)}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes integLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes integRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .integ-left  { animation: integLeft  linear infinite; }
        .integ-right { animation: integRight linear infinite; }
        .integ-row:hover .integ-left,
        .integ-row:hover .integ-right {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
