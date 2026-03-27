import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l07",
  "number": "07",
  "title": "Schengen Visa ~ For PH & Non-Schengen Passports",
  "description": "If your passport doesn't grant visa-free Schengen access ~ Philippines, India, and many others ~ you need a short-stay Type C visa before you can enter Spain to apply for the DNV. This is not a dead end. It's just an extra step.",
  "bullets": [
    "Which passports require a Schengen visa to enter Spain (and the current list may surprise you)",
    "The Netherlands consulate route: why it's the most reliable option for Filipinos applying from Manila ~ or from anywhere in the world",
    "Using your 90 Schengen days strategically while your DNV processes ~ the overlap window",
    "Schengen Visa Assistance service: done-with-you document prep so you submit and show up"
  ],
  "time": "8 min",
  "tag": "Pre-Requisite",
  "free": false,
  "link": "/schengen-visa",
  "phase": {
    "phase": "Phase 1",
    "title": "Prepare",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "06",
    "title": "Criminal Background Check & Apostille",
    "path": "/playbook/spain-dnv/lessons/lesson-6"
  },
  "next": {
    "number": "08",
    "title": "Schengen Timing Strategy",
    "path": "/playbook/spain-dnv/lessons/lesson-8"
  }
};

export default function Lesson7Page() {
  return <LessonPageContent {...data} />;
}
