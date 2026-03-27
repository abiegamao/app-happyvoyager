export interface Lesson {
  id: string;
  number: string;
  title: string;
  description: string;
  bullets: string[];
  time: string;
  tag: string;
  free: boolean;
  link: string | null;
}

export interface Phase {
  id: string;
  phase: string;
  title: string;
  description: string;
  milestone: string;
  accent: string;
  bg: string;
  lessons: Lesson[];
}

export interface PlaybookMeta {
  badge: string;
  badgeLabel: string;
  updatedLabel: string;
  heroTitle: string;
  heroDescription: string;
  totalTime: string;
  modalFeatures: string[];
  finalCtaTitle: string;
  finalCtaDescription: string;
}

export const playbookMeta: PlaybookMeta = {
  badge: "Playbook Pro",
  badgeLabel: "Application to Citizenship",
  updatedLabel: "Updated 2026",
  heroTitle: "Spain DNV Playbook Pro",
  heroDescription:
    "The complete system for getting Spain's Digital Nomad Visa, building your life in Spain, and becoming a Spanish citizen ~ all in one place, step by step.",
  totalTime: "~3 hrs",
  modalFeatures: [
    "24 lessons across 6 phases",
    "Application to Citizenship, step by step",
    "Links to every tool, checklist, and guide",
    "Tax strategy + Beckham Law breakdown",
    "2-year citizenship path for PH & LATAM",
  ],
  finalCtaTitle: "Application to Spanish Passport",
  finalCtaDescription:
    "24 lessons. 6 phases. One complete system. Get everything from first document to citizenship ceremony.",
};

