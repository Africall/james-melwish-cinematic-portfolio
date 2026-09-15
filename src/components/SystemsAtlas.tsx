// src/components/SystemsAtlas.tsx
import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { domains, VERIFIED_ON } from '../data/systems';
import type { SystemEntry } from '../data/systems';

const STATUS_STYLE: Record<SystemEntry['status'], string> = {
  'IN PRODUCTION': 'border-[#D4AF37]/70 text-[#F7E7C4] bg-[#D4AF37]/10',
  'LIVE': 'border-[#D4AF37]/70 text-[#F7E7C4] bg-[#D4AF37]/10',
  'RELAUNCHING OCT 7': 'border-[#C99E5D]/60 text-[#E8D7C5] bg-[#C99E5D]/10',
  'BUILT': 'border-[#8C6D4F]/50 text-[#C4B5A5] bg-transparent',
  'IN BUILD': 'border-[#8C6D4F]/50 text-[#C4B5A5] bg-transparent',
  'PROTOTYPE': 'border-[#8C6D4F]/40 text-[#A8988B] bg-transparent border-dashed',
  'SERVICE': 'border-[#8C6D4F]/50 text-[#C4B5A5] bg-transparent',
};

const ShieldIcon = () => (
  <svg width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden="true">
    <path d="M5.5 0.8L10 2.6v3.2c0 2.8-1.9 4.9-4.5 5.6C2.9 10.7 1 8.6 1 5.8V2.6L5.5 0.8z" stroke="currentColor" strokeWidth="1" />
    <path d="M3.4 6l1.5 1.5L7.8 4.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <circle cx="5" cy="5" r="4.4" stroke="currentColor" strokeWidth="0.9" />
    <path d="M3 5.1l1.4 1.4L7 3.8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SystemCard: React.FC<{ s: SystemEntry; i: number }> = ({ s, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.7, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex flex-col rounded-sm border border-[#8C6D4F]/35 bg-[#0E0C0A]/90 p-5 sm:p-6 overflow-hidden group hover:border-[#D4AF37]/70 transition-colors duration-500"
  >
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/50" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/50" />

    <div className="flex flex-wrap items-center gap-2 mb-3">
      <span className={`text-[8.5px] font-mono tracking-[0.2em] px-2 py-0.5 border rounded-sm ${STATUS_STYLE[s.status]}`}>
        {s.status}
      </span>
      {s.flagship && (
        <a
          href="#work"
          className="text-[8.5px] font-mono tracking-[0.2em] px-2 py-0.5 border border-[#D4AF37] text-[#D4AF37] rounded-sm hover:bg-[#D4AF37] hover:text-black transition-colors"
        >
          FLAGSHIP ↑
        </a>
      )}
    </div>

    <h4
      className="text-2xl sm:text-[1.7rem] leading-none tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors mb-2"
      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
    >
      {s.name}
    </h4>
    <p className="text-[12.5px] font-light text-[#B3A497] leading-relaxed mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {s.line}
    </p>

    <div className="flex flex-wrap gap-1.5 mb-4">
      {s.modules.map((m) => (
        <span
          key={m}
          className="px-2.5 py-1 text-[9px] font-medium tracking-[0.12em] uppercase rounded-sm border border-[#8C6D4F]/35 bg-[#16120E] text-[#E8D7C5]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {m}
        </span>
      ))}
    </div>

    {s.access.length > 0 && (
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-[8.5px] font-mono tracking-[0.25em] text-[#D4AF37] mb-2">
          <ShieldIcon /> ACCESS &amp; SECURITY
        </div>
        <ul className="space-y-1">
          {s.access.map((a) => (
            <li key={a} className="flex items-start gap-2 text-[11px] text-[#C4B5A5] leading-snug" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <span className="mt-[5px] w-1 h-1 rounded-full bg-[#D4AF37]/80 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    )}

    <div className="mt-auto pt-3 border-t border-[#8C6D4F]/20 flex flex-wrap items-center justify-between gap-2">
      <span className="text-[9px] font-mono text-[#8C6D4F] tracking-wide">{s.stack}</span>
      {s.verified ? (
        <span className="flex items-center gap-1 text-[8.5px] font-mono tracking-[0.18em] text-[#D4AF37]">
          <CheckIcon /> SOURCE VERIFIED
        </span>
      ) : (
        <span className="text-[8.5px] font-mono tracking-[0.18em] text-[#8C6D4F]">DELIVERED AS A SERVICE</span>
      )}
    </div>
  </motion.article>
);

export const SystemsAtlas: React.FC = () => {
  const [active, setActive] = useState(domains[0].key);
  const domain = domains.find((d) => d.key === active) ?? domains[0];

  const stats = useMemo(() => {
    const all = domains.flatMap((d) => d.systems);
    const unique = new Map(all.map((s) => [s.name, s]));
    const list = [...unique.values()];
    return [
      { value: String(list.length), label: 'Systems built' },
      { value: String(domains.length), label: 'Domains' },
      { value: String(list.filter((s) => s.verified).length), label: 'Verified from source' },
      { value: String(list.filter((s) => s.access.length > 0).length), label: 'With access control' },
    ];
  }, []);

  return (
    <section
      id="systems"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[34rem] h-[34rem] bg-[#D4AF37]/[0.05] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            04 / THE SYSTEMS
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10"
        >
          <h2
            className="lg:col-span-7 text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight uppercase leading-[0.86] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
              FROM HRM TO HYPERLOCAL.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
              FROM PBX TO AI.
            </span>
          </h2>
          <p className="lg:col-span-5 text-[13px] sm:text-sm font-light text-[#A8988B] leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Systems that work, across every layer a business runs on. Pick a domain to see what was built, what it
            does, and how it decides who gets in.
          </p>
        </motion.div>

        {/* Verification banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mb-8 rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/[0.04] px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
        >
          <span className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] shrink-0">
            <ShieldIcon /> SOURCE VERIFIED · {VERIFIED_ON}
          </span>
          <p className="text-[12px] font-light text-[#C4B5A5] leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Every card is checked against its codebase: the modules it ships, the integrations it runs, and the
            access controls that keep each user in their lane. Nothing here is a mock-up.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((st) => (
            <div key={st.label} className="border-l border-[#8C6D4F]/40 pl-4">
              <span className="block text-4xl text-[#F4EBE2] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {st.value}
              </span>
              <span className="block mt-1 text-[9.5px] font-medium tracking-[0.2em] uppercase text-[#A8988B]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {st.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Domain selector: chip rail on mobile, index list on desktop */}
          <div className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="System domains"
              data-lenis-prevent
              className="no-scrollbar flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible snap-x -mx-6 px-6 sm:mx-0 sm:px-0 pb-1 lg:sticky lg:top-24"
            >
              {domains.map((d) => {
                const on = d.key === active;
                return (
                  <button
                    key={d.key}
                    role="tab"
                    aria-selected={on}
                    aria-controls="systems-panel"
                    onClick={() => setActive(d.key)}
                    className={`relative snap-start shrink-0 text-left rounded-sm border px-4 py-3 lg:py-4 transition-colors duration-300 ${
                      on ? 'border-[#D4AF37] bg-[#16120E]' : 'border-[#8C6D4F]/30 bg-[#0B0907] hover:border-[#8C6D4F]/70'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="domain-rail"
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F7E7C4] via-[#D4AF37] to-[#8C6D4F] hidden lg:block"
                      />
                    )}
                    <span className="flex items-baseline gap-3">
                      <span className={`text-[10px] font-mono ${on ? 'text-[#D4AF37]' : 'text-[#8C6D4F]'}`}>{d.index}</span>
                      <span
                        className={`text-lg lg:text-xl leading-none tracking-wide whitespace-nowrap ${on ? 'text-[#F7E7C4]' : 'text-[#C4B5A5]'}`}
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {d.title}
                      </span>
                      <span className="text-[9px] font-mono text-[#8C6D4F] ml-auto pl-2">{d.systems.length}</span>
                    </span>
                    <span className="hidden lg:block mt-1.5 text-[10.5px] text-[#8C6D4F] leading-snug" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {d.systems.map((s) => s.name).join(' · ')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active domain */}
          <div className="lg:col-span-8" id="systems-panel" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={domain.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-5">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37]">{domain.index} / {domain.title}</span>
                  <p className="mt-2 text-[15px] sm:text-lg text-[#E8D7C5] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {domain.thesis}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {domain.systems.map((s, i) => (
                    <SystemCard key={s.name} s={s} i={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsAtlas;
