// src/components/CinematicLayer.tsx
// Global overlays that sit above every section: film grain, vignette, scroll progress.
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const GRAIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.55"/></svg>';

export const CinematicLayer: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <>
      {/* Gold scroll-progress hairline */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-[#8C6D4F] via-[#D4AF37] to-[#F7E7C4] shadow-[0_0_8px_rgba(212,175,55,0.6)] pointer-events-none"
      />

      {/* Cinematic vignette - darker frame edges */}
      <div
        className="fixed inset-0 z-[44] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.28) 82%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Animated film grain */}
      <div
        className="grain fixed -inset-[5%] z-[45] pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")` }}
      />
    </>
  );
};

export default CinematicLayer;
