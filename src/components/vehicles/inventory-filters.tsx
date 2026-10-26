"use client";

import { FieldShell, Select } from "@/components/ui/input";
import { VEHICLE_BODY_STYLES, VEHICLE_FUEL_TYPES, VEHICLE_MAKES, VEHICLE_YEARS } from "@/data/vehicles";
import { formatNairaCompact } from "@/lib/formatters";
import {
  CONDITION_OPTIONS,
  PRICE_STEPS,
  TRANSMISSION_OPTIONS,
  countActiveFilters,
  type VehicleFilters,
} from "@/lib/vehicle-filters";

interface InventoryFiltersProps {
  filters: VehicleFilters;
  onChange: (patch: Partial<VehicleFilters>) => void;
  onReset: () => void;
  /** Keeps element ids unique when the panel is rendered twice (mobile + desktop). */
  idPrefix: string;
  className?: string;
}

export function InventoryFilters({
  filters,
  onChange,
  onReset,
  idPrefix,
  className,
}: InventoryFiltersProps) {
  const activeCount = countActiveFilters(filters);

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 border-b border-bone-200 pb-3">
        <h2 className="text-sm font-semibold tracking-[-0.01em] text-ink-950">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          disabled={activeCount === 0}
          className="text-[12px] font-medium text-moss-700 underline decoration-moss-300 decoration-1 underline-offset-4 transition-colors hover:text-moss-800 disabled:text-ink-400 disabled:no-underline disabled:opacity-70 disabled:hover:text-ink-400"
        >
          Clear all{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <FieldShell id={`${idPrefix}-make`} label="Make">
          <Select
            id={`${idPrefix}-make`}
            value={filters.make}
            onChange={(event) => onChange({ make: event.target.value })}
          >
            <option value="">Any make</option>
            {VEHICLE_MAKES.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </Select>
        </FieldShell>

        <div className="grid grid-cols-2 gap-3">
          <FieldShell id={`${idPrefix}-min-price`} label="Min price">
            <Select
              id={`${idPrefix}-min-price`}
              value={filters.minPrice ?? ""}
              onChange={(event) =>
                onChange({ minPrice: event.target.value ? Number(event.target.value) : null })
              }
            >
              <option value="">Any</option>
              {PRICE_STEPS.map((price) => (
                <option key={price} value={price}>
                  {formatNairaCompact(price)}
                </option>
              ))}
            </Select>
          </FieldShell>

          <FieldShell id={`${idPrefix}-max-price`} label="Max price">
            <Select
              id={`${idPrefix}-max-price`}
              value={filters.maxPrice ?? ""}
              onChange={(event) =>
                onChange({ maxPrice: event.target.value ? Number(event.target.value) : null })
              }
            >
              <option value="">Any</option>
              {PRICE_STEPS.map((price) => (
                <option key={price} value={price}>
                  {formatNairaCompact(price)}
                </option>
              ))}
            </Select>
          </FieldShell>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FieldShell id={`${idPrefix}-min-year`} label="From year">
            <Select
              id={`${idPrefix}-min-year`}
              value={filters.minYear ?? ""}
              onChange={(event) =>
                onChange({ minYear: event.target.value ? Number(event.target.value) : null })
              }
            >
              <option value="">Any</option>
              {VEHICLE_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </FieldShell>

          <FieldShell id={`${idPrefix}-max-year`} label="To year">
            <Select
              id={`${idPrefix}-max-year`}
              value={filters.maxYear ?? ""}
              onChange={(event) =>
                onChange({ maxYear: event.target.value ? Number(event.target.value) : null })
              }
            >
              <option value="">Any</option>
              {VEHICLE_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </FieldShell>
        </div>

        <FieldShell id={`${idPrefix}-transmission`} label="Transmission">
          <Select
            id={`${idPrefix}-transmission`}
            value={filters.transmission}
            onChange={(event) =>
              onChange({ transmission: event.target.value as VehicleFilters["transmission"] })
            }
          >
            <option value="">Any transmission</option>
            {TRANSMISSION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FieldShell>

        <FieldShell id={`${idPrefix}-body-style`} label="Body style">
          <Select
            id={`${idPrefix}-body-style`}
            value={filters.bodyStyle}
            onChange={(event) => onChange({ bodyStyle: event.target.value })}
          >
            <option value="">Any body style</option>
            {VEHICLE_BODY_STYLES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FieldShell>

        <FieldShell id={`${idPrefix}-fuel-type`} label="Fuel type">
          <Select
            id={`${idPrefix}-fuel-type`}
            value={filters.fuelType}
            onChange={(event) => onChange({ fuelType: event.target.value })}
          >
            <option value="">Any fuel type</option>
            {VEHICLE_FUEL_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FieldShell>

        <FieldShell id={`${idPrefix}-condition`} label="Condition">
          <Select
            id={`${idPrefix}-condition`}
            value={filters.condition}
            onChange={(event) =>
              onChange({ condition: event.target.value as VehicleFilters["condition"] })
            }
          >
            <option value="">Any condition</option>
            {CONDITION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FieldShell>
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-ink-500">
        Filters stay in the address bar so you can refresh, bookmark or share the exact view.
      </p>
    </div>
  );
}
