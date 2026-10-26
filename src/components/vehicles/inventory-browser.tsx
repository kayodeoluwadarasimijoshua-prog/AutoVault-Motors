"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ListFilter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Select } from "@/components/ui/input";
import { BrandIndex } from "@/components/vehicles/brand-index";
import { CompareTray } from "@/components/vehicles/compare-tray";
import { InventoryFilters } from "@/components/vehicles/inventory-filters";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { formatNairaCompact } from "@/lib/formatters";
import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  applyVehicleFilters,
  countActiveFilters,
  filtersToQueryString,
  type VehicleFilters,
} from "@/lib/vehicle-filters";
import type { SortKey, Vehicle } from "@/types/vehicle";

interface InventoryBrowserProps {
  vehicles: Vehicle[];
  initialFilters: VehicleFilters;
  /** Serialised server-side query, used to detect real navigations. */
  initialQuery: string;
}

interface ActiveFilterChip {
  key: keyof VehicleFilters;
  label: string;
  patch: Partial<VehicleFilters>;
}

function buildChips(filters: VehicleFilters): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];
  if (filters.make) chips.push({ key: "make", label: filters.make, patch: { make: "" } });
  if (filters.minPrice !== null) {
    chips.push({
      key: "minPrice",
      label: `From ${formatNairaCompact(filters.minPrice)}`,
      patch: { minPrice: null },
    });
  }
  if (filters.maxPrice !== null) {
    chips.push({
      key: "maxPrice",
      label: `Up to ${formatNairaCompact(filters.maxPrice)}`,
      patch: { maxPrice: null },
    });
  }
  if (filters.minYear !== null) {
    chips.push({ key: "minYear", label: `From ${filters.minYear}`, patch: { minYear: null } });
  }
  if (filters.maxYear !== null) {
    chips.push({ key: "maxYear", label: `Up to ${filters.maxYear}`, patch: { maxYear: null } });
  }
  if (filters.transmission) {
    chips.push({
      key: "transmission",
      label: filters.transmission,
      patch: { transmission: "" },
    });
  }
  if (filters.bodyStyle) {
    chips.push({ key: "bodyStyle", label: filters.bodyStyle, patch: { bodyStyle: "" } });
  }
  if (filters.condition) {
    chips.push({ key: "condition", label: filters.condition, patch: { condition: "" } });
  }
  if (filters.fuelType) {
    chips.push({ key: "fuelType", label: `${filters.fuelType} fuel`, patch: { fuelType: "" } });
  }
  if (filters.query.trim()) {
    chips.push({ key: "query", label: `“${filters.query.trim()}”`, patch: { query: "" } });
  }
  return chips;
}

