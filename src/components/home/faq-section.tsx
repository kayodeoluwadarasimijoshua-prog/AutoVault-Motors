import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I enquire about a vehicle?",
    answer:
      "Open the vehicle's page and use the WhatsApp enquiry button. The message is prepared for you with the vehicle's year, make, model and reference number, so the dealership knows exactly which car you mean. You can edit the message before sending it.",
  },
  {
    question: "Can I request more photographs?",
    answer:
      "Yes — ask for additional photographs in your WhatsApp message and mention which angles or details you would like to see. On this concept site, each listing shows the images included in the sample dataset.",
  },
  {
    question: "How can I arrange a vehicle inspection?",
    answer:
      "Inspections are arranged directly with the dealership. Mention your preferred location and time in your enquiry so the team can confirm what is possible. This concept site does not book inspections or hold appointments.",
  },
  {
    question: "How do I confirm whether a vehicle is available?",
    answer:
      "Availability labels on this site are sample data for demonstration purposes. A real dealership would confirm stock, paperwork and pricing with you directly before you commit to anything.",
  },
  {
    question: "Can I discuss the price with the dealership?",
    answer:
      "Prices shown here are illustrative and are not market valuations. Any discussion about price, payment terms or paperwork happens with the dealership itself — the website only presents information and opens the conversation.",
  },
];

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="border-t border-bone-200 bg-bone-50 py-14 sm:py-16">
      <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="max-w-md">
          <p className="eyebrow text-moss-700">Frequently asked</p>
          <h2 id="faq-heading" className="display-md mt-3 text-ink-950">
            Questions buyers ask before they call
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Practical answers about enquiries, photographs, inspections and price. Anything specific
            to a car is best raised directly with the dealership.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex text-sm font-medium text-moss-700 underline decoration-moss-300 decoration-1 underline-offset-4 transition-colors hover:text-moss-800"
          >
            See all contact options
          </Link>
        </div>

        <div className="divide-y divide-bone-200 border-y border-bone-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group py-1">
              <summary className="flex items-start justify-between gap-4 rounded-sm py-4 text-[15px] font-medium leading-snug text-ink-950 transition-colors hover:text-moss-800">
                <span>{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="faq-chevron mt-0.5 size-4 shrink-0 text-ink-500 transition-transform duration-200"
                  strokeWidth={2}
                />
              </summary>
              <p className="max-w-2xl pb-5 pr-6 text-sm leading-relaxed text-ink-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
