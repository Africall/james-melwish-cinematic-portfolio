// src/data/systems.ts
// Every entry here was checked against the system's own source code.
// Keep claims to what the code proves; mark anything delivered without a codebase as a service.

export interface SystemEntry {
  name: string;
  line: string;
  modules: string[];
  access: string[];
  stack: string;
  status: 'IN PRODUCTION' | 'LIVE' | 'RELAUNCHING OCT 7' | 'BUILT' | 'IN BUILD' | 'PROTOTYPE' | 'SERVICE';
  verified: boolean;
  flagship?: boolean;
}

export interface Domain {
  key: string;
  index: string;
  title: string;
  thesis: string;
  systems: SystemEntry[];
}

export const VERIFIED_ON = '15 SEP 2026';

export const domains: Domain[] = [
  {
    key: 'ai',
    index: '01',
    title: 'AI & AUTOMATION',
    thesis: 'AI where it earns its keep, and automation everywhere else: models that see, read and advise, and schedules that run the business while people sleep.',
    systems: [
      {
        name: 'Macho',
        line: 'Edge computer vision that proves a car was actually washed, not just parked, then reconciles every wash against M-Pesa to expose leakage.',
        modules: ['YOLOv8 & ByteTrack Detection', 'Bay Zones & Dwell State Machine', 'Three-Condition Wash Proof', 'SHA-256 Evidence Snapshots', 'M-Pesa Reconciliation', 'Leakage & Anomaly Alerts'],
        access: [
          'Evidence kept in tenant-scoped private storage, read-only to dashboards',
          'M-Pesa callbacks accepted only with a per-till token',
          'Each payment stored exactly once per M-Pesa receipt',
        ],
        stack: 'Python · YOLOv8 · OpenCV · Supabase · 83 automated tests',
        status: 'IN BUILD',
        verified: true,
      },
      {
        name: 'Estate AI Concierge',
        line: 'Claude with tool calling for an estate: an admin copilot that answers from live KPIs, ticket triage suggestions, and a resident concierge that reads invoices, visitors and meters.',
        modules: ['Claude Tool Calling', 'Admin KPI Copilot', 'Ticket Triage Suggestions', 'Resident Concierge'],
        access: [
          'Every tool reads resident data through row-level security, never around it',
          'Its only write is raising a ticket: payments are proposed, never executed',
        ],
        stack: 'Anthropic Messages API · Supabase · TanStack Start',
        status: 'PROTOTYPE',
        verified: true,
      },
      {
        name: 'Staffika Vision & Check-In',
        line: 'The AI layer inside Staffika: a vision model reads screenshots into structured data, and staff check in by face with a liveness test.',
        modules: ['GPT-4o-mini Screenshot Reader', 'Face Match Check-In', 'Liveness Detection', 'YOLOv8 Livestock Counting (Early)'],
        access: ['Check-ins confirmed by face match and liveness before they count'],
        stack: 'OpenAI Vision · face-api.js · YOLOv8 · Supabase',
        status: 'RELAUNCHING OCT 7',
        verified: true,
      },
      {
        name: 'AI Business Analyst',
        line: 'A streaming AI analyst on a company site: it scores eight services against a visitor\'s needs and drafts a proposal ready to send on WhatsApp, logged for follow-up.',
        modules: ['Streaming Chat', 'Needs Scoring Across 8 Services', 'Proposal Drafting', 'WhatsApp Hand-Off', 'Proposal Logging'],
        access: [],
        stack: 'React · Supabase Edge Functions · Gemini 3 Flash',
        status: 'BUILT',
        verified: true,
      },
      {
        name: 'Self-Auditing Operations Probe',
        line: 'An hourly self-audit built into Where: 27 automated checks hunt for security gaps and money errors, open findings, and close them when the fault clears.',
        modules: ['27 Hourly Checks', 'Row-Level Security Gap Detection', 'Wallet & Escrow Integrity', 'Stuck Payout Detection', 'Self-Resolving Findings'],
        access: ['Findings endpoint gated by hashed tokens', 'Personal data screened out before findings are stored'],
        stack: 'Postgres · pg_cron · Supabase Edge Functions',
        status: 'BUILT',
        verified: true,
      },
    ],
  },
  {
    key: 'hrm',
    index: '02',
    title: 'HRM & ERP',
    thesis: 'People, payroll and paperwork: the operating systems businesses run their teams on, tuned to Kenyan statutory rules.',
    systems: [
      {
        name: 'Staffika',
        line: 'A multi-tenant super ERP: HR and Kenyan payroll, attendance, field teams, procurement, invoicing and an ISP module, each switched on per company.',
        modules: ['HR, Leave & Appraisals', 'Payroll: PAYE, NSSF, SHIF, Housing Levy', 'Face & Device Attendance', 'Field Teams: GPS, Geofences, SOS', 'Procurement & 3-Way Matching', 'Invoicing & Public API'],
        access: [
          'Every table with an organisation locked to it by row-level security',
          'Role defaults plus per-user permission overrides',
          'SMS one-time code before payroll is finalised or network gear is controlled',
          'API keys stored as SHA-256 hashes, scoped and capped at 60 requests a minute',
          'Organisation audit log written by database triggers',
        ],
        stack: 'React · Supabase · 114 edge functions · 357 migrations',
        status: 'RELAUNCHING OCT 7',
        verified: true,
        flagship: true,
      },
      {
        name: 'Talent Management ERP',
        line: 'An ERP for a recruitment consultancy: hiring pipeline, background checks, immigration cases and client compliance, with portals for clients and candidates.',
        modules: ['Hiring Pipeline & Offers', 'CVs Pulled from Email & OCR', 'Background Checks', 'Immigration Permits & Visas', 'Client KYC, KYB & NDAs', 'AI Assistant with Role-Gated Tools'],
        access: [
          'Eight roles, from super admin to candidate, enforced by row-level security',
          'Clients and candidates routed to their own portals',
          'hCaptcha, server-side password rules and rate-limited sign-in',
          'Disabling a user strips every role at once',
        ],
        stack: 'React · Supabase · Paperless-ngx · Gemini · 6 scheduled jobs',
        status: 'BUILT',
        verified: true,
      },
      {
        name: 'Distribution ERP',
        line: 'A company ERP for a lighting distributor: sales, warehouse, payslips with KPI bonuses and commissions, and field technicians checking in with GPS and a selfie.',
        modules: ['Sales & Orders', 'Warehouse, Defects & Returns', 'KPI Scoring & Commissions', 'Payslips with Bonuses', 'GPS & Selfie Check-In', 'Customer Portal & Tracking'],
        access: [
          'Nine roles, from sales to management',
          'Payments, payslips and location data readable only by the roles that need them',
          'Payment audit log',
        ],
        stack: 'React · Supabase · OpenStreetMap',
        status: 'BUILT',
        verified: true,
      },
    ],
  },
  {
    key: 'hyperlocal',
    index: '03',
    title: 'HYPERLOCAL',
    thesis: 'The neighbourhood as a platform: the shop downstairs, the rider on the block, and the people on your street.',
    systems: [
      {
        name: 'MtaaLoop',
        line: 'A multi-vendor neighbourhood marketplace with its own vendor, rider and estate portals, from first order to rider payout.',
        modules: ['Multi-Vendor Orders', 'Vendor, Rider & Estate Approvals', 'Rider Wallet & Payouts', 'Delivery Status Tracking', 'Order Reviews', 'Paystack Payments'],
        access: [
          'Five roles: customer, vendor, estate manager, rider, admin',
          '158 row-level security policies on the data layer',
          'Payment webhooks verified by signature before an order moves',
        ],
        stack: 'React · Supabase · Paystack',
        status: 'RELAUNCHING OCT 7',
        verified: true,
      },
      {
        name: 'Where',
        line: 'Meet the people on your street: random video chats, group rooms, live streams, savings circles and paid local tasks for an estate.',
        modules: ['Random 1:1 Video Matching', 'Group Rooms & Live Streams', 'Chama-Style Savings Circles', 'Task Escrow & M-Pesa Payouts', 'Moderation Queue & Karma', 'Residency Location Check'],
        access: [
          'Google sign-in, email one-time code or password',
          'Under-18 and banned users blocked from matching',
          'Rate limits on matching, messages and reports',
          'Residency checked against the phone location, within 250 metres of the estate',
        ],
        stack: 'React · Supabase · WebRTC · LiveKit · MegaPay',
        status: 'RELAUNCHING OCT 7',
        verified: true,
      },
    ],
  },
  {
    key: 'pbx',
    index: '04',
    title: 'PBX & CONTACT CENTRE',
    thesis: 'Telephony built, not resold: the switch, the dialer, the floor rules and the CRM behind every call.',
    systems: [
      {
        name: 'SpansCall PBX & Systems',
        line: 'The console for a multi-tenant FreeSWITCH phone system. It writes the switch configuration from the database and controls live calls over ESL.',
        modules: ['Extensions & Live Registration', 'IVR, Queues & Ring Groups', 'Live Switchboard', 'Progressive Dialer', 'Call Records & Recordings', 'CRM, Tickets & Do-Not-Call'],
        access: [
          'Password login, bcrypt hashed, 12-hour sessions',
          '10 roles mapped to 41 permissions',
          'Every query scoped to its company, backed by row-level security',
          'SIP secrets stored only as A1 hashes',
          'Audit trigger on 14 tables records who changed what',
        ],
        stack: 'NestJS · Next.js · Postgres · FreeSWITCH ESL · Socket.IO',
        status: 'BUILT',
        verified: true,
        flagship: true,
      },
      {
        name: 'SpansCall Center Ops',
        line: 'The operating system for a collections contact centre, with the compliance rules enforced inside the database instead of left to agents.',
        modules: ['Pre-Dial Compliance Check', 'Client Onboarding Gates', 'Training & Certification', 'Rate-Card Quoting', 'Promise-to-Pay Ledger', '117-Point Readiness Tracker'],
        access: [
          'Every dial checked and logged: suppressions, calling window, 7-in-7 attempt cap, vulnerability flags',
          '10 staff roles, from agent to data protection officer',
          'Row-level security through role helper functions',
          'Debt placements blocked by trigger until the data processing agreement is signed',
        ],
        stack: 'Next.js 14 · Supabase · Postgres triggers',
        status: 'BUILT',
        verified: true,
      },
      {
        name: 'Africall Connect',
        line: 'An Asterisk 20 call-control backend with a browser softphone and campaign dialing. The first pass at owning the phone system.',
        modules: ['Asterisk Call Control', 'Campaign Dialer', 'Browser Softphone'],
        access: ['bcrypt passwords with 8-hour sessions', 'Four tenant roles: super admin, tenant admin, supervisor, agent'],
        stack: 'Fastify · Asterisk 20 · WebRTC · Redis',
        status: 'PROTOTYPE',
        verified: true,
      },
    ],
  },
  {
    key: 'estates',
    index: '05',
    title: 'ESTATES & SECURITY',
    thesis: 'The gate is where software meets the physical world: cameras, face terminals, barriers and guards, all answering to one set of rules.',
    systems: [
      {
        name: 'HodiMtaa',
        line: 'Visitor management and access control for gated communities, wired into Hikvision cameras and face terminals. Faces and passes synced to a terminal keep admitting people when the internet drops.',
        modules: ['QR & PIN Visitor Passes', 'Number Plate Recognition', 'Face Terminal Enrolment', 'Deliveries, Incidents & Panic', 'Zoho & Dynamics CRM Sync', 'In-App Voice Calls'],
        access: [
          'Row-level security across an organisation, estate and property hierarchy',
          '11 roles, from platform admin to household member',
          'Passwordless sign-in by SMS or email one-time code',
          'Append-only audit trail with field-level history',
          'Penetration-test findings fixed and tracked across 30 security migrations',
        ],
        stack: 'TanStack Start · Supabase · Hikvision ISAPI · WebRTC · 27 scheduled jobs',
        status: 'IN PRODUCTION',
        verified: true,
        flagship: true,
      },
      {
        name: 'HodiMtaa Event Bus',
        line: 'The gate event pipeline: every entry, exit and alarm published over MQTT and written into the database exactly once.',
        modules: ['MQTT QoS 1', 'Persistent Sessions', 'Idempotent Event Writes', 'Gate Online & Offline Status'],
        access: ['TLS at the edge through Caddy', 'Per-site access lists on the broker'],
        stack: 'Mosquitto · Node bridge · Supabase · Docker',
        status: 'IN BUILD',
        verified: true,
      },
      {
        name: 'LANGO Estate OS',
        line: 'An estate operating system prototype, from visitors and parking fees to utility meters, weighted governance votes and an AI concierge.',
        modules: ['Parking Tariffs & Fees', 'Tiered Utility Meters', 'Weighted Governance Votes', 'Helpdesk with SLAs', 'Ledger & Invoices', 'Edge Access Node'],
        access: [
          'Password or phone one-time code through an SMS auth hook',
          'Four roles: super admin, estate admin, guard, resident',
          'Row-level security scoped to each estate',
          'Each governance vote chained to the one before it by hash',
        ],
        stack: 'TanStack Start · Supabase · Anthropic API · Hikvision edge',
        status: 'PROTOTYPE',
        verified: true,
      },
    ],
  },
  {
    key: 'commerce',
    index: '06',
    title: 'COMMERCE & PAYMENTS',
    thesis: 'Where the money moves: tills, floats and payouts, reconciled down to the receipt.',
    systems: [
      {
        name: 'Merx',
        line: 'A multi-organisation point of sale with inventory, shift cash and an M-Pesa till built in: scan, sell, reconcile, pay out.',
        modules: ['Cashier POS with STK Checkout', 'Camera & USB Barcode Scanning', 'Stock Take, GRN & Reconciliation', 'Expiry & Reorder Alerts', 'Shift Floats & Cash Reports', 'Shareholder Profit Statements'],
        access: [
          'Organisation-scoped row-level security, hardened August 2026',
          'Role permissions with per-user overrides',
          'M-Pesa callbacks verified by HMAC signature',
          'Payouts admin-only, with per-transaction and daily caps and idempotency keys',
        ],
        stack: 'React · Supabase · Kopo Kopo API · react-zxing',
        status: 'RELAUNCHING OCT 7',
        verified: true,
      },
      {
        name: 'Oshavaa Laundry System',
        line: 'Laundromat operations built as multi-organisation SaaS: every order tracked across the wash floor, plus machines, water and power costs, float and loyalty.',
        modules: ['Orders Tracked by Wash Station', 'Machines, Water & Power', 'M-Pesa Float & Payments', 'Receivables & Overdue', 'Loyalty Points & Tiers', 'Public Order Tracking'],
        access: [
          'Sign in by email or by organisation link',
          'Row-level security through organisation membership checks',
          'Accountants limited by dedicated restrictive policies',
          'Public tracking hides personal details from non-members',
        ],
        stack: 'React · Supabase · MegaPay · PWA',
        status: 'BUILT',
        verified: true,
      },
    ],
  },
  {
    key: 'isp',
    index: '07',
    title: 'ISP & CONNECTIVITY',
    thesis: 'Four years inside an internet provider, turned into billing, hotspots and fiber control that run without a human in the loop.',
    systems: [
      {
        name: 'PPPoE Billing Stack',
        line: 'Complete billing for PPPoE internet: accounts synced into FreeRADIUS, lapsed customers cut off automatically, M-Pesa payments reconnect them.',
        modules: ['FreeRADIUS Account Sync', 'Auto Suspend & Disconnect', 'M-Pesa STK & Paybill', 'Usage Reports', 'SMS Renewal Reminders'],
        access: [
          'Customer login by SMS one-time code: hashed, 5-minute expiry, 5 attempts',
          'Staff passwords hashed and CSRF protected',
          'M-Pesa callbacks applied exactly once, accepted only from Safaricom IPs',
        ],
        stack: 'PHP · FreeRADIUS · MariaDB · MikroTik or accel-ppp · Docker',
        status: 'BUILT',
        verified: true,
      },
      {
        name: 'Staffika ISP Module',
        line: 'The internet-provider layer inside Staffika: hotspot vouchers sold over M-Pesa, a scheduled billing run, tax signing and remote fiber router control.',
        modules: ['Hotspot Voucher Sales', 'Scheduled Billing Run', 'KRA eTIMS Signing', 'Remote ONU Reboot', 'WhatsApp Cloud API'],
        access: [
          'Voucher purchases rate-limited by IP and phone number',
          'Vouchers minted by database trigger only after payment clears',
          'OLT credentials held in the Supabase vault behind a hardened proxy',
          'Router controls limited to the signed-in customer',
        ],
        stack: 'Supabase Edge Functions · M-Pesa · SmartOLT API · KRA eTIMS',
        status: 'BUILT',
        verified: true,
      },
      {
        name: 'Fiber Customer App',
        line: 'A self-service app for a fiber provider: check coverage on a map, pay by M-Pesa, manage your router and reconnect without calling support.',
        modules: ['Coverage Map Check', 'M-Pesa Payments', 'Device Manager', 'Self Reconnect', 'Auto-Disable on Expiry', 'Installable App'],
        access: ['Email and password login', 'Expired subscriptions disabled at the fiber terminal automatically'],
        stack: 'React · Supabase · Mapbox · SmartOLT · PWA',
        status: 'BUILT',
        verified: true,
      },
    ],
  },
];
