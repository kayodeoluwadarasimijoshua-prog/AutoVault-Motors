import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function DiscoveryCta() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralEnquiryMessage("inventory"));

  return (
    <section aria-labelledby="discovery-cta-heading" className="bg-bone-50 py-14 sm:py-16">
      <div className="container-page">
        <div className="grain-dark relative overflow-hidden rounded-[var(--radius-panel)] bg-ink-950 text-bone-50">
          <div className="grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-12">
            <div className="max-w-xl">
              <p className="eyebrow text-moss-300">Vehicle discovery</p>
              <h2 id="discovery-cta-heading" className="display-md mt-3 text-balance text-bone-50">
                Compare your options, then ask the questions that matter.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-300">
                Put up to three vehicles side by side, check the specifications that affect your
                decision, and start a WhatsApp conversation with the dealership when you are ready.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                    Ask about a vehicle
                    <span className="sr-only">(opens WhatsApp in a new tab)</span>
                  </ButtonAnchor>
                ) : (
                  <ButtonLink href="/contact" size="lg" variant="outlineDark">
                    <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
                    Contact the dealership
                  </ButtonLink>
                )}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/10">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src="/images/showroom-autovault.jpg"
                  alt="Interior of a modern car showroom with polished flooring and ceiling lights over display bays"
                  fill
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(200deg,rgb(16_18_20/0.05)_0%,rgb(16_18_20/0.55)_100%)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