export const phases: Phase[] = [
  // ─── Phase 0 ~ Qualify ───
  {
    id: "qualify",
    phase: "Phase 0",
    title: "Qualify",
    description:
      "Confirm you're eligible before you spend a minute on paperwork.",
    milestone: "By the end: you know exactly which visa path is yours and whether you qualify today.",
    accent: "#8fa38d",
    bg: "#d4e0d3",
    lessons: [
      {
        id: "l01",
        number: "01",
        title: "Is the DNV Right for You?",
        description:
          "Take the 2-minute eligibility assessment. Check income type, employment structure, and your current Schengen status before touching a single document.",
        bullets: [
          "Minimum income threshold check (EUR 2,849/mo)",
          "Employment type ~ employee vs freelancer vs company owner",
          "Current visa status and Schengen day count",
          "Disqualifying factors most people miss",
        ],
        time: "2 min",
        tag: "Interactive Tool",
        free: true,
        link: "/assessment",
      },
      {
        id: "l02",
        number: "02",
        title: "Understanding Spain's Visa Landscape",
        description:
          "DNV vs NLV vs Student vs Tourist ~ understand all four options, the key differences, and which path fits your income, lifestyle, and long-term goals.",
        bullets: [
          "Side-by-side comparison of all Spain visa types",
          "Work rights for each visa",
          "Which visas count toward residency and citizenship",
          "2-year citizenship path for PH and LATAM nationals",
        ],
        time: "8 min",
        tag: "Guide",
        free: true,
        link: "/digital-nomad-visa",
      },
    ],
  },

  // ─── Phase 1 ~ Prepare ───
  {
    id: "prepare",
    phase: "Phase 1",
    title: "Prepare",
    description: "Build your application file before you touch the portal.",
    milestone: "By the end: every document is gathered, apostilled, translated, and ready to upload.",
    accent: "#e3a99c",
    bg: "#f2d6c9",
    lessons: [
      {
        id: "l03",
        number: "03",
        title: "The Master Document Checklist",
        description:
          "Every document you need in the exact order UGE expects them ~ with apostille and sworn translation requirements flagged clearly.",
        bullets: [
          "Full 18-item document checklist",
          "Apostille requirements by document type",
          "Which documents need sworn translation",
          "Self-employment proof requirements",
        ],
        time: "10 min",
        tag: "Checklist",
        free: true,
        link: "/document-checklist",
      },
      {
        id: "l04",
        number: "04",
        title: "Proving Your Income the Right Way",
        description:
          "Income documentation is where most applications quietly die ~ not because people don't earn enough, but because they packaged it wrong. UGE reviewers aren't trying to understand your income. Your job is to make it impossible for them to misunderstand it.",
        bullets: [
          "Employees: the magic three ~ employment contract, last 3 payslips, employer letter on company letterhead confirming remote work arrangement",
          "Freelancers: client contracts + invoices + 6 months of bank statements showing regular deposits ~ a PayPal screenshot is not income documentation",
          "Business owners: your own company doesn't count unless you're paying yourself a documented salary ~ here's how to structure that correctly for UGE",
          "Bank statements: UGE looks for stable averages, not one good month ~ how to annotate statements so reviewers understand your income at a glance",
          "Currency conversion: how to handle income in USD, GBP, or PHP ~ the conversion method UGE accepts (and the ones they don't)",
          "The 3-month average trap: cherry-picking your best months is the fastest way to get a requerimiento requesting your full 12-month history",
        ],
        time: "12 min",
        tag: "Deep Dive",
        free: false,
        link: null,
      },
      {
        id: "l05",
        number: "05",
        title: "Health Insurance ~ What Actually Qualifies",
        description:
          "Insurance companies don't know what Spanish immigration requires. You need to know ~ and tell them exactly what to write.",
        bullets: [
          "The exact phrases that must appear on your certificate ~ UGE's checklist, translated and annotated",
          "Coverage minimums: EUR 30,000, no co-pays that exclude emergency care, valid in Spain for the full visa duration",
          "The co-pay problem: many otherwise solid international policies fail because of A&E co-pays that technically exclude emergency cover",
          "International providers that have successfully passed UGE review in 2026 ~ including Feather, a popular choice among DNV applicants",
          "How to instruct your insurer to reissue the certificate with the correct qualifying language (email template included)",
          "The waiting period trap: policies that exclude pre-existing conditions for 6-12 months can invalidate your application entirely",
        ],
        time: "8 min",
        tag: "Deep Dive",
        free: false,
        link: null,
      },
      {
        id: "l06",
        number: "06",
        title: "Criminal Background Check & Apostille",
        description:
          "The background check has a 6-month expiry from the date it's issued ~ not the date it's apostilled, not the date you submit. The timing here is the most underestimated part of the entire application.",
        bullets: [
          "US applicants: FBI Identity History Summary (not state-level) ~ how to order it online and current processing times (plan for 6-8 weeks)",
          "Philippines applicants: NBI clearance with DFA apostille ~ the exact process and where the timeline usually breaks down",
          "UK, Canada, Australia: country-specific criminal record certificates and where apostilles are obtained",
          "Apostille vs notarization: they are not the same thing and UGE absolutely knows the difference",
          "Sworn translation: what languages are required, what qualifies a translator, and how to find a jurado oficial listed in the MAEC registry",
          "The 6-month expiry clock: how to reverse-engineer your submission date from when your background check was issued",
          "What to do if your check is delayed and you're running out of time ~ the options that actually exist",
        ],
        time: "10 min",
        tag: "Step-by-Step",
        free: false,
        link: null,
      },
      {
        id: "l07",
        number: "07",
        title: "Schengen Visa ~ For PH & Non-Schengen Passports",
        description:
          "If your passport doesn't grant visa-free Schengen access ~ Philippines, India, and many others ~ you need a short-stay Type C visa before you can enter Spain to apply for the DNV. This is not a dead end. It's just an extra step.",
        bullets: [
          "Which passports require a Schengen visa to enter Spain (and the current list may surprise you)",
          "The Netherlands consulate route: why it's the most reliable option for Filipinos applying from Manila ~ or from anywhere in the world",
          "Using your 90 Schengen days strategically while your DNV processes ~ the overlap window",
          "Schengen Visa Assistance service: done-with-you document prep so you submit and show up",
        ],
        time: "8 min",
        tag: "Pre-Requisite",
        free: false,
        link: "/schengen-visa",
      },
      {
        id: "l07b",
        number: "08",
        title: "Schengen Timing Strategy",
        description:
          "The 90/180 rule isn't complicated ~ but the rolling window trips everyone up the first time they calculate it.",
        bullets: [
          "The 90/180 rule: you can be in the Schengen area for a maximum of 90 days in any rolling 180-day window ~ not a calendar 6 months",
          "The rolling window mistake: most people calculate from their entry date ~ the window is actually rolling backwards 180 days from today",
          "How to calculate your current count in 30 seconds using the free Schengen Day Calculator",
          "When to submit your DNV application based on your remaining legal days in Spain",
          "What happens if you run out of Schengen days before your visa is approved ~ and the legal options that exist",
          "Non-Schengen buffer strategy: Morocco, Albania, UK ~ how experienced nomads buy time without overstaying",
          "Overstaying even by one day: the entry ban timeline and how it follows you into future visa applications",
        ],
        time: "5 min",
        tag: "Strategy + Tool",
        free: false,
        link: "/schengen-calculator",
      },
    ],
  },

  // ─── Phase 2 ~ Apply ───
  {
    id: "apply",
    phase: "Phase 2",
    title: "Apply",
    description:
      "Submit a clean, complete application that doesn't come back with a requerimiento.",
    milestone: "By the end: your application is submitted and you have a reference number from UGE.",
    accent: "#7a8f90",
    bg: "#e0eaeb",
    lessons: [
      {
        id: "l08",
        number: "09",
        title: "UGE vs Consulate ~ Which Route Is Yours",
        description:
          "This is the decision most people make wrong ~ usually because they didn't know there was a decision to make. UGE is the unit inside Spain. Your consulate is the Spanish embassy back home. They process different applicants, the experience is completely different, and you can't switch routes mid-application.",
        bullets: [
          "UGE (Unidad de Grandes Empresas): for applicants already in Spain on a valid entry ~ digital-first, typically 20-40 day processing",
          "Consulate route: apply from your home country before you travel ~ you arrive in Spain with the visa already in your passport, processing can take 90+ days",
          "The residency requirement for UGE: you must be physically present in Spain and legally in-country to use this route",
          "Which route gives you more control over your timeline ~ and which one has fewer surprises",
          "The consulate experience for Filipinos applying from Manila: what the Spanish Embassy actually asks for",
          "Can you start with the consulate and switch to UGE? (No. Commit to one route and see it through.)",
        ],
        time: "8 min",
        tag: "Decision Guide",
        free: false,
        link: null,
      },
      {
        id: "l09",
        number: "10",
        title: "Step-by-Step Application Walkthrough",
        description:
          "This is the lesson. Every other lesson in this playbook is preparation ~ this is where it all comes together. Form by form, field by field, upload by upload. Including common mistakes and exactly how to fix them.",
        bullets: [
          "Form EX-07: the main DNV application form ~ every field explained with what to write, what to leave blank, and what triggers a rejection",
          "Supporting forms: which additional EX forms attach to which documents and in what order",
          "File format requirements: PDF only, max file size, how to name files so they actually upload and process correctly",
          "The firma electronica (digital signature): what it is, why UGE requires it, and the workaround if you haven't set yours up yet",
          "Common upload errors: file too large, wrong format, wrong form version, mismatched document references ~ and how to fix each",
          "After you submit: the confirmation email, the reference number, what radio silence from UGE actually means",
          "Requerimiento: what it looks like when it arrives, how long you have to respond, and the exact response format UGE expects",
        ],
        time: "20 min",
        tag: "Core Lesson",
        free: false,
        link: "/how-to-apply-spain-digital-nomad-visa",
      },
      {
        id: "l10",
        number: "11",
        title: "DNV 2026 Updates ~ What's Changed",
        description:
          "UGE updated their requirements three times in 2025 alone. Each time, perfectly solid applications started failing for reasons that didn't exist six months before. This lesson is a live document ~ updated every time UGE changes something significant.",
        bullets: [
          "New minimum income threshold for 2026: the exact figure, how it's calculated, and how it differs from the headline number most guides quote",
          "Updated remote work proof requirements: what additional employer documentation UGE is now requesting and why a contract alone isn't enough",
          "Employment contract change: the new minimum contract length UGE expects to see for employee applicants",
          "Portal changes: what moved and what's different in the UGE online submission system since early 2026",
          "Health insurance scrutiny: why more applications are getting additional information requests about coverage specifics in 2026",
          "What experienced consultants are actually seeing approved and rejected right now ~ the ground-level picture",
        ],
        time: "10 min",
        tag: "Updated 2026",
        free: false,
        link: "/dnv-updates-2026",
      },
      {
        id: "l11",
        number: "12",
        title: "Common Rejection Reasons & How to Avoid Them",
        description:
          "The same issues come up over and over. None of them are difficult to fix once you know what to look for. This lesson is a pre-submission audit ~ run through it before you hit submit.",
        bullets: [
          "Issue 1: Income proof that doesn't demonstrate 'stable, regular income' ~ the exact language UGE looks for and why lump-sum payments and inconsistent deposits fail",
          "Issue 2: Insurance certificate missing qualifying language ~ the 4 phrases that must appear verbatim and how to get your insurer to add them",
          "Issue 3: Background check that expired during processing ~ the timing fix that adds a two-week buffer",
          "Issue 4: Employment contract that doesn't explicitly mention remote work ~ how to get an addendum letter in under a week",
          "Issue 5: Translation issues ~ using unqualified translators whose work UGE rejects on technical grounds",
          "Issue 6: Skipped fields on EX-07 ~ the ones marked 'optional' that UGE still expects to be completed",
          "Issue 7: Evidence of Spanish-sourced income in a self-employment application ~ why this disqualifies you and how to restructure your documents",
          "Responding to a requerimiento: the format, the 10-working-day deadline, and what happens if you miss it",
        ],
        time: "15 min",
        tag: "Risk Management",
        free: false,
        link: null,
      },
    ],
  },

  // ─── Phase 3 ~ Arrive ───
  {
    id: "arrive",
    phase: "Phase 3",
    title: "Arrive",
    description:
      "Land in Spain and complete your legal setup within the correct windows.",
    milestone: "By the end: you have your Padron, NIE, TIE appointment booked, and a Spanish bank account.",
    accent: "#8fa38d",
    bg: "#d4e0d3",
    lessons: [
      {
        id: "l12",
        number: "13",
        title: "Your First 30 Days in Spain",
        description:
          "Month one in Spain is like playing a video game with no instructions, in a language you're still learning, while running a business. Here's the walkthrough. The order of operations matters ~ get it wrong and you're starting the queue again.",
        bullets: [
          "Declaracion de entrada: file this within 30 days of entering Spain on your Type D visa at the local Oficina de Extranjeria ~ most guides skip this step entirely",
          "Days 1-3: secure permanent accommodation with a real rental contract (not Airbnb, not a friend's sofa) ~ every single other step depends on this address",
          "Days 3-7: Padron registration at your local Ayuntamiento ~ your empadronamiento certificate is the key that unlocks everything else",
          "Week 2: open a Spanish bank account using your Padron cert and NIE ~ Sabadell and BBVA are currently the most straightforward for new arrivals",
          "Week 2-3: book your TIE fingerprint appointment (cita previa) the moment slots open ~ they disappear in under 2 minutes in Madrid and Barcelona",
          "Month 1: get a Spanish SIM, set up home internet, and start your Certificado Digital application",
          "The 30-day countdown: a checklist of what gets significantly harder the longer you leave it",
        ],
        time: "12 min",
        tag: "Action Plan",
        free: false,
        link: null,
      },
      {
        id: "l12a",
        number: "14",
        title: "Padron Registration Guide",
        description:
          "Your empadronamiento is the single most important first step after arriving. Without it, nothing else works ~ no TIE appointment, no bank account, no healthcare enrollment.",
        bullets: [
          "What the Padron is and why banks, TIE offices, and healthcare all require it",
          "Exact documents to bring to your local Ayuntamiento",
          "How to register online in Madrid and Barcelona",
          "Processing times by city + how to get a certified copy fast",
        ],
        time: "8 min",
        tag: "Free Guide",
        free: true,
        link: "/padron-guide",
      },
      {
        id: "l12b",
        number: "15",
        title: "NIE & TIE: What They Are and How to Get Both",
        description:
          "Your NIE is a number. Your TIE is a physical card. You need both ~ and the process to get them is different. Here's the full picture, step by step.",
        bullets: [
          "NIE vs TIE ~ the critical difference most guides get wrong",
          "The 6-step TIE process from Padron to card collection",
          "Fee 790-012 ~ what to pay and how to pay it",
          "What to do when cita previa slots are weeks out",
        ],
        time: "10 min",
        tag: "Free Guide",
        free: true,
        link: "/nie-and-tie-guide",
      },
      {
        id: "l12c",
        number: "16",
        title: "Opening a Spanish Bank Account",
        description:
          "You need a Spanish IBAN for rent, utilities, and life here. Wise and Revolut aren't enough. Here's which banks work for foreigners and exactly what to bring.",
        bullets: [
          "Why Wise and Revolut fail for Spanish direct debits and utilities",
          "Sabadell vs BBVA vs CaixaBank ~ which is most foreigner-friendly",
          "Exact documents required to open an account as a new resident",
          "The recommended three-account setup for life in Spain",
        ],
        time: "8 min",
        tag: "Free Guide",
        free: true,
        link: "/spain-bank-account-guide",
      },
      {
        id: "l13",
        number: "17",
        title: "NIE & TIE Appointment Guide",
        description:
          "The cita previa system makes otherwise calm, reasonable people lose their minds. Slots in major cities fill in literally two minutes. This lesson gives you the strategies that actually work.",
        bullets: [
          "NIE appointment vs TIE appointment ~ you only need one of them, and it's the TIE: here's why",
          "The exact URL, timing, and browser setup for when new appointment slots drop (Tuesday mornings, 8am)",
          "Third-party alert tools that notify you the moment a slot opens in your province",
          "The walk-in window: provinces where this still works in 2026 and exactly what to say when you arrive",
          "Documents to bring to your TIE fingerprint appointment ~ the full list with acceptable formats and what gets turned away at the door",
          "What happens at the appointment: biometrics, photo, receipt of submission",
          "Card collection: the SMS you'll receive, how long the card takes, and what to do if it's delayed past 30 days",
        ],
        time: "10 min",
        tag: "Step-by-Step",
        free: false,
        link: "/appointments",
      },
      {
        id: "l14",
        number: "18",
        title: "Document Translations ~ What Needs Translating",
        description:
          "Here's the actual list, because 'sworn translation' and 'notarized translation' are not the same thing, and only one of them satisfies Spanish immigration.",
        bullets: [
          "Documents that always require sworn translation: birth certificates, criminal records, marriage certificates, foreign university diplomas",
          "Documents that don't need sworn translation (and where people waste money): documents already in Spanish, EU-issued official documents, Schengen visas",
          "Sworn translator (traductor-interprete jurado): what legally qualifies someone for this role and how to find one in the MFAE official registry",
          "What a certified sworn translation looks like: the official stamp, handwritten signature, and language-pair certification that makes it valid",
          "Typical costs and turnaround times in 2026: EUR 50-120 per document, 3-7 days ~ how to factor this into your application timeline",
          "Online jurado translation services: which ones are legitimate and which ones produce translations UGE will reject on technical grounds",
        ],
        time: "8 min",
        tag: "Guide",
        free: false,
        link: "/translations",
      },
    ],
  },

  // ─── Phase 4 ~ Maintain ───
  {
    id: "maintain",
    phase: "Phase 4",
    title: "Maintain",
    description:
      "Keep your visa valid, your residency clean, and your taxes sorted.",
    milestone: "By the end: renewal is filed, your tax strategy is set, and your residency clock is protected.",
    accent: "#e3a99c",
    bg: "#f2d6c9",
    lessons: [
      {
        id: "l15",
        number: "19",
        title: "DNV Renewal ~ The Complete Process",
        description:
          "Renewal is not just reapplication. Some documents are the same, some are different, and some have to be brand new because they've expired.",
        bullets: [
          "Start 90 days before expiry: this isn't a suggestion ~ late renewal creates a gap in your legal residency status that can affect your citizenship clock",
          "What carries over from your initial application and what UGE expects to be refreshed",
          "What must be new: Padron certificate (less than 3 months old), fresh insurance certificate, updated criminal background check",
          "Social Security contributions: the contribution record UGE now checks at renewal and what a clean record looks like vs a problematic one",
          "Updated income threshold for renewal: the figure UGE expects in 2026 and whether you need to demonstrate higher earnings than year one",
          "Residency continuity rule at renewal: how many days you can be absent without resetting your citizenship clock",
          "Submitting renewal before expiry: the extension status that allows you to keep living and working legally while UGE processes your renewal",
        ],
        time: "15 min",
        tag: "Guide",
        free: false,
        link: null,
      },
      {
        id: "l16",
        number: "20",
        title: "Spain Tax Obligations for Digital Nomads",
        description:
          "Everything you need to know before you hit the 183-day mark ~ including the things your gestor will tell you but you'll never find in any English-language guide.",
        bullets: [
          "The 183-day rule: once you hit this in a calendar year, you're a Spanish tax resident ~ full stop, no wiggle room",
          "IRPF: the progressive rate structure and what your effective tax rate realistically looks like at different income levels",
          "Worldwide income reporting: as a Spanish tax resident, Spain wants to know about all of it ~ not just what you earn locally",
          "Modelo 720: the foreign asset declaration required for accounts and assets above EUR 50,000 abroad ~ missing this carries catastrophic penalties",
          "Modelo 100: the annual Spanish income tax return ~ when it's due, how to file it, and what happens if you don't",
          "Gestor vs DIY: the honest breakdown of when paying EUR 300-500 for professional filing is worth every cent",
          "The Beckham Law window: why you need to make this decision before your first 6 months in Spain are up",
        ],
        time: "20 min",
        tag: "Tax Strategy",
        free: false,
        link: null,
      },
      {
        id: "l17",
        number: "21",
        title: "Beckham Law ~ Is It Worth It?",
        description:
          "Beckham Law gets a lot of hype in digital nomad groups. The reality is more nuanced than '24% flat tax = always better.' For some people it's a significant saving. For others, the worldwide income clause turns it into a trap.",
        bullets: [
          "What Beckham Law actually is: the Regimen Especial de Trabajadores Desplazados ~ a regime for 'displaced workers' arriving in Spain for the first time",
          "Who qualifies: three conditions (new resident, not been resident in Spain in the previous 5 years, employed or a company directivo)",
          "The 24% flat rate: applies to Spanish-sourced income up to EUR 600,000 ~ above that it's 47%, which surprises people",
          "The catch everyone misses: under Beckham you pay 19-24% on investment income (dividends, interest) rather than the standard 19-28% bracket ~ the full picture is nuanced",
          "How to apply: Modelo 149, submitted within 6 months of your first Social Security registration in Spain ~ miss this window and you can't apply",
          "The real calculation: comparing 24% flat vs standard IRPF progressive brackets at your actual income level ~ with examples at EUR 30k, EUR 50k, and EUR 80k",
          "When Beckham Law is NOT better: income under approximately EUR 25,000/year, or when you have significant deductible expenses that would reduce your taxable base",
          "Exiting Beckham Law: you can opt out once if your situation changes ~ how to do it and what to expect",
        ],
        time: "12 min",
        tag: "Tax Strategy",
        free: false,
        link: null,
      },
    ],
  },

  // ─── Phase 5 ~ Become Spanish ───
  {
    id: "citizenship",
    phase: "Phase 5",
    title: "Become Spanish",
    description: "The endgame. EU passport. Schengen for life.",
    milestone: "By the end: you know your exact citizenship date and have a clear path to your EU passport.",
    accent: "#c9a84c",
    bg: "#f5ecd7",
    lessons: [
      {
        id: "l18",
        number: "22",
        title: "The Road to Permanent Residency",
        description:
          "Permanent residency (larga duracion) is the status most DNV holders don't think about until year 4.5, when they're scrambling. It's simpler than citizenship but the 5-year clock only works in your favour if you haven't accidentally broken it.",
        bullets: [
          "The 5-year clock: runs from your first legal entry on a Type D visa ~ not from TIE issuance, not from DNV approval date",
          "What breaks continuity: absences over 6 consecutive months, or more than 10 months total across 5 years",
          "What doesn't break continuity: holidays, short trips, and remote work travel ~ but only if documented correctly and your Padron stays active",
          "The application: submitted at your local Oficina de Extranjeria or via Sede Electronica with firma electronica",
          "Documents required: 5 years of TIE and renewal records, Padron history, clean criminal record, and employment/income proof",
          "The EU larga duracion card: the EU-issued permanent residency status with partial freedom of movement rights across member states",
          "Permanent residency vs citizenship: what each status actually allows you to do ~ and why the difference matters for Filipinos specifically",
        ],
        time: "15 min",
        tag: "Guide",
        free: false,
        link: null,
      },
      {
        id: "l19",
        number: "23",
        title: "Spanish Citizenship ~ Full Timeline",
        description:
          "This is the endgame ~ and it's more achievable than it looks from year one. The process has more moving parts than most people expect, but each one is completely doable if you know what's coming.",
        bullets: [
          "The DELE A2 Spanish language exam: when to take it, how to book it through Instituto Cervantes, and what happens if you don't pass",
          "The CCSE civics exam (Conocimientos Constitucionales y Socioculturales de Espana): the civic knowledge test that catches people off guard ~ harder than it sounds",
          "The MiCiudad portal: Spain's online citizenship application system ~ registration, document upload, and submission walkthrough",
          "Documents for citizenship: apostilled birth certificate, complete residency record from day one, clean criminal records from every country you've lived in for 5+ years",
          "The oath ceremony: what to expect, when it happens after approval (typically 3-6 months), and which document you walk out with",
          "Timeline from application submission to passport: current real-world averages and why the range is so wide",
          "Dual nationality and renunciation: Spain generally doesn't require Filipinos to renounce their Philippine citizenship ~ what this means in practice",
        ],
        time: "20 min",
        tag: "Core Lesson",
        free: false,
        link: "/road-to-spanish-citizenship",
      },
      {
        id: "l20",
        number: "24",
        title: "The 2-Year Path (Philippines & LATAM)",
        description:
          "Spain has a historical connection to the Philippines and 21 other countries ~ and it means your citizenship clock runs at 2 years, not 10. If you're Filipino, this is quite literally the fastest legal route to an EU passport anywhere in the world.",
        bullets: [
          "The 22 qualifying nationalities: Philippines, Mexico, Colombia, Peru, Argentina, Cuba, and 16 more ~ the full list and why these countries specifically",
          "Why the Philippines qualifies: the Ley de la Nacionalidad Espanola and Spain's recognition of historical colonial ties",
          "2 years from your first legal residence entry ~ not from TIE issuance, not from visa approval, not from when you physically arrived",
          "Iberoamerican nationals vs Sephardic Jewish descendants vs general applicants: the three-tier citizenship timeline system explained",
          "Dual nationality: Filipinos applying under the Iberoamerican exemption generally do not need to renounce their Philippine passport",
          "How to count your 2 years correctly: the exact date your clock started, common miscalculations, and how a single trip mistake can push your date back",
          "Live citizenship countdown: see your exact projected citizenship date on the road-to-citizenship tracker",
          "The 2-year window is not something to delay on ~ every month spent outside Spain before applying is a month added to your timeline",
        ],
        time: "15 min",
        tag: "Shortcut",
        free: false,
        link: "/road-to-spanish-citizenship",
      },
    ],
  },
];

