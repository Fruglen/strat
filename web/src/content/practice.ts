/**
 * Single source of truth for everything on the site that changes.
 * Edit this file to update the site — no layout work required.
 *
 * TODO(client): fields marked PLACEHOLDER need confirmation before launch.
 */

export const practice = {
  name: "Ozarha Behavioral Health",
  legalName: "Ozarha Behavioral Health, LLC",
  shortName: "Ozarha",

  // PLACEHOLDER — awaiting provider name and credentials
  provider: {
    name: "PLACEHOLDER — Provider Name",
    credentials: "PLACEHOLDER — Credentials",
    licensedIn: "Maryland",
  },

  office: {
    street: "1300 Mercantile Lane",
    suite: "Suite 129-22",
    city: "Largo",
    state: "MD",
    zip: "20774",
    lines: ["1300 Mercantile Lane", "Suite 129-22", "Largo, MD 20774"],
    oneLine: "1300 Mercantile Lane, Suite 129-22, Largo, MD 20774",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("1300 Mercantile Lane, Suite 129-22, Largo, MD 20774"),
  },

  // PLACEHOLDER — awaiting real contact details
  contact: {
    phone: "PLACEHOLDER — Phone",
    email: "PLACEHOLDER — Email",
    schedulerUrl: "#", // IntakeQ / SimplePractice / Headway link goes here
  },

  promise:
    "Comprehensive psychiatric evaluation and medication management, delivered with a patient-centered, holistic approach — for every stage of life. In person in Largo, or by video anywhere in Maryland.",
} as const;

export const pillars = [
  {
    title: "Patient-centered",
    body: "You are the one who knows what your life actually feels like. Care is built around that, not around a protocol.",
  },
  {
    title: "Holistic",
    body: "Sleep, work, relationships, history, and body are part of the picture — not a footnote to the prescription.",
  },
  {
    title: "Across the lifespan",
    body: "Children, adolescents, adults, and older adults. The approach changes with the person in the room.",
  },
] as const;

export const services = [
  {
    title: "Comprehensive Diagnostic Evaluation",
    abbr: "CDE",
    body: "An unhurried first conversation. History, context, and what brought you here — enough time to arrive at an understanding worth acting on.",
  },
  {
    title: "Medication Management",
    body: "Ongoing, carefully monitored care. Adjustments made deliberately, with your input, and reviewed as your life changes.",
  },
  {
    title: "Brief Therapeutic Interventions",
    body: "Focused, practical work alongside medication — for the things that respond better to conversation than to a dose change.",
  },
  {
    title: "Behavioral Wellness",
    body: "The daily architecture that holds treatment up: sleep, routine, stress, and the habits that quietly decide how a week goes.",
  },
  {
    title: "Referral Support",
    body: "When something falls outside this practice, you leave with a name and a warm introduction — not a list to work through alone.",
  },
] as const;

/**
 * Alphabetized, per client request.
 * NOTE(client): two names corrected from the source document —
 *   "Obsessive and Compulsive Disorder" -> "Obsessive-Compulsive Disorder"
 *   "Attention Deficit HyperactivityDisorder" -> "Attention-Deficit/Hyperactivity Disorder"
 * DRAFT COPY: descriptions are written for tone and need clinical sign-off.
 */
export const conditions = [
  {
    name: "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    body: "Difficulty with focus, follow-through, and restlessness — in children, and in adults who were never assessed.",
  },
  {
    name: "Anxiety Disorders",
    body: "Persistent worry, tension, or panic that has started to shape your decisions.",
  },
  {
    name: "Bipolar and Related Disorders",
    body: "Shifts in mood and energy that go beyond ordinary ups and downs.",
  },
  {
    name: "Conduct Disorder",
    body: "Patterns of behavior in children and adolescents that have become difficult for a family to manage alone.",
  },
  {
    name: "Depressive Disorders",
    body: "Low mood, flatness, or exhaustion that has outlasted the circumstances that started it.",
  },
  {
    name: "Insomnia",
    body: "Trouble falling asleep or staying asleep — and the toll that takes on everything else.",
  },
  {
    name: "Obsessive-Compulsive Disorder (OCD)",
    body: "Intrusive thoughts, and the rituals that build up around them.",
  },
  {
    name: "Oppositional Defiant Disorder (ODD)",
    body: "Ongoing defiance and irritability in a child, beyond the usual testing of limits.",
  },
  {
    name: "Post-Traumatic Stress Disorder (PTSD)",
    body: "The lasting effects of something you lived through, still making themselves felt.",
  },
  {
    name: "Schizophrenia Spectrum",
    body: "Changes in perception and thinking, met with careful, continuous psychiatric support.",
  },
] as const;

