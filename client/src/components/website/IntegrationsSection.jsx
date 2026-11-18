import React from 'react';

// ─── All integrations with icon SVGs & descriptions ─────────────────────────
const ALL = [
  {
    name: 'Safaricom M-Pesa',
    desc: 'Trigger instant STK Push payments from invoices and auto-reconcile every receipt.',
    color: '#00A651',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>,
  },
  {
    name: 'Kenya SHA',
    desc: 'Submit Social Health Authority pre-authorisations and claims without leaving Smilux.',
    color: '#1D4ED8',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>,
  },
  {
    name: 'Jubilee Insurance',
    desc: 'Manage Jubilee policy numbers, pre-auth requests, and claim approvals in one place.',
    color: '#EA580C',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
  },
  {
    name: 'WhatsApp Business',
    desc: 'Send automated appointment reminders, recall messages, and payment confirmations.',
    color: '#25D366',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg>,
  },
  {
    name: 'KRA eTIMS',
    desc: 'Automatically generate Kenya Revenue Authority eTIMS tax receipts for every payment.',
    color: '#DC2626',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8zm0-4h8v2H8zm0-4h4v2H8z"/></svg>,
  },
  {
    name: 'Twilio SMS',
    desc: 'Send bulk patient SMS reminders, appointment confirmations, and clinic broadcasts.',
    color: '#F43F5E',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>,
  },
  {
    name: 'Africa\'s Talking',
    desc: 'Reach patients across Kenya via SMS and USSD using Africa\'s Talking gateway.',
    color: '#7C3AED',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  },
  {
    name: 'Daraja API',
    desc: 'Direct Safaricom Daraja C2B & B2C integration for seamless mobile money flow.',
    color: '#059669',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>,
  },
  {
    name: 'NHIF / SHA Portal',
    desc: 'Direct portal sync for NHIF-to-SHA transition — keep all scheme records up to date.',
    color: '#2563EB',
    icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
  },
];

// Row 1: items 0–4 (scroll left), Row 2: items 3–8 (scroll right), Row 3: 0–4 again (scroll left)
const ROW1 = [ALL[0], ALL[1], ALL[2], ALL[3], ALL[4]];
const ROW2 = [ALL[3], ALL[4], ALL[5], ALL[6], ALL[7], ALL[8]];
const ROW3 = [ALL[0], ALL[2], ALL[5], ALL[7], ALL[8], ALL[1]];

function IntegrationCard({ item }) {
  return (
    <div className="shrink-0 w-[280px] bg-white p-6 border-r border-[#E7E7E7] last:border-r-0 hover:bg-slate-50/60 transition-colors duration-200">
      <div className="flex gap-3">
        <div
          className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-300 hover:scale-110"
          style={{ background: item.color }}
        >
          {item.icon}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-[14px] font-bold text-[#222323] mb-1.5 leading-tight">{item.name}</p>
          <p className="text-[12px] text-[#595959] leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = 'left', speed = 60 }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  const animClass = direction === 'left' ? 'animate-integ-left' : 'animate-integ-right';

  return (
    <div className="relative overflow-hidden border-b border-[#E7E7E7] last:border-b-0">
      <div
        className={`flex ${animClass}`}
        style={{ '--speed': `${speed}s` }}
      >
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
        {/* Left fade */}
        <div className="absolute top-0 left-0 w-24 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute top-0 right-0 w-24 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <MarqueeRow items={ROW1} direction="left"  speed={55} />
        <MarqueeRow items={ROW2} direction="right" speed={65} />
        <MarqueeRow items={ROW3} direction="left"  speed={50} />
      </div>

      <style>{`
        @keyframes integ-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes integ-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .animate-integ-left {
          animation: integ-scroll-left var(--speed, 55s) linear infinite;
        }
        .animate-integ-right {
          animation: integ-scroll-right var(--speed, 65s) linear infinite;
        }
        .animate-integ-left:hover,
        .animate-integ-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