export function InventoryBrowser({ vehicles, initialFilters, initialQuery }: InventoryBrowserProps) {
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const pathname = usePathname();
  const lastWrittenQuery = useRef(initialQuery);

  // Adopt filters from the URL when the user arrives through a real navigation
  // (for example a footer link to /inventory?bodyStyle=SUV). Writes made by this
  // component are ignored so typing never resets the form.
  useEffect(() => {
    if (initialQuery !== lastWrittenQuery.current) {
      setFilters(initialFilters);
      lastWrittenQuery.current = initialQuery;
    }
  }, [initialQuery, initialFilters]);

  // Keep the address bar shareable without triggering a server round trip.
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const query = filtersToQueryString(filters);
      lastWrittenQuery.current = query;
      const current = `${window.location.pathname}${window.location.search}`;
      if (current !== `${pathname}${query}`) {
        window.history.replaceState(null, "", `${pathname}${query}`);
      }
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [filters, pathname]);

  const results = useMemo(() => applyVehicleFilters(vehicles, filters), [vehicles, filters]);
  const chips = useMemo(() => buildChips(filters), [filters]);
  const activeCount = countActiveFilters(filters);

  function patchFilters(patch: Partial<VehicleFilters>) {
    setFilters((current) => ({ ...current, ...patch }));
  }

  function resetFilters() {
    setFilters({ ...DEFAULT_FILTERS, sort: filters.sort });
  }

  const total = vehicles.length;

  return (
    <div>
      {/* Toolbar: search, sort, mobile filter toggle */}
      <div className="flex flex-col gap-3 border-b border-bone-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-md">
          <label htmlFor="inventory-search" className="sr-only">
            Search vehicles by make, model or keyword
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
              strokeWidth={1.9}
            />
            <input
              id="inventory-search"
              type="search"
              value={filters.query}
              onChange={(event) => patchFilters({ query: event.target.value })}
              placeholder="Search make, model or keyword…"
              autoComplete="off"
              className="h-11 w-full rounded-lg border border-ink-400 bg-white pl-10 pr-10 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:border-moss-600 focus-visible:outline-2 focus-visible:outline-offset-2"
            />
            {filters.query ? (
              <button
                type="button"
                onClick={() => patchFilters({ query: "" })}
                className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded text-ink-500 hover:bg-bone-100 hover:text-ink-900"
                aria-label="Clear search text"
              >
                <X aria-hidden="true" className="size-3.5" strokeWidth={2} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1 sm:w-56 sm:flex-none">
            <label
              htmlFor="inventory-sort"
              className="mb-1.5 block text-[13px] font-medium text-ink-800"
            >
              Sort by
            </label>
            <Select
              id="inventory-sort"
              value={filters.sort}
              onChange={(event) => patchFilters({ sort: event.target.value as SortKey })}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <Button
            variant="outline"
            size="md"
            className="h-11 lg:hidden"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            aria-expanded={mobileFiltersOpen}
            aria-controls="mobile-filters"
          >
            <ListFilter aria-hidden="true" className="size-4" strokeWidth={1.8} />
            Filters
            {activeCount > 0 ? (
              <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded bg-ink-950 px-1 text-[11px] font-semibold text-bone-50">
                {activeCount}
              </span>
            ) : null}
          </Button>
        </div>
      </div>

      <BrandIndex
        activeMake={filters.make}
        onSelect={(make) => patchFilters({ make: filters.make === make ? "" : make })}
        onShowAll={resetFilters}
      />

      {mobileFiltersOpen ? (
        <div id="mobile-filters" className="mt-4 rounded-[var(--radius-card)] border border-bone-200 bg-white p-4 lg:hidden">
          <InventoryFilters
            idPrefix="mobile"
            filters={filters}
            onChange={patchFilters}
            onReset={resetFilters}
          />
          <div className="mt-4 flex gap-2">
            <Button variant="dark" size="md" className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
              Show {results.length} {results.length === 1 ? "vehicle" : "vehicles"}
            </Button>
            <Button variant="outline" size="md" onClick={resetFilters} disabled={activeCount === 0}>
              Reset
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10">
        <aside aria-label="Inventory filters" className="hidden lg:block">
          <div className="sticky top-24 rounded-[var(--radius-card)] border border-bone-200 bg-white p-5">
            <InventoryFilters
              idPrefix="desktop"
              filters={filters}
              onChange={patchFilters}
              onReset={resetFilters}
            />
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-ink-600" role="status" aria-live="polite">
              Showing <strong className="font-semibold text-ink-950">{results.length}</strong> of{" "}
              {total} vehicles
              {activeCount > 0 ? " matching your filters" : ""}
            </p>
            {activeCount > 0 ? (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[13px] font-medium text-moss-700 underline decoration-moss-300 decoration-1 underline-offset-4 hover:text-moss-800"
              >
                Clear all filters
              </button>
            ) : null}
          </div>

          {chips.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={() => patchFilters(chip.patch)}
                    aria-label={`Remove ${chip.label} filter`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-bone-300 bg-white py-1 pl-2.5 pr-1.5 text-[12px] text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-950"
                  >
                    {chip.label}
                    <X aria-hidden="true" className="size-3 text-ink-400" strokeWidth={2} />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {results.length === 0 ? (
            <EmptyState
              className="mt-5"
              icon={<Search className="size-5" strokeWidth={1.7} />}
              title="No vehicles match these filters"
              description={`Try removing a filter or searching for a different make or model. The full demonstration inventory has ${total} listings.`}
              action={
                <Button variant="dark" size="md" onClick={resetFilters}>
                  Reset all filters
                </Button>
              }
            />
          ) : (
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((vehicle, index) => (
                <li key={vehicle.slug} className="h-full">
                  <VehicleCard
                    vehicle={vehicle}
                    priority={index < 2}
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 32vw, (min-width: 640px) 45vw, 92vw"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <CompareTray />
    </div>
  );
}
