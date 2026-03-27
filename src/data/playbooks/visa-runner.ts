import type { PlaybookConfig } from "./types";

const visaRunner: PlaybookConfig = {
  slug: "visa-runner",
  badge: "Playbook Pro",
  badgeLabel: "Schengen → Balkans → Spain",
  updatedLabel: "Updated 2026",
  heroTitle: "The Visa Runner's Playbook",
  heroDescription:
    "The Schengen rules decoded, a country-by-country Balkans field guide, and the honest account of 8 months of visa running while waiting for Spain ~ written by someone who actually lived it.",
  totalTime: "~4 hrs",
  modalFeatures: [
    "25 lessons across 5 phases",
    "90/180 rule decoded with real examples",
    "Balkans field guide ~ Serbia, Montenegro, Albania & Bosnia",
    "Cultural context ~ history, identity & what not to say",
    "Abie's 8-month visa run account ~ the honest version",
    "Abie-Approved Stays ~ partner landlords & extended-stay rates",
    "Schengen visa application step by step",
    "What changes the moment you hold a Spanish TIE card",
  ],
  finalCtaTitle: "Schengen → Balkans → Spain",
  finalCtaDescription:
    "25 lessons. 5 phases. From counting Schengen days to living freely in Europe ~ with a full Balkans field guide, cultural context, and curated accommodation partnerships from someone who was there for 8 months.",
  catalog: {
    emoji: "🛂",
    tagline: "90/180 decoded ~ travel freely without the panic",
    description:
      "The Schengen rules, the Balkans visa run strategy, and Abie's 8-month field guide from the road ~ everything you need to travel smart while you wait for Spain.",
    status: "waitlist",
    accent: "#6b8cba",
    bg: "#dde8f5",
  },
  phases: [
    // ─────────────────────────────────────────
    // PHASE 1 ~ The 90/180 Rule
    // ─────────────────────────────────────────
    {
      id: "schengen-rules",
      phase: "Phase 1",
      title: "The 90/180 Rule",
      emoji: "🗓️",
      description:
        "Understand exactly how the rule works, how to count your days without making expensive mistakes, and what the consequences of overstaying actually look like.",
      accent: "#6b8cba",
      bg: "#dde8f5",
      lessons: [
        {
          id: "vr01",
          number: "01",
          title: "What the 90/180 Rule Actually Means",
          description:
            "Most people misunderstand this rule and either panic unnecessarily or overstay accidentally. This lesson breaks it down with real examples so you always know exactly where you stand.",
          bullets: [
            "The rolling 180-day window ~ how it actually works",
            "Why it's not a simple 'reset every 6 months'",
            "The difference between Schengen days and calendar days",
            "How border agents calculate your days if questioned",
          ],
          time: "10 min",
          tag: "Foundation",
          free: true,
          link: null,
        },
        {
          id: "vr02",
          number: "02",
          title: "How to Count Your Days Correctly",
          description:
            "The calculation is deceptively tricky ~ entry and exit days both count, and the 180-day window rolls forward daily. Learn the method that never fails.",
          bullets: [
            "Step-by-step counting method with worked examples",
            "Entry day vs. exit day ~ which count and why",
            "How to use the EU's official Schengen calculator",
            "Common counting mistakes that lead to accidental overstays",
            "Building a simple tracking spreadsheet",
          ],
          time: "12 min",
          tag: "How-To",
          free: true,
          link: "/schengen-calculator",
        },
        {
          id: "vr03",
          number: "03",
          title: "Which Countries Count (and Which Don't)",
          description:
            "Not every European country is Schengen. Knowing which ones aren't is the key to stretching your time in Europe without burning days.",
          bullets: [
            "Full list of the 29 Schengen member states",
            "Non-Schengen EU countries ~ where your days don't count",
            "Non-EU countries on Schengen's eastern edge",
            "Why the Balkans are the visa runner's best friend",
            "The UK, Ireland, Cyprus ~ the overlooked options",
          ],
          time: "8 min",
          tag: "Reference",
          free: true,
          link: null,
        },
        {
          id: "vr04",
          number: "04",
          title: "What Happens If You Overstay",
          description:
            "The consequences range from a warning to a multi-year ban. This lesson explains exactly what border agents can see, what gets flagged, and how to handle it if it happens.",
          bullets: [
            "The official consequences by overstay length",
            "Entry bans ~ how long, how common, how to check",
            "What's recorded in the SIS (Schengen Information System)",
            "How overstays affect future Spain visa applications",
            "If it happens ~ what to say and what to do",
          ],
          time: "10 min",
          tag: "Risk Management",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 2 ~ The Waiting Game
    // ─────────────────────────────────────────
    {
      id: "waiting-game",
      phase: "Phase 2",
      title: "The Waiting Game",
      emoji: "⏳",
      description:
        "Managing your Schengen days while a Spain visa application is pending is a real logistical puzzle. This phase is the strategic playbook for the in-between.",
      accent: "#c9a84c",
      bg: "#f5ecd7",
      lessons: [
        {
          id: "vr05",
          number: "05",
          title: "How Long Spain Visas Actually Take",
          description:
            "Processing times are unpredictable and consulate-dependent. This lesson sets realistic expectations and helps you build a Schengen timeline around the wait.",
          bullets: [
            "DNV processing times by consulate ~ 2025/2026 data",
            "NLV processing times and what delays them",
            "Why second applications take longer (and what to do about it)",
            "How to track your application status",
            "Building a buffer into your Schengen calendar",
          ],
          time: "10 min",
          tag: "Planning",
          free: false,
          link: null,
        },
        {
          id: "vr06",
          number: "06",
          title: "Strategic Exits ~ Timing Your Schengen Reset",
          description:
            "Leaving Schengen at the right moment ~ not too early, not too late ~ is a skill. This lesson teaches you to plan exits intentionally so you never waste days.",
          bullets: [
            "How to calculate your ideal exit date",
            "Timing exits around consulate appointments",
            "Flying vs. overland ~ what gets stamped and what doesn't",
            "The 'buffer days' strategy for nervous travelers",
            "Building a 6-month Schengen calendar",
          ],
          time: "12 min",
          tag: "Strategy",
          free: false,
          link: null,
        },
        {
          id: "vr07",
          number: "07",
          title: "Non-Schengen Europe ~ Your Safety Valve",
          description:
            "A handful of European countries let you pause your Schengen clock completely. These are the best ones for Spain applicants ~ close, affordable, and easy to enter.",
          bullets: [
            "The complete non-Schengen European list",
            "Best options by cost, flight connections, and visa-free access",
            "How long you can stay in each without a visa",
            "Remote work infrastructure ~ WiFi, coworking, SIM cards",
            "Which to avoid and why",
          ],
          time: "10 min",
          tag: "Destination Guide",
          free: false,
          link: null,
        },
        {
          id: "vr08",
          number: "08",
          title: "The Digital Nomad's Schengen Calendar",
          description:
            "A practical framework for planning your year around 90/180 constraints without losing your mind ~ or your productivity.",
          bullets: [
            "The 'base + escape' model explained",
            "Quarterly planning template for Schengen travelers",
            "How to handle uncertainty in your Spain application timeline",
            "Tax residency implications of extended time outside Spain",
            "Downloadable Schengen tracking spreadsheet",
          ],
          time: "15 min",
          tag: "Framework",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 3 ~ The Balkans Field Guide
    // ─────────────────────────────────────────
    {
      id: "balkans-field-guide",
      phase: "Phase 3",
      title: "The Balkans Field Guide",
      emoji: "🗺️",
      description:
        "Abie spent 8 months visa running through the Balkans between Spain applications. This is the unfiltered, practical guide she wishes she'd had before she went.",
      accent: "#c47c5a",
      bg: "#f5e6dc",
      lessons: [
        {
          id: "vr09",
          number: "09",
          title: "The Balkans ~ Where Your Schengen Clock Stops",
          description:
            "The Balkans aren't just a backup plan ~ for many Spain applicants they're the smartest possible move. Here's the full picture of why, and what to expect before you go.",
          bullets: [
            "Non-Schengen = zero days burned, no matter how long you stay",
            "Visa-free access for most nationalities (check yours here)",
            "Cost of living ~ 40-60% cheaper than Western Europe",
            "Flight connections back to Spain for consulate appointments",
            "The digital nomad infrastructure that actually exists now",
            "What nobody tells you before your first Balkans trip",
          ],
          time: "12 min",
          tag: "Overview",
          free: true,
          link: null,
        },
        {
          id: "vr-stays",
          number: "10",
          title: "Abie-Approved Stays ~ The Visa Runner's Accommodation Guide",
          description:
            "Before you pick a country, know where you can actually stay. Curated Airbnb partnerships across the Balkans ~ vetted landlords, extended-stay rates, and none of the bad surprises. These are the hosts Abie personally recommends to visa runners.",
          bullets: [
            "Why monthly rates beat nightly Airbnb prices by 30-50%",
            "What to look for in a host for a 1-3 month stay",
            "How to negotiate directly with landlords (scripts included)",
            "Abie's partner properties in Serbia, Tirana, Sarajevo & Podgorica",
            "How to book through the Happy Voyager partnership for reader discounts",
            "Red flags to avoid when booking extended stays in the Balkans",
          ],
          time: "12 min",
          tag: "Partner Resource",
          free: false,
          link: null,
        },
        {
          id: "vr10",
          number: "11",
          title: "Serbia ~ Cheap Coffee & Zero Regrets",
          description:
            "Everyone talks about Belgrade, but Abie spent the most time in Niš ~ Serbia's third city, birthplace of Constantine, and one of the most underrated bases in the Balkans. Cheaper, calmer, and completely addictive.",
          bullets: [
            "Why Niš, not Belgrade ~ the honest case for going south",
            "Cost of living breakdown ~ accommodation, food, transport",
            "The Niš food scene: why the mešana here is on another level",
            "Getting around ~ buses, the fortress walk, day trips",
            "Banking & SIM cards as a foreigner",
            "How long you can stay without registering",
            "What Abie's days in Niš actually looked like",
          ],
          time: "15 min",
          tag: "Destination Guide",
          free: false,
          link: null,
        },
        {
          id: "vr11",
          number: "12",
          title: "Montenegro ~ One Week Beautiful, Two Weeks Broke",
          description:
            "Montenegro is stunning but pricier than the rest of the Balkans ~ especially the coast. Worth it for the right trip, not ideal for a long base.",
          bullets: [
            "Coastal vs. inland ~ Kotor vs. Podgorica vs. Herceg Novi",
            "Why it's more expensive and when that's okay",
            "Best months to go (crowds and prices swing wildly)",
            "Nomad infrastructure ~ what's good, what's lacking",
            "Abie's honest take: when to choose Montenegro and when not to",
          ],
          time: "12 min",
          tag: "Destination Guide",
          free: false,
          link: null,
        },
        {
          id: "vr12",
          number: "13",
          title: "Albania ~ Where the Adriatic Gets Affordable",
          description:
            "Albania is cheap, beautiful, increasingly connected, and almost entirely overlooked by nomads. It deserves way more attention than it gets.",
          bullets: [
            "Tirana as a base ~ what works and what doesn't",
            "The Albanian Riviera for a slower pace",
            "Cost of living: the most affordable in the Balkans",
            "Getting around ~ rental cars, buses, ferries",
            "What surprised Abie most about Albania",
            "Safety, language, and practical concerns addressed",
          ],
          time: "12 min",
          tag: "Destination Guide",
          free: false,
          link: null,
        },
        {
          id: "vr13",
          number: "14",
          title: "Bosnia & Herzegovina ~ Two Days Planned, Two Weeks Stayed",
          description:
            "Sarajevo is one of the most underrated cities in Europe ~ Ottoman architecture, world-class coffee culture, and surprisingly fast WiFi. BiH deserves its own chapter.",
          bullets: [
            "Sarajevo ~ history, culture, incredible food, and surprising WiFi",
            "Best neighborhoods to stay in ~ Baščaršija, Grbavica, Ilidža",
            "Monthly cost breakdown ~ one of the cheapest in the Balkans",
            "Mostar as a secondary base or a weekend escape",
            "Banking, SIM cards, and remote work infrastructure",
            "Bosnia & Herzegovina visa rules and how long you can stay",
          ],
          time: "12 min",
          tag: "Destination Guide",
          free: false,
          link: null,
        },
        {
          id: "vr-culture",
          number: "15",
          title: "Read the Room ~ Balkan History, Identity & What Not to Say",
          description:
            "The 1990s are closer than you think. Identity ~ nationality, language, religion, borders ~ is deeply personal here. This lesson gives you the cultural context to move through the Balkans with genuine respect, not just tourist politeness.",
          bullets: [
            "The 1990s wars ~ what happened, why it still matters, and how recent it actually feels",
            "Kosovo ~ the most sensitive topic in the region and how to navigate it with both Serbians and Albanians",
            "Bosniak ≠ Bosnian ~ the identity distinctions in BiH that really matter",
            "The language question ~ Serbian, Croatian, Bosnian, Montenegrin are NOT the same (don't say they are)",
            "Faith and identity ~ how religion and nationality are intertwined in ways that surprise outsiders",
            "What to call things ~ the country names, demonyms, and borders that locals care about",
            "The one question you should never ask ~ and better ones to ask instead",
          ],
          time: "15 min",
          tag: "Cultural Context",
          free: false,
          link: null,
        },
        {
          id: "vr14",
          number: "16",
          title: "Life as a Visa Runner ~ The Honest Account",
          description:
            "8 months. Multiple countries. Two Spain applications. This is the real story ~ the rhythm, the frustrations, the unexpected wins, and what Abie would do differently.",
          bullets: [
            "How the 8 months actually played out, country by country",
            "Building a routine when you have no fixed base",
            "The costs nobody accounts for (flights, deposits, last-minute moves)",
            "How to stay productive when everything is temporary",
            "What Abie would do differently knowing what she knows now",
            "The moment she stopped fighting it and started enjoying it",
          ],
          time: "20 min",
          tag: "Personal Account",
          free: false,
          link: null,
        },
        {
          id: "vr15",
          number: "17",
          title: "The Mental Game of Waiting Between Applications",
          description:
            "Nobody talks about this part. The second application is harder emotionally than the first ~ more uncertainty, more at stake, and less novelty to distract you.",
          bullets: [
            "Why the second application is harder than the first",
            "Managing uncertainty without letting it run your life",
            "How to build enough stability to keep working",
            "Community ~ finding other people in the same situation",
            "When to get professional help vs. DIY your application",
            "What Abie did to stay grounded during the long wait",
          ],
          time: "15 min",
          tag: "Mindset",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 4 ~ Getting a Schengen Visa
    // ─────────────────────────────────────────
    {
      id: "schengen-visa",
      phase: "Phase 4",
      title: "Getting a Schengen Visa",
      emoji: "📋",
      description:
        "If your nationality requires a Schengen visa to enter Europe, this phase walks you through exactly how to get one ~ and where Abie's service fits if you want it done for you.",
      accent: "#7a8f90",
      bg: "#e0eaeb",
      lessons: [
        {
          id: "vr16",
          number: "18",
          title: "Do You Need a Schengen Visa?",
          description:
            "Visa requirements depend entirely on your passport. This lesson helps you confirm your status quickly and understand what it means for your Spain journey.",
          bullets: [
            "Visa-free nationalities ~ the full current list",
            "Which nationalities require a Schengen visa",
            "ETIAS ~ the new pre-travel authorisation (launching 2025)",
            "How your passport affects which Spanish consulate you apply through",
            "What a Schengen visa does (and doesn't) give you",
          ],
          time: "8 min",
          tag: "Eligibility",
          free: false,
          link: null,
        },
        {
          id: "vr17",
          number: "19",
          title: "Type C vs Type D ~ Understanding the Difference",
          description:
            "The Schengen short-stay visa (Type C) and Spain's long-stay visas (Type D) are completely different. Confusing them is one of the most common mistakes Spain applicants make.",
          bullets: [
            "Type C ~ what it is, who it's for, how long it lasts",
            "Type D ~ Spain's long-stay visas (DNV, NLV, student, etc.)",
            "Why holding a Type D exempts you from the 90/180 rule in Spain",
            "How Type D affects your movement in other Schengen countries",
            "The transition period between visa approval and TIE card",
          ],
          time: "10 min",
          tag: "Visa Types",
          free: false,
          link: null,
        },
        {
          id: "vr18",
          number: "20",
          title: "The Schengen Visa Application ~ Step by Step",
          description:
            "The document list, the appointment booking process, the interview, and the wait ~ everything you need to do it yourself if you choose to.",
          bullets: [
            "Required documents (with checklist)",
            "How to find and book your consulate appointment",
            "The application form ~ what they're looking for",
            "Travel insurance requirements ~ minimums and what to buy",
            "Processing times and what to do while you wait",
            "If your application is refused ~ next steps",
          ],
          time: "18 min",
          tag: "Application Guide",
          free: false,
          link: null,
        },
        {
          id: "vr19",
          number: "21",
          title: "Abie's Schengen Visa Service ~ What's Included",
          description:
            "If you'd rather have someone who's done this many times handle the paperwork and strategy, here's exactly what Abie's service covers and how to book it.",
          bullets: [
            "What's included in the service (document review, prep, strategy call)",
            "Who it's best for ~ when DIY makes sense vs. when not to",
            "Turnaround times and how to work within consulate timelines",
            "What Abie has seen go wrong on DIY applications",
            "How to book and what to prepare before your first call",
          ],
          time: "5 min",
          tag: "Service",
          free: false,
          link: "/booking",
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 5 ~ Life After Your Spain Long-Stay Visa
    // ─────────────────────────────────────────
    {
      id: "after-the-visa",
      phase: "Phase 5",
      title: "Life After Your Spain Visa",
      emoji: "🎉",
      description:
        "The moment your Spain long-stay visa is stamped, your relationship with Schengen completely changes. This phase explains exactly what that means for how you travel from here.",
      accent: "#8fa38d",
      bg: "#d4e0d3",
      lessons: [
        {
          id: "vr20",
          number: "22",
          title: "How Your Status Changes with a Spanish Visa",
          description:
            "A Spanish Type D visa ~ and later your TIE card ~ resets your entire Schengen situation. This lesson explains the legal change and what it means practically.",
          bullets: [
            "Why Type D holders are no longer subject to 90/180 in Spain",
            "The visa stamp period vs. the TIE card period",
            "What to carry at borders during the transition",
            "How to explain your status to border agents (and what to say)",
            "Common misunderstandings that cause unnecessary stress",
          ],
          time: "10 min",
          tag: "Legal Status",
          free: false,
          link: null,
        },
        {
          id: "vr21",
          number: "23",
          title: "Traveling Schengen as a Spain Resident",
          description:
            "You're still subject to 90/180 in other Schengen countries ~ just not in Spain. This lesson explains what that means for trips to France, Italy, Portugal, and beyond.",
          bullets: [
            "Spain resident + Schengen travel ~ the actual rules",
            "90/180 still applies in other Schengen countries",
            "How to track your non-Spain Schengen days",
            "Your TIE card as a travel document within the EU",
            "What changes when you get permanent residency",
          ],
          time: "12 min",
          tag: "Travel Rules",
          free: false,
          link: null,
        },
        {
          id: "vr22",
          number: "24",
          title: "Re-entry Rules & What to Always Carry",
          description:
            "Returning to Spain as a resident is different from arriving as a tourist. Know what to carry, what lane to use, and what to say if questioned.",
          bullets: [
            "Which documents to carry every time you cross a border",
            "EU/EEA lane vs. non-EU lane ~ which applies to you",
            "What border agents can see in the system about your status",
            "If your TIE card renewal is pending ~ what to carry instead",
            "Re-entering after a long trip outside the EU",
          ],
          time: "8 min",
          tag: "Border Crossings",
          free: false,
          link: null,
        },
        {
          id: "vr23",
          number: "25",
          title: "Your EU Travel Rights as a Spain Resident",
          description:
            "Spanish residency comes with travel rights most people never fully use. This final lesson covers what you're actually entitled to across the EU.",
          bullets: [
            "Free movement within the EU ~ what this means for residents",
            "Living and working in other EU countries as a Spanish resident",
            "How Spanish residency affects your path to EU citizenship",
            "The rights that come with 5 years of legal residency",
            "What permanent residency unlocks that temporary residency doesn't",
          ],
          time: "10 min",
          tag: "Your Rights",
          free: false,
          link: null,
        },
      ],
    },
  ],
};

export default visaRunner;
