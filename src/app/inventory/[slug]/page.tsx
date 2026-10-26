import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ColourOptions } from "@/components/vehicles/colour-options";
import { CompareToggle } from "@/components/vehicles/compare-toggle";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { VehicleKeySpecs, VehicleSpecifications } from "@/components/vehicles/vehicle-specifications";
import { WhatsAppEnquiry } from "@/components/vehicles/whatsapp-enquiry";
import { getSimilarVehicles, getVehicleBySlug, getVehicleSlugs } from "@/data/vehicles";
import { DEMO_NOTICE_SHORT } from "@/lib/config";
import {
  formatMileage,
  formatNaira,
  formatVehicleName,
  truncate,
} from "@/lib/formatters";
import { createPageMetadata } from "@/lib/seo";
import type { Vehicle } from "@/types/vehicle";

// A vehicle page depends entirely on the URL, so it renders as a blocking route:
// this keeps the response genuinely 404 for unknown slugs instead of a streamed
// 200 with a not-found message.
export const instant = false;

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getVehicleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Vehicle not found",
      description: "This vehicle listing could not be found in the AutoVault Motors inventory.",
      robots: { index: false, follow: true },
    };
  }

  const name = formatVehicleName(vehicle);
  const image = vehicle.images[0];

  return createPageMetadata({
    title: name,
    description: `${name} — ${formatNaira(vehicle.price)}, ${formatMileage(vehicle.mileage)}, ${vehicle.transmission}, ${vehicle.fuelType}, ${vehicle.condition}. ${truncate(vehicle.description, 60)} Demonstration listing.`,
    path: `/inventory/${vehicle.slug}`,
    type: "article",
    image: image
      ? { url: image.src, width: 1600, height: 1200, alt: image.alt }
      : undefined,
  });
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const name = formatVehicleName(vehicle);
  const similar = getSimilarVehicles(vehicle);

  return (
    <>
      <div className="border-b border-bone-200 bg-bone-100">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3.5">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/inventory", label: "Inventory" },
              { label: name },
            ]}
          />
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-500">
            REF {vehicle.stockNumber}
          </p>
        </div>
      </div>

      <section className="bg-bone-50 py-8 sm:py-10">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
            <div className="lg:col-start-1 lg:row-start-1">
              <VehicleGallery images={vehicle.images} vehicleName={name} />
            </div>

            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="lg:sticky lg:top-24">
                <VehicleSummary vehicle={vehicle} />
              </div>
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <section aria-labelledby="description-heading" className="mt-2 lg:mt-10">
                <h2 id="description-heading" className="display-md text-ink-950">
                  About this {vehicle.make}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-700">
                  {vehicle.description}
                </p>
                <p className="mt-4 max-w-2xl rounded-md border border-bone-300 bg-bone-100 px-4 py-3 text-xs leading-relaxed text-ink-600">
                  {DEMO_NOTICE_SHORT} Photographs are illustrative studio images created for this
                  concept and do not show the specific unit described.
                </p>
              </section>

              <section aria-labelledby="features-heading" className="mt-10">
                <h2 id="features-heading" className="display-md text-ink-950">
                  Features recorded for this listing
                </h2>
                <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-moss-600"
                        strokeWidth={2.4}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="specs-heading" className="mt-10">
                <h2 id="specs-heading" className="display-md text-ink-950">
                  Specifications
                </h2>
                <div className="mt-4 rounded-[var(--radius-card)] border border-bone-200 bg-white p-5">
                  <VehicleSpecifications vehicle={vehicle} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 ? (
        <section aria-labelledby="similar-heading" className="border-t border-bone-200 bg-bone-100 py-14">
          <div className="container-page">
            <SectionHeading
              headingId="similar-heading"
              eyebrow="Keep looking"
              title="Similar vehicles in this inventory"
              description="Other demonstrations that share a make or body style with this listing."
              action={
                <Link href="/inventory" className={buttonClasses("outline", "md")}>
                  View all vehicles
                </Link>
              }
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <li key={item.slug} className="h-full">
                  <VehicleCard vehicle={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

function VehicleSummary({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5">
        <div className="flex flex-wrap items-center gap-2">
          <AvailabilityBadge availability={vehicle.availability} />
          <span className="text-[12px] text-ink-500">{vehicle.condition}</span>
          <span aria-hidden="true" className="text-ink-300">
            ·
          </span>
          <span className="text-[12px] text-ink-500">{vehicle.bodyStyle}</span>
        </div>

        <h1 className="mt-3 text-[1.65rem] font-semibold leading-tight tracking-[-0.025em] text-ink-950 sm:text-[1.85rem]">
          {formatVehicleName(vehicle)}
        </h1>

        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-[1.75rem] font-semibold tabular-nums tracking-[-0.03em] text-ink-950">
            {formatNaira(vehicle.price)}
          </span>
          <span className="text-[12px] text-ink-500">illustrative price</span>
        </p>

        <div className="mt-4 border-t border-bone-200 pt-4">
          <VehicleKeySpecs vehicle={vehicle} />
        </div>

        <ColourOptions colours={vehicle.availableColours} className="mt-4" />

        <div className="mt-5 flex flex-col gap-2">
          <CompareToggle vehicle={vehicle} variant="inline" />
          <Link
            href="/inventory"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-transparent text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-950"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={2} />
            Back to inventory
          </Link>
        </div>

      </div>

      <WhatsAppEnquiry vehicle={vehicle} />
    </div>
  );
}
