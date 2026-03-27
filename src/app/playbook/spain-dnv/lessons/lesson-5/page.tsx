import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l05",
  "number": "05",
  "title": "Health Insurance ~ What Actually Qualifies",
  "description": "Insurance companies don't know what Spanish immigration requires. You need to know ~ and tell them exactly what to write.",
  "bullets": [
    "The exact phrases that must appear on your certificate ~ UGE's checklist, translated and annotated",
    "Coverage minimums: EUR 30,000, no co-pays that exclude emergency care, valid in Spain for the full visa duration",
    "The co-pay problem: many otherwise solid international policies fail because of A&E co-pays that technically exclude emergency cover",
    "International providers that have successfully passed UGE review in 2026 ~ and the ones that keep coming back rejected",
    "How to instruct your insurer to reissue the certificate with the correct qualifying language (email template included)",
    "The waiting period trap: policies that exclude pre-existing conditions for 6-12 months can invalidate your application entirely"
  ],
  "time": "8 min",
  "tag": "Deep Dive",
  "free": false,
  "phase": {
    "phase": "Phase 1",
    "title": "Prepare",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "04",
    "title": "Proving Your Income the Right Way",
    "path": "/playbook/spain-dnv/lessons/lesson-4"
  },
  "next": {
    "number": "06",
    "title": "Criminal Background Check & Apostille",
    "path": "/playbook/spain-dnv/lessons/lesson-6"
  }
};

export default function Lesson5Page() {
  return <LessonPageContent {...data} />;
}
