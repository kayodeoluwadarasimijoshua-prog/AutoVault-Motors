"use client";

import Link from "next/link";
import { CarFront, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { VehiclePhoto } from "@/components/vehicles/vehicle-photo";
import { useComparison } from "@/components/vehicles/comparison-provider";
import { getVehiclesBySlugs } from "@/data/vehicles";
import {
  formatMileage,
  formatNaira,
  formatVehicleName,
  pluralise,
} from "@/lib/formatters";
import type { Vehicle } from "@/types/vehicle";

interface Row {
  label: string;
  render: (vehicle: Vehicle) => string;
  /** Marks the "best" value when comparing two or more vehicles. */
  best?: (vehicles: Vehicle[]) => (vehicle: Vehicle) => boolean;
}

const rows: Row[] = [
  {
    label: "Make and model",
    render: (vehicle) => `${vehicle.make} ${vehicle.model}`,
  },
  { label: "Model year", render: (vehicle) => String(vehicle.year) },
  {
    label: "Price",
    render: (vehicle) => formatNaira(vehicle.price),
    best: (vehicles) => {
      const lowest = Math.min(...vehicles.map((vehicle) => vehicle.price));
      return (vehicle) => vehicle.price === lowest;
    },
  },
  {
    label: "Mileage",
    render: (vehicle) => formatMileage(vehicle.mileage),
    best: (vehicles) => {
      const lowest = Math.min(...vehicles.map((vehicle) => vehicle.mileage));
      return (vehicle) => vehicle.mileage === lowest;
    },
  },
  { label: "Transmission", render: (vehicle) => vehicle.transmission },
  { label: "Fuel type", render: (vehicle) => vehicle.fuelType },
  { label: "Body style", render: (vehicle) => vehicle.bodyStyle },
  { label: "Condition", render: (vehicle) => vehicle.condition },
  { label: "Engine capacity", render: (vehicle) => vehicle.engineCapacity ?? "Not stated" },
  { label: "Exterior colour", render: (vehicle) => vehicle.exteriorColour },
  { label: "Availability", render: (vehicle) => vehicle.availability },
];

export function ComparisonView() {
  const { slugs, hydrated, remove, clear, limit } = useComparison();
  const vehicles = getVehiclesBySlugs(slugs);
  const canHighlight = vehicles.length > 1;

  if (!hydrated) {
    return (
      <p className="rounded-[var(--radius-panel)] border border-bone-300 bg-white px-5 py-10 text-center text-sm text-ink-500">
        Loading your comparison…
      </p>
    );
  }

  if (vehicles.length === 0) {
    return (
      <EmptyState
        icon={<CarFront className="size-5" strokeWidth={1.6} />}
        title="No vehicles selected yet"
        description="Add up to three vehicles from the inventory and their key details will appear here side by side."
        action={
          <Link href="/inventory" className={buttonClasses("primary", "md")}>
            Browse inventory
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-500">
          {pluralise(vehicles.length, "vehicle")} selected · up to {limit} can be compared
        </p>
        <button type="button" onClick={clear} className={buttonClasses("outline", "sm")}>
          Clear comparison
        </button>
      </div>

      {vehicles.length === 1 ? (
        <p
          role="status"
          className="rounded-lg border border-moss-200 bg-moss-50 px-4 py-3 text-sm text-moss-800"
        >
          Add at least one more vehicle from the{" "}
          <Link href="/inventory" className="font-medium underline underline-offset-2">
            inventory
          </Link>{" "}
          to see a side-by-side comparison.
        </p>
      ) : null}

      {/* Mobile: stacked specification cards */}
      <div className="grid gap-4 md:hidden">
        {vehicles.map((vehicle) => (
          <section
            key={vehicle.slug}
            aria-label={formatVehicleName(vehicle)}
            className="overflow-hidden rounded-[var(--radius-card)] border border-bone-200 bg-white"
          >
            <div className="relative">
              <VehiclePhoto
                src={vehicle.images[0]?.src ?? ""}
                alt={vehicle.images[0]?.alt ?? formatVehicleName(vehicle)}
                aspect="aspect-[16/9]"
                sizes="92vw"
              />
              <button
                type="button"
                onClick={() => remove(vehicle.slug)}
                className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-md bg-ink-950/80 text-bone-50 ring-1 ring-white/20 hover:bg-ink-950"
                aria-label={`Remove ${formatVehicleName(vehicle)} from comparison`}
              >
                <X aria-hidden="true" className="size-4" strokeWidth={2} />
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-base font-semibold text-ink-900">
                <Link href={`/inventory/${vehicle.slug}`} className="hover:underline">
                  {formatVehicleName(vehicle)}
                </Link>
              </h2>
              <dl className="mt-3 divide-y divide-bone-200 border-t border-bone-200">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="text-[12px] text-ink-500">{row.label}</dt>
                    <dd className="text-right text-[13px] font-medium tabular-nums text-ink-900">
                      {row.render(vehicle)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}
      </div>

      {/* Desktop: comparison table with a sticky label column */}
      <div className="hidden overflow-hidden rounded-[var(--radius-panel)] border border-bone-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Comparison of {vehicles.length} selected vehicles by key specification
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-40 border-b border-bone-200 p-4 align-bottom">
                  <span className="eyebrow text-ink-500">Specification</span>
                </th>
                {vehicles.map((vehicle) => (
                  <th key={vehicle.slug} scope="col" className="border-b border-bone-200 p-4 align-top">
                    <div className="space-y-2">
                      <VehiclePhoto
                        src={vehicle.images[0]?.src ?? ""}
                        alt={vehicle.images[0]?.alt ?? formatVehicleName(vehicle)}
                        aspect="aspect-[4/3]"
                        sizes="(min-width: 768px) 30vw, 40vw"
                        className="rounded-md"
                      />
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/inventory/${vehicle.slug}`}
                          className="text-sm font-semibold leading-snug text-ink-900 hover:underline"
                        >
                          {formatVehicleName(vehicle)}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(vehicle.slug)}
                          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded text-ink-400 hover:bg-bone-100 hover:text-ink-900"
                          aria-label={`Remove ${formatVehicleName(vehicle)} from comparison`}
                        >
                          <X aria-hidden="true" className="size-3.5" strokeWidth={2} />
                        </button>
                      </div>
                      <p className="font-mono text-[11px] tracking-[0.06em] text-ink-500">
                        REF {vehicle.stockNumber}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const isBest = canHighlight && row.best ? row.best(vehicles) : null;
                return (
                  <tr key={row.label} className={index % 2 === 0 ? "bg-bone-50/60" : undefined}>
                    <th scope="row" className="p-4 text-[12px] font-normal text-ink-500">
                      {row.label}
                    </th>
                    {vehicles.map((vehicle) => {
                      const highlighted = isBest ? isBest(vehicle) : false;
                      return (
                        <td
                          key={vehicle.slug}
                          className={
                            "p-4 text-[13px] text-ink-900 " +
                            (highlighted ? "font-semibold" : "font-normal")
                          }
                        >
                          <span className="inline-flex items-center gap-2">
                            {row.render(vehicle)}
                            {highlighted ? (
                              <span className="rounded bg-moss-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-moss-700">
                                Lowest
                              </span>
                            ) : null}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                <th scope="row" className="p-4 text-[12px] font-normal text-ink-500">
                  Listing
                </th>
                {vehicles.map((vehicle) => (
                  <td key={vehicle.slug} className="p-4">
                    <Link
                      href={`/inventory/${vehicle.slug}`}
                      className={buttonClasses("outline", "sm")}
                    >
                      View listing
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-ink-500">
        Lowest price and lowest mileage are highlighted for convenience. All figures come from the
        sample dataset on this concept site and are not market valuations.
      </p>
    </div>
  );
}
