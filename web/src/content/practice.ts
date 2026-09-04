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

  // PLACEHOLDER — awaiting provider name, credentials, licensure
  provider: {
    name: "PLACEHOLDER — Provider Name",
    credentials: "PLACEHOLDER — Credentials",
    licensedIn: "PLACEHOLDER — State(s)",
  },

  // PLACEHOLDER — awaiting real contact details
  contact: {
    phone: "PLACEHOLDER — Phone",
    email: "PLACEHOLDER — Email",
    schedulerUrl: "#", // IntakeQ / SimplePractice / Headway link goes here
  },

  promise:
    "Comprehensive psychiatric evaluation and medication management, delivered with a patient-centered, holistic approach — for every stage of life.",
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
