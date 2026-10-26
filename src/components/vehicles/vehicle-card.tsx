import Link from "next/link";
import { ArrowUpRight, Gauge, Fuel, Cog } from "lucide-react";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { ColourOptions } from "@/components/vehicles/colour-options";
import { CompareToggle } from "@/components/vehicles/compare-toggle";
import { VehiclePhoto } from "@/components/vehicles/vehicle-photo";
import { formatMileage, formatNaira, formatVehicleName } from "@/lib/formatters";
import type { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
  showCompare?: boolean;
  sizes?: string;
}

export function VehicleCard({
  vehicle,
  priority = false,
  showCompare = true,
  sizes = "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw",
}: VehicleCardProps) {
  const specs = [
    { icon: Cog, label: "Transmission", value: vehicle.transmission },
    { icon: Gauge, label: "Mileage", value: formatMileage(vehicle.mileage) },
    { icon: Fuel, label: "Fuel", value: vehicle.fuelType },
  ];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-bone-200 bg-white transition-colors duration-200 hover:border-ink-300">
      <div className="relative">
        <VehiclePhoto
          src={vehicle.images[0]?.src ?? ""}
          alt={vehicle.images[0]?.alt ?? formatVehicleName(vehicle)}
          sizes={sizes}
          priority={priority}
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <AvailabilityBadge availability={vehicle.availability} variant="overlay" />
        </div>
        {showCompare ? (
          <div className="absolute right-3 top-3 z-10">
            <CompareToggle vehicle={vehicle} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-[1.125rem]">
        <div>
          <p className="eyebrow text-ink-500">{vehicle.make}</p>
          <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
            <Link
              href={`/inventory/${vehicle.slug}`}
              className="line-clamp-2 after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-[''] hover:text-moss-700"
            >
              {formatVehicleName(vehicle)}
            </Link>
          </h3>
          <p className="mt-1 text-[13px] text-ink-500">
            {vehicle.condition} · {vehicle.bodyStyle}
          </p>
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <p className="flex items-baseline gap-2">
            <span className="text-[1.3125rem] font-semibold tabular-nums tracking-[-0.02em] text-ink-900">
              {formatNaira(vehicle.price)}
            </span>
          </p>
          <ColourOptions colours={vehicle.availableColours} variant="compact" />
        </div>

        <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-bone-200 pt-3">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="min-w-0">
              <dt className="sr-only">{label}</dt>
              <dd className="flex items-center gap-1.5 text-[12px] leading-tight text-ink-600">
                <Icon aria-hidden="true" className="size-3.5 shrink-0 text-ink-400" strokeWidth={1.7} />
                <span className="truncate">{value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex items-center justify-between border-t border-bone-200 px-4 py-2.5 text-[11px] text-ink-500 sm:px-[1.125rem]">
        <span className="font-mono tracking-[0.06em]">REF {vehicle.stockNumber}</span>
        <span className="inline-flex items-center gap-1 font-medium text-ink-700">
          View listing
          <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        </span>
      </div>
    </article>
  );
}
