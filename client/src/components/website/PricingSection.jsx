import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Icons ─────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#7B4DFF] shrink-0" viewBox="0 0 18 18" fill="none">
      <path d="M3.75 9L7.5 12.75L14.25 5.25" stroke="#7B4DFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToothIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6.00673 0.520509C6.34011 0.187227 6.79222 0 7.26362 0C7.73502 0 8.18713 0.187227 8.52051 0.520509L14.0067 6.00673C14.34 6.34011 14.5272 6.79222 14.5272 7.26362C14.5272 7.73502 14.34 8.18713 14.0067 8.52051L8.52051 14.0067C8.18713 14.34 7.73502 14.5272 7.26362 14.5272C6.79222 14.5272 6.34011 14.34 6.00673 14.0067L0.520509 8.52051C0.187227 8.18713 0 7.73502 0 7.26362C0 6.79222 0.187227 6.34011 0.520509 6.00673L6.00673 0.520509Z" fill="#7B4DFF" />
    </svg>
  );
}

function SparkleStarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#sparkle)">
        <path d="M6.32174 3.67841C6.63429 3.36596 7.05813 3.19043 7.50007 3.19043C7.94201 3.19043 8.36586 3.36596 8.67841 3.67841L13.8217 8.82174C14.1342 9.13429 14.3097 9.55813 14.3097 10.0001C14.3097 10.442 14.1342 10.8659 13.8217 11.1784L8.67841 16.3217C8.36586 16.6342 7.94201 16.8097 7.50007 16.8097C7.05813 16.8097 6.63429 16.6342 6.32174 16.3217L1.17841 11.1784C0.865955 10.8659 0.69043 10.442 0.69043 10.0001C0.69043 9.55813 0.865955 9.13429 1.17841 8.82174L6.32174 3.67841Z" fill="#7B4DFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M11.8392 3.67785C11.994 3.52301 12.1778 3.40019 12.38 3.31639C12.5823 3.23259 12.7991 3.18945 13.018 3.18945C13.2369 3.18945 13.4537 3.23259 13.656 3.31639C13.8582 3.40019 14.042 3.52301 14.1967 3.67785L19.3392 8.82118C19.6517 9.13373 19.8272 9.55757 19.8272 9.99951C19.8272 10.4415 19.6517 10.8653 19.3392 11.1778L14.1967 16.3212C14.042 16.476 13.8582 16.5988 13.656 16.6826C13.4537 16.7664 13.2369 16.8096 13.018 16.8096C12.7991 16.8096 12.5823 16.7664 12.38 16.6826C12.1778 16.5988 11.994 16.476 11.8392 16.3212L11.1426 15.6245L15.5892 11.1778C15.9017 10.8653 16.0772 10.4415 16.0772 9.99951C16.0772 9.55757 15.9017 9.13373 15.5892 8.82118L11.1426 4.37451L11.8392 3.67785Z" fill="#7B4DFF" />
      </g>
      <defs><clipPath id="sparkle"><rect width="20" height="20" fill="white" /></clipPath></defs>
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#crown)">
        <path d="M9.00438 4.94247C9.1282 4.8186 9.27521 4.72034 9.43701 4.6533C9.59881 4.58626 9.77224 4.55176 9.94738 4.55176C10.1225 4.55176 10.2959 4.58626 10.4578 4.6533C10.6196 4.72034 10.7666 4.8186 10.8904 4.94247L15.0044 9.05714C15.2543 9.30718 15.3948 9.64625 15.3948 9.99981C15.3948 10.3534 15.2543 10.6924 15.0044 10.9425L10.8904 15.0571C10.7666 15.181 10.6196 15.2793 10.4578 15.3463C10.2959 15.4134 10.1225 15.4479 9.94738 15.4479C9.77224 15.4479 9.59881 15.4134 9.43701 15.3463C9.27521 15.2793 9.1282 15.181 9.00438 15.0571L4.89038 10.9425C4.64042 10.6924 4.5 10.3534 4.5 9.99981C4.5 9.64625 4.64042 9.30718 4.89038 9.05714L9.00438 4.94247Z" fill="#7B4DFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M13.419 4.94247C13.6691 4.69251 14.0082 4.55209 14.3617 4.55209C14.7153 4.55209 15.0543 4.69251 15.3044 4.94247L19.419 9.05714C19.669 9.30718 19.8094 9.64625 19.8094 9.99981C19.8094 10.3534 19.669 10.6924 19.419 10.9425L15.3044 15.0571C15.0543 15.3071 14.7153 15.4475 14.3617 15.4475C14.0082 15.4475 13.6691 15.3071 13.419 15.0571L12.8617 14.4998L16.419 10.9425C16.669 10.6924 16.8094 10.3534 16.8094 9.99981C16.8094 9.64625 16.669 9.30718 16.419 9.05714L12.8617 5.49981L13.419 4.94247ZM6.39038 4.94247C6.26656 4.8186 6.11955 4.72034 5.95775 4.6533C5.79595 4.58626 5.62252 4.55176 5.44738 4.55176C5.27224 4.55176 5.09881 4.58626 4.93701 4.6533C4.77521 4.72034 4.6282 4.8186 4.50438 4.94247L0.390382 9.05714C0.140421 9.30718 0 9.64625 0 9.99981C0 10.3534 0.140421 10.6924 0.390382 10.9425L4.50438 15.0571C4.6282 15.181 4.77521 15.2793 4.93701 15.3463C5.09881 15.4134 5.27224 15.4479 5.44738 15.4479C5.62252 15.4479 5.79595 15.4134 5.95775 15.3463C6.11955 15.2793 6.26656 15.181 6.39038 15.0571L6.94772 14.4998L3.39038 10.9425C3.14042 10.6924 3 10.3534 3 9.99981C3 9.64625 3.14042 9.30718 3.39038 9.05714L6.94772 5.49981L6.39038 4.94247Z" fill="#7B4DFF" />
      </g>
      <defs><clipPath id="crown"><rect width="20" height="20" fill="white" /></clipPath></defs>
    </svg>
  );
}

