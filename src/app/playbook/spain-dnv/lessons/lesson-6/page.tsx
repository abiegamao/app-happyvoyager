import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l06",
  "number": "06",
  "title": "Criminal Background Check & Apostille",
  "description": "The background check has a 6-month expiry from the date it's issued ~ not the date it's apostilled, not the date you submit. The timing here is the most underestimated part of the entire application.",
  "bullets": [
    "US applicants: FBI Identity History Summary (not state-level) ~ how to order it online and current processing times (plan for 6-8 weeks)",
    "Philippines applicants: NBI clearance with DFA apostille ~ the exact process and where the timeline usually breaks down",
    "UK, Canada, Australia: country-specific criminal record certificates and where apostilles are obtained",
    "Apostille vs notarization: they are not the same thing and UGE absolutely knows the difference",
    "Sworn translation: what languages are required, what qualifies a translator, and how to find a jurado oficial listed in the MAEC registry",
    "The 6-month expiry clock: how to reverse-engineer your submission date from when your background check was issued",
    "What to do if your check is delayed and you're running out of time ~ the options that actually exist"
  ],
  "time": "10 min",
  "tag": "Step-by-Step",
  "free": false,
  "phase": {
    "phase": "Phase 1",
    "title": "Prepare",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "05",
    "title": "Health Insurance ~ What Actually Qualifies",
    "path": "/playbook/spain-dnv/lessons/lesson-5"
  },
  "next": {
    "number": "07",
    "title": "Schengen Visa ~ For PH & Non-Schengen Passports",
    "path": "/playbook/spain-dnv/lessons/lesson-7"
  }
};

export default function Lesson6Page() {
  return <LessonPageContent {...data} />;
}
