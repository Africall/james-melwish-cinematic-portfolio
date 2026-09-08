import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  tech: string[];
  metrics: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    number: '01',
    title: 'SpansCall Platform',
    category: 'SPANS FLAGSHIP / CALL CENTRE SERVICES',
    description:
      'SpansCall is the service, not just the software: outsourced call-centre operations with trained and certified agents, compliance-gated campaigns, QA and daily KPIs. The discipline comes from running a BPO end of line. Underneath it sits an advantage nobody reselling a dialer can offer, a multi-tenant FreeSWITCH platform built in-house with WhatsApp automation beside the voice channel. I sell the engagement, train the floor, and engineer the stack it runs on.',
    role: 'Business Development Manager, Product Manager and lead engineer.',
    tech: [
      'Call-Centre Services',
      'Agent Training & Certification',
      'Compliance Gates',
      'QA & KPIs',
      'FreeSWITCH',
      'WhatsApp Automation',
    ],
    metrics: [
      { label: 'MODEL', value: 'Services + own platform' },
      { label: 'FLOOR', value: 'Trained, certified agents' },
      { label: 'CORE', value: 'FreeSWITCH, built in-house' },
    ],
  },
  {
    number: '02',
    title: 'HodiMtaa',
    category: 'SPANS PRODUCT / VISITOR MANAGEMENT',
    description:
      'The paper visitor book is two problems wearing one coat: a security hole, and under the Data Protection Act 2019, a compliance exposure. HodiMtaa replaces it with visitor passes by QR and PIN, number plate recognition at the gate, face recognition on turnstiles, deliveries, incident logs and reporting. Multitenant and white labelled. The constraint that mattered most: it keeps admitting people when the internet drops. Faces and codes still work offline, and events buffer until the link returns.',
    role: 'Product direction, engineering, and the entire commercial motion including pricing and channel strategy.',
    tech: [
      'Multitenant SaaS',
      'QR + PIN Passes',
      'ANPR',
      'Face Recognition',
      'Offline Buffering',
      'White Label',
    ],
    metrics: [
      { label: 'STATUS', value: 'Live, residents at the gate' },
      { label: 'OFFLINE', value: 'Gate keeps admitting' },
      { label: 'COMPLIANCE', value: 'Data Protection Act 2019' },
    ],
  },
  {
    number: '03',
    title: 'Staffika',
    category: 'SUPER ERP / YOUR WORK. YOUR PEOPLE.',
    description:
      'Not a point of sale. The system above it. Staffika is a modular super ERP for Kenyan SMEs: your work and your people on one platform. HR, payroll, attendance, CRM, field workforce, invoicing and reporting, running live across multiple tenants. And because shipping is the beginning, not the end, scheduled integrity audits run against production. Most teams find their data problems when a customer does; this one finds them first.',
    role: 'Architecture, engineering, and the ongoing audit discipline.',
    tech: [
      'HR & Payroll',
      'Attendance',
      'CRM',
      'Field Workforce',
      'Reporting',
      'Multitenant',
      'Postgres',
    ],
    metrics: [
      { label: 'SCOPE', value: 'One platform, whole business' },
      { label: 'TENANTS', value: 'Live, multiple' },
      { label: 'AUDIT', value: 'Scheduled, on production' },
    ],
  },
  {
    number: '04',
    title: 'ERPNext + KRA eTIMS',
    category: 'SPANS SERVICE / TAX COMPLIANCE',
    description:
      'Kenyan businesses need invoices signed by KRA. Connections fail. The architecture accounts for that: an ERPNext instance, a Redis queue buffering invoices while offline, and middleware carrying them through to the KRA virtual control unit when the link is back. Sold as a fixed price implementation service rather than an open ended project.',
    role: 'Solution architecture and commercial packaging.',
    tech: [
      'ERPNext',
      'Redis Queue',
      'KRA eTIMS',
      'Middleware',
      'Fixed-Price Packaging',
    ],
    metrics: [
      { label: 'SIGNING', value: 'KRA virtual control unit' },
      { label: 'RESILIENCE', value: 'Invoices buffer offline' },
      { label: 'COMMERCIAL', value: 'Fixed price service' },
    ],
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-32 px-6 sm:px-12 lg:px-20"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

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
            03 / SELECTED WORK
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              THE SPANS LINE.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              LIVE IN PRODUCTION.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Four systems from Spans Ventures. Sold, shaped and engineered by the same hands. Each card opens with the result: real residents at real gates, real transactions through real tills.
          </p>
        </motion.div>

        {/* Stacking Deck */}
        <ScrollStack
          itemDistance={20}
          itemScale={0.035}
          itemStackDistance={28}
          stackPosition="15%"
          scaleEndPosition="6%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]">

                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                {/* Corner Minimal L-Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

                {/* Big Background Watermark Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.number}
                </span>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

                  {/* Left Column (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {project.number} //
                        </span>
                        <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm md:text-[14px] font-light text-[#BDB0A4] leading-[1.85] tracking-wide mb-8 max-w-2xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-[#8C6D4F]/25">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
                    <div className="space-y-3">
                      <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2">
                        // THE FACTS
                      </span>
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between gap-4"
                        >
                          <span className="text-[10px] font-mono text-[#A8988B] shrink-0">
                            {m.label}
                          </span>
                          <span className="text-[11px] font-mono font-medium text-[#F7E7C4] text-right">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Role Panel */}
                    <div className="p-4 rounded-sm border border-[#8C6D4F]/40 bg-[#16120E]">
                      <span className="block text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] mb-2">
                        // ROLE
                      </span>
                      <p
                        className="text-[11.5px] font-light text-[#D5CBC0] leading-relaxed"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.role}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
};

export default ProjectsSection;
