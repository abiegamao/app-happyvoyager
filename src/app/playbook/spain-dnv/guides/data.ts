export type ContentBlock =
  | { type: "intro"; text: string }
  | { type: "highlight"; label?: string; items: string[] }
  | { type: "checklist"; label?: string; items: string[] }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "divider" }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "expandable"; id?: string; title: string; content: ContentBlock[] }
  | {
      type: "callout";
      icon: string;
      text: string;
      bgClass?: string;
      borderClass?: string;
    };

export type Section = {
  id: string;
  title: string;
  content: ContentBlock[];
};

export type Guide = {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

export const guides: Guide[] = [
  {
    id: "whats-this-playbook-about",
    title: "What's this visa about and do I qualify?",
    subtitle: "Get started",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          {
            type: "intro",
            text: "Spain's Digital Nomad Visa (officially 'Visado de Teletrabajador') allows non-EU remote workers to live legally in Spain while working for companies or clients outside Spain. It's one of Europe's most attractive options for digital nomads. Introduced in 2023 as part of Spain's Startup Act, the visa lets non-EU citizens (including UK nationals) live & work remotely in Spain for up to five years.",
          },
        ],
      },
      {
        id: "eligibility",
        title: "Who is eligible?",
        content: [
          {
            type: "highlight",
            label: "Basic Qualifications",
            items: [
              "Age: 18+",
              "Nationality: Non-EU/EEA citizens only",
              "Work Status: Remote employee OR freelancer/entrepreneur",
              "Professional credentials: A university degree (bachelor's or higher), OR 3+ years documented work experience in your field",
            ],
          },
          {
            type: "highlight",
            label: "Income Requirements (2026)",
            items: [
              "Single applicant: €2,894/month minimum (gross, before taxes)",
              "With spouse/partner: €4,017/month minimum",
              "Each additional dependent: Add 25% of base amount",
            ],
          },
          {
            type: "callout",
            icon: "→",
            text: "Note: These thresholds are tied to 200% of Spain's minimum wage and increases annually.",
            bgClass: "bg-[#F1F1EF]",
            borderClass: "border-transparent text-[#37352f]",
          },
          {
            type: "checklist",
            label: "Other Requirements",
            items: [
              "Clean criminal record (past 5 years)",
              "Valid passport with at least 12+ months remaining",
              "Private health insurance valid in Spain",
              "Applicant must not have been a resident in Spain in the past 5 years",
            ],
          },
        ],
      },
      {
        id: "work-requirements",
        title: "Work Requirements",
        content: [
          {
            type: "highlight",
            label: "For employees:",
            items: [
              "You must have an employment contract with a company outside Spain",
              "Company must have been operating for 1+ year",
              "You need a letter from your employer confirming remote work permission",
            ],
          },
          {
            type: "highlight",
            label: "For freelancers:",
            items: [
              "At least 80% of your income must come from clients outside Spain",
              "You can work up to 20% for Spanish clients",
              "Your business must be established for 1+ year",
            ],
          },
        ],
      },
      {
        id: "getting-into-spain",
        title: "Getting into Spain",
        content: [
          {
            type: "intro",
            text: "And if you pick the UGE route like I did, you will need a Schengen Visa if your nationality requires a visa to step foot in Spain. If you're from the US, UK, Canada, EU, you typically don't need this Schengen visa anymore.",
          },
          {
            type: "callout",
            icon: "→",
            text: "FUN FACT: Did you know that you can get a Schengen Visa from any country regardless if you're just a tourist?\n \nYou just need to prove:\nYou're a long-term traveller (been out of your country for more than 6 months+)\nor..\nYou have an exceptional circumstance. Read more about it here.\n\nI did this twice in the USA and Bosnia via the Netherlands Embassy. Here's the proof.\n\nI love applying via the Netherlands as they have been really generous. I always get 90-days multiple entry even when I only requested for 2-weeks. I heard you can do this via France Embassy as well. But they tend to give you lesser days than Netherlands.",
            bgClass: "bg-[#EDF3EC]",
            borderClass: "border-[#D1E2CD]",
          },
          {
            type: "intro",
            text: "If you want to apply via Netherlands like I did, here's how to start.",
          },
        ],
      },
    ],
  },
  {
    id: "abies-dnv-journey",
    title: "Abie's Spain DNV journey",
    subtitle: "My personal story",
    sections: [
      {
        id: "profile",
        title: "My profile & background",
        content: [
          { type: "divider" },
          {
            type: "highlight",
            items: [
              "Philippine passport holder",
              "Applied inside Spain via UGE, not through a consulate",
              "Did everything DIY, legally and intentionally",
              "Fulfilled missing requirements remotely, without flying back home",
              "No EU spouse nor dependents, no company relocation, no shortcuts",
              "Had 10 Schengen days remaining",
            ],
          },
          {
            type: "intro",
            text: "If that sounds like you, this playbook will benefit you the most! Again, we do this DIY so we save at least 1500 euro that we could put into rent :))",
          },
        ],
      },
      {
        id: "my-story",
        title: "My Story",
        content: [
          { type: "divider" },
          {
            type: "intro",
            text: "My First Step: Croatia ( click to expand more )",
          },
          {
            type: "image",
            src: "/assets/story_image.jpg",
            alt: "Croatia Journey",
          },
          {
            type: "intro",
            text: "Before Spain, there was Croatia. I previously held a Croatian Digital Nomad Visa. You are free to skip this. It was my personal choice to try Croatia first before Spain.",
          },
          {
            type: "highlight",
            label: "Why Croatia first?",
            items: [
              "100% online application. No need to set foot in Croatia or home country to start & wait for the decision",
              "Approval in under a month",
              "No translations or apostilles needed, less bureaucratic.",
              "No foreign income tax",
              "Residency card issued after arrival",
            ],
          },
          {
            type: "highlight",
            label: "Croatia gave me:",
            items: [
              "Legal EU presence",
              "Time to think strategically & test the EU waters",
              "Proof that I could navigate EU immigration on my own",
              "1 yr residency and can leave anytime",
            ],
          },
          {
            type: "intro",
            text: "To be honest, I wasn't completely sold on Spain on my first visit. I felt like exploring more of the EU before I commit. Im glad I did. I would not know Croatia and the Balkans the way I know now and appreciate its people.\n\nSo I was thinking, if I wanted a taste of EU without too much paperwork, taxes & bureaucracy, Croatia seems like a good amount of trial of the European life.. and so I did.\n\nI am sharing this just in case you want to test the EU waters first just like me.",
          },
        ],
      },
      {
        id: "why-spain",
        title: "Why I moved to Spain",
        content: [
          {
            type: "image",
            src: "/assets/story_abie.jpg",
            alt: "Why Spain",
          },
          {
            type: "intro",
            text: "After 8 months of exploring the Schengen and Balkan region, I was ready to commit to EU.\n\nI wanted to finally get rooted..\n\n..and if I am spending time anyway, I might as well pick a country that will benefit me long-term.\n\nIn this case, a citizenship.\n\nFor my circumstance, Spain was the top pick.",
          },
          {
            type: "highlight",
            label: "My reasons",
            items: [
              "Fast-track citizenship: 2 years for Filipinos (vs 10 for most others)",
              "System integration: Public healthcare, Legal protections, Long-term stability",
              "EU market access: Once you're integrated in Spain, Europe and its 28 countries opens up (+ the US is suddenly much closer, legally and strategically)",
              "Optionality: I wasn't just securing residency, I was unlocking the entire European Union",
              "Nomad Life end of era: I want to do greater things, and that requires less movement. Im ready for depth.",
            ],
          },
          {
            type: "intro",
            text: "And yes.. This was the fastest 'upgrade' I could make without marrying anyone.\n\n(not that I don't want to marry at all)",
          },
        ],
      },
      {
        id: "timeline",
        title: "My DNV Timeline",
        content: [
          { type: "divider" },
          {
            type: "table",
            headers: ["Date", "What"],
            rows: [
              [
                "Nov 13",
                "Arrived in Málaga, Spain (from Croatia)\n- Got Declaration of Entry\n- Granted NIE on the spot",
              ],
              [
                "Nov 14",
                "Paid for my NIE, and submitted the forms required, official NIE issued.",
              ],
              [
                "Nov 20",
                "Digital Certificate issued, appointment to verify is required.",
              ],
              ["Nov 24", "Submitted my DNV application to the UGE"],
              [
                "Dec 19",
                "Requerimiento received (additional requirement)\n- New DNV requirement implemented: self-employment proof",
              ],
              [
                "Dec 20",
                "Submitted DTI Certification\n- I quickly created one online!",
              ],
              ["Jan 8", "Approved: 3-year residency"],
              [
                "Feb 3",
                "Scheduled TIE fingerprinting in Madrid without Padron!",
              ],
              ["Feb 20", "TIE ready for pickup!"],
            ],
          },
          {
            type: "intro",
            text: "No lawyer. No fixer. Just documents, timing, and clarity.\n\nNow, if that sounds like you could take. Let's proceed: How do I submit my application?",
          },
        ],
      },
    ],
  },
  {
    id: "submit-application",
    title: "How do I submit my application?",
    subtitle: "Step-by-step process",
    sections: [
      {
        id: "where-to-apply",
        title: "Where to apply: UGE vs Consulate",
        content: [
          { type: "divider" },
          {
            type: "intro",
            text: "First you pick where you plan to apply. Your First Critical Decision.",
          },
          {
            type: "highlight",
            items: [
              "You have 2 options where to apply: Home country via Spanish consulate, or within Spain (UGE)",
              "This choice affects income requirements, approval speed, residency length, and long-term flexibility.",
              "This section helps you choose correctly, in under 2 minutes.",
            ],
          },
          {
            type: "highlight",
            label: "Apply via UGE in Spain",
            items: [
              "€2,894+ minimum income requirement",
              "Fully online submission",
              "Less consulate drama, years of ITR not needed",
              "Faster, 20-days guaranteed response",
              "3-years residency upon approval",
            ],
          },
          {
            type: "intro",
            text: "**Best for:** Remote workers already in EU or able to enter Spain legally (entry proof needed).",
          },
          {
            type: "image",
            src: "/assets/uge_vs_consulate.png",
            alt: "UGE vs Consulate Comparison",
          },
          {
            type: "intro",
            text: "If you qualify for UGE, it is usually the superior path. Faster. Online Submission. Longer residency.",
          },
          {
            type: "highlight",
            label: "Apply via Spanish Consulate",
            items: [
              "€2,303+ minimum income requirement",
              "In-person appointments, paper submission",
              "Slower, more variable timelines (1-3+ months)",
              "Stricter with documents (years of tax returns needed)",
              "1-year residency upon approval",
            ],
          },
          {
            type: "intro",
            text: "**Best for:** Those who cannot legally apply from Spain.",
          },
          {
            type: "callout",
            icon: "→",
            text: "I personally don't recommend applying in your own country (Spanish Consulate). Applying via Consulate only gives you 1 year residency and you can't get a TIE (Residency Card) until you re-apply in Spain. It's like applying twice. Consulates are far stricter and slower.",
            bgClass: "bg-[#F1F1EF]",
          },
        ],
      },
      {
        id: "checklists",
        title: "What you need pre-arrival / upon arrival",
        content: [
          {
            type: "highlight",
            label: "1. Spanish Phone Number",
            items: [
              "You can't purchase a Spanish SIM online as it requires ID verification. Ask a friend in Spain or make it your first task upon arrival.",
              "Available at airports or mobile shops (Orange/Vodafone recommended). Ensure the code is +34.",
            ],
          },
          {
            type: "highlight",
            label: "2. Booked NIE Appointment",
            items: [
              "Schedule before arrival if possible; they are difficult to secure.",
              "Requires a Spanish phone number to confirm.",
            ],
          },
          {
            type: "highlight",
            label: "3. Apartment (at least 1 month)",
            items: ["You will need this address for all official forms."],
          },
          {
            type: "intro",
            text: "Once you are in Spain, you are eligible to submit onsite. Even if you have few Schengen days left, once submitted, you are allowed to stay during processing.",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244060/Screenshot_2026-02-15_at_12.58.49_AM_ap5rbu.png",
            alt: "Submission Flow",
          },
        ],
      },
      {
        id: "submission-process",
        title: "The Submission Process",
        content: [
          {
            type: "intro",
            text: "In order: Declaration of Entry → NIE → Digital Certification → Application Submission. All submissions are done online via the UGE's website using a digital certificate.",
          },
          {
            type: "highlight",
            label: "1. Spain Entry Stamp / Declaration of Entry",
            items: [
              "Crucial to obtain NIE and for DNV submission requirements.",
              "48-hour window to obtain from any police station (policia) if you didn't fly direct.",
              "Arrive on Wednesday/Thursday so you have time before stations close at 2:00 PM on Friday.",
            ],
          },
          {
            type: "highlight",
            label: "2. NIE (Foreigner Identity Number)",
            items: [
              "This is your Tax ID in Spain.",
              "Book in advance using a +34 number. [Book me here](https://example.com) if you need assistance.",
            ],
          },
          {
            type: "highlight",
            label: "3. Digital Certificate (Certificado Digital)",
            items: [
              "Your 'login' to government systems.",
              "Download FNMT Software and verify in person. [More details here](https://example.com).",
            ],
          },
          {
            type: "intro",
            text: "Once you have all three, you are ready to access the UGE's website and submit your Digital Nomad Application!\n\n**Next:** What documents do I need to submit?",
          },
        ],
      },
    ],
  },
  {
    id: "required-documents",
    title: "What documents do I need to submit?",
    subtitle: "Document Checklist",
    sections: [
      {
        id: "personal-docs",
        title: "Personal Documents",
        content: [
          {
            type: "checklist",
            label: "Basic Requirements",
            items: [
              "Passport (Valid 12+ months, 2 blank pages, full copy of all pages)",
              "Passport photos (Recent, white background)",
              "Spain Arrival Stamp or Declaration of Entry",
              "NIE (The document provided by Policia)",
            ],
          },
          {
            type: "highlight",
            label: "Criminal Background Check",
            items: [
              "From your country of citizenship",
              "From any country where you've lived 2+ years recently",
              "Must be apostilled and translated to Spanish",
              "Valid for 6 months (FBI for US, ACRO for UK)",
            ],
          },
        ],
      },
      {
        id: "professional-docs",
        title: "Professional Documents",
        content: [
          {
            type: "checklist",
            label: "Work Credentials",
            items: [
              "Proof of Professional Relationship (Minimum 3 months with current client/company)",
              "Company Registry documents (showing the company exists for 1+ years)",
              "Work Authorization letter (explicitly stating you can work remotely from Spain)",
              "University Degree OR 3+ years of field experience (CV/PCC)",
            ],
          },
        ],
      },
      {
        id: "apostille-logic",
        title: "Apostille & Translation",
        content: [
          {
            type: "expandable",
            id: "understanding-apostille",
            title: "Understanding Apostille & Translation",
            content: [
              {
                type: "highlight",
                label: "Which Documents Need an Apostille?",
                items: [
                  "Criminal background check",
                  "Birth/Marriage certificates (for dependents)",
                  "Educational diplomas",
                  "Company registration certificates",
                ],
              },
              {
                type: "highlight",
                label: "Which Documents Do NOT Need an Apostille?",
                items: [
                  "Health insurance policies",
                  "Passport copies / Photos",
                  "Payslips / Bank statements",
                ],
              },
              {
                type: "highlight",
                label: "How to Obtain an Apostille",
                items: [
                  "Obtain original from issuing authority",
                  "Find competent apostille authority (DFA in PH, FBI/State Dept in US)",
                  "Submit documents and pay required fee",
                ],
              },
              {
                type: "table",
                headers: ["Region", "Typical Processing Time"],
                rows: [
                  ["Philippines", "1-3 weeks"],
                  ["USA", "10-12 weeks"],
                  ["UK", "5 working days"],
                  ["Canada", "2-4 weeks"],
                ],
              },
            ],
          },
        ],
      },
      {
        id: "folder-structure",
        title: "Pro-Tip: Folder Management",
        content: [
          {
            type: "intro",
            text: "UGE is very strict. If your files are messy, they will issue a 'requerimiento' (request for correction), which delays you by weeks. Organize your folders clearly before uploading.",
          },
          {
            type: "intro",
            text: "1. Here's how I organised my requirements in folders. I created a folder named 'Spain DNV Documents' and created subfolders with the numbered requirements. Feel free to follow my structure.",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244171/Screenshot_2025-12-12_at_1.05.28_AM_w0zlev.png",
            alt: "Folder Structure Screenshot",
            caption: "Spain DNV Documents Folder Structure",
          },
          {
            type: "intro",
            text: "You have to place it this way so it will be easy for you to re-upload it here.\n\nTrust there's a chance the form will time-out, cause issues and you will need to start over or reupload again.",
          },
        ],
      },
    ],
  },
  {
    id: "apply-via-uge",
    title: "How do I apply via UGE?",
    subtitle: "The Within Spain Route",
    sections: [
      {
        id: "uge-steps",
        title: "The 9-Step Process",
        content: [
          {
            type: "intro",
            text: "Let's do the Within Spain Route via UGE. This is the path for those already in Spain or entering as a tourist.",
          },
          {
            type: "highlight",
            label: "Step 1: Enter Spain",
            items: [
              "Travel on a tourist visa or visa-free (if applicable)",
              "You have 90 days to complete the application",
            ],
          },
          {
            type: "highlight",
            label: "Step 2: Secure a Spanish Address",
            items: [
              "Rent an apartment or arrange long-term accommodation",
              "Obtain a rental contract or proof of residence",
              "Register your address (empadronamiento) at the local city hall (Note: it's hard to get this, you can get TIE first before this logic)",
            ],
          },
          {
            type: "highlight",
            label: "Step 3: Obtain Your NIE Number",
            items: [
              "NIE = Número de Identificación de Extranjero (foreigner ID number)",
              "Required for your visa application",
              "Apply at your local police station or Oficina de Extranjería",
              "Bring: passport, application form (EX-15), proof of address",
              "Fee: approximately €10 | Processing: same day or within a few days",
            ],
          },
          {
            type: "highlight",
            label: "Step 4: Obtain a Digital Certificate",
            items: [
              "Allows for online submission",
              "Obtain one from www.sede.fnmt.gob.es",
              "Alternatively, hire a representative who has a digital certificate",
            ],
          },
          {
            type: "highlight",
            label: "Step 5: Prepare Your Application Package",
            items: [
              "Organize all documents from the checklist: Personal, Professional, Financial proof, Proof of Spanish residence, NIE number",
            ],
          },
          {
            type: "highlight",
            label: "Step 6: Submit Your Application to UGE",
            items: [
              "Submit online via the Spanish immigration portal",
              "Requires a digital certificate or authorized representative",
              "Upload high-quality scans of all documents and pay application fees",
            ],
          },
          {
            type: "callout",
            icon: "→",
            text: "Note: Some applicants hire a lawyer with a digital certificate solely for the submission process (typically €500-3000)",
          },
          {
            type: "highlight",
            label: "Step 7: Wait for Processing",
            items: [
              "Timeline: 20-45 business days",
              "Track your status online",
              "UGE may request additional documents (you'll have 10 days to provide them)",
            ],
          },
          {
            type: "highlight",
            label: "Step 8: Receive Approval",
            items: [
              "Notified by email or post",
              "If approved, schedule your fingerprinting appointment",
            ],
          },
          {
            type: "highlight",
            label: "Step 9: Complete Fingerprinting & Receive TIE",
            items: [
              "Attend appointment at the immigration office and provide biometric data",
              "Pay TIE card fee (approx €20)",
              "Receive your TIE card within 20-30 days",
            ],
          },
        ],
      },
      {
        id: "online-submission-walkthrough",
        title: "Your Application to UGE",
        content: [
          {
            type: "intro",
            text: "1. Access the website here and click **Access the Procedure**.",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244308/Screenshot_2026-02-15_at_12.58.49_AM_1_fxgrh7.png",
            alt: "UGE Portal - Access Procedure",
          },
          {
            type: "intro",
            text: "2. Select **Alta Solicitud / High Application**",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244332/Screenshot_2026-02-15_at_2.41.08_AM_m1uwbg.png",
            alt: "UGE Portal - New Application",
          },
          {
            type: "intro",
            text: "3. Fill up the form. Input the following for DNV Application:",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244355/Screenshot_2026-02-15_at_3.16.40_AM_fy836b.png",
            alt: "UGE Portal - Form Detail",
          },
          {
            type: "intro",
            text: "4. Submit the documents!",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244383/Screenshot_2026-02-15_at_3.17.26_AM_hfk9vm.png",
            alt: "UGE Portal - Upload Complete",
          },
        ],
      },
      {
        id: "schengen-note",
        title: "Important: The Schengen Clock",
        content: [
          {
            type: "callout",
            icon: "→",
            text: "Once submitted, you've paused the **Schengen Clock**. You are now legally staying in Spain even past the 90 days. Just don't leave until you get your TIE (residency card).",
          },
          {
            type: "intro",
            text: "**Next:** How do I track my application?",
          },
        ],
      },
    ],
  },
  {
    id: "track-application",
    title: "How do I track my application?",
    subtitle: "Monitoring Progress",
    sections: [
      {
        id: "tracking-overview",
        title: "The Waiting Game",
        content: [
          {
            type: "intro",
            text: "Congrats, that's it! You have successfully submitted your application via UGE. Now, the waiting begins.",
          },
          {
            type: "callout",
            icon: "→",
            text: "You have 20-business days to wait for the decision. In the meantime, you can continue living your life in Spain legally.",
          },
          {
            type: "intro",
            text: "Don't forget to check your notifications (**Ver Notificaciones**) from time to time. You may leave Spain as long as you have a valid way to come back (like remaining Schengen days or a valid visa).",
          },
        ],
      },
      {
        id: "positive-silence",
        title: "Did you know? Positive Silence",
        content: [
          {
            type: "callout",
            icon: "→",
            text: "If it goes past **20-business days** and the UGE didn't request for any documents, you can file for **Silencio Admin Positivo**, and you're automatically approved.",
          },
        ],
      },
      {
        id: "tracking-walkthrough",
        title: "Tracking your Application's Progress",
        content: [
          {
            type: "intro",
            text: "1. Head back to the same website where you submitted (**Sede Electronica**). This is where you will also see any updates.",
          },
          {
            type: "callout",
            icon: "→",
            text: "P.S. They won't email you, so you have to constantly watch for it manually!",
          },
          {
            type: "intro",
            text: "2. Select **Ver Notificaciones** (View Notifications).",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244927/Screenshot_2026-02-15_at_3.20.50_AM_ueqsnn.png",
            alt: "Sede Electronica Notifications",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773244996/Screenshot_2026-02-15_at_3.24.56_AM_sqf29d.png",
            alt: "Notification Detail",
            caption:
              "Example of what notifications look like. The 3rd one here was the 'Resolucion', which contains the Approval letter!",
          },
          {
            type: "intro",
            text: "3. For any document revision or addition, select the **Modify application / Consular Estado Solitud**. Your updates would append here.",
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773245021/Screenshot_2026-02-15_at_3.24.00_AM_nq1viy.png",
            alt: "Modify Application View",
            caption:
              "As you can see, I had to submit several revisions before final approval.",
          },
        ],
      },
    ],
  },
];
