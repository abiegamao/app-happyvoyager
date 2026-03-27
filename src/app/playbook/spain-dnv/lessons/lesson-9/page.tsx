import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l08",
  "number": "09",
  "title": "UGE vs Consulate ~ Which Route Is Yours",
  "description": "This is the decision most people make wrong ~ usually because they didn't know there was a decision to make. UGE is the unit inside Spain. Your consulate is the Spanish embassy back home. They process different applicants, the experience is completely different, and you can't switch routes mid-application.",
  "bullets": [
    "UGE (Unidad de Grandes Empresas): for applicants already in Spain on a valid entry ~ digital-first, typically 20-40 day processing",
    "Consulate route: apply from your home country before you travel ~ you arrive in Spain with the visa already in your passport, processing can take 90+ days",
    "The residency requirement for UGE: you must be physically present in Spain and legally in-country to use this route",
    "Which route gives you more control over your timeline ~ and which one has fewer surprises",
    "The consulate experience for Filipinos applying from Manila: what the Spanish Embassy actually asks for",
    "Can you start with the consulate and switch to UGE? (No. Commit to one route and see it through.)"
  ],
  "time": "8 min",
  "tag": "Decision Guide",
  "free": false,
  "phase": {
    "phase": "Phase 2",
    "title": "Apply",
    "accent": "#7a8f90",
    "bg": "#e0eaeb"
  },
  "prev": {
    "number": "08",
    "title": "Schengen Timing Strategy",
    "path": "/playbook/spain-dnv/lessons/lesson-8"
  },
  "next": {
    "number": "10",
    "title": "Step-by-Step Application Walkthrough",
    "path": "/playbook/spain-dnv/lessons/lesson-10"
  }
};

export default function Lesson9Page() {
  return <LessonPageContent {...data} />;
}
