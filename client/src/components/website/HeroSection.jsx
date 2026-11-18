import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { value: '500+', label: 'Active Clinics' },
  { value: '120K+', label: 'Patients Managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'KES 2B+', label: 'Revenue Processed' },
];

// Floating card shown in the hero visual
function FloatingCard({ className, children }) {
  return (
    <div className={[
      'absolute rounded-2xl bg-white/90 backdrop-blur-sm border border-white/80 shadow-xl shadow-slate-200/50 px-4 py-3',
      className
    ].join(' ')}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(123,77,255,0.12),transparent)]" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-100/60 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-pink-100/40 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(#1c2536 1px, transparent 1px), linear-gradient(to right, #1c2536 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#7B4DFF] animate-pulse" />
              <span className="text-xs font-bold text-[#7B4DFF] uppercase tracking-wide">Now with M-Pesa & SHA Integration</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight">
              The Dental{' '}
              <span className="relative">
                <span className="relative z-10 text-[#7B4DFF]">Practice OS</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10 Q75 2 150 8 Q225 14 298 6" stroke="#e8368f" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              {' '}for Kenya
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              Appointments, dental charting, invoices, M-Pesa payments, SHA insurance, and staff management — all in one beautiful platform built for Kenyan dental clinics.
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/register')}
                className="px-7 py-3.5 text-base font-bold text-white rounded-xl bg-[linear-gradient(135deg,#9C7AFF_0%,#6C44E0_100%)] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-purple-200 flex items-center gap-2"
              >
                Start 14-Day Free Trial
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-7 py-3.5 text-base font-semibold text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                See Demo
              </button>
            </div>

            {/* Trust line */}
            <div className="mt-6 flex items-center gap-3">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {['#7B4DFF','#e8368f','#2ec4b6','#ffb703'].map((c, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ background: c }}>
                    {['D','A','M','J'][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">500+ clinics</span> trust Smilux
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl bg-white border border-slate-100 shadow-sm px-4 py-3 text-center">
                  <div className="text-xl font-extrabold text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual dashboard mockup */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Main card */}
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#f8f7ff] to-[#f0ebff] border border-purple-100 shadow-2xl shadow-purple-100/60 p-6 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Today's Overview</p>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">Dr. Kamau's Clinic</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-[#7B4DFF] flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
              </div>

              {/* Stat pills */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Appointments', val: '14', color: 'bg-purple-100 text-purple-700' },
                  { label: 'Invoiced', val: 'KES 48K', color: 'bg-emerald-100 text-emerald-700' },
                  { label: 'New Patients', val: '5', color: 'bg-pink-100 text-pink-700' },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl ${item.color} px-3 py-3 text-center`}>
                    <div className="text-lg font-extrabold">{item.val}</div>
                    <div className="text-[10px] font-semibold mt-0.5 opacity-80 leading-tight">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Appointment list */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Next Appointments</p>
                {[
                  { name: 'Alice Wanjiku', time: '9:00 AM', type: 'Scaling', color: '#7B4DFF' },
                  { name: 'Brian Otieno', time: '10:30 AM', type: 'Root Canal', color: '#e8368f' },
                  { name: 'Carol Muthoni', time: '12:00 PM', type: 'Checkup', color: '#2ec4b6' },
                ].map((apt) => (
                  <div key={apt.name} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm border border-slate-100">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: apt.color }}>
                      {apt.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{apt.name}</p>
                      <p className="text-xs text-slate-500">{apt.type}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-600 shrink-0">{apt.time}</span>
                  </div>
                ))}
              </div>

              {/* M-Pesa badge */}
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
                <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-emerald-800">M-Pesa Payment Received</p>
                  <p className="text-[11px] text-emerald-600">KES 8,000 · QKT984920</p>
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <FloatingCard className="-top-4 -right-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">SHA Claim Approved</span>
            </FloatingCard>

            <FloatingCard className="-bottom-4 -left-6 flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-[#7B4DFF] flex items-center justify-center">
                <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700">SMS reminder sent</span>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
