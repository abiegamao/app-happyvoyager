import type { PlaybookConfig } from "./types";

const softLanding: PlaybookConfig = {
  slug: "soft-landing",
  badge: "Playbook Pro",
  badgeLabel: "Arrival → Settled → Thriving",
  updatedLabel: "Updated 2026",
  heroTitle: "The Soft Landing Playbook",
  heroDescription:
    "Everything that happens after the visa stamp ~ NIE, TIE, Padrón, bank accounts, healthcare, housing, SIM cards, and the honest truth about bureaucracy in Spain. Written by someone who figured it out the hard way.",
  totalTime: "~3.5 hrs",
  modalFeatures: [
    "30 lessons across 6 phases",
    "NIE, TIE & Padrón ~ the complete sequence",
    "Bank accounts for nomads: which ones actually work",
    "Healthcare: public vs private and how to register",
    "Rental contracts decoded ~ every clause explained",
    "Certificado Digital & online bureaucracy made simple",
    "SIM cards, utilities, driving license & daily logistics",
    "Year 1 milestones: renewal, taxes & building toward PR",
  ],
  finalCtaTitle: "Life in Spain, From Day One",
  finalCtaDescription:
    "30 lessons. 6 phases. From stepping off the plane to feeling truly settled ~ NIE appointments, bank accounts, healthcare, housing, and everything in between. The soft landing you wish someone had written for you.",
  catalog: {
    emoji: "🌞",
    tagline: "Life in Spain, from day one",
    description:
      "Appointments, bank accounts, healthcare registration, SIM cards, housing contracts, and schooling ~ everything you need to actually live here once the visa is stamped.",
    status: "waitlist",
    accent: "#c47c5a",
    bg: "#f5e6dc",
  },
  nextPlaybook: {
    slug: "spanish-passport",
    title: "The Spanish Passport Playbook",
    tagline: "Chapter 3 ~ You've built the life. Now make it permanent. Turn your years in Spain into an EU passport.",
    emoji: "🏆",
    accent: "#c9a84c",
    bg: "#f5ecd7",
    chapterLabel: "Chapter 3",
    phasePreview: [
      { emoji: "🔄", title: "DNV Renewal Strategy" },
      { emoji: "📖", title: "DELE A2 Language Test" },
      { emoji: "🏛️", title: "CCSE Civic Exam" },
      { emoji: "🏠", title: "Permanent Residency" },
      { emoji: "🎖️", title: "Citizenship Application" },
      { emoji: "🛂", title: "Your EU Passport" },
    ],
  },
  phases: [
    // ─────────────────────────────────────────
    // PHASE 0 ~ Before You Land
    // ─────────────────────────────────────────
    {
      id: "pre-arrival",
      phase: "Phase 0",
      title: "Before You Land",
      emoji: "✈️",
      description:
        "The 30 days before arrival matter more than most people realise. Get these right and your first weeks in Spain feel manageable instead of overwhelming.",
      accent: "#c47c5a",
      bg: "#f5e6dc",
      lessons: [
        {
          id: "sl01",
          number: "01",
          title: "The 30-Day Arrival Sprint ~ What to Expect",
          description:
            "A brutally honest overview of the first month in Spain: what needs to happen, in what order, and why trying to do everything at once is the most common mistake.",
          bullets: [
            "The bureaucratic sequence that actually works (and why order matters)",
            "Which tasks are time-sensitive and which can wait",
            "Setting realistic expectations for appointment wait times",
            "The one document that unlocks everything else: the Padrón",
          ],
          time: "8 min",
          tag: "Overview",
          free: true,
          link: null,
        },
        {
          id: "sl02",
          number: "02",
          title: "Documents to Bring: Originals, Copies & Certified Translations",
          description:
            "Every Spanish government office wants something different. This is the master list of what to bring, how many copies, which need apostilles, and which need sworn translations.",
          bullets: [
            "Passport originals + photocopies (front page and visa page)",
            "Visa approval letter and consulate documents",
            "Rental contract ~ 6-month minimum for most applications",
            "Sworn translations: when you need them and who to use",
            "NIE documents vs TIE documents ~ the differences",
          ],
          time: "10 min",
          tag: "Documents",
          free: true,
          link: null,
        },
        {
          id: "sl03",
          number: "03",
          title: "Starting Your Certificado Digital from Abroad",
          description:
            "Spain's digital certificate lets you handle most bureaucracy online ~ but getting it requires a specific sequence that's easier to start before you arrive.",
          bullets: [
            "What the Certificado Digital actually is and why you need it",
            "The FNMT application process (and which browsers still work in 2026)",
            "The in-person verification step: what offices accept it",
            "What you can do with it once it's set up",
          ],
          time: "9 min",
          tag: "Digital",
          free: true,
          link: null,
        },
        {
          id: "sl04",
          number: "04",
          title: "Accommodation First: Why Your Address Is Everything",
          description:
            "Your Spanish address isn't just where you sleep ~ it's the anchor point for your Padrón, your TIE appointment, and your bank account. Getting this sorted fast is non-negotiable.",
          bullets: [
            "Short-term vs medium-term accommodation strategies for month one",
            "What landlords need from you before they'll sign anything",
            "Airbnb addresses vs real rental contracts for official use",
            "Why you should never use a friend's address on official documents",
          ],
          time: "7 min",
          tag: "Housing",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 1 ~ Your Legal Identity
    // ─────────────────────────────────────────
    {
      id: "legal-identity",
      phase: "Phase 1",
      title: "Your Legal Identity in Spain",
      emoji: "🪪",
      description:
        "The NIE, TIE, and Padrón are three separate things that most people confuse. This phase untangles all three, explains the sequence, and walks you through every appointment.",
      accent: "#e3a99c",
      bg: "#f2d6c9",
      lessons: [
        {
          id: "sl05",
          number: "05",
          title: "NIE vs TIE ~ What You Actually Have and What You Still Need",
          description:
            "Your visa approval letter already includes your NIE number ~ but that's not the same as a TIE card. Most people confuse these two and show up to the wrong appointment.",
          bullets: [
            "NIE (Número de Identificación de Extranjero) ~ the number, not the card",
            "TIE (Tarjeta de Identidad de Extranjero) ~ the physical residence card",
            "Why you need the TIE and what it lets you do",
            "Timeline: when your TIE expires and what happens if you miss renewal",
          ],
          time: "8 min",
          tag: "Core",
          free: false,
          link: null,
        },
        {
          id: "sl06",
          number: "06",
          title: "Booking Your TIE Fingerprint Appointment (Cita Previa)",
          description:
            "The cita previa system is notoriously frustrating. Appointments open at random times and disappear in minutes. This lesson covers every method ~ including the ones most guides don't mention.",
          bullets: [
            "The official booking system at sede.policia.gob.es",
            "Which office (Oficina de Extranjería) to book at and why location matters",
            "Third-party alert tools and browser automation that actually work",
            "What to do when there are no appointments available",
            "Walk-in windows: provinces where this is still possible",
          ],
          time: "12 min",
          tag: "Core",
          free: false,
          link: null,
        },
        {
          id: "sl07",
          number: "07",
          title: "Modelo 790-012: The Fee You Pay Before Your Appointment",
          description:
            "Before your TIE fingerprint appointment, you need to pay a fee and bring the receipt. The Modelo 790-012 cannot be paid online ~ here's exactly how to do it.",
          bullets: [
            "What the 790-012 is and how much it costs (2026 rates)",
            "Downloading and completing the form correctly",
            "Where to pay: any Spanish bank branch, ATM kiosk, or Correos",
            "What happens if you show up without the receipt",
            "Renewal fees vs initial application fees ~ they're different",
          ],
          time: "7 min",
          tag: "How-To",
          free: false,
          link: null,
        },
        {
          id: "sl08",
          number: "08",
          title: "The Padrón: Spain's Municipal Register and Why It Unlocks Everything",
          description:
            "The Padrón is not optional. It's the municipal census record that proves you live at your address ~ and it's required for your TIE appointment, healthcare registration, school enrollment, and more.",
          bullets: [
            "What the Padrón is and why every resident must register",
            "Documents required: rental contract, lease payments, utility bills",
            "Which ayuntamiento (town hall) to go to and what to expect",
            "How long it takes: same-day in some cities, weeks in others",
            "The certificado de empadronamiento: the document you'll need copies of",
            "Updating your Padrón when you move address",
          ],
          time: "11 min",
          tag: "Core",
          free: false,
          link: null,
        },
        {
          id: "sl09",
          number: "09",
          title: "The Certificado Digital: Online Bureaucracy, Finally",
          description:
            "Once you have your TIE and Padrón, the Certificado Digital gives you access to every Spanish government portal. File taxes, check your social security status, and manage residency renewals ~ without queuing.",
          bullets: [
            "Completing the FNMT application with your NIE",
            "The in-person accreditation step: compatible offices in Spain",
            "Installing the certificate correctly on Mac, Windows & mobile",
            "Key portals: Agencia Tributaria, Seguridad Social, SEPE",
            "How to use it to verify your Padrón status and TIE details online",
          ],
          time: "10 min",
          tag: "Digital",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 2 ~ Banking & Money
    // ─────────────────────────────────────────
    {
      id: "banking-money",
      phase: "Phase 2",
      title: "Banking & Money",
      emoji: "🏦",
      description:
        "Opening a Spanish bank account is harder than it should be. This phase covers which banks work for nomads, the digital alternatives, and how to structure your money for life in Spain.",
      accent: "#6b8cba",
      bg: "#dde8f5",
      lessons: [
        {
          id: "sl10",
          number: "10",
          title: "Opening a Spanish Bank Account (Without Going Crazy)",
          description:
            "Most Spanish banks will ask for a NIE, Padrón certificate, passport, and proof of income ~ and still say no. Here's which banks are actually nomad-friendly and how to approach the conversation.",
          bullets: [
            "Sabadell, BBVA, CaixaBank: which is most foreigner-friendly and why",
            "Documents required: NIE, Padrón cert, passport, proof of income",
            "Non-resident accounts: the workaround for when you first arrive",
            "Online banks with Spanish IBANs: Openbank, Bnext, Imagin",
            "Why you need a Spanish IBAN for direct debits and utility contracts",
          ],
          time: "12 min",
          tag: "Core",
          free: false,
          link: null,
        },
        {
          id: "sl11",
          number: "11",
          title: "Wise, Revolut & the Multi-Currency Strategy",
          description:
            "The two-account setup most long-term nomads use: a Spanish bank for local direct debits and an international account for everything else. Here's how to structure it.",
          bullets: [
            "Wise's European IBAN: what it does and doesn't work for",
            "Revolut Premium vs Revolut Metal for international spending",
            "Currency conversion: when to convert and when to hold",
            "The accounts you need for receiving foreign income in Spain",
            "Exchange rate risk: how DNV holders commonly get burned",
          ],
          time: "10 min",
          tag: "How-To",
          free: false,
          link: null,
        },
        {
          id: "sl12",
          number: "12",
          title: "Your DNV Tax Status: Resident or Non-Resident?",
          description:
            "After 183 days in Spain in a calendar year, you become a tax resident. That changes everything. This lesson explains what it means, when it kicks in, and why ignoring it is a costly mistake.",
          bullets: [
            "The 183-day rule and how Spain counts your days",
            "Tax resident vs non-resident: the practical differences",
            "Which income gets taxed in Spain and at what rates",
            "The Model 720: declaration of foreign assets above €50,000",
            "When you must file a Spanish tax return (declaración de la renta)",
          ],
          time: "14 min",
          tag: "Tax",
          free: false,
          link: null,
        },
        {
          id: "sl13",
          number: "13",
          title: "Beckham Law: Spain's Expat Tax Regime ~ Is It for You?",
          description:
            "Under the Beckham Law (Ley Beckham), qualifying foreigners pay a flat 24% tax on Spanish income instead of the progressive rate. You must apply within 6 months of arrival. Here's how to decide.",
          bullets: [
            "Who qualifies: the conditions and the 10-year rule",
            "The 24% flat rate vs standard IRPF bracket comparison",
            "Worldwide income: what's included and what's excluded",
            "The application form (Modelo 149) and 6-month deadline",
            "Why some DNV holders should NOT apply for Beckham Law",
          ],
          time: "13 min",
          tag: "Tax",
          free: false,
          link: null,
        },
        {
          id: "sl14",
          number: "14",
          title: "Setting Up Direct Debits, Standing Orders & Autopay",
          description:
            "In Spain, almost everything runs through bank direct debits ~ utilities, rent, health insurance, and more. Setting this up correctly from day one saves you from service interruptions and late fees.",
          bullets: [
            "How SEPA direct debits work in Spain",
            "Utilities: electricity, gas, water ~ how to set up autopay",
            "Landlords: whether to set up a standing order or pay manually",
            "What happens when a direct debit fails",
            "Digital banking apps: the best UX for managing Spanish accounts",
          ],
          time: "8 min",
          tag: "How-To",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 3 ~ Home & Utilities
    // ─────────────────────────────────────────
    {
      id: "home-utilities",
      phase: "Phase 3",
      title: "Home & Utilities",
      emoji: "🏠",
      description:
        "Finding and securing an apartment in Spain involves documents, negotiations, and deposits that most foreigners aren't prepared for. This phase covers the whole process ~ from search to settled.",
      accent: "#c9a84c",
      bg: "#f5ecd7",
      lessons: [
        {
          id: "sl15",
          number: "15",
          title: "Finding an Apartment: Idealista, Fotocasa & the Reality",
          description:
            "The platforms, the scams, the legitimate agencies, and why landlords often prefer tenants with local guarantors. Here's how to navigate the Spanish rental market as a foreigner.",
          bullets: [
            "Idealista vs Fotocasa: differences, fees, and which to use",
            "Furnished vs unfurnished: what to expect in different cities",
            "Common scams targeting foreigners: how to spot them",
            "What landlords actually want: income proof, NIE, and deposit",
            "Aval bancario: the bank guarantee some landlords require",
            "Real estate agencies (inmobiliarias): pros, cons, and commission",
          ],
          time: "13 min",
          tag: "How-To",
          free: false,
          link: null,
        },
        {
          id: "sl16",
          number: "16",
          title: "Reading Your Spanish Rental Contract: Every Clause Explained",
          description:
            "A Spanish contrato de arrendamiento has specific clauses that differ significantly from what most English speakers expect. This lesson translates the key sections and highlights what to negotiate.",
          bullets: [
            "Duración mínima: the minimum 5-year term law (LAU)",
            "Fianza: the legal deposit (1 month's rent) and when you get it back",
            "Garantía adicional: extra deposits and what's legal",
            "IPC rent increase clause: how your rent can change each year",
            "Desperfectos: who pays for what damage",
            "Notice period: preaviso de salida for both tenant and landlord",
          ],
          time: "15 min",
          tag: "Reference",
          free: false,
          link: null,
        },
        {
          id: "sl17",
          number: "17",
          title: "Setting Up Electricity, Gas & Internet",
          description:
            "Utilities in Spain are either transferred into your name or managed through the landlord. Here's how to set up each service, which providers to use, and how to avoid the most common setup mistakes.",
          bullets: [
            "Electricity: Iberdrola, Endesa, Naturgy ~ regulated vs free market rates",
            "Gas: whether you need it and how to check if your apartment has it",
            "Internet: Movistar, Orange Fibra, MásMóvil ~ speeds and coverage by city",
            "Transferring existing contracts vs creating new ones",
            "The NIE and IBAN you'll need for every utility contract",
            "Typical setup timelines: what can be done same-day",
          ],
          time: "11 min",
          tag: "How-To",
          free: false,
          link: null,
        },
        {
          id: "sl18",
          number: "18",
          title: "Fianza, Comunidad Fees & Hidden Costs You Didn't Expect",
          description:
            "Beyond rent, there are several costs that catch most arrivals off guard. Communidad fees, IBI taxes, basura (rubbish) fees, and agency commissions can add up to thousands.",
          bullets: [
            "Fianza deposit: the legal limit, where it's held, and how to get it back",
            "Comunidad de propietarios: the building community fee",
            "IBI: Spain's property tax ~ who pays it in a rental",
            "Tasa de basura: the waste collection fee",
            "Agency fees: legal limits post-2019 real estate law change",
            "Move-in inventories: why you must photograph every room on day one",
          ],
          time: "9 min",
          tag: "Reference",
          free: false,
          link: null,
        },
        {
          id: "sl19",
          number: "19",
          title: "What 'Furnished' Really Means in Spain",
          description:
            "Amueblado (furnished) in a Spanish listing can mean a full kitchen and beds, or four walls and a light fitting. Here's how to qualify listings and what to negotiate before signing.",
          bullets: [
            "Standard furnished items in Spanish rentals",
            "Kitchen equipment: what's typically included vs what you'll need",
            "Electrodomésticos clause: who maintains appliances",
            "Unfurnished apartments: buying vs shipping furniture in Spain",
            "IKEA Spain, Leroy Merlin, second-hand Facebook Marketplace groups",
          ],
          time: "7 min",
          tag: "How-To",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 4 ~ Healthcare & Wellbeing
    // ─────────────────────────────────────────
    {
      id: "healthcare",
      phase: "Phase 4",
      title: "Healthcare & Wellbeing",
      emoji: "🏥",
      description:
        "Healthcare in Spain is genuinely good ~ if you know how to access it. DNV holders navigate a slightly unusual path to public healthcare. This phase explains what you're entitled to and how to get it.",
      accent: "#8fa38d",
      bg: "#d4e0d3",
      lessons: [
        {
          id: "sl20",
          number: "20",
          title: "Public vs Private Healthcare: What DNV Holders Actually Get",
          description:
            "DNV holders pay into Social Security (Seguridad Social) from day one ~ which means you're entitled to Spain's public healthcare system. Here's how it works and what the waiting times look like in reality.",
          bullets: [
            "Spain's public health system (SNS): how it's structured",
            "DNV + Social Security contributions = public healthcare access",
            "Centro de Salud: your local health centre and how to register",
            "Specialist referrals: the gatekeeping system (médico de cabecera)",
            "Public hospital vs private clinic: when each makes sense",
            "Common frustrations: waiting times, English-speaking doctors",
          ],
          time: "12 min",
          tag: "Core",
          free: false,
          link: null,
        },
        {
          id: "sl21",
          number: "21",
          title: "Applying for Your Tarjeta Sanitaria Individual (TSI)",
          description:
            "The TSI is your Spanish health card. Without it, you'll pay out of pocket at the doctor. Here's how to apply, which documents you need, and what to do if your region makes it difficult.",
          bullets: [
            "TSI application: which office in your comunidad autónoma",
            "Documents required: TIE, Padrón certificate, proof of SS contributions",
            "Processing time: same day in some regions, weeks in others",
            "The provisional certificate: using it while you wait for the card",
            "Moving regions: re-registering your health card at your new centro de salud",
          ],
          time: "10 min",
          tag: "How-To",
          free: false,
          link: null,
        },
        {
          id: "sl22",
          number: "22",
          title: "Private Health Insurance in Spain: Sanitas, Adeslas & What to Look For",
          description:
            "Many DNV holders get private health insurance on top of public access ~ for faster specialist access and English-speaking doctors. Here's what the main providers actually offer.",
          bullets: [
            "Sanitas: the most international-friendly option and why",
            "Adeslas: larger network, lower premiums, less English-speaking doctors",
            "Asisa & Mapfre Salud: regional strengths and weaknesses",
            "What to check: waiting periods, dental, specialist access, and exclusions",
            "Price ranges: what to expect for a 30-40 year old in 2026",
            "DNV insurance requirement: does your policy qualify?",
          ],
          time: "11 min",
          tag: "Reference",
          free: false,
          link: null,
        },
        {
          id: "sl23",
          number: "23",
          title: "Pharmacies, Prescriptions & Day-to-Day Health in Spain",
          description:
            "Spain has one of the most accessible pharmacy systems in Europe. Most medications require a prescription, but pharmacists have more authority here than in many other countries.",
          bullets: [
            "Finding a farmacia: every neighbourhood has one (look for the green cross)",
            "Prescriptions: electronic (receta electrónica) vs paper",
            "Copayment (copago) for public health prescriptions",
            "Medications available over-the-counter that require a prescription elsewhere",
            "Emergency after-hours pharmacies: the farmacias de guardia system",
            "Medical Spanish: key phrases for the pharmacy and doctor",
          ],
          time: "8 min",
          tag: "Daily Life",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 5 ~ Daily Life & Staying Long-Term
    // ─────────────────────────────────────────
    {
      id: "daily-life",
      phase: "Phase 5",
      title: "Daily Life & Staying Long-Term",
      emoji: "☀️",
      description:
        "SIM cards, driving, schooling, Spanish lessons, community, and the milestones of year one. This is the phase most guides skip ~ the part where you stop surviving and start actually living here.",
      accent: "#7a8f90",
      bg: "#e0eaeb",
      lessons: [
        {
          id: "sl24",
          number: "24",
          title: "Spanish SIM Cards: Lowi, Digi, Orange & Which One to Pick",
          description:
            "Spain has excellent mobile coverage and surprisingly competitive prices. Here's which operators are worth it for long-term residents, which require a NIE, and how to set up a Spanish number.",
          bullets: [
            "Digi: the best value SIM for residents in 2026 (and why it's often ignored)",
            "Lowi: Orange's budget arm with full network coverage",
            "Movistar: premium pricing with the best rural coverage",
            "What you need to sign up: NIE or TIE required for contracts",
            "Pre-pay vs contract: which makes sense for your first few months",
            "eSIM options for when you arrive before your TIE appointment",
          ],
          time: "9 min",
          tag: "Daily Life",
          free: false,
          link: null,
        },
        {
          id: "sl25",
          number: "25",
          title: "Driving in Spain: License Exchange & Getting Around",
          description:
            "If you have an EU driving license, you're already sorted. If you have a non-EU license, you have a window to exchange it before you need to sit the Spanish test. Here's the process.",
          bullets: [
            "EU licenses: valid in Spain with no exchange required",
            "Non-EU licenses: the bilateral agreement list and what it means",
            "Philippines, USA, UK: current exchange rules for 2026",
            "The DGT application: Jefatura de Tráfico appointment and documents",
            "Medical certificate (informe médico): where to get it",
            "What happens if you drive on an expired foreign license",
          ],
          time: "10 min",
          tag: "How-To",
          free: false,
          link: null,
        },
        {
          id: "sl26",
          number: "26",
          title: "Schools in Spain: Public, Concertado & International Options",
          description:
            "If you're moving with children, school registration happens through your Padrón address. Here's how the three-tier system works and what to expect from each.",
          bullets: [
            "Public schools (colegios públicos): free, Spanish-language, excellent quality",
            "Concertado schools: publicly subsidised private schools (small fees)",
            "International schools: English-language, IB curriculum, significant cost",
            "Enrollment process: Padrón certificate, medical records, previous school reports",
            "CLIL programs: bilingual public schools in most major cities",
            "Language support: how schools handle children who don't speak Spanish",
          ],
          time: "11 min",
          tag: "Family",
          free: false,
          link: null,
        },
        {
          id: "sl27",
          number: "27",
          title: "Learning Spanish: The Honest Approach for Busy Nomads",
          description:
            "You don't need to be fluent to thrive in Spain ~ but basic Spanish will make every bureaucratic interaction easier and every friendship deeper. Here's a realistic approach that actually fits into a working life.",
          bullets: [
            "B1 Spanish: the level that makes Spain genuinely easier",
            "Escuelas Oficiales de Idiomas: government-funded classes for residents",
            "Apps: what Duolingo, Babbel and Anki are actually good for",
            "Language exchange (intercambio) partners: the fastest free method",
            "Spanish for bureaucracy: the 50 words and phrases that matter most",
            "Regional languages: Catalan, Basque, Galician ~ what to expect where",
          ],
          time: "9 min",
          tag: "Daily Life",
          free: false,
          link: null,
        },
        {
          id: "sl28",
          number: "28",
          title: "Finding Your Community: Networks, Events & Actually Meeting People",
          description:
            "Spain is social ~ but the expat experience can be isolating if you don't know where to look. Here's where the nomad and international communities actually gather in Spain's major cities.",
          bullets: [
            "Meetup.com: the most reliable source of English-speaking events",
            "Internations: structured expat networking, monthly socials",
            "Facebook groups by city: the real-time help communities",
            "Co-working spaces as community hubs (not just desks)",
            "Neighbourhood associations (asociaciones vecinales): integrating locally",
            "The role of sport: padel, running clubs & Sunday markets as social entry points",
          ],
          time: "8 min",
          tag: "Daily Life",
          free: false,
          link: null,
        },
        {
          id: "sl29",
          number: "29",
          title: "Your DNV Renewal at Year 1: What's Changed and What to Prepare",
          description:
            "The DNV renewal is not automatic. You need to demonstrate continued eligibility ~ income thresholds, Social Security payments, and more. Here's what UGE expects and how to prepare 90 days out.",
          bullets: [
            "Renewal timeline: when to start and what the consequences of missing it are",
            "Updated income thresholds for 2026 DNV renewal",
            "Social Security: the contribution record UGE checks",
            "Padrón certificate must be renewed: the 3-month freshness rule",
            "Documents that are the same as your initial application vs what changes",
            "What happens if your renewal is pending when your TIE expires",
          ],
          time: "13 min",
          tag: "Renewal",
          free: false,
          link: null,
        },
        {
          id: "sl30",
          number: "30",
          title: "Building Toward Permanent Residency (Residencia de Larga Duración)",
          description:
            "After 5 years of continuous legal residence, you can apply for permanent residency ~ a much more secure status than the DNV. Here's how the clock runs and what you need to maintain to qualify.",
          bullets: [
            "The 5-year continuous residence requirement and how to track it",
            "What counts as 'continuous': travel limits and permitted absences",
            "Larga Duración application: documents and the EU Blue Card option",
            "The path from Larga Duración to Spanish citizenship (10 years or 2 for PH/LATAM)",
            "Why building this record from day one matters more than most realise",
          ],
          time: "12 min",
          tag: "Long-Term",
          free: false,
          link: null,
        },
      ],
    },
  ],
};

export default softLanding;
