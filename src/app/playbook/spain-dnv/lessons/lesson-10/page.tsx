import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l09",
  "number": "10",
  "title": "Step-by-Step Application Walkthrough",
  "description": "This is the lesson. Every other lesson in this playbook is preparation ~ this is where it all comes together. Form by form, field by field, upload by upload. Including common mistakes and exactly how to fix them.",
  "bullets": [
    "Form EX-07: the main DNV application form ~ every field explained with what to write, what to leave blank, and what triggers a rejection",
    "Supporting forms: which additional EX forms attach to which documents and in what order",
    "File format requirements: PDF only, max file size, how to name files so they actually upload and process correctly",
    "The firma electronica (digital signature): what it is, why UGE requires it, and the workaround if you haven't set yours up yet",
    "Common upload errors: file too large, wrong format, wrong form version, mismatched document references ~ and how to fix each",
    "After you submit: the confirmation email, the reference number, what radio silence from UGE actually means",
    "Requerimiento: what it looks like when it arrives, how long you have to respond, and the exact response format UGE expects"
  ],
  "time": "20 min",
  "tag": "Core Lesson",
  "free": false,
  "link": "/how-to-apply-spain-digital-nomad-visa",
  "phase": {
    "phase": "Phase 2",
    "title": "Apply",
    "accent": "#7a8f90",
    "bg": "#e0eaeb"
  },
  "prev": {
    "number": "09",
    "title": "UGE vs Consulate ~ Which Route Is Yours",
    "path": "/playbook/spain-dnv/lessons/lesson-9"
  },
  "next": {
    "number": "11",
    "title": "DNV 2026 Updates ~ What's Changed",
    "path": "/playbook/spain-dnv/lessons/lesson-11"
  }
};

export default function Lesson10Page() {
  return <LessonPageContent {...data} />;
}
