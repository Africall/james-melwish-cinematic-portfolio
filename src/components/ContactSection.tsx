// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type Lenis from 'lenis';

const channels = [
  {
    label: '// EMAIL',
    value: 'james.melwish@spansventures.com',
    href: 'mailto:james.melwish@spansventures.com',
  },
  {
    label: '// MOBILE',
    value: '0733 801 309',
    href: 'tel:+254733801309',
  },
  {
    label: '// WEB',
    value: 'spansventures.com',
    href: 'https://spansventures.com',
  },
  {
    label: '// VCARD',
    value: 'Save my contact',
    href: 'james-melwish.vcf',
  },
];

export const ContactSection: React.FC = () => {
  // Back-to-top as a film cut: fade to black, hard cut to the opening frame, fade in
  const [cutPhase, setCutPhase] = useState<'idle' | 'in' | 'out'>('idle');

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cutPhase === 'idle') setCutPhase('in');
  };

  const handleCutComplete = () => {
    if (cutPhase === 'in') {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      setCutPhase('out');
    } else if (cutPhase === 'out') {
      setCutPhase('idle');
    }
  };

  return (
    <footer
      id="contact"
      className="relative w-full min-h-screen flex flex-col justify-center bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-24 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Closing scene - the second video bookends the site */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-right"
        >
          <source src="videos/about.mp4" type="video/mp4" />
        </video>
        {/* Scrims: type always wins over the footage */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* The positioning line returns, smaller now */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="text-center text-[11px] font-medium tracking-[0.4em] uppercase text-[#8C6D4F] mb-16"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          PROMISED. BUILT. PROVEN.
        </motion.p>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  06 / CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    A PROPOSAL AND
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                    A PULL REQUEST.
                  </span>
                </h2>
              </motion.div>

              <p
                className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed max-w-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                If you have a problem that needs both, we should talk.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Card (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806]/90 backdrop-blur-md p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            {/* Identity */}
            <div className="mb-8">
              <h3
                className="text-3xl text-white font-normal uppercase mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                JAMES MELWISH
              </h3>
              <span
                className="block text-[10px] font-medium tracking-[0.22em] uppercase text-[#8C6D4F]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                BUSINESS DEVELOPMENT & PRODUCT MANAGER, SPANSCALL | SPANS VENTURES LTD
              </span>
            </div>

            {/* Channels */}
            <div className="space-y-4 mb-8">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  download={c.href.endsWith('.vcf') ? 'james-melwish.vcf' : undefined}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 p-4 rounded-sm border border-[#8C6D4F]/30 bg-[#120F0C] hover:border-[#D4AF37] transition-colors duration-300"
                >
                  <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors shrink-0">
                    {c.label}
                  </span>
                  <span
                    className="text-xs sm:text-sm text-[#E8D7C5] group-hover:text-white transition-colors text-right break-all"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {c.value} <span className="text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">↗</span>
                  </span>
                </a>
              ))}
            </div>

            <a
              href="mailto:james.melwish@spansventures.com"
              className="block w-full text-center py-3.5 border border-[#8C6D4F]/50 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#1A1510] text-[#E8DFD8] hover:text-[#F7E7C4] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              START A CONVERSATION ↗
            </a>
          </motion.div>

        </div>

        {/* System Footer Line */}
        <div className="pt-16 mt-16 border-t border-[#8C6D4F]/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase">
            JAMES MELWISH, NAIROBI, KENYA. BUILT BY HAND.
          </span>
          <span className="text-[10px] font-mono text-[#8C6D4F]">
            © {new Date().getFullYear()}
          </span>
          <a
            href="#top"
            onClick={handleBackToTop}
            className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase hover:text-[#D4AF37] transition-colors"
          >
            BACK TO TOP ↑
          </a>
        </div>

      </div>

      {/* Film-cut overlay for the loop back to the top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: cutPhase === 'in' ? 1 : 0 }}
        transition={{ duration: cutPhase === 'in' ? 0.5 : 0.8, ease: cutPhase === 'in' ? 'easeIn' : 'easeOut' }}
        onAnimationComplete={handleCutComplete}
        className="fixed inset-0 bg-black z-[85]"
        style={{ pointerEvents: cutPhase === 'in' ? 'auto' : 'none' }}
      />
    </footer>
  );
};

export default ContactSection;
