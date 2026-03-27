import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l14",
  "number": "18",
  "title": "Document Translations ~ What Needs Translating",
  "description": "Here's the actual list, because 'sworn translation' and 'notarized translation' are not the same thing, and only one of them satisfies Spanish immigration.",
  "bullets": [
    "Documents that always require sworn translation: birth certificates, criminal records, marriage certificates, foreign university diplomas",
    "Documents that don't need sworn translation (and where people waste money): documents already in Spanish, EU-issued official documents, Schengen visas",
    "Sworn translator (traductor-interprete jurado): what legally qualifies someone for this role and how to find one in the MFAE official registry",
    "What a certified sworn translation looks like: the official stamp, handwritten signature, and language-pair certification that makes it valid",
    "Typical costs and turnaround times in 2026: EUR 50-120 per document, 3-7 days ~ how to factor this into your application timeline",
    "Online jurado translation services: which ones are legitimate and which ones produce translations UGE will reject on technical grounds"
  ],
  "time": "8 min",
  "tag": "Guide",
  "free": false,
  "link": "/translations",
  "phase": {
    "phase": "Phase 3",
    "title": "Arrive",
    "accent": "#8fa38d",
    "bg": "#d4e0d3"
  },
  "prev": {
    "number": "17",
    "title": "NIE & TIE Appointment Guide",
    "path": "/playbook/spain-dnv/lessons/lesson-17"
  },
  "next": {
    "number": "19",
    "title": "DNV Renewal ~ The Complete Process",
    "path": "/playbook/spain-dnv/lessons/lesson-19"
  }
};

export default function Lesson18Page() {
  return <LessonPageContent {...data} />;
}
