import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Mail, MessageCircle, TriangleAlert } from "lucide-react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { CONTACT_EMAIL, DEMO_NOTICE, isEmailConfigured } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact the AutoVault Motors concept: send a WhatsApp enquiry, prepare an email, or use the demonstration enquiry form. No address is published.",
  path: "/contact",
});

const contactFaqs = [
  {
    question: "What happens when I use the enquiry form?",
    answer:
      "Your message is validated in the browser and then handed to your own email app or WhatsApp. Nothing is stored on a server, and no confirmation is shown unless you complete the send in that app.",
  },
  {
    question: "How quickly will I get a reply?",
    answer:
      "This concept does not promise response times. A real dealership would publish its own working hours and service level, and would answer through the channel you used.",
  },
  {
    question: "Can I pay for or reserve a vehicle here?",
    answer:
      "No. The website does not take payments, deposits or reservations. It presents information and opens a conversation with the dealership, who would handle any transaction directly.",
  },
  {
    question: "Why is there no phone number or showroom address?",
    answer:
      "Because AutoVault Motors is a fictional dealership concept. Publishing an invented telephone number, email address or street address would be misleading, so only configured contact details are ever shown.",
  },
];

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralEnquiryMessage("contact"));
  const emailReady = isEmailConfigured();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation about a vehicle"
        description="Ask about a specific listing, request more photographs, or arrange an inspection with the dealership. WhatsApp is the primary channel for this concept."
      />

      <section aria-labelledby="contact-options-heading" className="bg-bone-50 py-10 sm:py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[1.02fr_1fr] lg:items-start lg:gap-12">
          <div>
            <h2 id="contact-options-heading" className="display-md text-ink-950">
              Ways to reach the team
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-600">
              The fastest route is a WhatsApp message. If you already know which vehicle you are
              interested in, open its listing and use the enquiry button so the message carries the
              vehicle reference.
            </p>

            <div className="mt-6 space-y-4">
              {whatsappUrl ? (
                <div className="rounded-[var(--radius-panel)] border border-moss-200 bg-moss-50 p-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white text-moss-700"
                    >
                      <MessageCircle className="size-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink-950">WhatsApp enquiry</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-700">
                        Opens WhatsApp with a general enquiry already written. You control what is
                        sent.
                      </p>
                    </div>
                  </div>
                  <ButtonAnchor
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="lg"
                    className="mt-4 w-full sm:w-auto"
                  >
                    <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.9} />
                    Message the dealership
                    <span className="sr-only">(opens WhatsApp in a new tab)</span>
                  </ButtonAnchor>
                </div>
              ) : (
                <div className="rounded-[var(--radius-panel)] border border-bone-300 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bone-100 text-ink-500"
                    >
                      <MessageCircle className="size-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink-950">
                        WhatsApp is not configured in this build
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-600">
                        No number has been supplied for this demonstration, and the project does not
                        invent one. Add{" "}
                        <code className="rounded bg-bone-100 px-1 py-0.5 font-mono text-[11px]">
                          NEXT_PUBLIC_WHATSAPP_NUMBER
                        </code>{" "}
                        in international format to switch every WhatsApp action on.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {emailReady ? (
                <div className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-ink-950">Email</h3>
                  <p className="mt-1 text-[13px] text-ink-600">
                    Prefer email? Write to the team directly.
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-moss-700 underline decoration-moss-300 underline-offset-4 hover:text-moss-800"
                  >
                    <Mail aria-hidden="true" className="size-4" strokeWidth={1.9} />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              ) : null}

              <div className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-ink-950">Browse before you ask</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-600">
                  Every listing includes mileage, transmission, fuel type, engine capacity and
                  condition, so you can narrow things down first.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <ButtonLink href="/inventory" variant="outline" size="md">
                    View inventory
                  </ButtonLink>
                  <ButtonLink href="/compare" variant="outline" size="md">
                    Compare vehicles
                  </ButtonLink>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-md border border-bone-300 bg-bone-100 px-4 py-3">
                <TriangleAlert
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-ink-500"
                  strokeWidth={1.9}
                />
                <p className="text-[12px] leading-relaxed text-ink-600">{DEMO_NOTICE}</p>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-faq-heading" className="border-t border-bone-200 bg-bone-100 py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <p className="eyebrow text-moss-700">Contact questions</p>
            <h2 id="contact-faq-heading" className="display-md mt-3 text-ink-950">
              What to expect
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              Straight answers about the form, response times and what this concept can and cannot
              do.
            </p>
          </div>

          <div className="divide-y divide-bone-300 border-y border-bone-300">
            {contactFaqs.map((faq) => (
              <details key={faq.question} className="faq-item py-1">
                <summary className="flex items-start justify-between gap-4 rounded-sm py-4 text-[15px] font-medium leading-snug text-ink-950 hover:text-moss-800">
                  <span>{faq.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="faq-chevron mt-0.5 size-4 shrink-0 text-ink-500 transition-transform duration-200"
                    strokeWidth={2}
                  />
                </summary>
                <p className="max-w-2xl pb-5 pr-6 text-sm leading-relaxed text-ink-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone-50 py-10">
        <div className="container-page">
          <p className="text-sm text-ink-600">
            Looking for a specific car?{" "}
            <Link
              href="/inventory"
              className="font-medium text-moss-700 underline decoration-moss-300 decoration-1 underline-offset-4 hover:text-moss-800"
            >
              Browse the full inventory
            </Link>{" "}
            and enquire from the vehicle page instead.
          </p>
        </div>
      </section>
    </>
  );
}