export const steps = [
  {
    title: "Reach out",
    body: "A short message or call. No intake questionnaire, no symptom checklist before anyone has spoken to you.",
  },
  {
    title: "The first conversation",
    body: "A comprehensive evaluation, given the time it needs. You will not be rushed toward a prescription.",
  },
  {
    title: "Ongoing care",
    body: "A plan you understand and agreed to, reviewed as things change — because they will.",
  },
] as const;

export const visitTypes = [
  {
    kind: "In person",
    title: "A room in Largo.",
    body: "Appointments at the Largo office, for anyone who would rather do this face to face — first evaluations included.",
  },
  {
    kind: "Virtual",
    title: "Or wherever you are in Maryland.",
    body: "Secure video appointments for anyone licensed care can reach across the state. The same unhurried conversation, from your own room.",
    note: "A private link arrives before your appointment — nothing to install, and no waiting room to sit in.",
  },
] as const;

/** Interior-page copy. DRAFT — needs the provider's voice and clinical sign-off. */
export const about = {
  intro:
    "PLACEHOLDER — her opening paragraph, first person. What drew her to psychiatry, and what she believes care should feel like.",
  paragraphs: [
    "PLACEHOLDER — her training and path: where she studied, where she has practiced, and what she learned there that shaped how she works now.",
    "PLACEHOLDER — how she actually practices. What a person can expect from sitting with her: pace, listening, how decisions get made, how much say the patient has.",
    "PLACEHOLDER — who she works best with, and why. This is where a prospective patient decides she is the right person for them.",
  ],
  beliefs: [
    {
      title: "Medication is a tool, not the plan",
      body: "It has a place, often an important one. But a prescription written without understanding the life around it rarely holds.",
    },
    {
      title: "The first appointment is not a formality",
      body: "A comprehensive evaluation takes the time it takes. Most of what matters comes out in the parts that cannot be rushed.",
    },
    {
      title: "You should understand your own care",
      body: "What you are taking, why, what to watch for, and what happens next. If any of that is unclear, something has gone wrong.",
    },
  ],
} as const;

export const faqs = [
  {
    q: "How long is the first appointment?",
    a: "PLACEHOLDER — confirm duration. The comprehensive diagnostic evaluation is longer than a routine visit, because it is where the whole history gets heard.",
  },
  {
    q: "Do you take insurance?",
    a: "PLACEHOLDER — insurance carriers, private-pay rates, or both. This needs to be answered plainly here so nobody arrives with the wrong expectation.",
  },
  {
    q: "Can I be seen by video?",
    a: "Yes. Appointments are available in person at the Largo office or by secure video anywhere in Maryland. Care must be provided within the state where the patient is physically located at the time of the appointment.",
  },
  {
    q: "Do you see children?",
    a: "Care is offered across the lifespan — children, adolescents, adults, and older adults. PLACEHOLDER — confirm the youngest age seen.",
  },
  {
    q: "Do you prescribe controlled substances?",
    a: "PLACEHOLDER — her policy on stimulants and other controlled medications, including any requirements for in-person visits. Worth stating clearly; people ask before they book.",
  },
  {
    q: "What should I bring to the first visit?",
    a: "A photo ID, your insurance card if you are using insurance, a list of any medications you currently take, and records from prior treatment if you have them. None of it is a prerequisite — come anyway.",
  },
] as const;
