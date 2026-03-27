import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l19",
  "number": "23",
  "title": "Spanish Citizenship ~ Full Timeline",
  "description": "This is the endgame ~ and it's more achievable than it looks from year one. The process has more moving parts than most people expect, but each one is completely doable if you know what's coming.",
  "bullets": [
    "The DELE A2 Spanish language exam: when to take it, how to book it through Instituto Cervantes, and what happens if you don't pass",
    "The CCSE civics exam (Conocimientos Constitucionales y Socioculturales de Espana): the civic knowledge test that catches people off guard ~ harder than it sounds",
    "The MiCiudad portal: Spain's online citizenship application system ~ registration, document upload, and submission walkthrough",
    "Documents for citizenship: apostilled birth certificate, complete residency record from day one, clean criminal records from every country you've lived in for 5+ years",
    "The oath ceremony: what to expect, when it happens after approval (typically 3-6 months), and which document you walk out with",
    "Timeline from application submission to passport: current real-world averages and why the range is so wide",
    "Dual nationality and renunciation: Spain generally doesn't require Filipinos to renounce their Philippine citizenship ~ what this means in practice"
  ],
  "time": "20 min",
  "tag": "Core Lesson",
  "free": false,
  "link": "/road-to-spanish-citizenship",
  "phase": {
    "phase": "Phase 5",
    "title": "Become Spanish",
    "accent": "#c9a84c",
    "bg": "#f5ecd7"
  },
  "prev": {
    "number": "22",
    "title": "The Road to Permanent Residency",
    "path": "/playbook/spain-dnv/lessons/lesson-22"
  },
  "next": {
    "number": "24",
    "title": "The 2-Year Path (Philippines & LATAM)",
    "path": "/playbook/spain-dnv/lessons/lesson-24"
  }
};

export default function Lesson23Page() {
  return <LessonPageContent {...data} />;
}
