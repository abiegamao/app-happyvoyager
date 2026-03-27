import type { PlaybookConfig } from "./types";

const deleA2: PlaybookConfig = {
  slug: "dele-a2",
  badge: "Playbook Pro",
  badgeLabel: "A0 → A2 DELE Certified",
  updatedLabel: "Updated 2026",
  heroTitle: "The DELE A2 Playbook",
  heroDescription:
    "The fastest, most focused way to pass Spain's DELE A2 Spanish exam ~ built specifically for people on the citizenship track, not hobbyist language learners. No fluff. Just what the exam tests, how it's scored, and exactly how to prepare.",
  totalTime: "~3.5 hrs",
  modalFeatures: [
    "24 lessons across 6 phases",
    "2-year citizenship fast track: why DELE A2 matters for Filipinos & LATAM",
    "All 4 exam sections decoded: reading, writing, listening, speaking",
    "Speaking tasks script + vocabulary banks",
    "Study schedule: pass in 60 days working 30 mins a day",
    "Official Instituto Cervantes registration ~ step by step",
    "Practice resources, sample papers, and model answers",
    "What your certificate unlocks in the citizenship application",
  ],
  finalCtaTitle: "A0 → A2 DELE Certified",
  finalCtaDescription:
    "24 lessons. 6 phases. The complete system for passing the DELE A2 ~ from zero Spanish to exam-ready, with every section decoded and a 60-day study plan built around your life.",
  catalog: {
    emoji: "🗣️",
    tagline: "Pass the DELE A2 on the citizenship track",
    description:
      "The exam-focused Spanish guide for DNV holders on the citizenship path ~ all 4 sections decoded, a 60-day study plan, and the Instituto Cervantes registration guide.",
    status: "waitlist",
    accent: "#c4523a",
    bg: "#f5ddd7",
  },
  nextPlaybook: {
    slug: "spanish-passport",
    title: "The Spanish Passport Playbook",
    tagline: "The Passport Track ~ DELE A2 done. Now the CCSE, permanent residency, and citizenship application. The full endgame mapped out.",
    emoji: "🏆",
    accent: "#c9a84c",
    bg: "#f5ecd7",
    chapterLabel: "The Passport Track",
    phasePreview: [
      { emoji: "🔄", title: "DNV Renewal Strategy" },
      { emoji: "🏛️", title: "CCSE Civic Exam" },
      { emoji: "🏠", title: "Permanent Residency" },
      { emoji: "🎖️", title: "Citizenship Application" },
      { emoji: "🛂", title: "Your EU Passport" },
    ],
  },
  phases: [
    // ─────────────────────────────────────────
    // PHASE 0 ~ The Exam, Decoded
    // ─────────────────────────────────────────
    {
      id: "exam-decoded",
      phase: "Phase 0",
      title: "The Exam, Decoded",
      emoji: "🎯",
      description:
        "Before you study a single word, understand exactly what the DELE A2 tests, how it's scored, and why it's the right exam for your citizenship track. Most people study the wrong things ~ this phase makes sure you don't.",
      accent: "#c4523a",
      bg: "#f5ddd7",
      lessons: [
        {
          id: "da01",
          number: "01",
          title: "What the DELE A2 Is ~ and Why It's on Your Citizenship Checklist",
          description:
            "The DELE A2 isn't just a language certificate ~ it's a legal requirement for Spanish citizenship. This lesson explains what it proves, who needs it, and why the A2 level (not B1, not B2) is the one that matters.",
          bullets: [
            "DELE vs SIELE vs other Spanish certifications: why DELE is the only one Spain accepts for citizenship",
            "The A2 level: what it represents in the CEFR framework and what you're expected to do",
            "Why the 2-year citizenship fast track for Filipinos and LATAM nationals requires DELE A2",
            "The exam is administered by Instituto Cervantes ~ Spain's official language body worldwide",
            "DELE A2 validity: it doesn't expire ~ once you pass, you're certified for life",
            "How this certificate fits into your citizenship application file",
          ],
          time: "9 min",
          tag: "Overview",
          free: true,
          link: null,
        },
        {
          id: "da02",
          number: "02",
          title: "The 4 Exam Sections: What You're Actually Being Tested On",
          description:
            "The DELE A2 has four parts. Understanding what each one tests ~ and how they're weighted ~ is the first step to building a smart study plan. Here's the complete breakdown.",
          bullets: [
            "Comprensión de lectura (Reading): 3 tasks, 45 minutes, 25 points",
            "Comprensión auditiva (Listening): 4 tasks, 35 minutes, 25 points",
            "Expresión e interacción escritas (Writing): 2 tasks, 50 minutes, 25 points",
            "Expresión e interacción orales (Speaking): 3 tasks, 12-15 minutes, 25 points",
            "Total score: 100 points ~ minimum 30/50 on written + 30/50 on oral to pass",
            "The pass condition: you must pass BOTH groups independently ~ failing one fails the whole exam",
          ],
          time: "10 min",
          tag: "Structure",
          free: true,
          link: null,
        },
        {
          id: "da03",
          number: "03",
          title: "How Long Does It Take to Reach A2? (The Honest Answer)",
          description:
            "Most language guides are vague about timelines. This lesson gives you the honest estimate based on your starting point ~ and why 60 days of focused daily practice is realistic for complete beginners.",
          bullets: [
            "The CEFR estimate: 100-150 hours of total study to reach A2 from zero",
            "The efficient route: 30 focused minutes a day beats 3 distracted hours on weekends",
            "Starting from Filipino: advantages you already have (Spanish loanwords in Tagalog)",
            "The 80/20 rule for A2: the 400 words and 8 grammar structures that cover most of the exam",
            "What 'exam-ready' actually means vs 'conversationally fluent' ~ they're not the same",
            "The 60-day study plan overview: what each phase looks like week by week",
          ],
          time: "11 min",
          tag: "Strategy",
          free: true,
          link: null,
        },
        {
          id: "da04",
          number: "04",
          title: "Registering for the DELE A2: Instituto Cervantes, Exam Dates & Fees",
          description:
            "You can only take the DELE at accredited Instituto Cervantes exam centres. This lesson walks through how to find a centre near you, upcoming exam dates, and what registration looks like.",
          bullets: [
            "The Instituto Cervantes website: where to find accredited exam centres worldwide",
            "Exam sessions: DELE A2 is offered 4-6 times per year (dates for 2026)",
            "Registration deadline: typically 6-8 weeks before the exam date",
            "Exam fees: approximate costs in Spain and from the Philippines",
            "What to bring on exam day: ID requirements and what's provided",
            "Results timeline: typically 3 months after the exam date",
          ],
          time: "8 min",
          tag: "Admin",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 1 ~ The Language Foundation
    // ─────────────────────────────────────────
    {
      id: "foundation",
      phase: "Phase 1",
      title: "The Language Foundation",
      emoji: "🏗️",
      description:
        "The vocabulary, grammar, and pronunciation basics that underpin every section of the DELE A2. Build this foundation first ~ everything else is applied on top of it.",
      accent: "#8fa38d",
      bg: "#d4e0d3",
      lessons: [
        {
          id: "da05",
          number: "05",
          title: "Spanish Pronunciation & the Alphabet: Get This Right First",
          description:
            "Spanish pronunciation is phonetic ~ once you know the rules, you can pronounce any word correctly. This lesson covers the sounds that trip up English and Tagalog speakers and how to fix them fast.",
          bullets: [
            "The Spanish alphabet: 27 letters, predictable pronunciation rules",
            "Sounds that don't exist in English: the rolled R, LL, Ñ, and J",
            "Filipino advantage: many Spanish sounds already exist in Tagalog",
            "Vowels in Spanish: always the same (unlike English) ~ A E I O U",
            "Stress rules: where the accent falls and when to use written accents",
            "The fastest way to train your ear: shadowing technique explained",
          ],
          time: "10 min",
          tag: "Foundation",
          free: true,
          link: null,
        },
        {
          id: "da06",
          number: "06",
          title: "The 400 Words That Cover 80% of the DELE A2 Exam",
          description:
            "Vocabulary is the single biggest lever in exam performance. This lesson gives you the curated A2 word list ~ organized by topic area ~ and the fastest way to actually memorize them.",
          bullets: [
            "The A2 vocabulary domains: family, work, daily routines, travel, food, health, home",
            "High-frequency words first: the 100 words that appear most in past DELE A2 papers",
            "Filipino-Spanish cognates: the 200+ words you already know and don't know you know",
            "Spaced repetition: why Anki beats flashcards and how to set it up in 10 minutes",
            "Vocabulary in context: learning words in sentences, not in isolation",
            "The weekly word target: 15 new words a day to cover the A2 list in 30 days",
          ],
          time: "12 min",
          tag: "Vocabulary",
          free: false,
          link: null,
        },
        {
          id: "da07",
          number: "07",
          title: "Core Grammar: The 8 Structures You Need for A2",
          description:
            "A2 grammar is not complicated ~ but it has to be solid. This lesson covers the 8 structures that appear throughout the exam and gives you the clearest explanation of each.",
          bullets: [
            "Present tense (presente): regular and the 10 irregular verbs you must know",
            "Past tense (pretérito indefinido & imperfecto): when to use which and the key difference",
            "Near future (ir + a + infinitive): the easiest future form and when it's appropriate",
            "Ser vs Estar: the most common A2 mistake and the rule that ends the confusion",
            "Reflexive verbs: the -se pattern and the verbs that always use it",
            "Negation, questions, and common connectors: y, pero, porque, cuando, si",
            "Gender and agreement: noun-adjective matching and the patterns that make it easy",
            "Modal verbs: querer, poder, tener que, deber ~ expressing obligation and desire",
          ],
          time: "16 min",
          tag: "Grammar",
          free: false,
          link: null,
        },
        {
          id: "da08",
          number: "08",
          title: "Your 60-Day Study Plan: Week by Week",
          description:
            "A realistic, specific schedule that takes you from zero to exam-ready in 60 days ~ working 30 minutes a day. Each week has a clear focus and measurable checkpoints.",
          bullets: [
            "Weeks 1-2: pronunciation, core vocabulary, and present tense ~ the foundation sprint",
            "Weeks 3-4: past tenses, reflexive verbs, and reading practice ~ building comprehension",
            "Weeks 5-6: listening practice, writing templates, and vocabulary review",
            "Weeks 7-8: speaking preparation, mock exams, and weak spot targeting",
            "Daily 30-minute breakdown: 10 min vocabulary + 10 min grammar + 10 min skill practice",
            "How to track your progress and when to adjust the plan",
            "What to do the week before the exam ~ and what to stop doing",
          ],
          time: "10 min",
          tag: "Study Plan",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 2 ~ Reading (Comprensión de Lectura)
    // ─────────────────────────────────────────
    {
      id: "reading",
      phase: "Phase 2",
      title: "Reading (Comprensión de Lectura)",
      emoji: "📖",
      description:
        "3 tasks, 45 minutes, 25 points. The reading section tests your ability to understand short everyday texts ~ signs, emails, announcements, and short articles. Here's how to approach every task type.",
      accent: "#6b8cba",
      bg: "#dde8f5",
      lessons: [
        {
          id: "da09",
          number: "09",
          title: "The Reading Section: 3 Tasks Decoded",
          description:
            "Each of the 3 reading tasks tests a different skill. Knowing exactly what each task asks you to do ~ before you sit the exam ~ eliminates guesswork and wasted time.",
          bullets: [
            "Task 1: Matching ~ short notices or signs with descriptions (6 questions)",
            "Task 2: Multiple choice ~ a short text with 6 comprehension questions",
            "Task 3: Selecting information ~ matching questions to people/categories from a list",
            "Time allocation: how to divide 45 minutes across 3 tasks without running out",
            "Reading strategies at A2: what you need to understand vs what you can skip",
            "Common traps: distractor answers that look right but aren't",
          ],
          time: "11 min",
          tag: "Structure",
          free: true,
          link: null,
        },
        {
          id: "da10",
          number: "10",
          title: "Reading Strategy: How to Approach A2-Level Texts",
          description:
            "You don't need to understand every word to answer correctly. This lesson teaches the skim-scan-answer method that experienced test-takers use ~ and how to handle unknown vocabulary.",
          bullets: [
            "Read the questions first: why knowing what you're looking for changes everything",
            "Skimming for gist: understanding the topic in 20 seconds",
            "Scanning for specifics: names, dates, numbers, and key words",
            "Context clues: guessing unknown words from surrounding text",
            "Eliminating wrong answers: the process of elimination at A2 level",
            "Practice drill: 10-minute daily reading routine using Spanish news sites and Instagram accounts",
          ],
          time: "10 min",
          tag: "Strategy",
          free: false,
          link: null,
        },
        {
          id: "da11",
          number: "11",
          title: "Practice Resources: Where to Find Real A2 Reading Material",
          description:
            "The best exam preparation uses real texts at the right level ~ not textbook sentences. Here's exactly where to find them and how to use them effectively.",
          bullets: [
            "Official DELE A2 sample papers: Instituto Cervantes free downloads",
            "Beginner Spanish news: Easy Español, News in Slow Spanish",
            "Instagram and social media in Spanish: following accounts at A2 level",
            "Graded readers: the best physical books for A2 reading practice",
            "How to self-mark your reading practice and track progress",
            "When you're consistently getting 80%+ on practice: you're reading-ready",
          ],
          time: "8 min",
          tag: "Resources",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 3 ~ Writing (Expresión Escrita)
    // ─────────────────────────────────────────
    {
      id: "writing",
      phase: "Phase 3",
      title: "Writing (Expresión Escrita)",
      emoji: "✍️",
      description:
        "2 tasks, 50 minutes, 25 points. The writing section is where prepared candidates separate from unprepared ones. The tasks are predictable ~ and so are the high-scoring answers.",
      accent: "#c9a84c",
      bg: "#f5ecd7",
      lessons: [
        {
          id: "da12",
          number: "12",
          title: "The Writing Section: 2 Tasks Decoded",
          description:
            "The two writing tasks at A2 follow predictable formats. Knowing the format before you sit the exam means you're writing from a template ~ not starting from scratch.",
          bullets: [
            "Task 1: Form completion or note ~ a short functional writing task (50-60 words)",
            "Task 2: Email, postcard, or short description ~ a semi-personal writing task (60-80 words)",
            "What markers look for: task completion, vocabulary range, grammatical accuracy",
            "Word count matters: too short loses points, too long wastes time",
            "The marking criteria: what percentage of marks go to each element",
            "Time split: 20 minutes on Task 1, 30 minutes on Task 2",
          ],
          time: "10 min",
          tag: "Structure",
          free: true,
          link: null,
        },
        {
          id: "da13",
          number: "13",
          title: "Writing Templates That Score Well at A2",
          description:
            "The A2 writing tasks don't reward creativity ~ they reward correctness and task completion. This lesson gives you the sentence structures and phrases to use for every task type.",
          bullets: [
            "Email opening and closing formulas: formal vs informal register at A2",
            "Describing a person: physical appearance and personality vocabulary bank",
            "Describing a place: location, features, and opinion phrases",
            "Narrating a past event: the pretérito structure for telling a story in writing",
            "Expressing preferences and opinions: me gusta, prefiero, en mi opinión",
            "Connectors that make writing flow: primero, después, finalmente, además, sin embargo",
            "Checking your work: the 5-minute review checklist (gender, agreement, tense, accents)",
          ],
          time: "14 min",
          tag: "Templates",
          free: false,
          link: null,
        },
        {
          id: "da14",
          number: "14",
          title: "Practice Prompts with Model Answers",
          description:
            "The fastest way to improve writing is to write, compare, and improve. This lesson gives you 6 practice prompts ~ the types that appear on real DELE A2 exams ~ with annotated model answers.",
          bullets: [
            "Prompt 1: Write an email to a friend describing your new apartment in Spain",
            "Prompt 2: Complete a registration form for a language course",
            "Prompt 3: Write a short message to your flatmate about a problem",
            "Prompt 4: Describe a person you admire (100 words)",
            "Prompt 5: Write a postcard from your holiday in Spain",
            "Prompt 6: Respond to an email from a Spanish language school",
            "How to self-assess: using the DELE A2 rubric to mark your own work",
          ],
          time: "13 min",
          tag: "Practice",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 4 ~ Listening (Comprensión Auditiva)
    // ─────────────────────────────────────────
    {
      id: "listening",
      phase: "Phase 4",
      title: "Listening (Comprensión Auditiva)",
      emoji: "🎧",
      description:
        "4 tasks, 35 minutes, 25 points. The listening section is the one most learners underestimate ~ because you can't re-read the audio. This phase builds your Spanish ear systematically.",
      accent: "#7a8f90",
      bg: "#e0eaeb",
      lessons: [
        {
          id: "da15",
          number: "15",
          title: "The Listening Section: 4 Tasks Decoded",
          description:
            "Each listening task uses a different audio format ~ conversations, announcements, monologues. Knowing the format in advance lets you prepare for what you'll hear before the audio even starts.",
          bullets: [
            "Task 1: Multiple choice ~ short conversations matching images or options",
            "Task 2: True/false or multiple choice ~ a longer conversation (2-3 minutes)",
            "Task 3: Completing a form or notes ~ filling in information from an audio",
            "Task 4: Matching ~ statements to speakers in a multi-person conversation",
            "Each audio plays twice: how to use the two listens differently",
            "The pre-listening strategy: reading questions before the audio starts",
          ],
          time: "11 min",
          tag: "Structure",
          free: true,
          link: null,
        },
        {
          id: "da16",
          number: "16",
          title: "Building Your Spanish Ear: Daily Listening Practice",
          description:
            "Listening comprehension improves with consistent exposure, not marathon sessions. This lesson gives you the daily routine ~ and the resources ~ that build genuine comprehension at A2 level.",
          bullets: [
            "Why passive listening doesn't work and what active listening means in practice",
            "News in Slow Spanish (Beginner): the single best A2 listening resource",
            "SpanishPod101, Dreaming Spanish (A1-A2 level): free YouTube resources",
            "Transcription practice: listen, pause, write what you heard ~ the hardest and most effective drill",
            "Dictation exercises: SpanishDict and Dreaming Spanish comprehension check tools",
            "Real Spanish audio at A2 pace: telenovela clips and children's shows on YouTube",
            "The 10-minute daily listening habit that makes the biggest difference",
          ],
          time: "12 min",
          tag: "Practice",
          free: false,
          link: null,
        },
        {
          id: "da17",
          number: "17",
          title: "Listening Exam Strategy: How to Score High Without Understanding Everything",
          description:
            "You don't need to understand every word to answer correctly. This lesson teaches the specific test strategies that maximize your listening score even when the audio is fast or unclear.",
          bullets: [
            "First listen: get the gist ~ topic, speakers, setting",
            "Second listen: confirm your answers ~ look for specific words or phrases",
            "Key word tracking: the numbers, names, times, and places that always appear in tasks",
            "When you miss something: how to make educated guesses at A2 level",
            "The most common listening traps: similar-sounding words, negatives, and corrected statements",
            "Practice pacing: why doing timed mock sections matters more than just watching Spanish TV",
          ],
          time: "10 min",
          tag: "Strategy",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 5 ~ Speaking (Expresión Oral)
    // ─────────────────────────────────────────
    {
      id: "speaking",
      phase: "Phase 5",
      title: "Speaking (Expresión Oral)",
      emoji: "🎤",
      description:
        "3 tasks, 12-15 minutes, 25 points. The speaking section is the one everyone fears most ~ and the one most amenable to preparation. Every task type is predictable and scriptable.",
      accent: "#e3a99c",
      bg: "#f2d6c9",
      lessons: [
        {
          id: "da18",
          number: "18",
          title: "The Speaking Section: 3 Tasks Decoded",
          description:
            "The oral exam has a preparation time before you speak, and a structured format you can practice. This lesson explains each task so there are no surprises on the day.",
          bullets: [
            "Preparation time: 10-15 minutes before the oral exam to review prompts and notes",
            "Task 1: Photo description ~ describe what you see and answer follow-up questions",
            "Task 2: Conversation ~ discuss a topic from your daily life with the examiner",
            "Task 3: Roleplay or practical task ~ a simulated real-world interaction",
            "What examiners actually assess: fluency, vocabulary range, grammatical accuracy, interaction",
            "The pass threshold: you need 30/50 on the oral group (writing + speaking combined)",
          ],
          time: "11 min",
          tag: "Structure",
          free: true,
          link: null,
        },
        {
          id: "da19",
          number: "19",
          title: "Photo Description Masterclass: How to Describe Any Image in Spanish",
          description:
            "Task 1 gives you a photo and asks you to describe it. With the right vocabulary bank and a three-part structure, you can describe any image confidently ~ even before you see the actual photo.",
          bullets: [
            "The three-part structure: what I see → what I think is happening → my opinion",
            "Location vocabulary: en el centro, a la derecha, detrás de, cerca de",
            "People description: physical appearance, clothing, actions, estimated age",
            "Setting vocabulary: interior vs exterior, time of day, season, weather",
            "Opinion phrases: creo que, me parece que, parece que están + gerund",
            "How to handle unknown vocabulary: describe around words you don't know",
            "Practice method: describe 3 photos a day from Google Images using a timer",
          ],
          time: "13 min",
          tag: "Technique",
          free: false,
          link: null,
        },
        {
          id: "da20",
          number: "20",
          title: "Conversation Topics & the Phrases That Sound Natural at A2",
          description:
            "Task 2 conversation topics at A2 are predictable: family, work, daily routine, hobbies, travel, food, home. This lesson gives you the phrases and structures for every likely topic.",
          bullets: [
            "Family: describing relatives, relationships, and household routines",
            "Work and study: what you do, where, daily schedule, likes and dislikes",
            "Free time: hobbies, sports, weekend activities, favourite places",
            "Travel and places: where you've been, where you want to go, describing cities",
            "Food and health: what you eat, cooking habits, describing a typical day",
            "Filler phrases that buy you time: bueno, a ver, es que, pues, la verdad es que",
            "Recovering from mistakes: how to self-correct naturally (perdón, quiero decir...)",
          ],
          time: "14 min",
          tag: "Vocabulary",
          free: false,
          link: null,
        },
        {
          id: "da21",
          number: "21",
          title: "Roleplay & Practical Tasks: Scripts for Every Scenario",
          description:
            "Task 3 simulates real situations: buying something, making a reservation, asking for directions, handling a problem. These scenarios are scripted ~ here's the language for each.",
          bullets: [
            "Shopping: asking for price, size, colour, paying ~ full transaction vocabulary",
            "Restaurant: ordering food, asking questions, dealing with a problem",
            "Transport: buying tickets, asking about times and platforms",
            "Accommodation: checking in, requesting things, reporting an issue",
            "Doctor / pharmacy: describing symptoms, asking for medication",
            "Polite request formula: ¿Podría...? / ¿Me puede...? / Quisiera...",
            "Roleplay practice: finding a language exchange partner or using AI conversation tools",
          ],
          time: "12 min",
          tag: "Technique",
          free: false,
          link: null,
        },
        {
          id: "da22",
          number: "22",
          title: "The Week Before the Oral Exam: What to Practice (and What to Stop)",
          description:
            "The week before the oral exam is not for learning new material ~ it's for consolidating what you know and calming your nerves. Here's exactly what to do each day.",
          bullets: [
            "Day 7-5: mock oral exam with a language exchange partner or tutor ~ full 15 minutes",
            "Day 4-3: review your vocabulary banks and photo description structure",
            "Day 2: one final practice session ~ then stop studying and rest",
            "Day 1 (exam eve): light review of key phrases, good sleep, prepare your documents",
            "Exam morning: eat, arrive early, use preparation time fully",
            "The mindset shift: examiners want you to pass ~ they're assessing, not ambushing",
            "What to do if you freeze: the recovery phrase that restarts any conversation",
          ],
          time: "9 min",
          tag: "Exam Prep",
          free: false,
          link: null,
        },
      ],
    },

    // ─────────────────────────────────────────
    // PHASE 6 ~ Exam Day & What Comes Next
    // ─────────────────────────────────────────
    {
      id: "exam-day",
      phase: "Phase 6",
      title: "Exam Day & What Comes Next",
      emoji: "🏆",
      description:
        "The logistics of exam day, what happens when results arrive, and how your DELE A2 certificate fits into your Spanish citizenship application. The finish line ~ and what it unlocks.",
      accent: "#c9a84c",
      bg: "#f5ecd7",
      lessons: [
        {
          id: "da23",
          number: "23",
          title: "Exam Day: Timeline, Logistics & What to Bring",
          description:
            "The practical guide to exam day ~ from what time to arrive to what you're allowed to bring into the room. No surprises.",
          bullets: [
            "What to bring: valid ID (passport or NIE), exam registration confirmation, pencils and pens",
            "What not to bring: dictionaries, phones, notes ~ the rules and consequences",
            "Exam day timeline: written sections in the morning, oral in the afternoon (or separate day)",
            "The oral exam waiting room: using preparation time fully and calmly",
            "If something goes wrong: technical issues, illness on exam day, missing materials",
            "After the exam: do NOT check answers online immediately ~ why it only hurts",
          ],
          time: "8 min",
          tag: "Logistics",
          free: true,
          link: null,
        },
        {
          id: "da24",
          number: "24",
          title: "Your DELE A2 Certificate: Results, Collection & What It Unlocks",
          description:
            "Results take approximately 3 months. Your certificate doesn't expire. And the moment it arrives, your citizenship application becomes significantly stronger. Here's what happens next.",
          bullets: [
            "Results notification: how Instituto Cervantes informs you and how to access your score",
            "Certificate collection: physical document, certified digital copy, and apostille options",
            "If you don't pass: the resit policy, waiting periods, and what to improve",
            "What your DELE A2 unlocks: the citizenship application checklist it appears on",
            "The CCSE civic exam: the next requirement after DELE A2 ~ what it covers",
            "From DELE A2 to Spanish passport: the full remaining checklist and timeline",
            "Next step: The Spanish Passport Playbook ~ the complete endgame system",
          ],
          time: "10 min",
          tag: "Next Steps",
          free: false,
          link: null,
        },
      ],
    },
  ],
};

export default deleA2;
