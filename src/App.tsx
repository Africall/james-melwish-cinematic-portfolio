import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { StartGate } from './components/StartGate';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SystemsAtlas } from './components/SystemsAtlas';
import { ApproachSection } from './components/ApproachSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { CinematicLayer } from './components/CinematicLayer';

function App() {
  const [started, setStarted] = useState(false);
  const [gateDone, setGateDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Buttery inertial scrolling - the backbone of the cinematic feel.
  // Held stopped while the Start gate is up.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: true,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.stop();
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenisRef.current = null;
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    lenisRef.current?.start();
  };

  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black">
      <CinematicLayer />
      {!gateDone && <StartGate onStart={handleStart} onDone={() => setGateDone(true)} />}
      <HeroSection started={started} />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <SystemsAtlas />
      <ApproachSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}

export default App;
