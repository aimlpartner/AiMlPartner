import React from 'react';
import {
  Stethoscope,
  Scale,
  Calculator,
  Wrench,
  Truck,
  Factory,
  Building2,
  Car,
  HardHat,
  HeartPulse,
  ShieldCheck,
  UtensilsCrossed,
  Dumbbell,
  Landmark,
  ShoppingBag
} from 'lucide-react';

export interface SolutionItem {
  number: string;
  title: string;
  description: string;
  deliverables?: string[];
}

export interface SMBSolution {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  bottleneck: string;
  solutions: SolutionItem[];
  impact: string;
  tools: string[];
}

export const smbSolutions: SMBSolution[] = [
  {
    id: 'medical-clinics',
    name: 'Medical Clinics',
    category: 'Healthcare',
    icon: Stethoscope,
    tagline: 'Patient Intake, 24/7 Scheduling & Chart Automation',
    bottleneck: 'Clinic staff waste 20+ hours weekly on phone tag, insurance intake forms, and manual EHR charting.',
    solutions: [
      {
        number: '01',
        title: '24/7 Voice & Web Patient Receptionist',
        description: 'Deploys conversational Voice AI that answers incoming clinic lines around the clock without put-on-hold delays. The agent handles appointment scheduling, collects initial patient intake details, and seamlessly syncs confirmed slots into your EHR calendar.',
        deliverables: ['Custom EHR Calendar Sync', 'HIPAA-Compliant Call Audio & Logs', 'Multi-Language Patient Support']
      },
      {
        number: '02',
        title: 'Automated Insurance Pre-Verification',
        description: 'Scans patient insurance policy data 48 hours prior to visits and connects with payer clearinghouses in real time. It automatically calculates co-pays, verifies active deductibles, and flags necessary prior-authorizations before the patient steps into the clinic.',
        deliverables: ['Direct Clearinghouse Ingestion', 'Co-Pay Calculation Engine', 'Prior-Auth Requirement Alerts']
      },
      {
        number: '03',
        title: 'Ambient Clinical Note Generator',
        description: 'Securely captures doctor-patient spoken consultations and converts them into structured SOAP notes and billing codes. Clinicians simply review and sign off in seconds, saving hours of manual computer data entry after clinic hours.',
        deliverables: ['Ambient Consultation Transcription', 'Structured SOAP Note Formatting', 'EHR 1-Click Export']
      }
    ],
    impact: '35% fewer no-shows · 2.5 hrs saved per doctor daily',
    tools: ['Epic', 'AthenaHealth', 'Kareo', 'Twilio']
  },
  {
    id: 'law-practices',
    name: 'Law Practices',
    category: 'Professional',
    icon: Scale,
    tagline: 'Instant Client Intake, Contract Extraction & Retainer Signing',
    bottleneck: 'Attorneys lose high-value cases to slow response times and spend non-billable hours reviewing standard contracts.',
    solutions: [
      {
        number: '01',
        title: 'Sub-60s Inbound Intake & Conflict Screening',
        description: 'Engages prospective legal clients immediately through web chat or SMS, asking targeted qualifying questions based on case practice areas. The AI automatically runs conflict-of-interest checks and generates ready-to-sign retainer agreements for viable leads.',
        deliverables: ['Instant SMS & Web Lead Triage', 'Automated Conflict-of-Interest Checks', 'E-Signature Retainer Dispatch']
      },
      {
        number: '02',
        title: 'AI Contract & Discovery Triage',
        description: 'Ingests 100+ page contracts, depositions, and discovery files to surface liability clauses, critical deadline dates, and non-standard terms. Attorneys receive an executive summary and redline comparison in seconds rather than spending billable hours skimming PDFs.',
        deliverables: ['Redline Risk Highlighting', 'Key Clause Extraction & Summaries', 'Statute of Limitations Date Extraction']
      },
      {
        number: '03',
        title: 'Automated Billable Time & Matter Logging',
        description: 'Monitors attorney email communications, client consultations, and file reviews to automatically log billable increments. It links all activity to active matter files in Clio or PracticePanther, preventing unrecorded revenue leakage.',
        deliverables: ['Automatic Activity Time Tracker', 'Matter File Sync in Practice Software', 'Draft Invoicing with Itemized Logs']
      }
    ],
    impact: '4x faster intake · +15 billable hrs unlocked weekly',
    tools: ['Clio', 'PracticePanther', 'DocuSign', 'MyCase']
  },
  {
    id: 'accounting-cpas',
    name: 'Accounting & CPAs',
    category: 'Professional',
    icon: Calculator,
    tagline: 'Automated Receipt Parsing, GL Coding & Tax Document Chasers',
    bottleneck: 'Firms spend endless hours coding bank transactions and chasing clients for missing receipts and tax forms.',
    solutions: [
      {
        number: '01',
        title: 'Optical Receipt, Invoice & 1099 Extraction',
        description: 'Parses messy scanned receipts, multi-page vendor bills, and tax forms using computer vision. Line items, taxes, vendor details, and payment dates are extracted and structured with 99.8% accuracy without manual typing.',
        deliverables: ['OCR Document Parser', '1099, W-2 & Receipt Ingestion', 'Field Normalization & Validation']
      },
      {
        number: '02',
        title: 'Autonomous General Ledger Categorization',
        description: 'Matches live bank feeds against historical chart-of-accounts rules to automatically code routine business expenses. Transactions with high confidence are reconciled instantly, leaving only anomalous edge cases for CPA review.',
        deliverables: ['Rules-Based GL Auto-Coding', 'Bank Feed Auto-Reconciliation', 'Anomaly & Duplicate Detection']
      },
      {
        number: '03',
        title: 'Automated Client Document Chaser',
        description: 'Monitors open client deliverables during tax season and dispatches automated SMS and email reminders with dedicated upload links. As clients upload W-2s and 1099s, the system updates client checklists and notifies the lead accountant.',
        deliverables: ['Automated SMS/Email Follow-Up Cadence', 'Secure Client Upload Portal', 'Real-Time Missing Document Checklists']
      }
    ],
    impact: '70% faster month-end close · Zero manual data entry',
    tools: ['QuickBooks', 'Xero', 'TaxDome', 'Karbon']
  },
  {
    id: 'hvac-field-services',
    name: 'HVAC & Field Services',
    category: 'Field & Trades',
    icon: Wrench,
    tagline: '24/7 Voice Dispatch, Route Clustering & Review Capture',
    bottleneck: 'After-hours emergency calls go to voicemail while technicians waste hours driving crisscrossed service routes.',
    solutions: [
      {
        number: '01',
        title: '24/7 Emergency Voice AI Dispatcher',
        description: 'Answers after-hours heating, cooling, and plumbing emergency calls with a natural human-sounding voice. The agent collects job descriptions, checks on-call technician availability, and books emergency dispatch slots directly into ServiceTitan or Jobber.',
        deliverables: ['Natural Voice AI Inbound Reception', 'On-Call Technician Notification Engine', 'Direct ServiceTitan Dispatch Board Booking']
      },
      {
        number: '02',
        title: 'Dynamic Route & Schedule Clustering',
        description: 'Analyzes daily work orders and clusters technician appointments by geographic radius to minimize travel time between jobs. It updates customer arrival ETAs in real time and cuts daily fuel costs and windshield hours.',
        deliverables: ['Geographic Route Optimization Engine', 'Live Customer ETA SMS Alerts', 'Dynamic Technician Schedule Adjustments']
      },
      {
        number: '03',
        title: 'Instant Field Invoicing & 5-Star Review Flow',
        description: 'Generates digital invoices with parts and labor line items as soon as a technician marks a job complete on mobile. Once payment is processed via Stripe, it automatically texts the homeowner a 1-click Google Review link while satisfaction is high.',
        deliverables: ['Automated Field Invoice Generation', 'Instant Stripe Payment Processing', 'Automated 5-Star Review SMS Trigger']
      }
    ],
    impact: '100% after-hours capture · +22% completed jobs/day',
    tools: ['ServiceTitan', 'Housecall Pro', 'Jobber', 'Stripe']
  },
  {
    id: 'real-estate-brokerages',
    name: 'Real Estate Brokerages',
    category: 'Professional',
    icon: Building2,
    tagline: 'Sub-60s Lead Qualification, Showing Booking & Pipeline AI',
    bottleneck: 'Inbound portal leads go cold within minutes if agents are busy at showings or open houses.',
    solutions: [
      {
        number: '01',
        title: '30-Second AI Lead Qualification Agent',
        description: 'Reaches out to Zillow, Realtor.com, and website leads via SMS within 30 seconds of submission. The conversational AI qualifies purchase budgets, target neighborhoods, pre-approval status, and buying timelines before notifying an agent.',
        deliverables: ['Sub-30s SMS Lead Engagement', 'Budget & Pre-Approval Qualification', 'Lead Routing to Top Agents']
      },
      {
        number: '02',
        title: 'Automated Showing Coordinator',
        description: 'Coordinates buyer availability with seller calendars and MLS lockbox access codes automatically. It handles rescheduling requests, provides driving directions, and sends automated post-showing feedback surveys to buyers.',
        deliverables: ['Lockbox & Calendar Coordination', 'Automated Rescheduling Flows', 'Buyer Feedback Surveys']
      },
      {
        number: '03',
        title: 'Contract-to-Close Pipeline Tracker',
        description: 'Tracks critical escrow milestones including earnest money deposits, home inspections, and loan contingency deadlines. It automatically alerts buyers, sellers, and lenders of upcoming due dates to eliminate closing delays.',
        deliverables: ['Milestone Deadline Tracking', 'Automated Escrow Reminder Alerts', 'Document Collection Workflows']
      }
    ],
    impact: '3x higher lead conversion · 100% instant lead reply',
    tools: ['Follow Up Boss', 'KVCore', 'Dotloop', 'Calendly']
  },
  {
    id: 'logistics-freight',
    name: 'Logistics & Freight',
    category: 'Industrial',
    icon: Truck,
    tagline: 'Autonomous Rate Quoting, BOL Ingestion & Driver Check-Calls',
    bottleneck: 'Brokers drown in repetitive carrier tracking calls and manual data transcription from bills of lading.',
    solutions: [
      {
        number: '01',
        title: 'Instant Email Spot Rate Quoter',
        description: 'Scans inbound shipper and broker freight request emails, extracts lane specifications, and calculates optimal spot rates using market capacity data. It drafts and sends competitive quotes back within minutes to win more loads.',
        deliverables: ['Inbound Email Extraction Parser', 'Dynamic Capacity & Rate Calculator', 'Instant Quote Email Responder']
      },
      {
        number: '02',
        title: 'Automated BOL & Proof of Delivery Extraction',
        description: 'Uses optical AI to ingest signed bills of lading (BOLs), rate confirmations, and delivery receipts directly into your TMS. It eliminates manual document entry and accelerates carrier settlement and customer billing cycles.',
        deliverables: ['Optical BOL & POD Ingestion', 'Direct TMS Database Sync', 'Instant Billing Readiness Alerts']
      },
      {
        number: '03',
        title: 'Autonomous GPS Driver Check-Calls',
        description: 'Monitors telematics and driver GPS locations to provide automatic track-and-trace updates to shippers. It proactively flags traffic, weather, or port delays, saving dispatchers hundreds of manual check-in phone calls daily.',
        deliverables: ['Automated Track-and-Trace Portal', 'Proactive Delay Warning Alerts', 'Driver Telematics Integration']
      }
    ],
    impact: '80% fewer track calls · Instant load dispatch',
    tools: ['McLeod', 'DAT One', 'Truckstop', 'Samsara']
  },
  {
    id: 'auto-dealerships',
    name: 'Auto Dealerships',
    category: 'Consumer',
    icon: Car,
    tagline: 'Live VIN Inventory Sales Concierge, Recall Alerts & Trade-Ins',
    bottleneck: 'Online buyer queries sit unanswered for hours and service lane retention drops off sharply post-warranty.',
    solutions: [
      {
        number: '01',
        title: 'Live VIN Inventory Sales Concierge',
        description: 'Interacts with online car shoppers 24/7, matching their budget and feature preferences against live inventory on the lot. The AI answers trim-specific questions and locks in showroom test drive appointments with your sales team.',
        deliverables: ['Live Lot VIN Inventory Search', 'Interactive Feature Q&A Bot', 'Showroom Test Drive Scheduler']
      },
      {
        number: '02',
        title: 'Predictive Service Lane & Recall Engine',
        description: 'Tracks customer vehicle mileage and OEM factory service schedules to dispatch automated maintenance reminders via SMS. It integrates open recall notices and allows vehicle owners to book service appointments with one tap.',
        deliverables: ['Mileage-Based Service Reminders', 'Automated OEM Recall Lookup', '1-Tap Service Bay Booking']
      },
      {
        number: '03',
        title: 'SMS Trade-In Appraisal Assistant',
        description: 'Guides prospective buyers through texting vehicle photos, mileage, and VIN numbers for instant valuation. The system calculates a preliminary trade-in value and prepares an appraisal packet for the used car manager.',
        deliverables: ['SMS Photo & VIN Ingestion', 'Algorithmic Preliminary Valuation', 'Appraisal Packet Generator']
      }
    ],
    impact: '+40% test drive booking · +$18K monthly service revenue',
    tools: ['CDK Global', 'Reynolds & Reynolds', 'DealerSocket']
  },
  {
    id: 'dental-practices',
    name: 'Dental Practices',
    category: 'Healthcare',
    icon: HeartPulse,
    tagline: 'Insurance Eligibility, Waitlist Chair Fill & Treatment Financing',
    bottleneck: 'Front desk staff spend hours on hold with insurers while cancellations leave hygiene chairs empty.',
    solutions: [
      {
        number: '01',
        title: 'Automated Dental Insurance Verification',
        description: 'Pulls real-time insurance eligibility, remaining annual maximums, and co-insurance percentages 48 hours prior to appointments. Front desk staff receive a clean verification breakdown, eliminating manual payer phone calls.',
        deliverables: ['Automated Coverage Verification', 'Benefit Maximums Calculation', 'Payer Portal Integration']
      },
      {
        number: '02',
        title: 'Smart Cancellation Waitlist Filler',
        description: 'Detects last-minute appointment cancellations in Dentrix or Open Dental and instantly texts matching waitlisted patients. It allows patients to claim the open hygiene chair with a single text reply, keeping chairs 95%+ full.',
        deliverables: ['Instant Cancellation Detection', 'Targeted Waitlist SMS Blast', '1-Click Chair Reservation']
      },
      {
        number: '03',
        title: 'Post-Exam Treatment Financing Assistant',
        description: 'Sends educational procedure overviews and customized monthly payment plan options to patients after doctor consultations. It answers financing questions and automates payment agreement signing to increase treatment acceptance.',
        deliverables: ['Procedure Overview Summaries', 'Custom Payment Plan Builder', 'Digital Agreement E-Signing']
      }
    ],
    impact: '96% chair utilization · 40 staff hrs saved monthly',
    tools: ['Dentrix', 'Eaglesoft', 'Open Dental', 'Twilio']
  },
  {
    id: 'construction-gcs',
    name: 'Construction & GCs',
    category: 'Field & Trades',
    icon: HardHat,
    tagline: 'Blueprint Takeoff AI, Subcontractor Bidding & Voice Daily Logs',
    bottleneck: 'Estimators spend days measuring blueprints manually while change orders and daily job logs slip through the cracks.',
    solutions: [
      {
        number: '01',
        title: 'AI Blueprint Takeoff Estimator',
        description: 'Scans multi-page architectural and structural PDF drawing sets to extract preliminary linear footages, square footages, and fixture counts. It exports clean takeoff data into estimating software, speeding up bid preparation by 3x.',
        deliverables: ['Multi-Page PDF Plan Extraction', 'Linear & Area Measurement Engine', 'Estimating Spreadsheet Export']
      },
      {
        number: '02',
        title: 'Subcontractor Bid Comparison Matrix',
        description: 'Collects trade bids across electrical, plumbing, and framing, normalizing scope inclusions and exclusions side-by-side. It highlights pricing discrepancies and scope gaps, helping estimators choose the most cost-effective subs.',
        deliverables: ['Trade Bid Ingestion & Normalization', 'Scope Gap Highlighting', 'Side-by-Side Comparison Matrix']
      },
      {
        number: '03',
        title: 'Voice-to-Daily Safety & Progress Logs',
        description: 'Allows project superintendents to speak their daily site notes into their phone on the job site. The AI structures the audio into professional daily reports covering weather, trades on site, safety checks, and photos, syncing directly to Procore.',
        deliverables: ['Voice Note Transcription & Formatting', 'OSHA & Safety Check Archival', 'Procore Daily Log Sync']
      }
    ],
    impact: '3x faster estimates · 0 untracked change orders',
    tools: ['Procore', 'Buildertrend', 'PlanSwift', 'Bluebeam']
  },
  {
    id: 'machine-shops-mfg',
    name: 'Machine Shops & Mfg',
    category: 'Industrial',
    icon: Factory,
    tagline: '3D CAD Quoting, Predictive Tooling Alerts & Automated POs',
    bottleneck: 'Complex custom machining quotes take days to compute, and unexpected breakdowns cause costly downtime.',
    solutions: [
      {
        number: '01',
        title: 'Instant 3D CAD/STEP File Quoting Engine',
        description: 'Analyzes uploaded 3D CAD models (STEP, IGES) to calculate machine spindle run-times, raw material stock requirements, and tooling wear. It generates comprehensive manufacturing cost estimates in minutes rather than days.',
        deliverables: ['STEP/CAD Geometry Analysis', 'Spindle Run-Time Estimator', 'Automated Quote Sheet Generation']
      },
      {
        number: '02',
        title: 'Predictive Spindle & Tooling Health Alerts',
        description: 'Monitors real-time telemetry from machine vibration and thermal sensors on the shop floor. The AI detects micro-anomalies in cutter performance, alerting floor managers before costly tool breakage or part scrapping occurs.',
        deliverables: ['Sensor Telemetry Ingestion', 'Anomaly Detection Engine', 'Floor Manager SMS Alerts']
      },
      {
        number: '03',
        title: 'Autonomous Raw Material Purchase Order Trigger',
        description: 'Tracks bar stock, billet, and sheet metal inventory levels against scheduled job queues. When raw stock hits calculated safety reorder levels, the system prepares and dispatches supplier purchase orders automatically.',
        deliverables: ['Live Raw Material Stock Ledger', 'Safety Threshold Forecasting', 'Automated Supplier PO Creation']
      }
    ],
    impact: '60% faster quotes · 18% less unplanned downtime',
    tools: ['JobBOSS²', 'Autodesk Fusion', 'Plex ERP']
  },
  {
    id: 'restaurants-hospitality',
    name: 'Restaurants & Hospitality',
    category: 'Consumer',
    icon: UtensilsCrossed,
    tagline: '24/7 AI Phone Host, Waste Forecasting & Automated Shift Swaps',
    bottleneck: 'Hosts miss phone reservations during peak dinner rushes, and unpredictable covers lead to food waste.',
    solutions: [
      {
        number: '01',
        title: '24/7 AI Phone Host & Reservation Agent',
        description: 'Answers inbound restaurant phone calls with a natural voice during busy dinner rushes. It manages table bookings in OpenTable or Resy, answers menu and dietary questions, and routes large catering leads to management.',
        deliverables: ['Conversational Voice Phone Host', 'OpenTable/Resy Table Booking', 'Dietary & Menu FAQ Handling']
      },
      {
        number: '02',
        title: 'Predictive Kitchen Prep & Food Waste Forecaster',
        description: 'Analyzes historical POS sales data, local weather, and holiday events to forecast expected covers for every shift. It outputs precise daily prep batch quantities for kitchen staff, reducing expensive food spoilage by 12%.',
        deliverables: ['POS Historical Sales Analysis', 'Weather & Holiday Forecasting', 'Daily Kitchen Prep Sheet Generation']
      },
      {
        number: '03',
        title: 'Automated Shift Swap & Callout Bot',
        description: 'Manages employee sick callouts and shift trade requests over SMS without manager intervention. The bot contacts off-duty qualified staff based on availability and labor laws, confirming shift coverage within minutes.',
        deliverables: ['Employee Callout Triage Bot', 'Labor Law & Availability Checks', 'Automated Shift Reassignment SMS']
      }
    ],
    impact: '0 missed phone bookings · 12% reduction in waste',
    tools: ['Toast', '7shifts', 'OpenTable', 'Square']
  },
  {
    id: 'insurance-agencies',
    name: 'Insurance Agencies',
    category: 'Professional',
    icon: ShieldCheck,
    tagline: 'Multi-Carrier ACORD Rater, 24/7 COI Issuance & Renewal Defense',
    bottleneck: 'Slow multi-carrier quoting loses clients while staff waste hours manually generating Certificate of Insurance forms.',
    solutions: [
      {
        number: '01',
        title: 'Multi-Carrier ACORD Commercial Rater',
        description: 'Extracts business property and casualty details from standard ACORD forms and inputs them across multiple carrier portals simultaneously. Agents receive comparative rating breakdowns in minutes rather than retyping data for hours.',
        deliverables: ['ACORD Form Data Extractor', 'Multi-Carrier Portal Auto-Rating', 'Comparative Quote Matrix']
      },
      {
        number: '02',
        title: '24/7 Self-Serve Certificate of Insurance (COI) Generator',
        description: 'Allows commercial policyholders and certificate holders to request and receive verified COIs automatically via web or email. The AI validates active coverage limits and emails signed PDFs in under 2 minutes.',
        deliverables: ['Policy Limit Validation Engine', 'Automated PDF COI Generator', 'Instant Email Certificate Delivery']
      },
      {
        number: '03',
        title: 'Proactive 60-Day Renewal Defense Engine',
        description: 'Monitors upcoming policy expirations and flags premium rate increases greater than 10% well before renewal. It automatically gathers competing carrier quotes, allowing agents to present re-marketed options proactively.',
        deliverables: ['Policy Expiration Monitor', 'Rate Spike Detection Alerts', 'Pre-Packaged Re-Marketed Proposals']
      }
    ],
    impact: '2-min COI delivery · 92% policy retention rate',
    tools: ['Applied Epic', 'AMS360', 'HawkSoft', 'DocuSign']
  },
  {
    id: 'fitness-gym-studios',
    name: 'Fitness & Gym Studios',
    category: 'Consumer',
    icon: Dumbbell,
    tagline: 'Trial-to-Member Conversion, Churn Alerts & Dunning Recovery',
    bottleneck: 'Trial pass leads fail to show up for their first class, and members quietly drop off after 60–90 days without follow-up.',
    solutions: [
      {
        number: '01',
        title: 'First-Class Trial Show-Up Coach',
        description: 'Sends personalized SMS sequences and prep instructions to new trial pass leads between sign-up and their first scheduled class. It answers class FAQs and builds excitement, driving trial class show-up rates by up to 28%.',
        deliverables: ['Automated Trial SMS Cadence', 'Class Prep & FAQ Assistance', 'Post-Class Conversion Nudge']
      },
      {
        number: '02',
        title: '14-Day Absence Churn Prevention Agent',
        description: 'Monitors member check-in frequencies in Mindbody or Glofox and flags members whose attendance drops below their baseline. The AI sends personalized check-in messages and workout recommendations before the member cancels.',
        deliverables: ['Attendance Frequency Monitoring', 'Automated Check-In Recovery SMS', 'Member Re-Engagement Promotions']
      },
      {
        number: '03',
        title: 'Autonomous Dunning & Payment Recovery',
        description: 'Identifies declined membership fees and expired credit cards, sending gentle SMS prompts with secure 1-click update links. It recovers lost recurring revenue without awkward front-desk conversations.',
        deliverables: ['Failed Payment Detection', 'Secure 1-Click Card Update Link', 'Recurring Revenue Recovery Logs']
      }
    ],
    impact: '+28% trial show-up rate · 45% lower member churn',
    tools: ['Mindbody', 'Glofox', 'Mariana Tek', 'Stripe']
  },
  {
    id: 'wealth-advisory',
    name: 'Wealth & Advisory',
    category: 'Professional',
    icon: Landmark,
    tagline: 'Review Slide Builder, Digital KYC & Compliance Audit Indexing',
    bottleneck: 'Advisors spend 4–6 hours preparing each client review meeting and face heavy compliance audit friction.',
    solutions: [
      {
        number: '01',
        title: 'Quarterly Review Slide Deck Generator',
        description: 'Pulls client portfolio performance, asset allocation, and benchmark data directly from custodians like Schwab or Fidelity. The AI formats the numbers into a customized, branded slide presentation in seconds for advisor review.',
        deliverables: ['Custodian Performance Ingestion', 'Branded Client Deck Generator', 'Asset Allocation Summaries']
      },
      {
        number: '02',
        title: 'Digital KYC & Client Onboarding Workflow',
        description: 'Guides high-net-worth clients through intuitive digital risk tolerance surveys and asset transfer requests. It auto-fills required custodian account opening forms and sends them out for e-signature seamlessly.',
        deliverables: ['Digital Risk Questionnaire', 'Custodian Form Pre-Population', 'DocuSign E-Signature Integration']
      },
      {
        number: '03',
        title: 'Compliance Communication & Audit Indexer',
        description: 'Continuously scans advisor emails, client text messages, and meeting notes, automatically indexing communications and flagging regulatory disclosures for compliance officers to maintain 100% audit readiness.',
        deliverables: ['Omnichannel Communication Archiving', 'Regulatory Disclosure Flagging', 'Audit-Ready Compliance Vault']
      }
    ],
    impact: '80% faster review prep · 100% audit-ready compliance',
    tools: ['Wealthbox', 'Redtail', 'Orion', 'Charles Schwab']
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & E-Commerce',
    category: 'Consumer',
    icon: ShoppingBag,
    tagline: '24/7 WISMO Support Bot, Abandoned Cart SMS & Multi-Store Sync',
    bottleneck: 'Support teams are flooded with order inquiries while abandoned checkout carts bleed potential revenue.',
    solutions: [
      {
        number: '01',
        title: '24/7 Autonomous WISMO & Returns Support Agent',
        description: 'Connects directly to Shopify and ShipStation to resolve customer "Where is my order?", exchange, and return inquiries instantly. It issues return labels and processes refunds automatically, freeing up support staff.',
        deliverables: ['24/7 WISMO Status Bot', 'Automated Return Label Dispatch', 'Shopify & ShipStation Integration']
      },
      {
        number: '02',
        title: 'Conversational Cart Recovery & Stock Alert Agent',
        description: 'Engages shoppers who abandon checkout carts with personalized SMS messages answering product questions and offering dynamic incentives. It drives recovered revenue without annoying generic blast emails.',
        deliverables: ['Abandoned Cart SMS Triggers', 'Dynamic Incentive Engine', 'Expiring Stock Scarcity Alerts']
      },
      {
        number: '03',
        title: 'Real-Time Multi-Channel Inventory Synchronizer',
        description: 'Maintains a unified real-time stock ledger across Shopify, Amazon Seller, TikTok Shop, and warehouse 3PLs. It prevents stockouts and overselling by adjusting available inventory across all storefronts within seconds of a sale.',
        deliverables: ['Multi-Store Real-Time Stock Ledger', '3PL Warehouse Sync', 'Oversell & Stockout Prevention']
      }
    ],
    impact: '65% tickets automated · +14% cart recovery lift',
    tools: ['Shopify Plus', 'Gorgias', 'Klaviyo', 'ShipStation']
  }
];
