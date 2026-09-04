import { practice } from "@/content/practice";

export default function SiteFooter() {
  return (
    <footer className="bg-forest-veil text-ground/78">
      <div className="mx-auto max-w-[78rem] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="block font-display text-lg tracking-[0.30em] text-ground uppercase">
              Ozarha
            </span>
            <span className="mt-1 block text-[9px] tracking-[0.26em] text-brass-lift uppercase">
              Behavioral Health
            </span>
            <p className="measure mt-6 text-sm leading-relaxed text-ground/62">
              {practice.promise}
            </p>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-brass-lift uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm text-ground/72">
              <li>{practice.contact.phone}</li>
              <li>{practice.contact.email}</li>
              <li className="pt-1 text-ground/50">
                {practice.provider.licensedIn}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-brass-lift uppercase">
              In a crisis
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ground/72">
              This website is not for emergencies. If you are in immediate
              danger, call <strong className="text-ground">911</strong>.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ground/72">
              For urgent mental-health support, call or text{" "}
              <strong className="text-ground">988</strong> — the Suicide &amp;
              Crisis Lifeline, available 24 hours a day.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-ground/12 pt-8">
          <p className="text-xs leading-relaxed text-ground/45">
            © {new Date().getFullYear()} {practice.legalName}. All rights
            reserved. The content of this website is for general information
            only and is not medical advice, nor a substitute for evaluation by a
            qualified clinician. Visiting this site does not create a
            patient–provider relationship.
          </p>
        </div>
      </div>
    </footer>
  );
}
