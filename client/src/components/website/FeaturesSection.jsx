import React, { useState } from 'react';

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-600',
    ring: 'ring-purple-200',
    title: 'Smart Appointment Scheduling',
    desc: 'Calendar-based booking with dentist availability, auto SMS/WhatsApp reminders, and real-time slot management.',
    tags: ['Multi-dentist', 'Reminders', 'Walk-ins'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    color: 'bg-pink-100 text-pink-600',
    ring: 'ring-pink-200',
    title: 'FDI Dental Charting (Odontogram)',
    desc: 'Interactive upper & lower arch charting. Record cavities, fillings, crowns, root canals, and extractions with full history.',
    tags: ['FDI Standard', 'Clinical Notes', 'History Log'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    color: 'bg-emerald-100 text-emerald-600',
    ring: 'ring-emerald-200',
    title: 'M-Pesa Daraja STK Push',
    desc: 'Trigger instant Lipa Na M-Pesa prompts from invoices. Auto-reconcile receipts with patient accounts in real time.',
    tags: ['Daraja API', 'Auto-reconcile', 'Receipts'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    color: 'bg-sky-100 text-sky-600',
    ring: 'ring-sky-200',
    title: 'SHA & Insurance Management',
    desc: 'Full Kenya SHA integration, insurance policy tracking, claim submissions, and approval workflow management.',
    tags: ['SHA Kenya', 'Claims', 'Policy Tracking'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: 'bg-amber-100 text-amber-600',
    ring: 'ring-amber-200',
    title: 'Staff & Role Management',
    desc: 'Granular RBAC for Owners, Admins, Dentists, Receptionists, and Accountants. Per-branch access control.',
    tags: ['RBAC', 'Multi-branch', 'Audit Logs'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    color: 'bg-violet-100 text-violet-600',
    ring: 'ring-violet-200',
    title: 'Revenue & Practice Analytics',
    desc: 'Real-time revenue dashboards, patient volume trends, dentist productivity reports, and expense breakdowns.',
    tags: ['Real-time', 'Exports', 'Forecasting'],
  },
];

export default function FeaturesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-4 py-1.5 mb-4">
            <span className="text-xs font-bold text-[#7B4DFF] uppercase tracking-wide">Everything you need</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            One platform, your entire practice
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            Purpose-built for Kenyan dental clinics — not a generic SaaS with bolt-on features.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={[
                'group relative rounded-2xl border p-6 transition-all duration-300 cursor-default',
                hovered === i
                  ? 'border-purple-200 bg-purple-50/50 shadow-lg shadow-purple-100/60 -translate-y-1'
                  : 'border-slate-100 bg-white hover:border-slate-200',
              ].join(' ')}
            >
              {/* Icon */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color} mb-4 ring-4 ring-transparent group-hover:${f.ring} transition-all`}>
                {f.icon}
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{f.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {f.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover arrow */}
              <div className={`absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity`}>
                <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
