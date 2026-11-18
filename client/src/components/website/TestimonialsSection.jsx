import React, { useState, useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    name: 'Dr. Grace Kamau',
    role: 'Clinical Director',
    clinic: 'Westlands Smile Centre, Nairobi',
    avatar: 'GK',
    color: '#7B4DFF',
    rating: 5,
    quote:
      'Smilux completely transformed how we run our clinic. The M-Pesa integration alone saves us 2 hours a day — patients pay instantly and it reconciles automatically. The dental charting is the best I\'ve seen from any Kenyan software.',
  },
  {
    name: 'Dr. Amina Hassan',
    role: 'Owner & Lead Dentist',
    clinic: 'Pristine Dental, Mombasa',
    avatar: 'AH',
    color: '#e8368f',
    rating: 5,
    quote:
      'We switched from paper records 6 months ago. The transition was seamless — the team at Smilux migrated all our patient data. SHA insurance submissions that used to take 3 days now take 20 minutes. Worth every shilling.',
  },
  {
    name: 'Dr. Patrick Ochieng',
    role: 'Managing Partner',
    clinic: 'PO Dental Group (3 Branches)',
    avatar: 'PO',
    color: '#2ec4b6',
    rating: 5,
    quote:
      'Managing three branches was a nightmare before Smilux. Now I can see real-time revenue from all locations, compare dentist productivity, and handle payroll from one dashboard. Multi-branch management is exactly what we needed.',
  },
  {
    name: 'Dr. Ruth Mwangi',
    role: 'Paediatric Dentist',
    clinic: 'Kidsmile Clinic, Karen',
    avatar: 'RM',
    color: '#ffb703',
    rating: 5,
    quote:
      'The appointment reminder system is a game-changer for us. No-shows dropped by 60% in the first month. Parents get WhatsApp reminders automatically and can confirm in one tap. The support team is incredibly responsive too.',
  },
  {
    name: 'Dr. John Kimani',
    role: 'Orthodontist',
    clinic: 'BrightSmile Ortho, Thika Road',
    avatar: 'JK',
    color: '#6C44E0',
    rating: 5,
    quote:
      'The treatment plan module is exceptionally detailed. I can outline multi-stage orthodontic treatment, attach X-rays, get digital patient consent, and track progress visit by visit. It elevated the quality of care we deliver.',
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDot = (i) => {
    clearInterval(intervalRef.current);
    setActive(i);
    startAutoPlay();
  };

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 mb-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Loved by dentists</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            What clinic owners say
          </h2>
          <p className="mt-3 text-slate-500 text-lg">Real stories from practices across Kenya.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">

          {/* Left sidebar — avatar list */}
          <div className="lg:col-span-2 hidden lg:flex flex-col gap-3">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                onClick={() => handleDot(i)}
                className={[
                  'flex items-center gap-3 p-3 rounded-xl text-left transition-all',
                  active === i
                    ? 'bg-purple-50 border border-purple-200 shadow-sm'
                    : 'hover:bg-slate-50 border border-transparent',
                ].join(' ')}
              >
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: item.color }}
                >
                  {item.avatar}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-bold truncate ${active === i ? 'text-slate-900' : 'text-slate-600'}`}>{item.name}</p>
                  <p className="text-xs text-slate-400 truncate">{item.clinic}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right — featured testimonial */}
          <div className="lg:col-span-3">
            <div
              key={active}
              className="rounded-3xl bg-gradient-to-br from-[#f8f7ff] to-[#f0ebff] border border-purple-100 p-8 md:p-10 shadow-lg shadow-purple-100/40"
              style={{ animation: 'fadeSlideIn 0.4s ease forwards' }}
            >
              {/* Quote mark */}
              <svg className="h-10 w-10 text-purple-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <StarRating count={t.rating} />

              <blockquote className="mt-4 text-lg text-slate-700 leading-relaxed font-medium">
                "{t.quote}"
              </blockquote>

              <div className="mt-6 flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role} · {t.clinic}</p>
                </div>
              </div>
            </div>

            {/* Mobile dots */}
            <div className="flex justify-center gap-2 mt-5 lg:hidden">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className={`h-2 rounded-full transition-all ${active === i ? 'w-6 bg-[#7B4DFF]' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
