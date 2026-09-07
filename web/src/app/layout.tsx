import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { practice } from "@/content/practice";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Ozarha Behavioral Health — Psychiatric Care in Largo, Maryland",
  description:
    "Comprehensive diagnostic evaluation and medication management with a patient-centered, holistic approach. In person in Largo, MD, or by video across Maryland. Care across the lifespan.",
  openGraph: {
    title: "Ozarha Behavioral Health",
    description:
      "Psychiatric evaluation and medication management, in person in Largo, Maryland or by video statewide.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * Local-business structured data. A practice with a physical address needs this
 * to appear correctly in map and local search results.
 * TODO(client): add telephone + url once confirmed.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: practice.legalName,
  description: practice.promise,
  medicalSpecialty: "Psychiatric",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${practice.office.street}, ${practice.office.suite}`,
    addressLocality: practice.office.city,
    addressRegion: practice.office.state,
    postalCode: practice.office.zip,
    addressCountry: "US",
  },
  areaServed: {
    "@type": "State",
    name: "Maryland",
  },
  availableService: [
    { "@type": "MedicalTherapy", name: "Comprehensive Diagnostic Evaluation" },
    { "@type": "MedicalTherapy", name: "Medication Management" },
    { "@type": "MedicalTherapy", name: "Brief Therapeutic Interventions" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
