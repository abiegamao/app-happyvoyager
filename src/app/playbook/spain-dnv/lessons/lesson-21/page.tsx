import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l17",
  "number": "21",
  "title": "Beckham Law ~ Is It Worth It?",
  "description": "Beckham Law gets a lot of hype in digital nomad groups. The reality is more nuanced than '24% flat tax = always better.' For some people it's a significant saving. For others, the worldwide income clause turns it into a trap.",
  "bullets": [
    "What Beckham Law actually is: the Regimen Especial de Trabajadores Desplazados ~ a regime for 'displaced workers' arriving in Spain for the first time",
    "Who qualifies: three conditions (new resident, not been resident in Spain in the previous 5 years, employed or a company directivo)",
    "The 24% flat rate: applies to Spanish-sourced income up to EUR 600,000 ~ above that it's 47%, which surprises people",
    "The catch everyone misses: under Beckham you pay 19-24% on investment income (dividends, interest) rather than the standard 19-28% bracket ~ the full picture is nuanced",
    "How to apply: Modelo 149, submitted within 6 months of your first Social Security registration in Spain ~ miss this window and you can't apply",
    "The real calculation: comparing 24% flat vs standard IRPF progressive brackets at your actual income level ~ with examples at EUR 30k, EUR 50k, and EUR 80k",
    "When Beckham Law is NOT better: income under approximately EUR 25,000/year, or when you have significant deductible expenses that would reduce your taxable base",
    "Exiting Beckham Law: you can opt out once if your situation changes ~ how to do it and what to expect"
  ],
  "time": "12 min",
  "tag": "Tax Strategy",
  "free": false,
  "phase": {
    "phase": "Phase 4",
    "title": "Maintain",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "20",
    "title": "Spain Tax Obligations for Digital Nomads",
    "path": "/playbook/spain-dnv/lessons/lesson-20"
  },
  "next": {
    "number": "22",
    "title": "The Road to Permanent Residency",
    "path": "/playbook/spain-dnv/lessons/lesson-22"
  }
};

export default function Lesson21Page() {
  return <LessonPageContent {...data} />;
}
