import { formatMileage } from "@/lib/formatters";
import type { Vehicle } from "@/types/vehicle";

export function buildSpecRows(vehicle: Vehicle) {
  return [
    { label: "Model year", value: String(vehicle.year) },
    { label: "Mileage", value: formatMileage(vehicle.mileage) },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Fuel type", value: vehicle.fuelType },
    { label: "Engine capacity", value: vehicle.engineCapacity ?? "Not stated" },
    { label: "Body style", value: vehicle.bodyStyle },
    { label: "Condition", value: vehicle.condition },
    { label: "Exterior colour", value: vehicle.exteriorColour },
    { label: "Availability", value: vehicle.availability },
    { label: "Listing reference", value: vehicle.stockNumber },
  ];
}

/** Full specification table used on vehicle detail pages. */
export function VehicleSpecifications({ vehicle }: { vehicle: Vehicle }) {
  const rows = buildSpecRows(vehicle);

  return (
    <dl className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-b border-bone-200 py-2.5"
        >
          <dt className="text-[13px] text-ink-500">{row.label}</dt>
          <dd className="text-right text-[13px] font-medium tabular-nums text-ink-950">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Compact four-item summary shown next to the price. */
export function VehicleKeySpecs({ vehicle }: { vehicle: Vehicle }) {
  const items = [
    { label: "Mileage", value: formatMileage(vehicle.mileage) },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Fuel", value: vehicle.fuelType },
    { label: "Engine", value: vehicle.engineCapacity ?? "Not stated" },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-500">{item.label}</dt>
          <dd className="mt-0.5 truncate text-[13px] font-medium text-ink-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
