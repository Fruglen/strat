import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import {
  conditions,
  pillars,
  practice,
  services,
  visitTypes,
} from "@/content/practice";

export default function Home() {
  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="px-6 pt-40 pb-16 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[78rem]">
          <Reveal>
            <p className="eyebrow">Psychiatric care across the lifespan</p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display mt-8 max-w-[19ch] text-[clamp(2.7rem,7.4vw,5.6rem)]">
              Room to think clearly again.
            </h1>
          </Reveal>

          <div className="mt-12 grid gap-10 border-t border-brass/25 pt-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
            <Reveal delay={170}>
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                {practice.promise}
              </p>
            </Reveal>

            <Reveal delay={230} className="flex md:justify-end">
              <div className="flex flex-col items-start gap-5 md:items-end">
                <a
                  href={practice.contact.schedulerUrl}
                  className="rounded-full bg-forest px-8 py-4 text-[12px] tracking-[0.14em] text-ground uppercase transition-colors duration-300 hover:bg-forest-lift"
                >
                  Request a consultation
                </a>
                <span className="text-[13px] text-ink-soft">
                  Or call {practice.contact.phone}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal delay={120}>
        <div className="px-6 lg:px-10">
          <Plate
            className="mx-auto h-[46vh] max-w-[78rem] min-h-[320px] lg:h-[58vh]"
            brief="Hero — a warm consulting room in late-afternoon light. Two chairs, timber, linen, a plant. Nobody in frame. Landscape, 2400×1400."
          />
        </div>
      </Reveal>

      {/* ── The three commitments ──────────────────────────────── */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <div className="grid gap-y-14 md:grid-cols-3 md:gap-x-14">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 110}>
                <div className="rule mb-7" />
                <h2 className="display text-[1.6rem] leading-tight">
                  {pillar.title}
                </h2>
                <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About teaser ───────────────────────────────────────── */}
      <section className="bg-forest text-ground">
        <div className="mx-auto grid max-w-[78rem] items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-32">
          <Reveal>
            <Plate
              tone="forest"
              className="aspect-[5/6] w-full"
              brief="Portrait — seated, natural light, unhurried. Warm and direct, not a badge-and-lab-coat headshot. Portrait, 1600×2000."
            />
          </Reveal>

          <Reveal delay={140}>
            <p className="text-[11px] font-medium tracking-[0.18em] text-brass-lift uppercase">
              Your clinician
            </p>
            <h2 className="display mt-7 text-[clamp(2rem,3.6vw,2.9rem)] text-ground">
              Someone who has the time to understand the whole picture.
            </h2>
            <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-ground/72">
              Care here is built around the person in front of her — history,
              sleep, work, relationships and all — rather than around a
              protocol. That takes longer. It also tends to hold.
            </p>
            <Link
              href="/about"
              className="mt-9 inline-block rounded-full border border-ground/35 px-8 py-3.5 text-[12px] tracking-[0.14em] text-ground uppercase transition-colors duration-300 hover:border-ground"
            >
              More about her
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Services teaser ────────────────────────────────────── */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h2 className="display mt-6 max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)]">
              Care, from the first conversation onward.
            </h2>
          </Reveal>

          <ul className="mt-14">
            {services.map((service, i) => (
              <li key={service.title}>
                <Reveal delay={i * 60}>
                  <Link
                    href="/services"
                    className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-t border-brass/25 py-7 md:gap-x-12"
                  >
                    <span className="font-display text-sm text-brass-text tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display text-[1.35rem] leading-tight transition-colors group-hover:text-forest-lift md:text-[1.6rem]">
                      {service.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-brass-text transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="border-t border-brass/25" />
        </div>
      </section>

      {/* ── Conditions teaser ──────────────────────────────────── */}
      <section className="bg-lavender-warm px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <Reveal>
            <p className="eyebrow">What we treat</p>
            <h2 className="display mt-6 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)]">
              You may already know the name for it. You may not.
            </h2>
            <p className="measure mt-7 text-[15px] leading-relaxed text-ink-soft">
              Either is a fine place to start. Evaluation and medication
              management are offered for the following and more, in children,
              adolescents, adults, and older adults.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-12 flex flex-wrap gap-x-3 gap-y-3">
              {conditions.map((condition) => (
                <li
                  key={condition.name}
                  className="rounded-full border border-forest/20 px-5 py-2.5 text-[14px] text-forest"
                >
                  {condition.name}
                </li>
              ))}
            </ul>

            <Link
              href="/services#conditions"
              className="mt-12 inline-block rounded-full bg-forest px-8 py-3.5 text-[12px] tracking-[0.14em] text-ground uppercase transition-colors duration-300 hover:bg-forest-lift"
            >
              See all services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── How to be seen ─────────────────────────────────────── */}
      <section className="bg-ground-deep px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[78rem]">
          <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-20">
            {visitTypes.map((visit, i) => (
              <Reveal key={visit.kind} delay={i * 120}>
                <p className="eyebrow">{visit.kind}</p>
                <h2 className="display mt-5 text-[clamp(1.7rem,3vw,2.3rem)]">
                  {visit.title}
                </h2>
                <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
                  {visit.body}
                </p>

                {"note" in visit && visit.note ? (
                  <p className="mt-7 max-w-[38ch] border-t border-brass/25 pt-6 text-[14px] leading-relaxed text-ink-soft">
                    {visit.note}
                  </p>
                ) : null}

                {visit.kind === "In person" ? (
                  <address className="mt-7 text-[15px] leading-relaxed not-italic text-forest">
                    {practice.office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a
                      href={practice.office.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-[13px] text-brass-text underline underline-offset-4 transition-colors hover:text-forest"
                    >
                      Open in Maps
                    </a>
                  </address>
                ) : null}
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link
              href="/what-to-expect"
              className="mt-14 inline-block rounded-full border border-forest px-8 py-3.5 text-[12px] tracking-[0.14em] text-forest uppercase transition-colors duration-300 hover:bg-forest hover:text-ground"
            >
              What to expect
            </Link>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
