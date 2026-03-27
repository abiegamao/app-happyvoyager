import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l18",
  "number": "22",
  "title": "The Road to Permanent Residency",
  "description": "Permanent residency (larga duracion) is the status most DNV holders don't think about until year 4.5, when they're scrambling. It's simpler than citizenship but the 5-year clock only works in your favour if you haven't accidentally broken it.",
  "bullets": [
    "The 5-year clock: runs from your first legal entry on a Type D visa ~ not from TIE issuance, not from DNV approval date",
    "What breaks continuity: absences over 6 consecutive months, or more than 10 months total across 5 years",
    "What doesn't break continuity: holidays, short trips, and remote work travel ~ but only if documented correctly and your Padron stays active",
    "The application: submitted at your local Oficina de Extranjeria or via Sede Electronica with firma electronica",
    "Documents required: 5 years of TIE and renewal records, Padron history, clean criminal record, and employment/income proof",
    "The EU larga duracion card: the EU-issued permanent residency status with partial freedom of movement rights across member states",
    "Permanent residency vs citizenship: what each status actually allows you to do ~ and why the difference matters for Filipinos specifically"
  ],
  "time": "15 min",
  "tag": "Guide",
  "free": false,
  "phase": {
    "phase": "Phase 5",
    "title": "Become Spanish",
    "accent": "#c9a84c",
    "bg": "#f5ecd7"
  },
  "prev": {
    "number": "21",
    "title": "Beckham Law ~ Is It Worth It?",
    "path": "/playbook/spain-dnv/lessons/lesson-21"
  },
  "next": {
    "number": "23",
    "title": "Spanish Citizenship ~ Full Timeline",
    "path": "/playbook/spain-dnv/lessons/lesson-23"
  }
};

export default function Lesson22Page() {
  return <LessonPageContent {...data} />;
}
