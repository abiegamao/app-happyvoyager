import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l12a",
  "number": "14",
  "title": "Padron Registration Guide",
  "description": "Your empadronamiento is the single most important first step after arriving. Without it, nothing else works ~ no TIE appointment, no bank account, no healthcare enrollment.",
  "bullets": [
    "What the Padron is and why banks, TIE offices, and healthcare all require it",
    "Exact documents to bring to your local Ayuntamiento",
    "How to register online in Madrid and Barcelona",
    "Processing times by city + how to get a certified copy fast"
  ],
  "time": "8 min",
  "tag": "Free Guide",
  "free": true,
  "link": "/padron-guide",
  "phase": {
    "phase": "Phase 3",
    "title": "Arrive",
    "accent": "#8fa38d",
    "bg": "#d4e0d3"
  },
  "prev": {
    "number": "13",
    "title": "Your First 30 Days in Spain",
    "path": "/playbook/spain-dnv/lessons/lesson-13"
  },
  "next": {
    "number": "15",
    "title": "NIE & TIE: What They Are and How to Get Both",
    "path": "/playbook/spain-dnv/lessons/lesson-15"
  }
};

export default function Lesson14Page() {
  return <LessonPageContent {...data} />;
}
