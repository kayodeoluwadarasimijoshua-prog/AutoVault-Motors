import { ListChecks, MessageCircle, SlidersHorizontal, Smartphone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const benefits = [
  {
    icon: ListChecks,
    title: "Clear vehicle information",
    description:
      "Price, model year, mileage, transmission, fuel type and condition sit in the same place on every listing, so you can assess a car without hunting for details.",
  },
  {
    icon: SlidersHorizontal,
    title: "Convenient discovery",
    description:
      "Filter by make, budget, year, transmission and body style, sort the results, and share the exact filtered view with someone else.",
  },
  {
    icon: MessageCircle,
    title: "Direct enquiry with the dealership",
    description:
      "Every vehicle page opens WhatsApp with the car's year, make, model and reference already written into the message.",
  },
  {
    icon: Smartphone,
    title: "A straightforward experience",
    description:
      "Designed for a phone in one hand: large tap targets, no account to create, no distracting carousels, and pages that keep their place while loading.",
  },
];

export function WhyAutoVault() {
  return (
    <section aria-labelledby="why-heading" className="border-y border-bone-200 bg-bone-100 py-14 sm:py-16">
      <div className="container-page">
        <SectionHeading
          headingId="why-heading"
          eyebrow="Why browse with AutoVault"
          title="Built around how car buyers actually shortlist"
          description="This is a description of the browsing experience the site is designed to provide — not a claim about sales results or dealership history."
        />

        <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <li key={benefit.title} className="border-t border-bone-300 pt-5">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-md border border-bone-300 bg-white text-moss-700">
                  <benefit.icon aria-hidden="true" className="size-[18px]" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[11px] tracking-[0.12em] text-ink-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-ink-950">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
