import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l20",
  "number": "24",
  "title": "The 2-Year Path (Philippines & LATAM)",
  "description": "Spain has a historical connection to the Philippines and 21 other countries ~ and it means your citizenship clock runs at 2 years, not 10. If you're Filipino, this is quite literally the fastest legal route to an EU passport anywhere in the world.",
  "bullets": [
    "The 22 qualifying nationalities: Philippines, Mexico, Colombia, Peru, Argentina, Cuba, and 16 more ~ the full list and why these countries specifically",
    "Why the Philippines qualifies: the Ley de la Nacionalidad Espanola and Spain's recognition of historical colonial ties",
    "2 years from your first legal residence entry ~ not from TIE issuance, not from visa approval, not from when you physically arrived",
    "Iberoamerican nationals vs Sephardic Jewish descendants vs general applicants: the three-tier citizenship timeline system explained",
    "Dual nationality: Filipinos applying under the Iberoamerican exemption generally do not need to renounce their Philippine passport",
    "How to count your 2 years correctly: the exact date your clock started, common miscalculations, and how a single trip mistake can push your date back",
    "Live citizenship countdown: see your exact projected citizenship date on the road-to-citizenship tracker",
    "The 2-year window is not something to delay on ~ every month spent outside Spain before applying is a month added to your timeline"
  ],
  "time": "15 min",
  "tag": "Shortcut",
  "free": false,
  "link": "/road-to-spanish-citizenship",
  "phase": {
    "phase": "Phase 5",
    "title": "Become Spanish",
    "accent": "#c9a84c",
    "bg": "#f5ecd7"
  },
  "prev": {
    "number": "23",
    "title": "Spanish Citizenship ~ Full Timeline",
    "path": "/playbook/spain-dnv/lessons/lesson-23"
  },
  "next": null
};

export default function Lesson24Page() {
  return <LessonPageContent {...data} />;
}
