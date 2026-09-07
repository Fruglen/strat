import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { faqs, practice, steps, visitTypes } from "@/content/practice";

export const metadata: Metadata = {
  title: "What to Expect — Ozarha Behavioral Health, Largo Maryland",
  description:
    "How care works at Ozarha Behavioral Health: reaching out, the comprehensive first evaluation, and ongoing treatment. In person in Largo or by secure video across Maryland.",
};

export default function WhatToExpectPage() {
  return (
    <main>
      <PageHero
        eyebrow="What to expect"
        title="Three steps, and none of them are a waiting room."
        intro="Starting psychiatric care is its own hurdle. Here is exactly what happens, so nothing about the process is a surprise."
      />

      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[78rem]">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <Reveal>
              <Plate
                tone="lavender"
                className="aspect-[5/4] w-full lg:sticky lg:top-32"
                brief="Still life — a low table, ceramic cup, folded linen, light falling across it. Quiet and tactile. Landscape, 1600×1280."
              />
            </Reveal>

            <div>
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 100}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-7 border-t border-brass/25 py-10">
                    <span className="font-display text-sm text-brass-text tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="display text-[1.6rem] leading-tight">
                        {step.title}
                      </h2>
                      <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink-soft">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-brass/25" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ground-deep px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <Reveal>
            <p className="eyebrow">Two ways to be seen</p>
            <h2 className="display mt-6 max-w-[22ch] text-[clamp(2rem,4vw,3rem)]">
              In the room, or from your own.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-y-12 md:grid-cols-2 md:gap-x-20">
            {visitTypes.map((visit, i) => (
              <Reveal key={visit.kind} delay={i * 110}>
                <div className="border-t border-brass/25 pt-8">
                  <p className="eyebrow">{visit.kind}</p>
                  <h3 className="display mt-4 text-[1.6rem] leading-tight">
                    {visit.title}
                  </h3>
                  <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
                    {visit.body}
                  </p>
                  {"note" in visit && visit.note ? (
                    <p className="mt-5 max-w-[38ch] text-[14px] leading-relaxed text-ink-soft">
                      {visit.note}
                    </p>
                  ) : null}
                  {visit.kind === "In person" ? (
                    <address className="mt-5 text-[15px] leading-relaxed not-italic text-forest">
                      {practice.office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <Reveal>
            <p className="eyebrow">Questions people ask first</p>
            <h2 className="display mt-6 max-w-[18ch] text-[clamp(2rem,4vw,3rem)]">
              The practical things.
            </h2>
          </Reveal>

          <dl className="mt-14 grid gap-x-16 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-t border-brass/25 py-8">
                <Reveal>
                  <dt className="font-display text-[1.2rem] leading-snug text-forest">
                    {faq.q}
                  </dt>
                  <dd className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
                    {faq.a}
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
