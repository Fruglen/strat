import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { about, practice } from "@/content/practice";

export const metadata: Metadata = {
  title: "About — Ozarha Behavioral Health, Largo Maryland",
  description:
    "The clinician behind Ozarha Behavioral Health: training, approach, and what to expect from psychiatric care built around the person rather than the protocol.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Your clinician"
        title="Someone who has the time to understand the whole picture."
        intro={about.intro}
      />

      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[78rem] gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal>
            <Plate
              className="aspect-[4/5] w-full lg:sticky lg:top-32"
              brief="Portrait — seated, natural light, unhurried. Warm and direct, not a badge-and-lab-coat headshot. Portrait, 1600×2000."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-ink-soft">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 border-t border-brass/25 pt-8">
              <p className="font-display text-[1.15rem] text-forest">
                {practice.provider.name}
              </p>
              <p className="mt-1.5 text-[14px] text-ink-soft">
                {practice.provider.credentials} · Licensed in{" "}
                {practice.provider.licensedIn}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-lavender-warm px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <Reveal>
            <p className="eyebrow">How this practice works</p>
            <h2 className="display mt-6 max-w-[20ch] text-[clamp(2rem,4vw,3rem)]">
              Three things worth saying out loud.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-y-10 md:grid-cols-3 md:gap-x-14">
            {about.beliefs.map((belief, i) => (
              <Reveal key={belief.title} delay={i * 110}>
                <div className="border-t border-forest/14 pt-7">
                  <h3 className="display text-[1.4rem] leading-tight">
                    {belief.title}
                  </h3>
                  <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
                    {belief.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
