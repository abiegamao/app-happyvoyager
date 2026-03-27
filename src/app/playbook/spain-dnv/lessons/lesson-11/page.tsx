import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l10",
  "number": "11",
  "title": "DNV 2026 Updates ~ What's Changed",
  "description": "UGE updated their requirements three times in 2025 alone. Each time, perfectly solid applications started failing for reasons that didn't exist six months before. This lesson is a live document ~ updated every time UGE changes something significant.",
  "bullets": [
    "New minimum income threshold for 2026: the exact figure, how it's calculated, and how it differs from the headline number most guides quote",
    "Updated remote work proof requirements: what additional employer documentation UGE is now requesting and why a contract alone isn't enough",
    "Employment contract change: the new minimum contract length UGE expects to see for employee applicants",
    "Portal changes: what moved and what's different in the UGE online submission system since early 2026",
    "Health insurance scrutiny: why more applications are getting additional information requests about coverage specifics in 2026",
    "What experienced consultants are actually seeing approved and rejected right now ~ the ground-level picture"
  ],
  "time": "10 min",
  "tag": "Updated 2026",
  "free": false,
  "link": "/dnv-updates-2026",
  "phase": {
    "phase": "Phase 2",
    "title": "Apply",
    "accent": "#7a8f90",
    "bg": "#e0eaeb"
  },
  "prev": {
    "number": "10",
    "title": "Step-by-Step Application Walkthrough",
    "path": "/playbook/spain-dnv/lessons/lesson-10"
  },
  "next": {
    "number": "12",
    "title": "Common Rejection Reasons & How to Avoid Them",
    "path": "/playbook/spain-dnv/lessons/lesson-12"
  }
};

export default function Lesson11Page() {
  return <LessonPageContent {...data} />;
}
