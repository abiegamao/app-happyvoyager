import type { PlaybookConfig } from "./types";

const schengenFirst: PlaybookConfig = {
  slug: "schengen-first",
  badge: "Playbook Pro",
  badgeLabel: "Manila → Amsterdam → Madrid",
  updatedLabel: "Updated 2026",
  heroTitle: "The Schengen First Playbook",
  heroDescription:
    "For Filipinos and other nationalities who need a Schengen visa before they can set foot in Spain. DIY the whole thing with this guide ~ or skip straight to Abie's done-with-you service: she builds your file, you submit and show up.",
  totalTime: "~2.5 hrs",
  modalFeatures: [
    "Done-with-you option ~ Abie builds your file, you submit and appear",
    "21 lessons across 6 phases",
    "Philippines-specific strategy ~ the Netherlands consulate route",
    "Complete document checklist with financial proof breakdown",
    "Cover letter framework that gets first-time applicants approved",
    "VFS Global Manila appointment guide ~ step by step",
    "If refused ~ refusal codes decoded and second-attempt strategy",
    "From Schengen stamp to DNV application ~ the full bridge",
  ],
  finalCtaTitle: "Manila → Amsterdam → Madrid",
  finalCtaDescription:
    "21 lessons. 6 phases. DIY the whole thing or skip straight to Abie's done-with-you service ~ your only jobs are to submit the file she builds and show up to your VFS appointment.",
  catalog: {
    emoji: "🇪🇺",
    tagline: "Get your Schengen visa before you apply for the DNV",
    description:
      "For Filipinos and other nationalities who need a Schengen visa to travel to Spain first ~ the complete Netherlands consulate strategy and document guide.",
    status: "waitlist",
    accent: "#bbcccd",
    bg: "#dde8e9",
  },
  nextPlaybook: {
    slug: "spain-dnv",
    title: "Spain DNV Playbook Pro",
    tagline:
      "Chapter 1 ~ You have the Schengen stamp. Now get the visa that lets you stay. The complete system for Spain's Digital Nomad Visa ~ from eligibility to approval.",
    emoji: "🇪🇸",
    accent: "#e3a99c",
    bg: "#f2d6c9",
    chapterLabel: "Chapter 1",
    phasePreview: [
      { emoji: "🎯", title: "Qualify" },
      { emoji: "📋", title: "Prepare" },
      { emoji: "📤", title: "Apply" },
      { emoji: "✈️", title: "Arrive" },
      { emoji: "🔄", title: "Maintain" },
      { emoji: "🏆", title: "Become Spanish" },
    ],
  },
  phases: [
    // ─────────────────────────────────────────
    // PHASE 0 ~ Do You Need This?
    // ─────────────────────────────────────────
    {
      id: "eligibility",
      phase: "Phase 0",
      title: "Do You Need This?",
      emoji: "🗺️",
      description:
        "Before you spend a single hour on paperwork, confirm whether you need a Schengen visa ~ and understand why it's not the obstacle it looks like.",
      accent: "#bbcccd",
      bg: "#dde8e9",
      lessons: [
        {
          id: "sf00",
          number: "00",
          title: "The Fast Track: Skip This Guide and Let Abie Handle It",
          description:
            "You don't have to read this entire playbook. If you'd rather skip the paperwork and strategy ~ Abie builds your complete application file, and your only two jobs are to submit the documents at VFS and show up to your appointment.",
          bullets: [
            "What done-with-you means: Abie prepares your full document file, cover letter, and application strategy ~ you don't figure it out alone",
            "Your two jobs: submit the file at your VFS appointment, and appear at the consulate",
            "What's not included: Abie does not attend the appointment or submit on your behalf ~ the in-person steps are yours",
            "Who it's best for: first-time Schengen applicants, anyone who's been refused, and nomads who don't want to spend hours on paperwork",
            "How to get started: book a strategy call ~ bring your passport, timeline, and current situation",
            "Still want to DIY? Continue to Lesson 01 ~ every lesson in this playbook applies",
          ],
          time: "4 min",
          tag: "Fast Track",
          free: true,
          link: "/booking",
        },
        {
          id: "sf01",
          number: "01",
          title: "Which Nationalities Need a Schengen Visa (and Why It's Not a Disadvantage)",
          description:
            "Filipinos, Indians, and citizens of over 100 countries need a Schengen visa before setting foot in Spain. This lesson reframes the process ~ it's a known, solvable step that actually strengthens your DNV application.",
          bullets: [
            "The current Schengen visa-required nationality list",
            "Why ETIAS (the new travel authorization) is different and what it means",
            "The 3 types of Schengen applicants: tourist, transit, and DNV-track",
            "Why a clean Schengen history strengthens your future DNV file",
            "Who this playbook is specifically for",
          ],
          time: "8 min",
          tag: "Eligibility",
          free: true,
          link: null,
        },
        {
          id: "sf02",
          number: "02",
          title: "What a Schengen Visa Actually Gives You + Free Day Calculator",
          description:
            "A Schengen short-stay Type C visa isn't just a ticket to Europe ~ it's evidence of financial stability, travel intent, and consulate trust. Includes access to our free Schengen day counter tool.",
          bullets: [
            "The 90 days in 180 days rule: what you can actually do with it",
            "Schengen stamp as travel history: why consulates value it",
            "Single-entry vs multiple-entry visas: how to request multiple and why it matters",
            "Type C vs Type D: the difference between Schengen and Spain long-stay",
            "Using your Schengen days strategically while your DNV is being processed",
            "Free tool: use our Schengen Day Calculator to count your days correctly ~ no spreadsheet needed",
          ],
          time: "9 min",
          tag: "Free Tool",
          free: true,
          link: "/schengen-calculator",
        },
        {
          id: "sf03",
          number: "03",
          title: "The Philippines-to-Spain DNV Strategy: Why Schengen First Works",
          description:
            "Filipino DNV applicants face a specific challenge: applying from Manila with limited Schengen history. This lesson explains why getting a Schengen visa first ~ through the Netherlands ~ is the smartest move.",
          bullets: [
            "The typical Filipino DNV journey (and where it stalls without travel history)",
            "Why strong Schengen history helps ~ and what consulates are actually looking for",
            "The Netherlands route: why it's the top first Schengen for Filipinos",
            "Timeline: how to sequence your Schengen application with DNV preparation",
            "What Abie sees most often when Filipinos come to her for help",
          ],
          time: "10 min",
          tag: "Strategy",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 1 ~ Choose Your Consulate
    // ─────────────────────────────────────────
    {
      id: "choose-consulate",
      phase: "Phase 1",
      title: "Choose Your Consulate",
      emoji: "🏛️",
      description:
        "Not all Schengen consulates are equal ~ and you don't have to apply from Manila. For Filipinos who've been outside the Philippines for 6+ months, you can apply from anywhere in the world. Here's the full Netherlands route strategy.",
      accent: "#7a8f90",
      bg: "#e0eaeb",
      lessons: [
        {
          id: "sf04",
          number: "04",
          title: "Why the Netherlands Is the Top Choice for Filipinos",
          description:
            "Abie didn't apply for her Netherlands Schengen visa from Manila ~ she applied from Bosnia, and later from Washington DC. If you've been outside the Philippines for 6+ months, you can apply from wherever you are. Here's how that works ~ and why the Netherlands is still the best consulate to go through.",
          bullets: [
            "The 6-month rule: if you've been outside the Philippines for 6+ months, you qualify as a long-term traveler and can apply at any Netherlands consulate worldwide",
            "Abie's route: applied from Bosnia (Sarajevo) and from Washington DC ~ no return to Manila required",
            "Why this matters for nomads already on the road when they start their DNV journey",
            "Netherlands consulate track record for Filipino applicants ~ approval patterns and clear requirements",
            "Applying outside your home country: what extra documents the consulate may ask for",
            "Amsterdam as a legitimate destination ~ why your itinerary holds up and why it's worth visiting",
          ],
          time: "11 min",
          tag: "Strategy",
          free: true,
          link: null,
        },
        {
          id: "sf05",
          number: "05",
          title: "Netherlands vs Spain vs Other Schengen: How to Compare",
          description:
            "Other Schengen consulates are available in Manila, but they're not all equal. This lesson explains which to consider, which to avoid, and the non-negotiable rule about applying through your main destination.",
          bullets: [
            "The main principle: apply through the country of longest stay",
            "Spain's consulate in Manila: when it makes sense as the direct route",
            "France, Italy, Germany: their requirements and Filipino applicant experience",
            "Schengen portability: once approved, you can visit all 29 member states",
            "One trip, multiple countries: how to calculate 'main destination' correctly",
          ],
          time: "10 min",
          tag: "Comparison",
          free: false,
          link: null,
        },
        {
          id: "sf06",
          number: "06",
          title: "Timing Your Application: When to Apply Before Your DNV",
          description:
            "There's a smart way to sequence your Schengen application and your DNV preparation. Apply too early and your visa expires before you're ready. Too late and you miss the key travel window.",
          bullets: [
            "The ideal lead time: how far in advance to apply for your Schengen",
            "Processing time for Netherlands via VFS Manila: current averages",
            "Aligning your Schengen validity window with your DNV application date",
            "Using the trip itself to strengthen your DNV application file",
            "Building the Spain portion of your itinerary around a DNV consultation",
          ],
          time: "10 min",
          tag: "Planning",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 2 ~ Build Your Application File
    // ─────────────────────────────────────────
    {
      id: "build-application",
      phase: "Phase 2",
      title: "Build Your Application File",
      emoji: "📋",
      description:
        "The Netherlands consulate has specific requirements ~ and the quality of your file is the biggest factor between approval and refusal. This phase walks through every document.",
      accent: "#c47c5a",
      bg: "#f5e6dc",
      lessons: [
        {
          id: "sf07",
          number: "07",
          title: "The Netherlands Schengen Visa Document Checklist",
          description:
            "The full list of documents required for a Netherlands Type C visa application through VFS Manila ~ with notes on what's flexible and what's strictly required.",
          bullets: [
            "Valid passport: 3+ months validity beyond intended stay, 2 blank pages",
            "Completed Schengen application form (online or VFS form)",
            "Passport photos: size requirements and digital vs print",
            "Travel insurance: minimum €30,000 medical cover, all Schengen countries",
            "Proof of accommodation: hotel bookings, Airbnb, or host invitation letter",
            "Round-trip flight booking confirmation (not fully paid tickets ~ see Lesson 11)",
            "Proof of financial means: bank statements and supporting documents",
          ],
          time: "12 min",
          tag: "Checklist",
          free: true,
          link: null,
        },
        {
          id: "sf08",
          number: "08",
          title: "Financial Proof: Bank Statements, ITR & What Consulates Want to See",
          description:
            "Financial proof is where most Filipino applications fall short. Consulates want stability, not just a balance. This lesson explains exactly what a strong financial file looks like.",
          bullets: [
            "The daily minimum: how much the Netherlands expects per day in the Schengen area",
            "Bank statement requirements: 3 months, original certified, clear balance history",
            "What 'stable' looks like: regular deposits, no erratic movements before applying",
            "ITR (Income Tax Return): BIR Form 2316 or 1700 and why it matters",
            "Employment certificate vs freelance vs business income: different documents for different situations",
            "What to do if your balance looks thin: legal ways to strengthen your financial profile",
          ],
          time: "14 min",
          tag: "Documents",
          free: false,
          link: null,
        },
        {
          id: "sf09",
          number: "09",
          title: "Cover Letter Strategy: Write One That Gets Approved",
          description:
            "The cover letter is optional ~ but a strong one turns a pile of documents into a coherent story. It directly addresses weak points before the officer even looks for them. Here's the framework.",
          bullets: [
            "Why a cover letter matters even when it's not explicitly required",
            "The three things every Schengen cover letter must address",
            "Ties to home: the most important thing to establish for first-time applicants",
            "Remote work income: how to present it without triggering work-visa concerns",
            "The specific language consulate officers respond to",
            "Length, tone, and what to avoid ~ mistakes that hurt applications",
          ],
          time: "13 min",
          tag: "Documents",
          free: false,
          link: null,
        },
        {
          id: "sf10",
          number: "10",
          title: "Travel Insurance: Requirements, Minimums & What to Actually Buy from Manila",
          description:
            "Schengen travel insurance is mandatory ~ and the requirements are specific. Here's what qualifies, which policies fail the test, and the options Filipinos can buy from Manila.",
          bullets: [
            "Minimum coverage: €30,000 medical cover for all Schengen countries",
            "Coverage period must match your entire intended travel dates exactly",
            "Philippines-based insurers that issue valid Schengen travel insurance",
            "International options: AXA, Allianz, World Nomads ~ policy comparison",
            "Medical evacuation: required or just recommended?",
            "Keeping documentation clean and clear for VFS submission",
          ],
          time: "9 min",
          tag: "Documents",
          free: false,
          link: null,
        },
        {
          id: "sf11",
          number: "11",
          title: "Flight Bookings & Hotel Reservations: What to Book (and What Not to Pay For)",
          description:
            "Consulates want to see bookings ~ but you should never pay in full before your visa is approved. This lesson explains the tools for getting credible itineraries without financial risk.",
          bullets: [
            "Flight reservation vs confirmed booking: the difference that saves you money",
            "Free tools for generating flight reservations for visa purposes",
            "Hotel booking confirmation: Booking.com free cancellation as the standard method",
            "Airbnb for accommodation proof: what's accepted and what isn't",
            "Building your 10-14 day Netherlands + Spain itinerary document",
            "Why your itinerary should include Spain ~ and how to frame it cleanly",
          ],
          time: "10 min",
          tag: "How-To",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 3 ~ The VFS Application
    // ─────────────────────────────────────────
    {
      id: "vfs-application",
      phase: "Phase 3",
      title: "The VFS Appointment",
      emoji: "🏢",
      description:
        "VFS Global handles Netherlands visa applications in Manila. The appointment, the document submission, the biometrics ~ this phase walks through every step of the center experience.",
      accent: "#c9a84c",
      bg: "#f5ecd7",
      lessons: [
        {
          id: "sf12",
          number: "12",
          title: "Booking Your VFS Appointment: Step by Step",
          description:
            "VFS Global Manila handles Netherlands Schengen visa applications. Appointments book out ~ here's how to find slots, navigate the platform, and prepare for the day.",
          bullets: [
            "The VFS Global Philippines website and the Netherlands visa category",
            "Creating your account and finding available appointment slots",
            "How far in advance to book: current availability patterns in Manila",
            "VFS Premium Lounge: what it costs and whether it's worth it",
            "The two-step process: what to bring vs what to submit online",
            "Confirmation emails and SMS: what to save for appointment day",
          ],
          time: "10 min",
          tag: "How-To",
          free: true,
          link: null,
        },
        {
          id: "sf13",
          number: "13",
          title: "What Happens at Your VFS Appointment",
          description:
            "The VFS appointment is not an interview ~ it's a document submission and biometric collection. Knowing exactly what to expect removes the anxiety and helps you arrive prepared.",
          bullets: [
            "What to bring: your complete file, payment, booking confirmation, and passport",
            "The check-in process and waiting area",
            "Document review: what VFS staff check before forwarding to the consulate",
            "Biometrics: fingerprints and photo ~ what the process looks like",
            "Application fee payment: current amounts, accepted payment methods, receipt",
            "Passport collection: how and when you get it back",
            "If VFS rejects your file at submission: what to do about missing documents on the day",
          ],
          time: "11 min",
          tag: "How-To",
          free: false,
          link: null,
        },
        {
          id: "sf14",
          number: "14",
          title: "After Submission: Tracking, Processing & What No One Tells You",
          description:
            "Once your application is with the consulate, the wait begins. Most people don't know what's actually happening ~ or when to worry. This lesson explains the process from submission to decision.",
          bullets: [
            "Processing timeline: typical Netherlands consulate turnaround from Manila",
            "The VFS tracking portal: how to check your application status",
            "What 'under process' means (and why it stays there for a while)",
            "When to follow up ~ and how to do it without hurting your application",
            "A request for additional documents: what it looks like and how to respond",
            "Approval notification: email, SMS, and VFS portal update ~ what to expect",
          ],
          time: "9 min",
          tag: "Process",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 4 ~ Abie's Schengen Assistance
    // ─────────────────────────────────────────
    {
      id: "abie-assistance",
      phase: "Phase 4",
      title: "Abie's Schengen Assistance",
      emoji: "🤝",
      description:
        "Abie offers a done-with-you Schengen visa preparation service for Filipinos ~ document review, cover letter guidance, and a strategy call. This phase covers what's included, refusal recovery, and how to book.",
      accent: "#8fa38d",
      bg: "#d4e0d3",
      lessons: [
        {
          id: "sf15",
          number: "15",
          title: "If Your Application Is Refused: Refusal Codes Decoded & Second-Attempt Strategy",
          description:
            "A refusal is not a dead end. Understanding why applications get refused ~ and what to do next ~ makes the path to a second application much clearer.",
          bullets: [
            "Why consulates refuse Schengen applications: the official code list",
            "The most common refusal reasons for Filipino first-time applicants",
            "Reading your refusal letter: what the codes actually mean",
            "The appeals process: timelines, costs, and realistic success rates",
            "Strengthening your application for a second attempt",
            "How soon you can reapply after a refusal ~ and what to change",
          ],
          time: "11 min",
          tag: "Risk Management",
          free: true,
          link: null,
        },
        {
          id: "sf16",
          number: "16",
          title: "Abie's Schengen Visa Service: Document Review, Strategy & Cover Letter",
          description:
            "For Filipinos who want expert eyes on their application before it goes in. Here's exactly what Abie's Schengen assistance service covers ~ and how to work with her.",
          bullets: [
            "Who it's for: first-time Schengen applicants and those who've been refused",
            "What's included: document checklist review, cover letter guidance, strategy call",
            "What's not included: Abie reviews and prepares ~ she does not submit on your behalf",
            "Turnaround times and how to fit within your VFS appointment timeline",
            "What Abie has seen go wrong in Filipino Schengen applications",
            "How to book and what to prepare before your first session",
          ],
          time: "6 min",
          tag: "Service",
          free: false,
          link: "/booking",
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 5 ~ From Schengen Stamp to Spain DNV
    // ─────────────────────────────────────────
    {
      id: "schengen-to-dnv",
      phase: "Phase 5",
      title: "Schengen Stamp to Spain DNV",
      emoji: "🇪🇸",
      description:
        "Your Schengen visa is approved. Your Netherlands trip is done. Now the real journey begins ~ and when you eventually land in Spain on your DNV, the declaración de entrada is the first thing you file. This phase bridges the full gap from Schengen stamp to settled in Spain.",
      accent: "#e3a99c",
      bg: "#f2d6c9",
      lessons: [
        {
          id: "sf17",
          number: "17",
          title: "Your Schengen Visa Is Approved ~ Now What?",
          description:
            "The moment your passport comes back with a Netherlands Schengen visa, the path to Spain opens up. Here's how to read your visa and use this window effectively.",
          bullets: [
            "Reading your visa: validity dates, entry type (single vs multiple), permitted stay",
            "What a multiple-entry visa allows you to do across Schengen",
            "How to request a multiple-entry visa at application ~ and why it changes everything",
            "Building your travel history: why your first Schengen trip sets the tone",
            "Planning your Netherlands + Spain trip: the smart dual-purpose itinerary",
          ],
          time: "8 min",
          tag: "Next Steps",
          free: true,
          link: null,
        },
        {
          id: "sf18",
          number: "18",
          title: "Using Your Schengen Trip to Strengthen Your DNV Application",
          description:
            "A well-planned Schengen trip does double duty: you satisfy the Netherlands visa and build the travel record that supports your DNV application. Here's how to make every day count.",
          bullets: [
            "Time in Spain: what the DNV consulate sees when you have Spain travel history",
            "Meeting with Abie in Spain: why strategy sessions from Spain land differently",
            "Proof of ties to the Philippines: what to keep documenting while you're away",
            "What NOT to do: activities that could complicate your future DNV application",
            "Post-trip documentation: what to save and organize for your DNV file",
          ],
          time: "10 min",
          tag: "Strategy",
          free: false,
          link: null,
        },
        {
          id: "sf19",
          number: "19",
          title: "Applying for the Spain DNV from Manila: How Your Schengen History Fits In",
          description:
            "When it's time to apply for the DNV, your Schengen travel history becomes an asset. And once you land in Spain on that Type D visa, your very first task ~ before Padrón, before TIE ~ is the declaración de entrada.",
          bullets: [
            "Where Schengen travel history appears in the DNV application",
            "How clean Schengen compliance signals reliability to consulates",
            "DNV from Manila: the Spanish Embassy route vs the UGE track",
            "The declaración de entrada: the arrival declaration you must file within 30 days of entering Spain on your Type D visa ~ at the local Extranjería office",
            "Why most guides skip this step ~ and what happens if you miss the window",
            "First steps to start your DNV file before you leave Spain",
          ],
          time: "11 min",
          tag: "DNV Strategy",
          free: false,
          link: null,
        },
        {
          id: "sf20",
          number: "20",
          title: "The 90/180 Rule and Your DNV Timeline",
          description:
            "Once your DNV is approved, your Schengen relationship changes completely. But during the wait, managing your 90/180 days correctly is essential. Here's how to stay clean.",
          bullets: [
            "How the 90/180 rule applies during your DNV waiting period",
            "Building a safe Schengen calendar around your expected DNV approval date",
            "What to do if DNV processing runs longer than your Schengen allows",
            "Non-Schengen Europe: your backstop while you wait",
            "From Type C to Type D: how your movement rules change on DNV approval",
          ],
          time: "9 min",
          tag: "Planning",
          free: false,
          link: null,
        },
      ],
    },
  ],
};

export default schengenFirst;
