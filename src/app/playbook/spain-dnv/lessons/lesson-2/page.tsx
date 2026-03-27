import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l02",
  "number": "02",
  "title": "Understanding Spain's Visa Landscape",
  "description": "DNV vs NLV vs Student vs Tourist ~ understand all four options, the key differences, and which path fits your income, lifestyle, and long-term goals.",
  "bullets": [
    "Side-by-side comparison of all Spain visa types",
    "Work rights for each visa",
    "Which visas count toward residency and citizenship",
    "2-year citizenship path for PH and LATAM nationals"
  ],
  "time": "8 min",
  "tag": "Guide",
  "free": true,
  "link": "/digital-nomad-visa",
  "phase": {
    "phase": "Phase 0",
    "title": "Qualify",
    "accent": "#8fa38d",
    "bg": "#d4e0d3"
  },
  "prev": {
    "number": "01",
    "title": "Is the DNV Right for You?",
    "path": "/playbook/spain-dnv/lessons/lesson-1"
  },
  "next": {
    "number": "03",
    "title": "The Master Document Checklist",
    "path": "/playbook/spain-dnv/lessons/lesson-3"
  }
};

export default function Lesson2Page() {
  return <LessonPageContent {...data} />;
}
