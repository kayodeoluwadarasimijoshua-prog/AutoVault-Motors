import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { FEATURED_VEHICLES, VEHICLE_COUNT } from "@/data/vehicles";
import { DEMO_NOTICE_SHORT } from "@/lib/config";

export function FeaturedVehicles() {
  return (
    <section aria-labelledby="featured-heading" className="bg-bone-50 py-14 sm:py-16">
      <div className="container-page">
        <SectionHeading
          headingId="featured-heading"
          eyebrow="Featured vehicles"
          title="A shortlist to start from"
          description="Four listings chosen to show how a vehicle card presents price, condition and the specifications buyers ask about first."
          action={
            <ButtonLink href="/inventory" variant="outline" size="md" className="group">
              View all {VEHICLE_COUNT} vehicles
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={1.9}
              />
            </ButtonLink>
          }
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURED_VEHICLES.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} showCompare={false} />
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-500">{DEMO_NOTICE_SHORT}</p>
      </div>
    </section>
  );
}
