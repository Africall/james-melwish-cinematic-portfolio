import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import watermarkImg from '../assets/watermark.png';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItems = [
  { name: 'WORK', href: '#work' },
  { name: 'APPROACH', href: '#approach' },
  { name: 'ABOUT', href: '#about' },
  { name: 'CONTACT', href: '#contact' },
];

export const HeroSection: React.FC<{ started?: boolean }> = ({ started = false }) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The Start gate unmutes the video inside its click gesture; mirror that here
  useEffect(() => {
    const onGateOpened = () => setMuted(false);
    window.addEventListener('gate-opened', onGateOpened);
    return () => window.removeEventListener('gate-opened', onGateOpened);
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (v.paused) v.play().catch(() => {});
    setMuted(v.muted);
  };

  // The opening scene dissolves to black as the reader scrolls into the page
  const { scrollY } = useScroll();
  const heroVh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const videoOpacity = useTransform(scrollY, [0, heroVh * 0.85], [1, 0]);
  const videoScale = useTransform(scrollY, [0, heroVh], [1, 1.06]);

  // Browsers can pause autoplay video (backgrounded tab, power saving);
  // resume on visibility changes and on the first interaction as a fallback.
  useEffect(() => {
    const resume = () => {
      document.querySelectorAll('video').forEach((v) => {
        if (v.paused) v.play().catch(() => {});
      });
    };
    resume();
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('pointerdown', resume, { passive: true });
    window.addEventListener('scroll', resume, { passive: true });
    return () => {
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('scroll', resume);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="top" className="relative w-screen h-screen overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black cursor-none">
      {/* ================= 1. MINIMAL CUSTOM CURSOR ================= */}
      {cursorPos.x >= 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-[1px]"
          animate={{
            x: cursorPos.x - (isHovered ? 24 : 5),
            y: cursorPos.y - (isHovered ? 24 : 5),
            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,
            backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.1)' : 'rgba(235, 215, 195, 0.95)',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.5 }}
        />
      )}

      {/* ================= 2. FIXED VIDEO LAYER ================= */}
      <motion.div
        style={{ opacity: videoOpacity, scale: videoScale }}
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-center justify-end"
      >
        <video
          ref={videoRef}
          data-hero="true"
          autoPlay
          muted
          loop
          playsInline
          poster="images/hero-poster.jpg"
          className="h-screen w-auto max-w-none object-contain origin-right scale-95 md:scale-[0.98] lg:scale-100"
        >
          <source src="videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Global scrim so type always wins over the footage */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Seamless Soft Left Edge Blend */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
        {/* Bottom anchor shadow so the subline stays legible */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* ================= 3. ANIMATED WATERMARK EMBLEM ================= */}
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 pointer-events-none flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-36 h-36 bg-black/85 rounded-full blur-xl" />

            <motion.div
              animate={{
                y: [-3, 3, -3],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              <img
                src={watermarkImg}
                alt="Insignia"
                className="w-28 h-28 lg:w-32 lg:h-32 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Nav legibility band */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/70 to-transparent z-[5] pointer-events-none" />

      {/* ================= 4. CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 sm:px-12 lg:px-16 pt-6 pb-8 pointer-events-none">

        {/* Navigation Bar */}
        <header className="relative flex items-center justify-between w-full pointer-events-auto">
          <a
            href="#"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#EAD8C7] hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            JAMES MELWISH.
          </a>

          {/* Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-8 lg:space-x-10 text-[11px] tracking-[0.28em] font-light uppercase text-[#C4B5A5] absolute left-1/2 -translate-x-1/2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group py-1 transition-colors duration-300 hover:text-[#FFF5EB]"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37]/50 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <a
            href="#contact"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex items-center space-x-2 text-[11px] tracking-[0.24em] font-light uppercase py-2 px-4 border border-[#8C6D4F]/50 hover:border-[#D4AF37] text-[#EAD8C7] transition-all duration-300 backdrop-blur-sm ml-auto lg:ml-0"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>LET&apos;S TALK</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
              ↗
            </span>
          </a>
        </header>

        {/* Main Hero Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full pt-4 pb-2 my-auto">

          {/* LEFT: Balanced Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={started ? 'visible' : 'hidden'}
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[37rem] xl:max-w-[40rem] pointer-events-auto z-20"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUpVariants} className="mb-5">
              <span
                className="text-[10px] sm:text-[11px] font-medium tracking-[0.4em] uppercase text-[#8C6D4F]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                NAIROBI, KENYA
              </span>
            </motion.div>

            {/* Massive Condensed Headline - title-sequence masked reveal */}
            <motion.div variants={fadeUpVariants} className="relative mb-3.5 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[7.8rem] tracking-tight uppercase leading-[0.83]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {/* Line 1 */}
                <span className="block overflow-hidden pt-[0.12em] -mt-[0.12em] pb-[0.1em] -mb-[0.1em]">
                  <motion.span
                    initial={{ y: '115%' }}
                    animate={started ? { y: '0%' } : { y: '115%' }}
                    transition={{ duration: 1.15, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
                      PROMISED.
                    </span>
                  </motion.span>
                </span>

                {/* Line 2 */}
                <span className="block overflow-hidden pt-[0.12em] -mt-[0.12em] pb-[0.1em] -mb-[0.1em]">
                  <motion.span
                    initial={{ y: '115%' }}
                    animate={started ? { y: '0%' } : { y: '115%' }}
                    transition={{ duration: 1.15, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                      BUILT.
                    </span>
                  </motion.span>
                </span>

                {/* Line 3 */}
                <span className="block overflow-hidden pt-[0.12em] -mt-[0.12em] pb-[0.1em] -mb-[0.1em]">
                  <motion.span
                    initial={{ y: '115%' }}
                    animate={started ? { y: '0%' } : { y: '115%' }}
                    transition={{ duration: 1.15, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410]">
                      PROVEN.
                    </span>
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Roles */}
            <motion.div variants={fadeUpVariants} className="mb-4">
              <p
                className="text-[10px] sm:text-[11px] md:text-xs font-normal tracking-[0.28em] uppercase text-[#C4B29E]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                BUSINESS DEVELOPMENT <span className="text-[#8C6D4F] mx-1">•</span> PRODUCT MANAGEMENT <span className="text-[#8C6D4F] mx-1">•</span> SOFTWARE ENGINEERING <span className="text-[#8C6D4F] mx-1">•</span> SYSTEMS INTEGRATION
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[13.5px] font-light text-[#A8988B] leading-[1.8] tracking-wide max-w-lg mb-6 space-y-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                <span className="text-[#F3DBB3]">Promised in the boardroom. Built in the codebase. Proven in production.</span>
                <br />
                James Melwish, Business Development &amp; Product Manager at Spans Ventures Ltd, and the lead engineer on the platform SpansCall runs on.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* See The Work CTA */}
              <motion.a
                href="#work"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center justify-center space-x-3 px-6 sm:px-7 py-3.5 border border-[#8C6D4F] bg-[#120F0C]/80 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.18)]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent pointer-events-none" />
                <span>SEE THE WORK</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                  ↗
                </span>
              </motion.a>

              {/* Start A Conversation Button */}
              <motion.a
                href="#contact"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#8C6D4F]/40 hover:border-[#8C6D4F] text-[#BFA895] hover:text-[#EAD8C7] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
              >
                <span>START A CONVERSATION</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs">
                  ↓
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Floating Quote & Signature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-start pointer-events-auto pr-24 xl:pr-36 mr-4 z-20 select-none"
          >
            {/* 1. Quote Mark */}
            <span className="text-xl text-[#C99E5D] leading-none font-serif mb-2">
              “
            </span>

            {/* 2. Compact Two-Line Statement */}
            <div
              className="text-[9.5px] font-medium tracking-[0.24em] uppercase text-[#E0D3C5] space-y-1 mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>THE PITCH AND THE PRODUCT,</p>
              <p>SHAPED BY THE SAME HANDS.</p>
            </div>

            {/* 3. Gold Accent Line */}
            <div className="w-28 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#E8D7C5]/70 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.4)] mb-2" />

            {/* 4. Fine Monoline Calligraphy Signature */}
            <div
              className="text-[2.2rem] text-[#D8AB64] font-normal leading-none -ml-0.5"
              style={{
                fontFamily: "'Herr Von Muellerhoff', 'Allura', cursive",
                letterSpacing: '0.04em',
              }}
            >
              James Melwish
            </div>
          </motion.div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-2" />
      </div>

      {/* Sound Toggle */}
      <motion.button
        onClick={toggleMute}
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-5 left-6 sm:left-12 z-20 pointer-events-auto w-10 h-10 rounded-full border border-[#8C6D4F]/50 hover:border-[#D4AF37] bg-black/40 backdrop-blur-sm flex items-center justify-center text-[#C4B29E] hover:text-[#F7E7C4] transition-colors duration-300"
      >
        {muted ? (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 5.5h2.5L8 3v10l-3.5-2.5H2V5.5z" fill="currentColor" stroke="none" />
            <line x1="10" y1="5" x2="14" y2="11" />
            <line x1="14" y1="5" x2="10" y2="11" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 5.5h2.5L8 3v10l-3.5-2.5H2V5.5z" fill="currentColor" stroke="none" />
            <path d="M10.5 5.5C11.8 6.5 12.5 7.2 12.5 8s-.7 1.5-2 2.5" />
            <path d="M12 3.5C14 5 15 6.4 15 8s-1 3-3 4.5" />
          </svg>
        )}
      </motion.button>

      {/* Scroll Cue */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.2, duration: 1.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group pointer-events-auto"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
          SEE THE WORK
        </span>
        <div className="h-9 w-[1px] overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"
          />
        </div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
