// src/components/StartGate.tsx
// The premiere gate: black screen, name, one Start button. The click is a user
// gesture, so it legally unlocks video WITH sound - then the screen parts like
// theatre curtains along a gold line.
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StartGateProps {
  onStart: () => void; // fired at click - begin hero entrance animations
  onDone: () => void; // fired when the curtains have fully parted - unmount
}

const CURTAIN_EASE = [0.87, 0, 0.13, 1] as const;

export const StartGate: React.FC<StartGateProps> = ({ onStart, onDone }) => {
  const [opening, setOpening] = useState(false);

  // While the gate is up: no scroll, and always open at the top of the page
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const handleStart = () => {
    if (opening) return;
    // Inside the click gesture: restart the hero video from frame one, with sound.
    // Only the hero gets audio - background footage elsewhere stays muted.
    document.querySelectorAll('video').forEach((v) => {
      if ((v as HTMLVideoElement).dataset.hero) {
        v.currentTime = 0;
        v.muted = false;
      }
      v.play().catch(() => {});
    });
    window.dispatchEvent(new CustomEvent('gate-opened'));
    setOpening(true);
    onStart();
    setTimeout(onDone, 1250);
  };

  return (
    <div className="fixed inset-0 z-[90]" style={{ pointerEvents: opening ? 'none' : 'auto' }}>
      {/* Curtain halves */}
      <motion.div
        animate={opening ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 1.05, ease: CURTAIN_EASE }}
        className="absolute inset-x-0 top-0 h-1/2 bg-black"
      />
      <motion.div
        animate={opening ? { y: '100%' } : { y: '0%' }}
        transition={{ duration: 1.05, ease: CURTAIN_EASE }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
      />

      {/* Gold seam that flashes as the curtains part */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={opening ? { scaleX: 1, opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute top-1/2 left-0 right-0 h-[1px] origin-center bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_18px_rgba(212,175,55,0.8)]"
      />

      {/* Gate content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={opening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: opening ? 0.25 : 1.2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 select-none"
      >
        {/* Quiet ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[36rem] h-[36rem] bg-[#D4AF37] rounded-full blur-[190px] pointer-events-none"
        />

        <span
          className="relative text-[10px] sm:text-[11px] font-medium tracking-[0.45em] uppercase text-[#8C6D4F] mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          NAIROBI, KENYA
        </span>

        <h1
          className="relative text-6xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.9] mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
            JAMES MELWISH
          </span>
        </h1>

        <span
          className="relative text-[10px] sm:text-[11px] font-medium tracking-[0.35em] uppercase text-[#C4B29E] mb-12"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          PROMISED. BUILT. PROVEN.
        </span>

        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-flex items-center space-x-3 px-10 py-4 border border-[#8C6D4F] bg-[#120F0C]/80 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[11px] font-medium tracking-[0.3em] uppercase transition-colors duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)] cursor-pointer"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent pointer-events-none" />
          <span>START</span>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xs"
          >
            ●
          </motion.span>
        </motion.button>

        <span
          className="relative mt-8 text-[9px] font-light tracking-[0.3em] uppercase text-[#5c4a38]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          WITH SOUND
        </span>
      </motion.div>
    </div>
  );
};

export default StartGate;
