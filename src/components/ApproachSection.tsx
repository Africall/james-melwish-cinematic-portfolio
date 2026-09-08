// src/components/ApproachSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

const principles = [
  {
    lead: 'I sell what I can deliver.',
    body: 'The fastest way to lose a client is to promise something the engineering cannot support. Doing both jobs removes that gap entirely.',
  },
  {
    lead: 'Offline is not an edge case here.',
    body: 'Kenyan deployments lose connectivity. Systems that assume otherwise fail at the worst moment: at a gate, at a till, mid call. I design for the drop first.',
  },
  {
    lead: 'I audit my own work.',
    body: 'Shipping is the beginning. The scheduled checks running against my production databases exist because I would rather find the problem than be told about it.',
  },
  {
    lead: 'Paper is usually the real competitor.',
    body: 'Not another vendor. A visitor book, a cash drawer, a WhatsApp group. Understanding why the paper still wins is how you replace it.',
  },
  {
    lead: 'Systems over chaos.',
    body: 'When something repeatedly goes wrong, I don’t only ask who made the mistake. I ask what system allowed the mistake to happen. Good businesses depend on good systems, and people who understand the mission.',
  },
];

export const ApproachSection: React.FC = () => {
  return (
    <section
      id="approach"
      className="relative w-full bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black py-28 lg:py-36 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* One very quiet glow - the reader has been moving for a while; let them stop. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] bg-[#D4AF37]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10">

        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="flex items-center space-x-4 mb-14"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            04 / HOW I WORK
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        <div className="space-y-14">
          {principles.map((p, idx) => (
            <motion.div
              key={p.lead}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.6, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <h3
                className="text-3xl sm:text-4xl font-semibold text-[#F4EBE2] mb-4 leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {p.lead}
              </h3>
              <p
                className="text-lg sm:text-xl font-light text-[#A8988B] leading-[2]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ApproachSection;
