import React, { useState, useEffect, useRef } from 'react';

const TESTIMONIALS = [
  { name: 'Dr. Grace Kamau', role: 'Clinical Director', clinic: 'Westlands Smile Centre, Nairobi', avatar: 'GK', color: '#7B4DFF',
    quote: 'Smilux completely transformed how we run our clinic. The M-Pesa integration alone saves us 2 hours a day — patients pay instantly and it reconciles automatically. The dental charting is the best I\'ve seen from any Kenyan software.' },
  { name: 'Dr. Amina Hassan', role: 'Owner & Lead Dentist', clinic: 'Pristine Dental, Mombasa', avatar: 'AH', color: '#e8368f',
    quote: 'We switched from paper records 6 months ago. The transition was seamless — the team at Smilux migrated all our patient data. SHA insurance submissions that used to take 3 days now take 20 minutes. Worth every shilling.' },
  { name: 'Dr. Patrick Ochieng', role: 'Managing Partner', clinic: 'PO Dental Group (3 Branches)', avatar: 'PO', color: '#2ec4b6',
    quote: 'Managing three branches was a nightmare before Smilux. Now I can see real-time revenue from all locations, compare dentist productivity, and handle payroll from one dashboard. Multi-branch management is exactly what we needed.' },
  { name: 'Dr. Ruth Mwangi', role: 'Paediatric Dentist', clinic: 'Kidsmile Clinic, Karen', avatar: 'RM', color: '#ffb703',
    quote: 'The appointment reminder system is a game-changer for us. No-shows dropped by 60% in the first month. Parents get WhatsApp reminders automatically and can confirm in one tap. The support team is incredibly responsive too.' },
  { name: 'Dr. John Kimani', role: 'Orthodontist', clinic: 'BrightSmile Ortho, Thika Road', avatar: 'JK', color: '#6C44E0',
    quote: 'The treatment plan module is exceptionally detailed. I can outline multi-stage orthodontic treatment, attach X-rays, get digital patient consent, and track progress visit by visit. It elevated the quality of care we deliver.' },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="h-3.5 w-3.5 text-[#ffb703]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const start = () => { timer.current = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5000); };
  const pick = (i) => { clearInterval(timer.current); setActive(i); start(); };

  useEffect(() => { start(); return () => clearInterval(timer.current); }, []);

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="w-full py-20 bg-white border-t border-[#E7E7E7]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded border border-amber-200 bg-amber-50 px-3 py-1 mb-3">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wide">Loved by dentists</span>
          </div>
          <h2 className="text-[28px] font-extrabold text-[#222323] tracking-tight">What clinic owners say</h2>
          <p className="mt-1.5 text-[14px] text-[#595959]">Real stories from practices across Kenya.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-5 items-start">

          {/* Sidebar list */}
          <div className="lg:col-span-2 hidden lg:flex flex-col gap-1.5">
            {TESTIMONIALS.map((item, i) => (
              <button key={item.name} type="button" onClick={() => pick(i)}
                className={`flex items-center gap-3 p-3 rounded border text-left transition-all cursor-pointer ${active === i ? 'bg-purple-50 border-purple-200 shadow-[0px_1px_2px_rgba(0,0,0,0.06)]' : 'border-transparent hover:bg-slate-50 hover:border-[#E7E7E7]'}`}>
                <div className="h-9 w-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0" style={{ background: item.color }}>{item.avatar}</div>
                <div className="min-w-0">
                  <p className={`text-[13px] font-bold truncate ${active === i ? 'text-[#222323]' : 'text-[#595959]'}`}>{item.name}</p>
                  <p className="text-[11px] text-[#595959] truncate">{item.clinic}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Featured card */}
          <div className="lg:col-span-3">
            <div key={active}
              className="bg-[linear-gradient(180deg,#F6F3FF_0%,#EDE6FF_100%)] border border-purple-200 rounded shadow-[0px_1px_3px_rgba(0,0,0,0.08),0px_2px_8px_rgba(123,77,255,0.08)] p-7"
              style={{ animation: 'tslide 0.35s ease forwards' }}>

              {/* Big quote mark */}
              <svg className="h-8 w-8 text-purple-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <Stars />

              <blockquote className="mt-3 text-[15px] text-[#222323] leading-relaxed font-medium">
                "{t.quote}"
              </blockquote>

              <div className="mt-5 pt-5 border-t border-purple-200/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <p className="text-[13px] font-bold text-[#222323]">{t.name}</p>
                  <p className="text-[12px] text-[#595959]">{t.role} · {t.clinic}</p>
                </div>
              </div>
            </div>

            {/* Mobile dots */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} type="button" onClick={() => pick(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${active === i ? 'w-5 bg-[#7B4DFF]' : 'w-1.5 bg-slate-300'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes tslide{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </section>
  );
}
