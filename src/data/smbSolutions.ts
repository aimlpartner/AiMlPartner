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
    tagline: 'Your phones get answered. Your charts get done. Your insurance gets verified.',
    bottleneck: 'Your front desk can\'t keep up with phone calls, doctors stay late doing paperwork, and insurance checks eat up hours every day.',
    solutions: [
      {
        number: '01',
        title: 'Never Miss a Patient Call Again',
        description: 'We set up an AI phone assistant that answers your clinic\'s phone 24/7 — nights, weekends, lunch breaks. It talks to patients naturally, books their appointments, and puts everything right into your calendar. No more missed calls, no more voicemails piling up.',
        deliverables: ['Works with your existing phone number', 'Books directly into your calendar', 'Speaks multiple languages']
      },
      {
        number: '02',
        title: 'Insurance Checked Before They Walk In',
        description: 'Two days before every appointment, our system automatically checks the patient\'s insurance — what\'s covered, what their co-pay is, and if anything needs pre-approval. Your front desk gets a simple report instead of spending 20 minutes on hold with the insurance company.',
        deliverables: ['Checks coverage automatically', 'Calculates co-pays for you', 'Flags anything that needs pre-approval']
      },
      {
        number: '03',
        title: 'Doctor\'s Notes Written Automatically',
        description: 'The doctor talks to the patient like normal. Our system listens and writes up the visit notes automatically — formatted, organized, and ready to sign. No more staying late at night typing up charts. Just review, sign, and go home.',
        deliverables: ['Listens during the visit and writes notes', 'Formatted and ready to sign', 'Goes straight into your medical records system']
      }
    ],
    impact: '35% fewer no-shows · Doctors save 2.5 hours every day',
    tools: ['Epic', 'AthenaHealth', 'Kareo', 'Twilio']
  },
  {
    id: 'law-practices',
    name: 'Law Practices',
    category: 'Professional',
    icon: Scale,
    tagline: 'New clients get a response in under a minute. Contracts get reviewed in seconds.',
    bottleneck: 'By the time you call a new lead back, they\'ve already hired someone else. And reviewing contracts eats up hours you could be billing.',
    solutions: [
      {
        number: '01',
        title: 'Respond to New Leads in Under 60 Seconds',
        description: 'When someone fills out your website form or sends a message, our system texts them back instantly — asks the right questions, checks for conflicts, and sends them a retainer agreement to sign. All before you even pick up the phone. No more losing clients to slow follow-up.',
        deliverables: ['Instant text and email response', 'Asks qualifying questions automatically', 'Sends retainer for e-signature']
      },
      {
        number: '02',
        title: 'Contracts Reviewed in Minutes, Not Hours',
        description: 'Upload any contract — 10 pages or 200 pages — and get a plain-English summary of the important stuff: risks, key dates, unusual terms. It highlights what you need to look at so you can skip the parts that don\'t matter. What used to take half a day now takes a few minutes.',
        deliverables: ['Summarizes contracts in plain English', 'Highlights risks and key dates', 'Works with any document format']
      },
      {
        number: '03',
        title: 'Your Billable Hours Get Tracked Automatically',
        description: 'Every email you send, every call you take, every document you review — it all gets logged automatically with the right client file. No more forgetting to track time. No more lost revenue from hours you worked but never billed.',
        deliverables: ['Tracks your time automatically', 'Links everything to the right case', 'Creates draft invoices for you']
      }
    ],
    impact: '4x faster client intake · 15 more billable hours every week',
    tools: ['Clio', 'PracticePanther', 'DocuSign', 'MyCase']
  },
  {
    id: 'accounting-cpas',
    name: 'Accounting & CPAs',
    category: 'Professional',
    icon: Calculator,
    tagline: 'Receipts get entered. Bank transactions get sorted. Clients send their documents on time.',
    bottleneck: 'Your team spends all day typing numbers from receipts, sorting bank transactions by hand, and chasing clients for missing tax documents.',
    solutions: [
      {
        number: '01',
        title: 'Receipts and Invoices Enter Themselves',
        description: 'Clients snap a photo of a receipt or forward an invoice by email. Our system reads it, pulls out the important numbers — amount, date, vendor, tax — and puts it right into your accounting software. No more typing. No more shoeboxes full of paper.',
        deliverables: ['Reads receipts, invoices, and tax forms', 'Puts the data into QuickBooks or Xero', 'Works even with messy or crumpled receipts']
      },
      {
        number: '02',
        title: 'Bank Transactions Get Sorted Automatically',
        description: 'When bank transactions come in, our system looks at what the expense is and puts it in the right category — just like your best accountant would. It learns your client\'s patterns over time and gets smarter. You only need to review the ones it\'s not sure about.',
        deliverables: ['Sorts expenses into the right categories', 'Catches duplicates and mistakes', 'Learns your client\'s spending patterns']
      },
      {
        number: '03',
        title: 'Clients Actually Send Their Tax Documents on Time',
        description: 'During tax season, our system sends your clients friendly text and email reminders to upload their W-2s, 1099s, and receipts. It gives them a simple link to upload everything. You can see exactly who\'s sent what and who still owes you documents — no more spreadsheet tracking.',
        deliverables: ['Sends automatic reminders by text and email', 'Simple upload link for clients', 'Shows you who still owes documents']
      }
    ],
    impact: '70% faster month-end close · No more manual data entry',
    tools: ['QuickBooks', 'Xero', 'TaxDome', 'Karbon']
  },
  {
    id: 'hvac-field-services',
    name: 'HVAC & Field Services',
    category: 'Field & Trades',
    icon: Wrench,
    tagline: 'Every emergency call gets answered. Your trucks take the shortest routes. You get paid and reviewed on the spot.',
    bottleneck: 'After 5 PM, emergency calls go to voicemail and you lose big jobs. Your guys drive all over town wasting gas instead of taking logical routes.',
    solutions: [
      {
        number: '01',
        title: 'Every After-Hours Call Gets Answered',
        description: 'When a homeowner calls at 10 PM with a broken furnace, our AI answers the phone — not a voicemail. It talks to them, finds out what\'s wrong, checks which technician is on call, and books the job right into your schedule. You stop losing those $3,000+ emergency jobs to competitors who pick up the phone.',
        deliverables: ['Answers your phone 24/7', 'Books jobs into your scheduling software', 'Notifies the on-call tech automatically']
      },
      {
        number: '02',
        title: 'Smarter Routes So Your Guys Aren\'t Driving in Circles',
        description: 'Instead of your techs zigzagging across town, our system looks at all the day\'s jobs and groups them by area. Your guys drive less, do more jobs, and waste less gas. Customers even get a text with an accurate arrival time.',
        deliverables: ['Groups jobs by area automatically', 'Sends customers a text with arrival time', 'Saves time and fuel every day']
      },
      {
        number: '03',
        title: 'Get Paid and Get a 5-Star Review Before You Leave',
        description: 'When the tech marks a job done on their phone, the customer gets an invoice and can pay right there — credit card, Apple Pay, whatever. Right after they pay, they get a text asking for a Google review while they\'re still happy. More cash flow, more reviews, less chasing.',
        deliverables: ['Instant invoices on the tech\'s phone', 'Customer pays on the spot', 'Automatic Google review request']
      }
    ],
    impact: 'Every after-hours call answered · 22% more jobs completed daily',
    tools: ['ServiceTitan', 'Housecall Pro', 'Jobber', 'Stripe']
  },
  {
    id: 'real-estate-brokerages',
    name: 'Real Estate Brokerages',
    category: 'Professional',
    icon: Building2,
    tagline: 'Online leads get a reply in 30 seconds. Showings book themselves. Closings stay on track.',
    bottleneck: 'Leads from Zillow and your website go cold in minutes if your agents are busy at showings or open houses and can\'t respond fast enough.',
    solutions: [
      {
        number: '01',
        title: 'New Leads Get a Text Back in 30 Seconds',
        description: 'When someone asks about a property on Zillow, Realtor.com, or your website — they get a text within 30 seconds. Not a generic auto-reply, but a real conversation: what\'s your budget? Are you pre-approved? What neighborhoods do you like? By the time your agent follows up, the lead is already qualified.',
        deliverables: ['Texts new leads within 30 seconds', 'Asks budget and pre-approval questions', 'Sends qualified leads to the right agent']
      },
      {
        number: '02',
        title: 'Showings Book Themselves',
        description: 'When a buyer wants to see a property, our system handles the back-and-forth — checking the seller\'s availability, your agent\'s calendar, and booking the time. If someone needs to reschedule, it handles that too. After the showing, the buyer gets a quick feedback survey automatically.',
        deliverables: ['Coordinates buyer and seller schedules', 'Handles rescheduling automatically', 'Sends feedback surveys after showings']
      },
      {
        number: '03',
        title: 'Nothing Falls Through the Cracks Before Closing',
        description: 'From the moment a contract is signed to closing day, our system tracks every deadline — inspection, appraisal, loan approval, earnest money. Everyone involved gets automatic reminders so nothing gets missed and deals don\'t fall apart at the last minute.',
        deliverables: ['Tracks every closing deadline', 'Sends reminders to all parties', 'Collects documents automatically']
      }
    ],
    impact: '3x higher lead conversion · Every lead gets an instant reply',
    tools: ['Follow Up Boss', 'KVCore', 'Dotloop', 'Calendly']
  },
  {
    id: 'logistics-freight',
    name: 'Logistics & Freight',
    category: 'Industrial',
    icon: Truck,
    tagline: 'Quotes go out fast. Paperwork enters itself. You always know where your trucks are.',
    bottleneck: 'Your team spends all day answering "where\'s my truck?" calls, typing numbers off paper delivery receipts, and building quotes by hand.',
    solutions: [
      {
        number: '01',
        title: 'Freight Quotes Go Out in Minutes, Not Hours',
        description: 'When a shipper emails you asking for a rate, our system reads the email, figures out the lane and load details, calculates a competitive price, and sends back a quote — all in a few minutes. You win more loads because you\'re the first one to respond.',
        deliverables: ['Reads freight request emails automatically', 'Calculates competitive rates', 'Sends quotes back fast']
      },
      {
        number: '02',
        title: 'Delivery Paperwork Enters Itself',
        description: 'When a driver sends a photo of a signed delivery receipt or bill of lading, our system reads it and puts all the information into your system automatically. No more typing from paper. Billing goes out faster because the paperwork is already done.',
        deliverables: ['Reads delivery receipts and bills of lading', 'Puts everything into your system', 'Speeds up billing and payment']
      },
      {
        number: '03',
        title: 'You Always Know Where Your Trucks Are',
        description: 'Instead of your dispatchers calling drivers all day asking "where are you?", our system tracks the trucks automatically and sends updates to your customers. If there\'s a delay — traffic, weather, whatever — everyone gets notified before they have to ask.',
        deliverables: ['Tracks trucks without calling drivers', 'Sends automatic updates to customers', 'Alerts everyone if there\'s a delay']
      }
    ],
    impact: '80% fewer "where\'s my truck?" calls · Faster load booking',
    tools: ['McLeod', 'DAT One', 'Truckstop', 'Samsara']
  },
  {
    id: 'auto-dealerships',
    name: 'Auto Dealerships',
    category: 'Consumer',
    icon: Car,
    tagline: 'Online shoppers get help 24/7. Service customers come back. Trade-ins are easy.',
    bottleneck: 'People browsing your website at night can\'t get answers, service customers disappear after warranty, and trade-in appraisals take too long.',
    solutions: [
      {
        number: '01',
        title: 'Help Online Car Shoppers 24/7',
        description: 'When someone\'s on your website at 11 PM comparing SUVs, our AI chat helps them — answers questions about features, pricing, and availability using your actual inventory. When they\'re ready, it books a test drive appointment with your sales team. Works around the clock, even when your showroom is closed.',
        deliverables: ['Answers questions using your real inventory', 'Books test drives automatically', 'Works 24/7 including nights and weekends']
      },
      {
        number: '02',
        title: 'Bring Service Customers Back Automatically',
        description: 'Our system keeps track of when your customers are due for oil changes, tire rotations, and factory recalls. It sends them a friendly text reminder and lets them book a service appointment with one tap. You keep your service bays full and your customers happy.',
        deliverables: ['Sends service reminders automatically', 'Includes recall notifications', 'Customers book with one tap']
      },
      {
        number: '03',
        title: 'Trade-In Values by Text Message',
        description: 'A customer texts you a few photos of their car and the mileage. Our system gives them a ballpark trade-in value right away — no appointment needed. When they\'re interested, your used car manager gets a complete appraisal package ready to go.',
        deliverables: ['Customers text photos and mileage', 'Gets a quick trade-in estimate', 'Full appraisal package for your manager']
      }
    ],
    impact: '40% more test drive bookings · $18K more monthly service revenue',
    tools: ['CDK Global', 'Reynolds & Reynolds', 'DealerSocket']
  },
  {
    id: 'dental-practices',
    name: 'Dental Practices',
    category: 'Healthcare',
    icon: HeartPulse,
    tagline: 'Insurance gets verified. Empty chairs get filled. Patients say yes to treatment.',
    bottleneck: 'Your front desk spends hours on hold with insurance companies, last-minute cancellations leave chairs empty, and patients put off expensive treatment.',
    solutions: [
      {
        number: '01',
        title: 'Insurance Verified Without Picking Up the Phone',
        description: 'Two days before every appointment, our system checks the patient\'s dental insurance automatically — what\'s covered, how much of their annual maximum is left, and what they\'ll owe. Your front desk gets a clean summary instead of spending 20 minutes on hold with Delta Dental.',
        deliverables: ['Checks insurance coverage automatically', 'Shows remaining benefits', 'No more calling insurance companies']
      },
      {
        number: '02',
        title: 'Fill Empty Chairs in Minutes When Someone Cancels',
        description: 'When a patient cancels last minute, our system instantly texts everyone on your waitlist: "A 2 PM cleaning just opened up tomorrow — reply YES to grab it." The first person to reply gets the slot. Your hygienists stay busy instead of sitting around.',
        deliverables: ['Detects cancellations instantly', 'Texts waitlisted patients automatically', 'Patients claim the slot with one reply']
      },
      {
        number: '03',
        title: 'More Patients Say Yes to Treatment',
        description: 'After a patient hears they need a crown or implant, they often go home and put it off. Our system follows up with a simple explanation of the procedure and easy monthly payment options. More patients schedule their treatment because the cost feels manageable.',
        deliverables: ['Sends simple treatment explanations', 'Shows affordable monthly payment plans', 'Makes it easy to schedule treatment']
      }
    ],
    impact: '96% of chairs stay booked · Front desk saves 40 hours a month',
    tools: ['Dentrix', 'Eaglesoft', 'Open Dental', 'Twilio']
  },
  {
    id: 'construction-gcs',
    name: 'Construction & GCs',
    category: 'Field & Trades',
    icon: HardHat,
    tagline: 'Estimates come together faster. Sub bids are easy to compare. Daily logs write themselves.',
    bottleneck: 'Your estimators spend days measuring blueprints by hand, comparing sub bids is a mess, and daily job reports are always late or missing.',
    solutions: [
      {
        number: '01',
        title: 'Blueprint Measurements Done in Minutes',
        description: 'Upload your architectural plans and our system reads them — pulls out square footages, linear measurements, and fixture counts automatically. What used to take your estimator a full day of measuring with a scale now takes minutes. The numbers go right into your estimating spreadsheet.',
        deliverables: ['Reads blueprint plans automatically', 'Pulls out measurements and counts', 'Exports to your estimating software']
      },
      {
        number: '02',
        title: 'Compare Sub Bids Side by Side Without the Headache',
        description: 'When you get bids from five different electricians or plumbers, our system puts them all in one clean comparison — same format, apples to apples. It shows you who\'s cheapest, who included everything, and where someone left something out of their scope. Makes picking the right sub easy.',
        deliverables: ['Puts all bids in one comparison', 'Shows what\'s included and what\'s not', 'Highlights the best value']
      },
      {
        number: '03',
        title: 'Daily Job Reports by Talking Into Your Phone',
        description: 'At the end of the day, your superintendent talks into their phone — "We had 12 guys on site, poured the second floor slab, weather was clear, no safety issues." Our system turns that into a professional daily report and puts it into Procore. No more typing on a tiny phone screen at 6 PM.',
        deliverables: ['Just talk and the report writes itself', 'Covers weather, crew, progress, and safety', 'Goes straight into Procore']
      }
    ],
    impact: 'Estimates 3x faster · Every change order gets tracked',
    tools: ['Procore', 'Buildertrend', 'PlanSwift', 'Bluebeam']
  },
  {
    id: 'machine-shops-mfg',
    name: 'Machine Shops & Mfg',
    category: 'Industrial',
    icon: Factory,
    tagline: 'Quotes go out same day. Machines get fixed before they break. Materials get reordered automatically.',
    bottleneck: 'Custom machining quotes take days to put together, machines break down without warning, and you run out of raw material at the worst times.',
    solutions: [
      {
        number: '01',
        title: 'Get Quotes Out the Same Day',
        description: 'A customer sends you a 3D part file. Our system looks at the shape, figures out how long the machine will run, what material you\'ll need, and gives you a cost estimate — all in the same day instead of waiting three days for your estimator. You respond faster and win more work.',
        deliverables: ['Reads 3D part files automatically', 'Calculates machine time and material', 'Gives you a quote the same day']
      },
      {
        number: '02',
        title: 'Know When a Machine Needs Attention Before It Breaks',
        description: 'Our system watches your machines — vibration, temperature, how the tools are cutting. When something starts to go wrong, you get an alert on your phone BEFORE the machine breaks down and scraps an expensive part. Less downtime, less wasted material.',
        deliverables: ['Monitors your machines automatically', 'Alerts you before problems happen', 'Reduces breakdowns and scrap']
      },
      {
        number: '03',
        title: 'Materials Get Reordered Before You Run Out',
        description: 'Our system keeps track of your raw material — bar stock, sheet metal, whatever you use. It looks at what jobs are coming up and when you\'ll need more. When stock gets low, it creates a purchase order for your supplier automatically. No more stopping a job because you ran out of material.',
        deliverables: ['Tracks your raw material inventory', 'Knows what you\'ll need for upcoming jobs', 'Creates purchase orders automatically']
      }
    ],
    impact: 'Quotes out 60% faster · 18% less unexpected downtime',
    tools: ['JobBOSS²', 'Autodesk Fusion', 'Plex ERP']
  },
  {
    id: 'restaurants-hospitality',
    name: 'Restaurants & Hospitality',
    category: 'Consumer',
    icon: UtensilsCrossed,
    tagline: 'Every phone call gets answered during the rush. Less food gets wasted. Shift swaps handle themselves.',
    bottleneck: 'During dinner rush, nobody can answer the phone. You prep too much food and throw money away. And when someone calls out sick, it\'s chaos.',
    solutions: [
      {
        number: '01',
        title: 'Phone Gets Answered Even During the Dinner Rush',
        description: 'When your whole team is slammed on a Friday night, our AI answers the phone for you. It takes reservations, answers questions about the menu ("Is the pasta gluten-free?"), and sends big catering requests to your manager. No more missed calls, no more lost reservations.',
        deliverables: ['Answers your phone during busy times', 'Takes reservations and answers menu questions', 'Books directly into OpenTable or Resy']
      },
      {
        number: '02',
        title: 'Prep the Right Amount of Food Every Day',
        description: 'Our system looks at your past sales, the weather forecast, and what events are happening nearby to predict how busy you\'ll be. Your kitchen gets a simple prep list so you make enough food without throwing a bunch away at the end of the night.',
        deliverables: ['Predicts how busy you\'ll be', 'Creates a daily prep list for the kitchen', 'Reduces food waste and saves money']
      },
      {
        number: '03',
        title: 'Shift Swaps Handle Themselves',
        description: 'When a server calls in sick at 3 PM, our system automatically texts available staff: "Can you cover tonight\'s 5-9 shift? Reply YES." It checks who\'s qualified, who\'s available, and confirms the swap — all without your manager making 15 phone calls.',
        deliverables: ['Texts available staff automatically', 'Checks availability and qualifications', 'Confirms the swap without manager involvement']
      }
    ],
    impact: 'Every phone call answered · 12% less food waste',
    tools: ['Toast', '7shifts', 'OpenTable', 'Square']
  },
  {
    id: 'insurance-agencies',
    name: 'Insurance Agencies',
    category: 'Professional',
    icon: ShieldCheck,
    tagline: 'Quotes come back faster. Certificates go out instantly. Renewals don\'t get lost.',
    bottleneck: 'Getting quotes from multiple carriers takes forever, clients call all day asking for insurance certificates, and policies renew without anyone noticing rate spikes.',
    solutions: [
      {
        number: '01',
        title: 'Get Quotes from Multiple Carriers at Once',
        description: 'Instead of your team logging into five different carrier websites and typing the same information over and over, our system does it all at once. You get back a clean side-by-side comparison showing which carrier has the best rate. Your agents save hours and close more policies.',
        deliverables: ['Enters info into multiple carrier sites at once', 'Shows rates side by side', 'Saves hours of repetitive typing']
      },
      {
        number: '02',
        title: 'Insurance Certificates Go Out in 2 Minutes',
        description: 'When a contractor or landlord needs a certificate of insurance, they don\'t have to call your office and wait. They request it online, our system checks the policy is active, and emails them a signed certificate in under 2 minutes. No more interrupting your staff for routine paperwork.',
        deliverables: ['Clients request certificates online', 'Checks the policy automatically', 'Emails a signed certificate in minutes']
      },
      {
        number: '03',
        title: 'Catch Rate Increases Before Renewal Day',
        description: 'Sixty days before a policy renews, our system checks if the premium is going up by more than 10%. If it is, you get an alert with competing quotes already pulled — so you can call your client with options instead of surprising them with a higher bill.',
        deliverables: ['Watches for upcoming renewals', 'Alerts you about rate increases early', 'Pulls competing quotes automatically']
      }
    ],
    impact: 'Certificates in 2 minutes · 92% of policies renew',
    tools: ['Applied Epic', 'AMS360', 'HawkSoft', 'DocuSign']
  },
  {
    id: 'fitness-gym-studios',
    name: 'Fitness & Gym Studios',
    category: 'Consumer',
    icon: Dumbbell,
    tagline: 'Trial members show up. Regulars don\'t disappear. Failed payments get recovered.',
    bottleneck: 'People sign up for a trial class and never show up. Members quietly stop coming after a couple months. And declined credit cards cost you thousands.',
    solutions: [
      {
        number: '01',
        title: 'Get Trial Members to Actually Show Up',
        description: 'After someone signs up for a trial class, our system sends them friendly texts — what to wear, where to park, what the class is like. It keeps them excited so they actually walk through the door. Show-up rates go up by nearly 30% because people feel prepared and expected.',
        deliverables: ['Sends friendly prep texts before the trial', 'Answers common questions automatically', 'Follows up after the class to convert them']
      },
      {
        number: '02',
        title: 'Catch Members Before They Quit',
        description: 'When a regular member hasn\'t checked in for two weeks, our system notices and sends them a personal message — "Hey, we miss you! Here\'s a workout plan to get back on track." It reaches out before they cancel their membership, not after.',
        deliverables: ['Watches check-in patterns', 'Reaches out to members who stop coming', 'Sends personal messages, not generic blasts']
      },
      {
        number: '03',
        title: 'Recover Failed Membership Payments Quietly',
        description: 'When a member\'s credit card gets declined, instead of an awkward conversation at the front desk, our system sends them a private text with a link to update their card. Simple, respectful, and effective — most members fix it within a day.',
        deliverables: ['Detects declined payments automatically', 'Sends a private text with an update link', 'Recovers revenue without awkward conversations']
      }
    ],
    impact: '28% more trial members show up · 45% less member turnover',
    tools: ['Mindbody', 'Glofox', 'Mariana Tek', 'Stripe']
  },
  {
    id: 'wealth-advisory',
    name: 'Wealth & Advisory',
    category: 'Professional',
    icon: Landmark,
    tagline: 'Client presentations build themselves. New clients onboard smoothly. Compliance stays audit-ready.',
    bottleneck: 'Advisors spend 4-6 hours building each client review presentation, onboarding paperwork is tedious, and keeping up with compliance recordkeeping is exhausting.',
    solutions: [
      {
        number: '01',
        title: 'Client Review Presentations Build Themselves',
        description: 'Our system pulls your client\'s portfolio numbers — performance, asset mix, benchmarks — directly from Schwab or Fidelity. It puts them into a professional, branded slide deck automatically. What used to take you half a day of copying numbers into PowerPoint now takes a few minutes.',
        deliverables: ['Pulls numbers from your custodian automatically', 'Creates a branded slide presentation', 'Ready for your review in minutes']
      },
      {
        number: '02',
        title: 'New Client Onboarding Made Simple',
        description: 'Instead of mailing forms back and forth, new clients fill out a simple online questionnaire — risk tolerance, investment goals, account transfers. Our system fills in the custodian paperwork and sends it for e-signature. Clean, professional, and fast.',
        deliverables: ['Simple online questionnaire for new clients', 'Fills out custodian forms automatically', 'Sends everything for e-signature']
      },
      {
        number: '03',
        title: 'Always Ready for a Compliance Audit',
        description: 'Every email, text, and meeting note with clients gets automatically saved and organized. If a regulator asks to see your communications from last March, you pull it up in seconds instead of digging through folders. You\'re always audit-ready without extra work.',
        deliverables: ['Saves all client communications automatically', 'Organized and searchable by date or client', 'Always ready if regulators come knocking']
      }
    ],
    impact: '80% faster review prep · 100% audit-ready at all times',
    tools: ['Wealthbox', 'Redtail', 'Orion', 'Charles Schwab']
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & E-Commerce',
    category: 'Consumer',
    icon: ShoppingBag,
    tagline: '"Where\'s my order?" gets answered instantly. Abandoned carts come back. Inventory stays in sync.',
    bottleneck: 'Your support team drowns in "where\'s my order?" emails, people abandon their cart and never come back, and inventory gets out of sync across your stores.',
    solutions: [
      {
        number: '01',
        title: '"Where\'s My Order?" Answered Instantly',
        description: 'When a customer asks where their package is, our AI looks it up in your shipping system and gives them a real answer — tracking info, estimated delivery, everything. If they need a return or exchange, it handles that too. Your support team stops answering the same question hundreds of times a day.',
        deliverables: ['Answers order status questions instantly', 'Handles returns and exchanges', 'Frees up your support team']
      },
      {
        number: '02',
        title: 'Bring Back Customers Who Left Items in Their Cart',
        description: 'When someone adds items to their cart and leaves without buying, our system sends them a personal text — not a generic email blast. It answers any questions they had and gives them a reason to come back. It feels like a helpful follow-up, not spam.',
        deliverables: ['Sends personal texts to cart abandoners', 'Answers product questions', 'Brings back customers who almost bought']
      },
      {
        number: '03',
        title: 'Inventory Stays in Sync Across All Your Stores',
        description: 'Whether you sell on Shopify, Amazon, TikTok Shop, or in a physical store — our system keeps your inventory numbers the same everywhere. When something sells in one place, it updates everywhere else in seconds. No more selling something you don\'t have.',
        deliverables: ['Syncs inventory across all channels', 'Updates in seconds after every sale', 'Prevents overselling and stockouts']
      }
    ],
    impact: '65% of support tickets handled automatically · 14% more cart recovery',
    tools: ['Shopify Plus', 'Gorgias', 'Klaviyo', 'ShipStation']
  }
];
