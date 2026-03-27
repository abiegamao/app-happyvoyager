import LessonPageContent from "../LessonPageContent";

const data = {
  "lessonId": "l12",
  "number": "13",
  "title": "Your First 30 Days in Spain",
  "description": "Month one in Spain is like playing a video game with no instructions, in a language you're still learning, while running a business. Here's the walkthrough. The order of operations matters ~ get it wrong and you're starting the queue again.",
  "bullets": [
    "Declaracion de entrada: file this within 30 days of entering Spain on your Type D visa at the local Oficina de Extranjeria ~ most guides skip this step entirely",
    "Days 1-3: secure permanent accommodation with a real rental contract (not Airbnb, not a friend's sofa) ~ every single other step depends on this address",
    "Days 3-7: Padron registration at your local Ayuntamiento ~ your empadronamiento certificate is the key that unlocks everything else",
    "Week 2: open a Spanish bank account using your Padron cert and NIE ~ Sabadell and BBVA are currently the most straightforward for new arrivals",
    "Week 2-3: book your TIE fingerprint appointment (cita previa) the moment slots open ~ they disappear in under 2 minutes in Madrid and Barcelona",
    "Month 1: get a Spanish SIM, set up home internet, and start your Certificado Digital application",
    "The 30-day countdown: a checklist of what gets significantly harder the longer you leave it"
  ],
  "time": "12 min",
  "tag": "Action Plan",
  "free": false,
  "phase": {
    "phase": "Phase 3",
    "title": "Arrive",
    "accent": "#8fa38d",
    "bg": "#d4e0d3"
  },
  "prev": {
    "number": "12",
    "title": "Common Rejection Reasons & How to Avoid Them",
    "path": "/playbook/spain-dnv/lessons/lesson-12"
  },
  "next": {
    "number": "14",
    "title": "Padron Registration Guide",
    "path": "/playbook/spain-dnv/lessons/lesson-14"
  }
};

export default function Lesson13Page() {
  return <LessonPageContent {...data} />;
}
