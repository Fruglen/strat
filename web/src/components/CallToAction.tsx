import Link from "next/link";
import Reveal from "@/components/Reveal";
import { practice } from "@/content/practice";

/** Closing invitation. Appears at the foot of every page. */
export default function CallToAction({
  title = "When you are ready, there is a chair here.",
  body = "New patients are welcome, in person in Largo or by video across Maryland. The first step is a conversation — nothing is decided before you have had one.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="px-6 pb-28 lg:px-10 lg:pb-36">
      <div className="mx-auto max-w-[78rem]">
        <Reveal>
          <div className="bg-forest px-8 py-24 text-center lg:px-16 lg:py-32">
            <h2 className="display mx-auto max-w-[18ch] text-[clamp(2.2rem,5vw,3.8rem)] text-ground">
              {title}
            </h2>
            <p className="mx-auto mt-7 max-w-[48ch] text-[15px] leading-relaxed text-ground/70">
              {body}
            </p>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={practice.contact.schedulerUrl}
                className="rounded-full bg-ground px-9 py-4 text-[12px] tracking-[0.14em] text-forest uppercase transition-colors duration-300 hover:bg-brass-lift"
              >
                Request a consultation
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-ground/35 px-9 py-4 text-[12px] tracking-[0.14em] text-ground uppercase transition-colors duration-300 hover:border-ground"
              >
                Contact the practice
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
