import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { conditions, services } from "@/content/practice";

export const metadata: Metadata = {
  title: "Services — Psychiatric Evaluation & Medication Management, Largo MD",
  description:
    "Comprehensive diagnostic evaluation, medication management, brief therapeutic interventions, behavioral wellness, and referral support — for depression, anxiety, ADHD, PTSD, bipolar disorder, OCD and more.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Care, from the first conversation onward."
        intro="Every course of care begins with a comprehensive diagnostic evaluation. What follows is shaped by what that conversation turns up — not by a template."
      />

      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[78rem]">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-brass/25 py-9 md:grid-cols-[auto_1.1fr_1.4fr] md:gap-x-12 md:py-12">
                <span className="font-display text-sm text-brass-text tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display text-[1.5rem] leading-tight md:text-[1.8rem]">
                  {service.title}
                  {"abbr" in service && service.abbr ? (
                    <span className="ml-2 align-middle text-[11px] tracking-[0.14em] text-brass-text">
                      {service.abbr}
                    </span>
                  ) : null}
                </h2>
                <p className="col-start-2 mt-3 max-w-[48ch] text-[15px] leading-relaxed text-ink-soft md:col-start-3 md:mt-0">
                  {service.body}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-brass/25" />
        </div>
      </section>

      <section id="conditions" className="bg-lavender-warm px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <Reveal>
            <p className="eyebrow">What we treat</p>
            <h2 className="display mt-6 max-w-[20ch] text-[clamp(2rem,4vw,3rem)]">
              You may already know the name for it. You may not.
            </h2>
            <p className="measure mt-7 text-[15px] leading-relaxed text-ink-soft">
              Either is a fine place to start. Comprehensive diagnostic
              evaluation and medication management are offered for the
              following, in children, adolescents, adults, and older adults.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
            {conditions.map((condition) => (
              <li key={condition.name}>
                <Reveal>
                  <div className="border-t border-forest/14 py-7">
                    <h3 className="font-display text-[1.2rem] leading-snug text-forest">
                      {condition.name}
                    </h3>
                    <p className="mt-2.5 max-w-[44ch] text-[14.5px] leading-relaxed text-ink-soft">
                      {condition.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="mt-12 border-t border-forest/14 pt-8 text-[13px] leading-relaxed text-ink-soft">
              This list is not exhaustive, and it grows. If what you are dealing
              with is not named here, it is still worth asking.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
