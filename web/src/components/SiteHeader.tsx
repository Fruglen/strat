"use client";

import { useEffect, useState } from "react";
import { practice } from "@/content/practice";

const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "What We Treat", href: "#conditions" },
  { label: "What to Expect", href: "#expect" },
];

export default function SiteHeader() {
  const [settled, setSettled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSettled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock background scroll while the mobile panel is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          settled || open
            ? "border-b border-brass/18 bg-ground/88 py-4 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-6 md:py-7"
        }`}
      >
        <div className="mx-auto flex max-w-[78rem] items-center justify-between gap-4 px-6 lg:px-10">
          <a href="#top" onClick={() => setOpen(false)} className="shrink-0">
            <span className="block font-display text-[0.95rem] tracking-[0.30em] text-forest uppercase md:text-[1.05rem]">
              Ozarha
            </span>
            <span className="mt-0.5 block text-[9px] tracking-[0.24em] whitespace-nowrap text-ink-soft uppercase">
              Behavioral Health
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] text-ink-soft transition-colors hover:text-forest"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href={practice.contact.schedulerUrl}
              className="hidden rounded-full border border-forest px-5 py-2.5 text-[12px] tracking-[0.10em] whitespace-nowrap text-forest uppercase transition-colors duration-300 hover:bg-forest hover:text-ground md:inline-block"
            >
              Request a consultation
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="rounded-full border border-forest px-5 py-2.5 text-[12px] tracking-[0.12em] text-forest uppercase md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ground px-6 pt-32 pb-10 md:hidden"
      >
        <nav className="flex flex-col" aria-label="Primary mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display border-t border-brass/25 py-6 text-[1.75rem]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={practice.contact.schedulerUrl}
          onClick={() => setOpen(false)}
          className="mt-10 block rounded-full bg-forest px-8 py-4 text-center text-[12px] tracking-[0.14em] text-ground uppercase"
        >
          Request a consultation
        </a>
        <p className="mt-5 text-center text-[13px] text-ink-soft">
          Or call {practice.contact.phone}
        </p>
      </div>
    </>
  );
}
