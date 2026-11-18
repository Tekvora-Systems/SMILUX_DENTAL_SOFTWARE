import React from 'react';
import { useNavigate } from 'react-router-dom';

 

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full relative overflow-hidden bg-[linear-gradient(160deg,#F6F3FF_0%,#ffffff_55%,#F0EBFF_100%)]">

        {/* Glow blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6   py-10 ">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-2 items-start">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start rounded border border-purple-200 bg-white/80 px-3 py-1 mb-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7B4DFF] animate-pulse shrink-0" />
              <span className="text-[11px] font-bold text-[#7B4DFF] uppercase tracking-wide">Kenya's #1 Dental Practice Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-[38px] sm:text-[48px] lg:text-[52px] font-extrabold text-[#222323] leading-[1.06] tracking-tight">
              Run Your Entire<br />
              <span className="relative inline-block text-[#7B4DFF]">
                Dental Clinic
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 320 10" fill="none" preserveAspectRatio="none">
                  <path d="M2 8 Q80 2 160 6 Q240 10 318 4" stroke="#e8368f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              {' '}from One Place
            </h1>

            {/* Sub-headline — rich paragraph */}
            <p className="mt-5 text-[15px] text-[#595959] leading-[1.7] max-w-xl">
              Smilux is a complete dental practice management system built specifically for Kenyan clinics.
              From the moment a patient walks in to the moment their M-Pesa receipt lands in their inbox —
              every touchpoint is handled. No more juggling WhatsApp, paper files, and Excel spreadsheets.
              Everything your clinic needs, in one beautifully simple platform.
            </p>

             

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('/register')}
                className="h-10 px-6 text-[13.5px] font-bold text-white bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.08)] hover:brightness-105 active:scale-[0.998] transition-all cursor-pointer flex items-center gap-2">
                Start 14-Day Free Trial
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button onClick={() => scrollTo('#about')}
                className="h-10 px-6 text-[13.5px] font-semibold text-[#5733be] bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F2F5F7] active:scale-[0.998] transition-all cursor-pointer flex items-center gap-2">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                Book a Demo
              </button>
            </div>
 
          </div>

          {/* ── RIGHT: Dashboard mockup ── */}
          <div className="hidden lg:flex flex-col gap-3 relative">

            {/* Main card */}
            <div className="w-full bg-white border border-[#E7E7E7] rounded-[10px] shadow-[0px_8px_32px_rgba(123,77,255,0.12),0px_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">

              {/* Topbar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E7E7E7] bg-[linear-gradient(90deg,#F6F3FF,#ffffff)]">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-[11px] font-semibold text-[#595959]">Smilux — Dr. Kamau Dental Clinic</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700">Live</span>
                </div>
              </div>

              <div className="p-5">
                {/* KPI strip */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Today\'s Appointments', val: '14', sub: '+3 walk-ins', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-[#7B4DFF]' },
                    { label: 'Revenue Today',         val: 'KES 48K', sub: '↑ 12% vs yesterday', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
                    { label: 'New Patients',          val: '5', sub: '2 referrals', bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-[#e8368f]' },
                  ].map((k) => (
                    <div key={k.label} className={`${k.bg} border ${k.border} rounded p-3`}>
                      <div className={`text-[20px] font-extrabold ${k.text}`}>{k.val}</div>
                      <div className="text-[10px] font-semibold text-[#595959] leading-tight mt-0.5">{k.label}</div>
                      <div className="text-[10px] text-[#595959] mt-1 opacity-70">{k.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Appointment list */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-[#595959] uppercase tracking-widest">Upcoming Appointments</p>
                    <span className="text-[10px] font-semibold text-[#7B4DFF] cursor-pointer hover:underline">View all →</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Alice Wanjiku',  time: '9:00 AM',  type: 'Scaling & Polishing', status: 'Confirmed', color: '#7B4DFF' },
                      { name: 'Brian Otieno',   time: '10:30 AM', type: 'Root Canal',           status: 'Arrived',   color: '#e8368f' },
                      { name: 'Carol Muthoni',  time: '12:00 PM', type: 'General Checkup',      status: 'Scheduled', color: '#2ec4b6' },
                    ].map((apt) => (
                      <div key={apt.name} className="flex items-center gap-3 bg-white border border-[#E7E7E7] rounded px-3 py-2.5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)]">
                        <div className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: apt.color }}>{apt.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-[#222323] truncate">{apt.name}</p>
                          <p className="text-[10px] text-[#595959]">{apt.type}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] font-bold text-[#595959]">{apt.time}</p>
                          <span className={`text-[9px] font-bold rounded-full px-1.5 py-0.5 ${apt.status === 'Confirmed' ? 'bg-purple-100 text-[#7B4DFF]' : apt.status === 'Arrived' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom notification row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
                    <div className="h-6 w-6 rounded bg-emerald-500 flex items-center justify-center shrink-0">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-800 leading-tight">M-Pesa Received</p>
                      <p className="text-[10px] text-emerald-600">KES 8,000 · QKT984920</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded px-3 py-2">
                    <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center shrink-0">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-800 leading-tight">SHA Claim Approved</p>
                      <p className="text-[10px] text-blue-600">Jubilee · KES 15,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating mini-card — SMS sent */}
            <div className="self-end flex items-center gap-2.5 bg-white border border-[#E7E7E7] rounded-[8px] px-3 py-2.5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] mr-4">
              <div className="h-7 w-7 rounded bg-[#25D366] flex items-center justify-center shrink-0">
                <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#222323]">WhatsApp Reminder Sent</p>
                <p className="text-[10px] text-[#595959]">3 patients notified · 9:00 AM appts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
