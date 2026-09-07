import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  conditions,
  pillars,
  practice,
  services,
  steps,
  visitTypes,
} from "@/content/practice";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ── Hero ─────────────────────────────────────────────── */}
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
              className="mx-auto h-[46vh] max-w-[78rem] min-h-[320px] lg:h-[62vh]"
              brief="Hero — a warm consulting room in late-afternoon light. Two chairs, timber, linen, a plant. Nobody in frame. Landscape, 2400×1400."
            />
          </div>
        </Reveal>

        {/* ── The three commitments ────────────────────────────── */}
        <section className="px-6 py-28 lg:px-10 lg:py-36">
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

        {/* ── How to be seen ───────────────────────────────────── */}
        <section id="visits" className="bg-ground-deep px-6 py-24 lg:px-10 lg:py-32">
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

                  {visit.kind === "In person" && (
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
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section id="about" className="bg-forest text-ground">
          <div className="mx-auto grid max-w-[78rem] items-center gap-14 px-6 py-28 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-36">
            <Reveal>
              <Plate
                tone="forest"
                className="aspect-[5/6] w-full"
                brief="Portrait — the provider, seated, natural light, unhurried. Warm and direct, not a badge-and-lab-coat headshot. Portrait, 1600×2000."
              />
            </Reveal>

            <Reveal delay={140}>
              <p className="text-[11px] font-medium tracking-[0.18em] text-brass-lift uppercase">
                Your clinician
              </p>
              <h2 className="display mt-7 text-[clamp(2rem,3.6vw,2.9rem)] text-ground">
                Someone who has the time to understand the whole picture.
              </h2>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ground/72">
                <p>
                  {/* PLACEHOLDER — replace with the provider's own words. */}
                  This is where her story goes: what drew her to psychiatry, how
                  she works, and what a person can expect from sitting down with
                  her. Written in her voice, first person, and worth the space it
                  takes — this is the section that decides whether someone picks
                  up the phone.
                </p>
                <p>
                  {practice.provider.name} · {practice.provider.credentials} ·
                  Licensed in {practice.provider.licensedIn}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────── */}
        <section id="services" className="px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[78rem]">
            <Reveal>
              <p className="eyebrow">Services</p>
              <h2 className="display mt-6 max-w-[16ch] text-[clamp(2.1rem,4.4vw,3.4rem)]">
                Care, from the first conversation onward.
              </h2>
            </Reveal>

            <div className="mt-16">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 70}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-brass/25 py-9 md:grid-cols-[auto_1.1fr_1.4fr] md:gap-x-12 md:py-11">
                    <span className="font-display text-sm text-brass-text tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display text-[1.45rem] leading-tight md:text-[1.7rem]">
                      {service.title}
                      {"abbr" in service && service.abbr ? (
                        <span className="ml-2 align-middle text-[11px] tracking-[0.14em] text-brass-text">
                          {service.abbr}
                        </span>
                      ) : null}
                    </h3>
                    <p className="col-start-2 mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft md:col-start-3 md:mt-0">
                      {service.body}
                    </p>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-brass/25" />
            </div>
          </div>
        </section>

        {/* ── Conditions ───────────────────────────────────────── */}
        <section id="conditions" className="bg-lavender-warm px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[78rem]">
            <Reveal>
              <p className="eyebrow">What we treat</p>
              <h2 className="display mt-6 max-w-[20ch] text-[clamp(2.1rem,4.4vw,3.4rem)]">
                You may already know the name for it. You may not.
              </h2>
              <p className="measure mt-7 text-[15px] leading-relaxed text-ink-soft">
                Either is a fine place to start. Comprehensive diagnostic
                evaluation and medication management are offered for the
                following, in children, adolescents, adults, and older adults.
              </p>
            </Reveal>

            <ul className="mt-16 grid gap-x-16 md:grid-cols-2">
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
              <p className="mt-14 border-t border-forest/14 pt-8 text-[13px] text-ink-soft">
                Additional services include brief therapeutic interventions,
                behavioral wellness, and referral support.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── What to expect ───────────────────────────────────── */}
        <section id="expect" className="px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[78rem]">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
              <Reveal>
                <p className="eyebrow">What to expect</p>
                <h2 className="display mt-6 text-[clamp(2.1rem,4.4vw,3.4rem)]">
                  Three steps, and none of them are a waiting room.
                </h2>
                <Plate
                  tone="lavender"
                  className="mt-12 hidden aspect-[5/4] w-full lg:block"
                  brief="Still life — a low table, ceramic cup, folded linen, light falling across it. Quiet and tactile. Landscape, 1600×1280."
                />
              </Reveal>

              <div>
                {steps.map((step, i) => (
                  <Reveal key={step.title} delay={i * 110}>
                    <div className="grid grid-cols-[auto_1fr] gap-x-7 border-t border-brass/25 py-10">
                      <span className="font-display text-sm text-brass-text tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="display text-[1.5rem] leading-tight">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-ink-soft">
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

        {/* ── Closing invitation ───────────────────────────────── */}
        <section className="px-6 pb-28 lg:px-10 lg:pb-36">
          <div className="mx-auto max-w-[78rem]">
            <Reveal>
              <div className="relative overflow-hidden bg-forest px-8 py-24 text-center lg:px-16 lg:py-32">
                <h2 className="display mx-auto max-w-[18ch] text-[clamp(2.2rem,5vw,3.8rem)] text-ground">
                  When you are ready, there is a chair here.
                </h2>
                <p className="mx-auto mt-7 max-w-[46ch] text-[15px] leading-relaxed text-ground/70">
                  New patients are welcome. The first step is a conversation —
                  nothing is decided before you have had one.
                </p>
                <a
                  href={practice.contact.schedulerUrl}
                  className="mt-11 inline-block rounded-full bg-ground px-9 py-4 text-[12px] tracking-[0.14em] text-forest uppercase transition-colors duration-300 hover:bg-brass-lift"
                >
                  Request a consultation
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
