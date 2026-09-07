import Reveal from "@/components/Reveal";

/** Masthead for interior pages. Keeps every page opening on the same rhythm. */
export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="px-6 pt-36 pb-16 lg:px-10 lg:pt-44 lg:pb-20">
      <div className="mx-auto max-w-[78rem]">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-7 max-w-[18ch] text-[clamp(2.4rem,6vw,4.4rem)]">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={110}>
            <p className="mt-9 max-w-[52ch] border-t border-brass/25 pt-8 text-[1.0625rem] leading-relaxed text-ink-soft">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
