import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l16",
  "number": "20",
  "title": "Spain Tax Obligations for Digital Nomads",
  "description": "Everything you need to know before you hit the 183-day mark ~ including the things your gestor will tell you but you'll never find in any English-language guide.",
  "bullets": [
    "The 183-day rule: once you hit this in a calendar year, you're a Spanish tax resident ~ full stop, no wiggle room",
    "IRPF: the progressive rate structure and what your effective tax rate realistically looks like at different income levels",
    "Worldwide income reporting: as a Spanish tax resident, Spain wants to know about all of it ~ not just what you earn locally",
    "Modelo 720: the foreign asset declaration required for accounts and assets above EUR 50,000 abroad ~ missing this carries catastrophic penalties",
    "Modelo 100: the annual Spanish income tax return ~ when it's due, how to file it, and what happens if you don't",
    "Gestor vs DIY: the honest breakdown of when paying EUR 300-500 for professional filing is worth every cent",
    "The Beckham Law window: why you need to make this decision before your first 6 months in Spain are up"
  ],
  "time": "20 min",
  "tag": "Tax Strategy",
  "free": false,
  "phase": {
    "phase": "Phase 4",
    "title": "Maintain",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "19",
    "title": "DNV Renewal ~ The Complete Process",
    "path": "/playbook/spain-dnv/lessons/lesson-19"
  },
  "next": {
    "number": "21",
    "title": "Beckham Law ~ Is It Worth It?",
    "path": "/playbook/spain-dnv/lessons/lesson-21"
  }
};

export default function Lesson20Page() {
  return <LessonPageContent {...data} />;
}
