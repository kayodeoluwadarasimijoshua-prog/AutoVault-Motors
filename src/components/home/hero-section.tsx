import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { VEHICLE_BODY_STYLES, VEHICLE_COUNT, VEHICLE_MAKES } from "@/data/vehicles";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralEnquiryMessage("header"));

  const stats = [
    { label: "Sample listings", value: String(VEHICLE_COUNT) },
    { label: "Makes represented", value: String(VEHICLE_MAKES.length) },
    { label: "Body styles", value: String(VEHICLE_BODY_STYLES.length) },
  ];

  return (
    <section
      aria-labelledby="hero-heading"
      className="grain-dark relative isolate overflow-hidden bg-ink-950 text-bone-50"
    >
      <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:py-20">
        <div className="max-w-[35rem]">
          <p className="eyebrow flex items-center gap-2.5 text-moss-300">
            <span aria-hidden="true" className="h-px w-7 bg-moss-500" />
            Automotive showroom concept
          </p>

          <h1 id="hero-heading" className="display-xl mt-5 text-balance">
            Find Your Next Car With Confidence.
          </h1>

          <p className="lede mt-5 max-w-[31rem] text-ink-300">
            Try a dealership website built around the buyer: filter by budget, compare up to three
            vehicles, and explore a detailed listing. All vehicles and prices are samples.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/inventory" size="lg" variant="primary" className="group">
              Explore the demo inventory
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
                Talk to Us on WhatsApp
                <span className="sr-only">(opens WhatsApp in a new tab)</span>
              </ButtonAnchor>
            ) : (
              <ButtonLink href="/contact" size="lg" variant="outlineDark">
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
                Talk to Us
              </ButtonLink>
            )}
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-2xl font-semibold tabular-nums tracking-[-0.02em] text-bone-50">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-[11px] uppercase leading-tight tracking-[0.12em] text-ink-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-white/10">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/4]">
              <Image
                src="/images/hero-autovault.jpg"
                alt="AI-generated illustration of a dark saloon car under warm showroom lighting"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_18_20/0)_45%,rgb(16_18_20/0.72)_100%)]"
              />
              <p className="absolute inset-x-0 bottom-0 p-4 text-[11px] leading-relaxed tracking-[0.02em] text-ink-200 sm:p-5">
                AI-generated concept imagery · no real vehicle offered for sale
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