// Helper: get total lesson count
export const totalLessons = phases.reduce(
  (acc, phase) => acc + phase.lessons.length,
  0,
);

// Helper: get total free lessons
export const freeLessons = phases.reduce(
  (acc, phase) => acc + phase.lessons.filter((l) => l.free).length,
  0,
);

// Helper: find a lesson by id and return it with its parent phase
export function findLessonById(lessonId: string) {
  for (const phase of phases) {
    const lesson = phase.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, phase };
  }
  return null;
}

// Helper: get all lesson ids (for static generation)
export function getAllLessonIds() {
  return phases.flatMap((phase) => phase.lessons.map((l) => l.id));
}

// Helper: find lesson by display number (1-24)
export function findLessonByNumber(num: number) {
  const padded = num.toString().padStart(2, "0");
  for (const phase of phases) {
    const lesson = phase.lessons.find((l) => l.number === padded);
    if (lesson) return { lesson, phase };
  }
  return null;
}

// Helper: get the static page path for a lesson
export function getLessonPath(lessonId: string): string {
  const result = findLessonById(lessonId);
  if (!result) return "/playbook/spain-dnv/home";
  return `/playbook/spain-dnv/lessons/lesson-${parseInt(result.lesson.number)}`;
}

// Helper: get prev/next lesson
export function getAdjacentLessons(lessonId: string) {
  const allLessons = phases.flatMap((p) =>
    p.lessons.map((l) => ({ ...l, phaseId: p.id, phaseTitle: p.title })),
  );
  const idx = allLessons.findIndex((l) => l.id === lessonId);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}