// ─── Animated price counter (ease-out cubic) ───────────────────────────────
function AnimatedPrice({ value, duration = 380 }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    if (start === end) return;
    let startTime = null;
    let id;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + (end - start) * ease));
      if (p < 1) { id = requestAnimationFrame(step); }
      else { prevRef.current = end; setDisplay(end); }
    };
    id = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(id); prevRef.current = end; };
  }, [value, duration]);

  return <>${display}</>;
}

// ─── Feature lists ─────────────────────────────────────────────────────────
const ESSENTIAL_FEATURES = [
  'Up to 2 Dental Chairs / Operatories',
  'Digital Patient Records & Medical History',
  'Appointment Scheduling & Calendar',
  'Adult & Pediatric Dental Charting',
  'Unlimited Front Desk & Nurse Accounts',
  'Invoicing, M-Pesa STK & Receipts',
  'Automated SMS Appointment Reminders',
  'Daily Revenue & Treatment Reports',
];

const PROFESSIONAL_FEATURES = [
  'Interactive 3D / 2D Dental Charting & Perio',
  'Multi-Dentist Roster & Chair Scheduling',
  'Dental Consumables & Inventory Tracking',
  'Treatment Plans with Staged Estimates',
  'Insurance & SHA Pre-Authorizations',
  'Dental Lab Work Orders & Prosthetics',
  'Automated WhatsApp & SMS Recall Reminders',
  'Clinical Practice Performance Analytics',
];

const PREMIUM_FEATURES = [
  'Multi-Branch Clinic Management & Central HQ',
  'Central Dental Warehouse & Purchase Orders',
  'FEFO Batch Expiry & Low-Stock Alerts',
  'DICOM & Dental X-Ray Image Archiving (PACS)',
  'Digital Consent Forms with E-Signatures',
  'Automated KRA eTIMS & M-Pesa C2B Integration',
  'Custom Clinical Audit Trails & Permissions',
  'Dedicated Account Manager & Open API Access',
];

