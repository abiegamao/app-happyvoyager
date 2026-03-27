import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l07b",
  "number": "08",
  "title": "Schengen Timing Strategy",
  "description": "The 90/180 rule isn't complicated ~ but the rolling window trips everyone up the first time they calculate it.",
  "bullets": [
    "The 90/180 rule: you can be in the Schengen area for a maximum of 90 days in any rolling 180-day window ~ not a calendar 6 months",
    "The rolling window mistake: most people calculate from their entry date ~ the window is actually rolling backwards 180 days from today",
    "How to calculate your current count in 30 seconds using the free Schengen Day Calculator",
    "When to submit your DNV application based on your remaining legal days in Spain",
    "What happens if you run out of Schengen days before your visa is approved ~ and the legal options that exist",
    "Non-Schengen buffer strategy: Morocco, Albania, UK ~ how experienced nomads buy time without overstaying",
    "Overstaying even by one day: the entry ban timeline and how it follows you into future visa applications"
  ],
  "time": "5 min",
  "tag": "Strategy + Tool",
  "free": false,
  "link": "/schengen-calculator",
  "phase": {
    "phase": "Phase 1",
    "title": "Prepare",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "07",
    "title": "Schengen Visa ~ For PH & Non-Schengen Passports",
    "path": "/playbook/spain-dnv/lessons/lesson-7"
  },
  "next": {
    "number": "09",
    "title": "UGE vs Consulate ~ Which Route Is Yours",
    "path": "/playbook/spain-dnv/lessons/lesson-9"
  }
};

export default function Lesson8Page() {
  return <LessonPageContent {...data} />;
}
