import React from 'react';

// Real brand icons from Simple Icons CDN (https://cdn.simpleicons.org/{slug}/{hex-color})
// All icons are CC0 licensed from simpleicons.org
const ALL = [
  {
    name: 'Safaricom M-Pesa',
    desc: 'Trigger instant STK Push payments from invoices and auto-reconcile every M-Pesa receipt in real time.',
    iconUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1280px-M-PESA_LOGO-01.svg.png',
    bg: '#00A651',
    lightBg: '#E6F7EE',
  },
  {
    name: 'Kenya SHA',
    desc: 'Submit Social Health Authority pre-authorisations and insurance claims without leaving Smilux.',
    iconUrl: 'https://www.sha.go.ke/wp-content/uploads/2025/03/SHA-Logo-Alternate.png',
    bg: '#1D4ED8',
    lightBg: '#EFF6FF', 
  },
  {
    name: 'WhatsApp Business',
    desc: 'Send automated appointment reminders, recall campaigns, and payment confirmations via WhatsApp.',
    iconUrl: 'https://cdn.simpleicons.org/whatsapp/25D366',
    bg: '#25D366',
    lightBg: '#E8FDF2',
  },
  {
    name: 'Twilio SMS',
    desc: 'Send bulk patient SMS reminders, appointment confirmations, and urgent clinic broadcasts.',
    iconUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Twilio-logo-red.svg/1280px-Twilio-logo-red.svg.png',
    bg: '#F22F46',
    lightBg: '#FFF1F3',
  },
  {
    name: 'Jubilee Insurance',
    desc: 'Manage Jubilee policy numbers, submit pre-auth requests and track claim approvals in one place.',
    iconUrl: 'https://cdn.simpleicons.org/shield/EA580C',
    bg: '#EA580C',
    lightBg: '#FFF7ED',
    fallbackIcon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
  },
  {
    name: 'KRA eTIMS',
    desc: 'Auto-generate Kenya Revenue Authority eTIMS tax receipts alongside every payment processed.',
    iconUrl: 'https://cdn.simpleicons.org/receipt/DC2626',
    bg: '#DC2626',
    lightBg: '#FEF2F2',
    fallbackIcon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8zm0-4h8v2H8z"/>
      </svg>
    ),
  },
  {
    name: 'Africa\'s Talking',
    desc: 'Reach patients across Kenya and East Africa via SMS, USSD, and voice using Africa\'s Talking.',
    iconUrl: 'https://cdn.simpleicons.org/africastalking/7C3AED',
    bg: '#7C3AED',
    lightBg: '#F5F3FF',
    fallbackIcon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    ),
  },
  {
    name: 'Daraja API',
    desc: 'Direct Safaricom Daraja C2B & B2C integration for seamless mobile money flow into your clinic.',
    iconUrl: 'https://cdn.simpleicons.org/safaricom/059669',
    bg: '#059669',
    lightBg: '#ECFDF5',
    fallbackIcon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
      </svg>
    ),
  },
  {
    name: 'NHIF / SHA Portal',
    desc: 'Direct portal sync for the NHIF-to-SHA scheme transition — keep all patient records current.',
    iconUrl: 'https://cdn.simpleicons.org/shield/2563EB',
    bg: '#2563EB',
    lightBg: '#EFF6FF',
    fallbackIcon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
  },
];

// Split into 3 rows, each duplicated for seamless loop
const ROW1 = [ALL[0], ALL[1], ALL[2], ALL[3]];
const ROW2 = [ALL[4], ALL[5], ALL[6], ALL[7], ALL[8]];
const ROW3 = [ALL[0], ALL[2], ALL[4], ALL[6], ALL[8]];

function IntegrationCard({ item }) {
  return (
    <div className="shrink-0 w-[420px] bg-white border-r border-[#E7E7E7] last:border-r-0 hover:bg-slate-50/50 transition-colors duration-200 group cursor-default">
      <div className="flex gap-4 p-7">

        {/* Icon */}
        <div
          className=" flex items-center justify-center w-14 h-14   transition-transform duration-300 group-hover:scale-110 overflow-hidden"
          
        >
          <img
            src={item.iconUrl}
            alt={item.name}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
            onError={(e) => {
              // Fallback: show colored bg with fallback SVG icon
              e.target.style.display = 'none';
              e.target.parentNode.style.background = item.bg;
              const fb = e.target.parentNode.querySelector('.fb-icon');
              if (fb) fb.style.display = 'flex';
            }}
          />
          <span
            className="fb-icon hidden items-center justify-center w-full h-full"
            style={{ color: 'white' }}
          >
            {item.fallbackIcon || (
              <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            )}
          </span>
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

function MarqueeRow({ items, direction = 'left', speed = 60 }) {
  const doubled = [...items, ...items, ...items]; // triple for ultra-wide screens
  const anim = direction === 'left' ? 'integ-left' : 'integ-right';
  return (
    <div className="relative overflow-hidden border-b border-[#E7E7E7] last:border-b-0">
      <div className={`flex animate-[${anim}_var(--spd)_linear_infinite]`}
        style={{ '--spd': `${speed}s` }}>
        {doubled.map((item, i) => (
          <IntegrationCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
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
              Smilux connects natively with Kenya's most critical payment, insurance, and communication platforms.
              Everything built-in — no plugins, no extra setup, no developer needed.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-purple-50 border border-purple-200 rounded px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#7B4DFF] animate-pulse shrink-0" />
            <span className="text-[12px] font-bold text-[#7B4DFF]">9 integrations · all native</span>
          </div>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative w-full border-t border-[#E7E7E7]">
        {/* Side fades */}
        <div className="absolute top-0 left-0 w-20 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Row 1 — left */}
        <div className="relative overflow-hidden border-b border-[#E7E7E7]">
          <div className="flex" style={{ animation: 'integLeft 55s linear infinite' }}>
            {[...ROW1, ...ROW1, ...ROW1].map((item, i) => (
              <IntegrationCard key={`r1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="relative overflow-hidden border-b border-[#E7E7E7]">
          <div className="flex" style={{ animation: 'integRight 65s linear infinite' }}>
            {[...ROW2, ...ROW2, ...ROW2].map((item, i) => (
              <IntegrationCard key={`r2-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 3 — left */}
        <div className="relative overflow-hidden">
          <div className="flex" style={{ animation: 'integLeft 50s linear infinite' }}>
            {[...ROW3, ...ROW3, ...ROW3].map((item, i) => (
              <IntegrationCard key={`r3-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes integLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes integRight {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        /* Pause all rows on hover */
        #integrations .relative:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
