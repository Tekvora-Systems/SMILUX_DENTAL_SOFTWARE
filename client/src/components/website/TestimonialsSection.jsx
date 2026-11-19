import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Reveal, fadeUp } from './motion.jsx';

const TESTIMONIALS = [
  {
    name: 'Dr. Grace Kamau',
    role: 'Clinical Director',
    clinic: 'Westlands Smile Centre, Nairobi',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=GraceKamau&backgroundColor=b6e3f4&clothingColor=262e33&hairColor=2c1b18&skinColor=ae5d29',
    color: '#118bb0',
    highlight: true,
    quote: "Smilux completely transformed how we run our clinic. The M-Pesa integration alone saves us 2 hours a day — patients pay instantly and it reconciles automatically. The dental charting is the best I've seen from any Kenyan software.",
  },
  {
    name: 'Dr. Amina Hassan',
    role: 'Owner & Lead Dentist',
    clinic: 'Pristine Dental, Mombasa',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=AminaHassan&backgroundColor=ffd5dc&clothingColor=ff5c5c&hairColor=2c1b18&skinColor=ae5d29',
    color: '#e8368f',
    highlight: false,
    quote: 'We switched from paper records 6 months ago. The transition was seamless — the team migrated all our data. SHA insurance submissions that used to take 3 days now take 20 minutes. Worth every shilling.',
  },
  {
    name: 'Dr. Patrick Ochieng',
    role: 'Managing Partner',
    clinic: 'PO Dental Group (3 Branches)',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=PatrickOchieng&backgroundColor=c0aede&clothingColor=3c4f5c&hairColor=2c1b18&skinColor=614335',
    color: '#2ec4b6',
    highlight: false,
    quote: 'Managing three branches was a nightmare before Smilux. Now I see real-time revenue from all locations, compare dentist productivity, and handle payroll from one dashboard. Multi-branch management is exactly what we needed.',
  },
  {
    name: 'Dr. Ruth Mwangi',
    role: 'Paediatric Dentist',
    clinic: 'Kidsmile Clinic, Karen',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=RuthMwangi&backgroundColor=d1f4cc&clothingColor=65c9ff&hairColor=2c1b18&skinColor=ae5d29',
    color: '#ffb703',
    highlight: false,
    quote: 'The appointment reminder system is a game-changer. No-shows dropped by 60% in the first month. Parents get WhatsApp reminders automatically and can confirm in one tap. The support team is incredibly responsive.',
  },
  {
    name: 'Dr. John Kimani',
    role: 'Orthodontist',
    clinic: 'BrightSmile Ortho, Thika Road',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=JohnKimani&backgroundColor=b6e3f4&clothingColor=262e33&hairColor=4a312c&skinColor=614335',
    color: '#6C44E0',
    highlight: false,
    quote: 'The treatment plan module is exceptionally detailed. I outline multi-stage orthodontic treatment, attach X-rays, get digital patient consent, and track progress visit by visit. It elevated the quality of care we deliver.',
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-[#ffb703]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, isActive, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={[
        'relative flex flex-col justify-between bg-white rounded border p-5 cursor-pointer transition-colors duration-200 select-none',
        t.highlight
          ? 'border-[#118bb0]  [0px_0px_0px_2px_rgba(123,77,255,0.15),0px_4px_16px_rgba(123,77,255,0.08)]'
          : 'border-[#E7E7E7]  [0px_1px_3px_rgba(0,0,0,0.06)]',
        isActive ? 'ring-2 ring-[#118bb0]/30' : 'hover:border-[#118bb0] hover: [0px_4px_16px_rgba(123,77,255,0.08)]',
      ].join(' ')}
    >
      {t.highlight && (
        <div className="absolute -top-3 left-4">
          <span className="inline-flex items-center gap-1 bg-[#118bb0] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Most helpful
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Stars />
          <svg className="h-6 w-6 text-purple-100" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
        <p className="text-[13px] text-[#595959] leading-relaxed line-clamp-4">&ldquo;{t.quote}&rdquo;</p>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#F3F4F6]">
        <img
          src={t.avatar}
          alt={t.name}
          className="h-10 w-10 rounded-full shrink-0 object-cover border-2"
          style={{ borderColor: t.color }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="h-10 w-10 rounded-full shrink-0 items-center justify-center text-[13px] font-bold text-white"
          style={{ background: t.color, display: 'none' }}
        >
          {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-[#222323] truncate">{t.name}</p>
          <p className="text-[11px] text-[#595959] truncate">{t.role} · {t.clinic}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const timer = useRef(null);
  const scrollRef = useRef(null);

  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5500);
  };

  const pick = (i) => {
    setActive(i);
    startTimer();
    // Scroll the card into view on mobile
    if (scrollRef.current) {
      const cards = scrollRef.current.querySelectorAll('[data-card]');
      if (cards[i]) {
        cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, []);

  return (
    <section id="testimonials" className="w-full py-20  bg-[linear-gradient(180deg,#f0f9fb_0%,#d9f0f5_100%)]  border-t border-[#E7E7E7]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 mb-4">
            <svg className="h-3 w-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wide">Loved by dentists</span>
          </Reveal>
          <Reveal as="h2" delay={0.05} className="text-[30px] font-extrabold text-[#222323] tracking-tight leading-tight">
            What clinic owners say
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-2 text-[14px] text-[#595959] max-w-md">
            Real stories from practices across Kenya.
          </Reveal>


        </div>

        {/* Cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <motion.div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              data-card
              variants={fadeUp}
              className="snap-center shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto lg:shrink"
            >
              <TestimonialCard t={t} isActive={active === i} onClick={() => pick(i)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row: remaining 2 cards + overall CTA */}
        <motion.div
          className="mt-4 grid sm:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        >
          {TESTIMONIALS.slice(3).map((t, i) => (
            <motion.div key={t.name} variants={fadeUp}>
              <TestimonialCard t={t} isActive={active === i + 3} onClick={() => pick(i + 3)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${active === i ? 'w-6 bg-[#118bb0]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
