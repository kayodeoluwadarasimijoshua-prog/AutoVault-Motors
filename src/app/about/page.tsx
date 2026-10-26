import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MessageCircle, Search, Scale } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { VEHICLE_BODY_STYLES, VEHICLE_COUNT, VEHICLE_MAKES } from "@/data/vehicles";
import { DEMO_NOTICE, STUDIO_NAME } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "AutoVault Motors is a fictional dealership concept by Growthly, showing how a Nigerian dealership can present inventory clearly online.",
  path: "/about",
});

const principles = [
  {
    icon: Search,
    title: "Discovery before detail",
    description:
      "The inventory puts the decision-making facts first: price, year, mileage, transmission, fuel type and condition. Detailed pages then go deeper without hiding the basics.",
  },
  {
    icon: Scale,
    title: "Comparable by design",
    description:
      "Every listing follows the same information structure, so two vehicles can be read side by side. Up to three can be compared in one view on any screen size.",
  },
  {
    icon: MessageCircle,
    title: "Enquiry, not e-commerce",
    description:
      "There is no cart, checkout or account. The website's job is to answer the obvious questions and then put the buyer in touch with the dealership on WhatsApp.",
  },
];

const steps = [
  {
    title: "Browse or filter the inventory",
    description:
      "Search by make or model, then narrow by budget, year, transmission, body style and condition. The address bar keeps the exact view so it can be shared.",
  },
  {
    title: "Open a vehicle and check the detail",
    description:
      "Each listing carries its specifications, features, availability label and reference number, plus a gallery where more than one image exists.",
  },
  {
    title: "Send a prepared WhatsApp enquiry",
    description:
      "The message arrives written with the vehicle's year, make, model and reference. The buyer can edit it before sending — nothing is sent automatically.",
  },
];

export default function AboutPage() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralEnquiryMessage("contact"));

  return (
    <>
      <PageHeader
        eyebrow="About AutoVault Motors"
        title="A showroom concept built around clear information"
        description="AutoVault Motors is a fictional dealership concept created for demonstration. It exists to show how a Nigerian car dealership could present its inventory online with clarity and confidence."
      />

      <section aria-labelledby="concept-heading" className="bg-bone-50 py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="max-w-2xl">
            <h2 id="concept-heading" className="display-md text-ink-950">
              What this project is
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
              Most dealerships in Nigeria already sell through Instagram, Facebook and WhatsApp. The
              listings are real, but the information is scattered across captions, stories and
              screenshots — and buyers end up asking the same questions in the DMs.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
              AutoVault Motors is {STUDIO_NAME}&rsquo;s answer to that: a structured showroom where a
              buyer can see what is available, understand how one car differs from another, and start
              a conversation that already includes the details the dealership needs.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
              It is not a trading business. There is no stock, no sales team and no transaction
              behind it, and every listing in the inventory is sample data created for this
              demonstration.
            </p>

            <h3 className="mt-9 text-lg font-semibold tracking-[-0.015em] text-ink-950">
              The customer experience we designed
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
              The site assumes a buyer on a phone, with a budget and a shortlist, often checking
              between other tasks. That shaped three decisions: keep the specification set consistent,
              keep the path to WhatsApp short, and never make the visitor create an account or fill a
              long form to ask a simple question.
            </p>

            <h3 className="mt-9 text-lg font-semibold tracking-[-0.015em] text-ink-950">
              How vehicle information is presented
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
              Each listing shows the same fields in the same order, including condition (foreign used
              or Nigerian used), mileage, transmission, fuel type and engine capacity. The site does
              not make verification claims: no inspection certificates, accident histories or
              ownership guarantees are asserted, because a real dealership would need to provide and
              stand behind that evidence.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
              Prices are shown in naira and labelled as illustrative. Availability labels — available,
              reserved and sold — demonstrate how the interface should communicate status, not what
              is genuinely on a forecourt.
            </p>

            <div className="mt-8 rounded-[var(--radius-card)] border border-bone-300 bg-bone-100 p-5">
              <p className="eyebrow text-moss-700">Demonstration status</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-700">{DEMO_NOTICE}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
                No employees, customers, awards, company history, business registration or
                certifications are invented for this project.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="overflow-hidden rounded-[var(--radius-panel)] border border-bone-200 bg-white">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/showroom-autovault.jpg"
                  alt="Interior of a modern car showroom with ceiling lights reflecting on a polished floor"
                  fill
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="object-cover"
                />
              </div>
              <p className="px-4 py-3 text-[11px] leading-relaxed text-ink-500">
                Illustrative studio imagery created for this concept.
              </p>
            </div>

            <div className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5">
              <h3 className="eyebrow text-ink-500">At a glance</h3>
              <dl className="mt-3 space-y-3">
                {[
                  { label: "Demo listings", value: String(VEHICLE_COUNT) },
                  { label: "Makes represented", value: String(VEHICLE_MAKES.length) },
                  { label: "Body styles", value: String(VEHICLE_BODY_STYLES.length) },
                  { label: "Primary channel", value: "WhatsApp enquiry" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-bone-200 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-[12px] text-ink-500">{item.label}</dt>
                    <dd className="text-[13px] font-medium text-ink-950">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-ink-950">Built by {STUDIO_NAME}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
                A Nigerian digital services studio. This site is a portfolio demonstration for
                dealerships considering a professional website.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="border-y border-bone-200 bg-bone-100 py-14">
        <div className="container-page">
          <SectionHeading
            headingId="approach-heading"
            eyebrow="Approach"
            title="Three principles behind the interface"
            description="Design decisions the concept is built on, rather than claims about business performance."
          />
          <ul className="mt-9 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.title} className="rounded-[var(--radius-card)] border border-bone-300 bg-white p-5">
                <span className="flex size-9 items-center justify-center rounded-md bg-moss-50 text-moss-700">
                  <principle.icon aria-hidden="true" className="size-[18px]" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink-950">{principle.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="enquiry-steps-heading" className="grain-dark bg-ink-950 py-14 text-bone-50 sm:py-16">
        <div className="container-page">
          <SectionHeading
            headingId="enquiry-steps-heading"
            tone="dark"
            eyebrow="How enquiries work"
            title="From browsing to a conversation in three steps"
            description="No account, no checkout, no waiting for a form to be processed."
          />

          <ol className="mt-9 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-white/15 pt-5">
                <span className="font-mono text-[11px] tracking-[0.14em] text-moss-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold text-bone-50">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-300">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/inventory" size="lg" variant="primary" className="group">
              Browse the inventory
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </ButtonLink>
            {whatsappUrl ? (
              <ButtonAnchor
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outlineDark"
              >
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
                Start a WhatsApp enquiry
              </ButtonAnchor>
            ) : (
              <ButtonLink href="/contact" size="lg" variant="outlineDark">
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
                See contact options
              </ButtonLink>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
