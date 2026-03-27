import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l12b",
  "number": "15",
  "title": "NIE & TIE: What They Are and How to Get Both",
  "description": "Your NIE is a number. Your TIE is a physical card. You need both ~ and the process to get them is different. Here's the full picture, step by step.",
  "bullets": [
    "NIE vs TIE ~ the critical difference most guides get wrong",
    "The 6-step TIE process from Padron to card collection",
    "Fee 790-012 ~ what to pay and how to pay it",
    "What to do when cita previa slots are weeks out"
  ],
  "time": "10 min",
  "tag": "Free Guide",
  "free": true,
  "link": "/nie-and-tie-guide",
  "phase": {
    "phase": "Phase 3",
    "title": "Arrive",
    "accent": "#8fa38d",
    "bg": "#d4e0d3"
  },
  "prev": {
    "number": "14",
    "title": "Padron Registration Guide",
    "path": "/playbook/spain-dnv/lessons/lesson-14"
  },
  "next": {
    "number": "16",
    "title": "Opening a Spanish Bank Account",
    "path": "/playbook/spain-dnv/lessons/lesson-16"
  }
};

export default function Lesson15Page() {
  return <LessonPageContent {...data} />;
}
