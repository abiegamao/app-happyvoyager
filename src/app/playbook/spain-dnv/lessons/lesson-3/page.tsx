import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l03",
  "number": "03",
  "title": "The Master Document Checklist",
  "description": "Every document you need in the exact order UGE expects them ~ with apostille and sworn translation requirements flagged clearly.",
  "bullets": [
    "Full 18-item document checklist",
    "Apostille requirements by document type",
    "Which documents need sworn translation",
    "Self-employment proof requirements"
  ],
  "time": "10 min",
  "tag": "Checklist",
  "free": true,
  "link": "/document-checklist",
  "phase": {
    "phase": "Phase 1",
    "title": "Prepare",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "02",
    "title": "Understanding Spain's Visa Landscape",
    "path": "/playbook/spain-dnv/lessons/lesson-2"
  },
  "next": {
    "number": "04",
    "title": "Proving Your Income the Right Way",
    "path": "/playbook/spain-dnv/lessons/lesson-4"
  }
};

export default function Lesson3Page() {
  return <LessonPageContent {...data} />;
}
