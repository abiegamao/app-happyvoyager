import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l11",
  "number": "12",
  "title": "Common Rejection Reasons & How to Avoid Them",
  "description": "The same issues come up over and over. None of them are difficult to fix once you know what to look for. This lesson is a pre-submission audit ~ run through it before you hit submit.",
  "bullets": [
    "Issue 1: Income proof that doesn't demonstrate 'stable, regular income' ~ the exact language UGE looks for and why lump-sum payments and inconsistent deposits fail",
    "Issue 2: Insurance certificate missing qualifying language ~ the 4 phrases that must appear verbatim and how to get your insurer to add them",
    "Issue 3: Background check that expired during processing ~ the timing fix that adds a two-week buffer",
    "Issue 4: Employment contract that doesn't explicitly mention remote work ~ how to get an addendum letter in under a week",
    "Issue 5: Translation issues ~ using unqualified translators whose work UGE rejects on technical grounds",
    "Issue 6: Skipped fields on EX-07 ~ the ones marked 'optional' that UGE still expects to be completed",
    "Issue 7: Evidence of Spanish-sourced income in a self-employment application ~ why this disqualifies you and how to restructure your documents",
    "Responding to a requerimiento: the format, the 10-working-day deadline, and what happens if you miss it"
  ],
  "time": "15 min",
  "tag": "Risk Management",
  "free": false,
  "phase": {
    "phase": "Phase 2",
    "title": "Apply",
    "accent": "#7a8f90",
    "bg": "#e0eaeb"
  },
  "prev": {
    "number": "11",
    "title": "DNV 2026 Updates ~ What's Changed",
    "path": "/playbook/spain-dnv/lessons/lesson-11"
  },
  "next": {
    "number": "13",
    "title": "Your First 30 Days in Spain",
    "path": "/playbook/spain-dnv/lessons/lesson-13"
  }
};

export default function Lesson12Page() {
  return <LessonPageContent {...data} />;
}
