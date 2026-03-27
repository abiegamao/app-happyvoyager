import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l12c",
  "number": "16",
  "title": "Opening a Spanish Bank Account",
  "description": "You need a Spanish IBAN for rent, utilities, and life here. Wise and Revolut aren't enough. Here's which banks work for foreigners and exactly what to bring.",
  "bullets": [
    "Why Wise and Revolut fail for Spanish direct debits and utilities",
    "Sabadell vs BBVA vs CaixaBank ~ which is most foreigner-friendly",
    "Exact documents required to open an account as a new resident",
    "The recommended three-account setup for life in Spain"
  ],
  "time": "8 min",
  "tag": "Free Guide",
  "free": true,
  "link": "/spain-bank-account-guide",
  "phase": {
    "phase": "Phase 3",
    "title": "Arrive",
    "accent": "#8fa38d",
    "bg": "#d4e0d3"
  },
  "prev": {
    "number": "15",
    "title": "NIE & TIE: What They Are and How to Get Both",
    "path": "/playbook/spain-dnv/lessons/lesson-15"
  },
  "next": {
    "number": "17",
    "title": "NIE & TIE Appointment Guide",
    "path": "/playbook/spain-dnv/lessons/lesson-17"
  }
};

export default function Lesson16Page() {
  return <LessonPageContent {...data} />;
}
