// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type Lenis from 'lenis';

const WHATSAPP_MESSAGE =
  "Hi James, I saw your portfolio. Let's talk about automating our operations and developing a system that goes to production.";
const WHATSAPP_LINK = `https://wa.me/254791173864?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Release assets are served as attachments, so these links download on every device
const RELEASE = 'https://github.com/Africall/james-melwish-cinematic-portfolio/releases/latest/download';
const downloads = [
  { label: 'Download portfolio', meta: 'HTML · works offline', href: `${RELEASE}/James-Melwish-Cinematic-Portfolio.html` },
  { label: 'Download PDF', meta: '2 pages', href: `${RELEASE}/James-Melwish-Portfolio.pdf` },
];

const channels = [
  {
    label: '// WHATSAPP',
    value: 'Chat now',
    href: WHATSAPP_LINK,
  },
  {
    label: '// MOBILE',
    value: '0791 173 864',
    href: 'tel:+254791173864',
  },
  {
    label: '// EMAIL',
    value: 'james.melwish@spansventures.com',
    href: 'mailto:james.melwish@spansventures.com',
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
    download: 'James Melwish.vcf',
  },
] as { label: string; value: string; href: string; download?: string }[];

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
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black via-black/75 to-transparent" />
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: the pitch and the QR */}
          <div className="lg:col-span-6 flex flex-col">
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
                07 / CONTACT
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h2
                className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
                  LET&apos;S TALK
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                  PRODUCTION.
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1 }}
              className="text-[15px] sm:text-lg text-[#E8D7C5] leading-relaxed max-w-lg mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              I&apos;m James Melwish. I automate what slows you down and align it with how you actually work.
              Let&apos;s talk about developing your system and taking it all the way to production.
            </motion.p>

            {/* QR: scan on desktop, tap on mobile */}
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="group flex flex-col sm:flex-row items-center sm:items-stretch gap-6 p-5 rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806]/85 backdrop-blur-md hover:border-[#D4AF37] transition-colors duration-500 max-w-lg"
            >
              <div className="relative shrink-0">
                <img
                  src="images/qr-whatsapp.png"
                  alt="QR code that opens a WhatsApp chat with James Melwish"
                  className="w-44 h-44 sm:w-48 sm:h-48 rounded-md shadow-[0_0_40px_rgba(212,175,55,0.18)]"
                  loading="lazy"
                />
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />
              </div>
              <div className="flex flex-col justify-center text-center sm:text-left">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] mb-2">SCAN OR TAP</span>
                <span
                  className="text-3xl leading-none text-[#F4EBE2] mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  START THE CONVERSATION ON WHATSAPP
                </span>
                <span className="text-[12px] font-light text-[#A8988B] leading-relaxed mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Opens a chat with 0791 173 864, message already written. Just press send.
                </span>
                <span
                  className="self-center sm:self-start inline-flex items-center gap-2 px-4 py-2.5 border border-[#D4AF37]/70 text-[#F7E7C4] text-[10.5px] font-medium tracking-[0.24em] uppercase group-hover:bg-[#D4AF37] group-hover:text-black transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  CHAT NOW ↗
                </span>
              </div>
            </motion.a>
          </div>

          {/* Right: contact card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806]/90 backdrop-blur-md p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            <div className="mb-8">
              <h3
                className="text-3xl text-white font-normal uppercase mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                JAMES MELWISH
              </h3>
              <span
                className="block text-[10px] font-medium tracking-[0.22em] uppercase text-[#8C6D4F] leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                AI &amp; SYSTEMS BUILDER · BUSINESS DEVELOPMENT &amp; PRODUCT MANAGER, SPANS VENTURES LTD
              </span>
            </div>

            <div className="space-y-3 mb-8">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  download={c.download}
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
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3.5 border border-[#D4AF37]/60 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#F7E7C4] hover:text-black text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              LET&apos;S BUILD YOURS ↗
            </a>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {downloads.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  download
                  className="group flex items-center justify-between gap-3 px-4 py-3 border border-[#8C6D4F]/40 hover:border-[#D4AF37] bg-[#0E0C0A] transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#E8D7C5] group-hover:text-[#F7E7C4]">
                    {d.label}
                  </span>
                  <span className="text-[9px] font-mono text-[#8C6D4F] group-hover:text-[#D4AF37] whitespace-nowrap">{d.meta} ↓</span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>

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
