import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l15",
  "number": "19",
  "title": "DNV Renewal ~ The Complete Process",
  "description": "Renewal is not just reapplication. Some documents are the same, some are different, and some have to be brand new because they've expired.",
  "bullets": [
    "Start 90 days before expiry: this isn't a suggestion ~ late renewal creates a gap in your legal residency status that can affect your citizenship clock",
    "What carries over from your initial application and what UGE expects to be refreshed",
    "What must be new: Padron certificate (less than 3 months old), fresh insurance certificate, updated criminal background check",
    "Social Security contributions: the contribution record UGE now checks at renewal and what a clean record looks like vs a problematic one",
    "Updated income threshold for renewal: the figure UGE expects in 2026 and whether you need to demonstrate higher earnings than year one",
    "Residency continuity rule at renewal: how many days you can be absent without resetting your citizenship clock",
    "Submitting renewal before expiry: the extension status that allows you to keep living and working legally while UGE processes your renewal"
  ],
  "time": "15 min",
  "tag": "Guide",
  "free": false,
  "phase": {
    "phase": "Phase 4",
    "title": "Maintain",
    "accent": "#e3a99c",
    "bg": "#f2d6c9"
  },
  "prev": {
    "number": "18",
    "title": "Document Translations ~ What Needs Translating",
    "path": "/playbook/spain-dnv/lessons/lesson-18"
  },
  "next": {
    "number": "20",
    "title": "Spain Tax Obligations for Digital Nomads",
    "path": "/playbook/spain-dnv/lessons/lesson-20"
  }
};

export default function Lesson19Page() {
  return <LessonPageContent {...data} />;
}
