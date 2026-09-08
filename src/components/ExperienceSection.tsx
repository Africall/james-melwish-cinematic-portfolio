// src/components/ExperienceSection.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
}

const journey: RouteStop[] = [
  {
    id: '01',
    year: 'OCT 7',
    title: 'THE RELAUNCH',
    organization: 'STAFFIKA · MERX · WHERE · MPAL · MTAALOOP · VIBEZ CONNECT',
    description: 'Every paused venture resumes on my 24th birthday. The next chapter starts exactly where the range came from.',
  },
  {
    id: '02',
    year: 'NOW',
    title: 'BD & PRODUCT MANAGER',
    organization: 'SPANS VENTURES LTD | SPANSCALL',
    description: 'Running business development and product management across the Spans product line: SpansCall, HodiMtaa and Staffika. Lead engineer on the platform behind them.',
  },
  {
    id: '03',
    year: 'RECENT',
    title: 'HODIMTAA, CONCEPT TO LIVE',
    organization: 'VISITOR MANAGEMENT PLATFORM',
    description: 'Taken from idea to live deployment at a multi phase residential development, with real residents at the gate.',
  },
  {
    id: '04',
    year: 'RECENT',
    title: 'STAFFIKA IN PRODUCTION',
    organization: 'SUPER ERP FOR KENYAN SMES',
    description: 'A modular business OS live across multiple tenants, with scheduled integrity audits running against production.',
  },
  {
    id: '05',
    year: '2022 - 2026',
    title: 'GM & OPERATIONS MANAGER',
    organization: 'PLUGINS FIBER BROADBAND / PLUGINS IX',
    description: 'Joined in April 2022, one month out of high school. Left in April 2026 running customer care, sales, technical teams and project delivery for the ISP.',
  },
  {
    id: '06',
    year: 'NOV 2024',
    title: 'FOUNDER, OSHAVAA & SOTE',
    organization: 'LAUNDROMAT · MINIMART · WATER REFILLING',
    description: 'Launched both in November 2024. When the partnership turned hostile, left gracefully. The operating lessons and the laundry system came along.',
  },
  {
    id: '07',
    year: '2023',
    title: 'FOUNDER, AFRICALL SOLUTIONS',
    organization: 'BPO / CALL CENTRE & BRAND MANAGEMENT',
    description: 'Opened in 2023 and run end of line. Never really closed: it folded into Spans Ventures Ltd and became SpansCall. The next call centre would be a product, not a project.',
  },
  {
    id: '08',
    year: 'MAR 2023',
    title: 'DIRECTOR, FUNZACORP',
    organization: 'LANGUAGE TUTORING & INTERPRETATION',
    description: 'Started in March 2023, paused during the Plugins years, recently resumed. Four languages had to be good for something.',
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-4 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">

        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            05 / TIMELINE
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              WHERE THE RANGE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              CAME FROM.
            </span>
          </h2>
        </motion.div>

        {/* Minimalist Route Map */}
        <div className="relative w-full">

          {/* Background Track */}
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#8C6D4F]/20" />

          {/* Animated Gold Track */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#C99E5D] to-[#8C6D4F]/10 shadow-[0_0_10px_#D4AF37] origin-top"
          />

          <div className="space-y-12">
            {journey.map((stop, idx) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                {/* Desktop Year (Left side of track) */}
                <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                    {stop.year}
                  </span>
                </div>

                {/* Route Node */}
                <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 group-hover:scale-150 transition-all duration-700 ease-out" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#120F0C] border border-[#8C6D4F] group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_12px_#D4AF37] transition-colors duration-300" />
                </div>

                {/* Content (Right side of track) */}
                <div className="ml-14 md:ml-12 pl-2">
                  {/* Mobile Year */}
                  <div className="md:hidden mb-1.5">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37]">
                      {stop.year}
                    </span>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors mb-1 leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {stop.title}
                  </h3>

                  <span
                    className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[#8C6D4F] mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.organization}
                  </span>

                  <p
                    className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.7] max-w-lg group-hover:text-[#D5CBC0] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* What Carried Over */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="mt-20 pt-10 border-t border-[#8C6D4F]/20 max-w-2xl"
        >
          <span
            className="block text-[10px] font-medium tracking-[0.3em] uppercase text-[#D4AF37] mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            WHAT CARRIED OVER
          </span>
          <p
            className="text-lg sm:text-xl font-light text-[#A8988B] leading-[1.9]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The ISP years are why I understand connectivity failure as an operating condition rather than a support
            ticket. The BPO years are why I build call centre software instead of reselling it. The retail years are
            why my systems run integrity audits against production. Nothing here was wasted.
          </p>
        </motion.div>

        {/* The Sideshows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mt-16 pt-10 border-t border-[#8C6D4F]/20"
        >
          <span
            className="block text-[10px] font-medium tracking-[0.3em] uppercase text-[#D4AF37] mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            THE SIDESHOWS
          </span>
          <p
            className="text-xs font-light text-[#8C6D4F] mb-8 max-w-md leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Not everything is the main act. Built along the way, kept because building is the habit.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'MTAALOOP', blurb: 'Your neighbourhood in one app: food, shopping and services from within 500m to 3km, delivered in minutes. A digital village experiment.' },
              { name: 'WHERE', blurb: 'Meet your verified neighbours through quick video chats inside the estate. Real friendships, not followers.' },
              { name: 'OSHAVAA LAUNDRY SYSTEM', blurb: 'CRM and daily operations for a laundromat: orders, customers and cash, built from actually running one.' },
              { name: 'MERX', blurb: 'A point of sale, inventory and accounting suite: cashier desk, M-Pesa reconciliation, goods received, expiry tracking and reorder alerts.' },
            ].map((s) => (
              <div
                key={s.name}
                className="p-5 rounded-sm border border-[#8C6D4F]/25 bg-[#0E0C0A] hover:border-[#D4AF37]/50 transition-colors duration-300 group"
              >
                <span
                  className="block text-xl text-[#E8D7C5] group-hover:text-[#F7E7C4] transition-colors mb-1.5"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {s.name}
                </span>
                <p
                  className="text-[11.5px] font-light text-[#A8988B] leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {s.blurb}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
