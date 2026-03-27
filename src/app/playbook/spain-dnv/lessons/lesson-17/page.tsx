import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l13",
  "number": "17",
  "title": "NIE & TIE Appointment Guide",
  "description": "The cita previa system makes otherwise calm, reasonable people lose their minds. Slots in major cities fill in literally two minutes. This lesson gives you the strategies that actually work.",
  "bullets": [
    "NIE appointment vs TIE appointment ~ you only need one of them, and it's the TIE: here's why",
    "The exact URL, timing, and browser setup for when new appointment slots drop (Tuesday mornings, 8am)",
    "Third-party alert tools that notify you the moment a slot opens in your province",
    "The walk-in window: provinces where this still works in 2026 and exactly what to say when you arrive",
    "Documents to bring to your TIE fingerprint appointment ~ the full list with acceptable formats and what gets turned away at the door",
    "What happens at the appointment: biometrics, photo, receipt of submission",
    "Card collection: the SMS you'll receive, how long the card takes, and what to do if it's delayed past 30 days"
  ],
  "time": "10 min",
  "tag": "Step-by-Step",
  "free": false,
  "link": "/appointments",
  "phase": {
    "phase": "Phase 3",
    "title": "Arrive",
    "accent": "#8fa38d",
    "bg": "#d4e0d3"
  },
  "prev": {
    "number": "16",
    "title": "Opening a Spanish Bank Account",
    "path": "/playbook/spain-dnv/lessons/lesson-16"
  },
  "next": {
    "number": "18",
    "title": "Document Translations ~ What Needs Translating",
    "path": "/playbook/spain-dnv/lessons/lesson-18"
  }
};

export default function Lesson17Page() {
  return <LessonPageContent {...data} />;
}
