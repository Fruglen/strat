import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { practice } from "@/content/practice";

export const metadata: Metadata = {
  title: "Contact — Ozarha Behavioral Health, Largo Maryland",
  description:
    "Request a consultation with Ozarha Behavioral Health. In person at 1300 Mercantile Lane, Largo, MD, or by secure video across Maryland.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        intro="Reach out however is easiest. Requests are answered by a person, and nothing is decided before you have spoken to one."
      />

      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[78rem]">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="border-t border-brass/25 pt-8">
                <h2 className="eyebrow">Request an appointment</h2>
                <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
                  New patients are welcome. Booking takes a few minutes, and you
                  can choose an in-person or video appointment as you go.
                </p>
                <a
                  href={practice.contact.schedulerUrl}
                  className="mt-8 inline-block rounded-full bg-forest px-8 py-4 text-[12px] tracking-[0.14em] text-ground uppercase transition-colors duration-300 hover:bg-forest-lift"
                >
                  Request a consultation
                </a>
              </div>

              <div className="mt-12 border-t border-brass/25 pt-8">
                <h2 className="eyebrow">By phone or email</h2>
                <ul className="mt-6 space-y-3 text-[1.0625rem] text-forest">
                  <li>{practice.contact.phone}</li>
                  <li>{practice.contact.email}</li>
                </ul>
                <p className="mt-5 max-w-[42ch] text-[14px] leading-relaxed text-ink-soft">
                  Please do not include medical details in an email. Email is
                  not a secure channel, and anything clinical is better said in
                  the appointment itself.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="border-t border-brass/25 pt-8">
                <h2 className="eyebrow">The office</h2>
                <address className="mt-6 text-[1.0625rem] leading-relaxed not-italic text-forest">
                  {practice.office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={practice.office.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-[13px] text-brass-text underline underline-offset-4 transition-colors hover:text-forest"
                >
                  Open in Maps
                </a>
                <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
                  Appointments are also available by secure video anywhere in{" "}
                  {practice.provider.licensedIn}.
                </p>
              </div>

              <div className="mt-12 bg-forest px-8 py-10">
                <h2 className="text-[11px] font-medium tracking-[0.18em] text-brass-lift uppercase">
                  If this is an emergency
                </h2>
                <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-ground/78">
                  This website and these contact details are not monitored for
                  emergencies. If you are in immediate danger, call{" "}
                  <strong className="text-ground">911</strong>.
                </p>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ground/78">
                  For urgent mental-health support at any hour, call or text{" "}
                  <strong className="text-ground">988</strong> — the Suicide
                  &amp; Crisis Lifeline.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
