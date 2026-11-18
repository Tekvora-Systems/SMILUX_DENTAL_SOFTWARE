import React from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { value: '500+', label: 'Active Clinics' },
  { value: '120K+', label: 'Patients Managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'KES 2B+', label: 'Revenue Processed' },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full relative overflow-hidden bg-[linear-gradient(180deg,#F6F3FF_0%,#ffffff_100%)]">
      {/* Subtle grid */}
     
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ── Left copy ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded border border-purple-200 bg-purple-50 px-3 py-1 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7B4DFF] animate-pulse shrink-0" />
              <span className="text-[11px] font-bold text-[#7B4DFF] uppercase tracking-wide">Now with M-Pesa &amp; SHA Integration</span>
            </div>

            <h1 className="text-[42px] sm:text-[52px] font-extrabold text-[#222323] leading-[1.07] tracking-tight">
              The Dental Practice OS<br />
              <span className="text-[#7B4DFF] relative inline-block">
                for Kenya
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 260 10" fill="none">
                  <path d="M2 8 Q65 2 130 6 Q195 10 258 4" stroke="#e8368f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="mt-5 text-[15px] text-[#595959] leading-relaxed max-w-lg">
              Appointments, dental charting, invoices, M-Pesa payments, SHA insurance, and staff management — all in one platform built for Kenyan dental clinics.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => navigate('/register')}
                className="h-10 px-5 text-[13.5px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.08)] hover:brightness-105 active:scale-[0.998] transition-all cursor-pointer flex items-center gap-2">
                Start 14-Day Free Trial
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button onClick={() => navigate('/login')}
                className="h-10 px-5 text-[13.5px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] active:scale-[0.998] transition-all cursor-pointer flex items-center gap-2">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                See Demo
              </button>
            </div>

            {/* Trust avatars */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[['#7B4DFF','D'],['#e8368f','A'],['#2ec4b6','M'],['#ffb703','J']].map(([c,l],i) => (
                  <div key={i} className="h-7 w-7 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white" style={{ background: c }}>{l}</div>
                ))}
              </div>
              <span className="text-[13px] text-[#595959]"><span className="font-bold text-[#222323]">500+ clinics</span> trust Smilux</span>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white border border-[#E7E7E7] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.06)] px-3 py-3 text-center">
                  <div className="text-[18px] font-extrabold text-[#222323]">{s.value}</div>
                  <div className="text-[11px] text-[#595959] mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right dashboard mockup ── */}
          <div className="hidden lg:block relative">
            <div className="w-full bg-white border border-[#E7E7E7] rounded shadow-[0px_4px_24px_rgba(123,77,255,0.12),0px_1px_3px_rgba(0,0,0,0.08)] p-5 overflow-hidden">

              {/* Header bar */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E7E7E7]">
                <div>
                  <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest">Today's Overview</p>
                  <p className="text-[15px] font-bold text-[#222323] mt-0.5">Dr. Kamau's Clinic</p>
                </div>
                <div className="h-9 w-9 rounded bg-[#7B4DFF] flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
              </div>

              {/* KPI pills */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Appointments', val: '14', bg: 'bg-purple-50', text: 'text-[#7B4DFF]', border: 'border-purple-200' },
                  { label: 'Invoiced', val: 'KES 48K', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
                  { label: 'New Patients', val: '5', bg: 'bg-pink-50', text: 'text-[#e8368f]', border: 'border-pink-200' },
                ].map((item) => (
                  <div key={item.label} className={`${item.bg} border ${item.border} rounded px-2 py-2.5 text-center`}>
                    <div className={`text-[17px] font-extrabold ${item.text}`}>{item.val}</div>
                    <div className="text-[10px] font-semibold text-[#595959] mt-0.5 leading-tight">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Appointment rows */}
              <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest mb-2">Next Appointments</p>
              <div className="space-y-1.5 mb-4">
                {[
                  { name: 'Alice Wanjiku', time: '9:00 AM', type: 'Scaling', color: '#7B4DFF' },
                  { name: 'Brian Otieno', time: '10:30 AM', type: 'Root Canal', color: '#e8368f' },
                  { name: 'Carol Muthoni', time: '12:00 PM', type: 'Checkup', color: '#2ec4b6' },
                ].map((apt) => (
                  <div key={apt.name} className="flex items-center gap-3 bg-white border border-[#E7E7E7] rounded px-3 py-2 shadow-[0px_1px_2px_rgba(0,0,0,0.04)]">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: apt.color }}>{apt.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#222323] truncate">{apt.name}</p>
                      <p className="text-[11px] text-[#595959]">{apt.type}</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#595959] shrink-0">{apt.time}</span>
                  </div>
                ))}
              </div>

              {/* M-Pesa notification */}
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded px-3 py-2.5">
                <div className="h-7 w-7 rounded bg-emerald-500 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-emerald-800">M-Pesa Payment Received</p>
                  <p className="text-[11px] text-emerald-600">KES 8,000 · QKT984920</p>
                </div>
                {/* SHA chip */}
                <div className="ml-auto shrink-0 flex items-center gap-1.5 bg-white border border-[#E7E7E7] rounded px-2 py-1 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-[#222323]">SHA Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
