import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l04",
  "number": "04",
  "title": "Proving Your Income the Right Way",
  "description": "Income documentation is where most applications quietly die ~ not because people don't earn enough, but because they packaged it wrong. UGE reviewers aren't trying to understand your income. Your job is to make it impossible for them to misunderstand it.",
  "bullets": [
    "Employees: the magic three ~ employment contract, last 3 payslips, employer letter on company letterhead confirming remote work arrangement",
    "Freelancers: client contracts + invoices + 6 months of bank statements showing regular deposits ~ a PayPal screenshot is not income documentation",
    "Business owners: your own company doesn't count unless you're paying yourself a documented salary ~ here's how to structure that correctly for UGE",
    "Bank statements: UGE looks for stable averages, not one good month ~ how to annotate statements so reviewers understand your income at a glance",
    "Currency conversion: how to handle income in USD, GBP, or PHP ~ the conversion method UGE accepts (and the ones they don't)",
    "The 3-month average trap: cherry-picking your best months is the fastest way to get a requerimiento requesting your full 12-month history"
  ],
  "time": "12 min",
  "tag": "Deep Dive",
  "free": false,
  "phase": {
    "phase": "Phase 1",
    "title": "Prepare",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "03",
    "title": "The Master Document Checklist",
    "path": "/playbook/spain-dnv/lessons/lesson-3"
  },
  "next": {
    "number": "05",
    "title": "Health Insurance ~ What Actually Qualifies",
    "path": "/playbook/spain-dnv/lessons/lesson-5"
  }
};

export default function Lesson4Page() {
  return <LessonPageContent {...data} />;
}