// ─── Billing toggle ────────────────────────────────────────────────────────
function BillingToggle({ value, onChange }) {
  const monthlyRef = useRef(null);
  const annualRef = useRef(null);
  const [ind, setInd] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const btn = value === 'monthly' ? monthlyRef.current : annualRef.current;
    if (btn) setInd({ left: btn.offsetLeft, width: btn.offsetWidth, ready: true });
  }, [value]);

  return (
    <div className="relative inline-flex items-center p-0.5 rounded-full bg-white/90 border border-purple-200/90 shadow-sm select-none">
      <span
        aria-hidden="true"
        style={{ transform: `translateX(${ind.left}px)`, width: `${ind.width}px` }}
        className={`absolute top-0.5 bottom-0.5 left-0 rounded-full bg-[#7B4DFF] shadow pointer-events-none ${ind.ready ? 'transition-all duration-300 ease-out' : 'opacity-0'}`}
      />
      <button
        ref={monthlyRef}
        type="button"
        onClick={() => onChange('monthly')}
        className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${value === 'monthly' ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}
      >
        Monthly
      </button>
      <button
        ref={annualRef}
        type="button"
        onClick={() => onChange('annual')}
        className={`relative z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${value === 'annual' ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}
      >
        Annual
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-all duration-200 ${value === 'annual' ? 'bg-white/25 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
          Save 20%
        </span>
      </button>
    </div>
  );
}

// ─── Single plan card ──────────────────────────────────────────────────────
function PlanCard({ badge, badgeSolid, icon, title, subtitle, annualPrice, monthlyPrice, billing, features, featuresLabel, variant, trialBadge, onCta }) {
  const price = billing === 'annual' ? annualPrice : monthlyPrice;

  const cardBorder = variant === 'premium'
    ? 'shadow-[0px_0px_0px_2px_#7B4DFF,0px_2px_8px_rgba(0,0,0,0.08)]'
    : 'shadow-[0px_1px_2px_rgba(0,0,0,0.08),0px_2px_4px_rgba(0,0,0,0.04)]';

  const btnClass = variant === 'professional'
    ? 'w-full py-2 px-4 rounded text-[13.5px] font-semibold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] hover:brightness-105 active:scale-[0.998] transition-all cursor-pointer'
    : 'w-full py-2 px-4 rounded text-[13.5px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] hover:bg-[#F2F5F7] active:scale-[0.998] transition-all cursor-pointer';

  return (
    <div className={`bg-white rounded flex flex-col justify-between min-h-[640px] p-5 ${cardBorder}`}>
      {/* Upper */}
      <div className="flex flex-col gap-4">
        {/* Badge */}
        <div>
          {badgeSolid
            ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#7B4DFF] text-white text-[12px] font-medium">{badge}</span>
            : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-purple-200 text-[#7B4DFF] text-[12px] font-medium bg-purple-50/60">{badge}</span>
          }
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-[24px] leading-[32px] font-bold text-[#222323]">{title}</h3>
            {icon}
          </div>
          <p className="text-[13px] leading-[20px] font-semibold text-[#222323] min-h-[40px]">{subtitle}</p>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[32px] leading-[40px] font-bold text-[#5733be] tabular-nums tracking-tight">
            <AnimatedPrice value={price} />
          </div>
          <p className="text-[13px] leading-[20px] text-[#595959]">
            Per dental chair / month · {billing === 'annual' ? 'billed annually' : 'billed monthly'}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2">
          <button type="button" onClick={onCta} className={btnClass}>
            Purchase Plan
          </button>
          {trialBadge && (
            <div className="flex justify-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6C44E0] text-[12px] font-medium">
                14 days left in trial
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-slate-100">
        <span className="text-[13px] leading-[20px] font-semibold text-[#222323]">{featuresLabel}</span>
        <ul className="flex flex-col gap-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckIcon />
              <span className="text-[12px] leading-[16px] text-[#222323]">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function PricingSection() {
  const [billing, setBilling] = useState('annual');
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-[linear-gradient(180deg,#F6F3FF_0%,#DED0FF_100%)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-purple-200 px-4 py-1.5 mb-3">
              <span className="text-xs font-bold text-[#7B4DFF] uppercase tracking-wide">Simple pricing</span>
            </div>
            <h2 className="text-4xl font-extrabold text-[#222323] tracking-tight leading-tight">
              Select a Dental Clinic Plan
            </h2>
            <p className="mt-2 text-[15px] text-slate-600">
              No hidden fees · Cancel anytime · 14-day free trial on all plans
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <BillingToggle value={billing} onChange={setBilling} />
            <button
              type="button"
              className="text-[13px] font-semibold text-[#7B4DFF] hover:underline cursor-pointer"
              onClick={() => {}}
            >
              See Full Plan Comparison →
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          <PlanCard
            badge="Solo & Private Clinics"
            badgeSolid={false}
            icon={<ToothIcon />}
            title="Essential"
            subtitle="For solo dentists & private practices to manage appointments & records"
            annualPrice={29}
            monthlyPrice={36}
            billing={billing}
            features={ESSENTIAL_FEATURES}
            featuresLabel="Top clinical features:"
            variant="essential"
            onCta={() => navigate('/register')}
          />
          <PlanCard
            badge="Most Popular"
            badgeSolid={true}
            icon={<SparkleStarIcon />}
            title="Professional"
            subtitle="For growing dental clinics requiring advanced charting, lab orders & insurance"
            annualPrice={59}
            monthlyPrice={74}
            billing={billing}
            features={PROFESSIONAL_FEATURES}
            featuresLabel="Everything in Essential, plus:"
            variant="professional"
            onCta={() => navigate('/register')}
          />
          <PlanCard
            badge="Multi-Branch & Full Automation"
            badgeSolid={false}
            icon={<CrownIcon />}
            title="Premium"
            subtitle="For high-volume dental centers & multi-branch groups needing enterprise automation"
            annualPrice={99}
            monthlyPrice={124}
            billing={billing}
            features={PREMIUM_FEATURES}
            featuresLabel="Everything in Professional, plus:"
            variant="premium"
            trialBadge={true}
            onCta={() => navigate('/register')}
          />
        </div>

        {/* Footnote */}
        <p className="text-center text-[13px] font-semibold text-[#7B4DFF] mt-8">
          Smilux Dental subscriptions are priced per active dental operatory · billing frequency · clinic branches.
        </p>

        {/* Bottom CTA bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 border border-purple-200/60 rounded-lg px-5 py-4 backdrop-blur-sm">
          <span className="text-[14px] text-[#222323]">
            Not ready to purchase? Start your <span className="font-bold text-[#7B4DFF]">14-day free trial</span> — no credit card required.
          </span>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="shrink-0 px-5 py-2 rounded text-[13.5px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] hover:brightness-105 active:scale-[0.998] transition-all shadow cursor-pointer"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}
