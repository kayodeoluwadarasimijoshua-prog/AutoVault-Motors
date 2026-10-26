import { Search } from "lucide-react";
import { FieldShell, Select } from "@/components/ui/input";
import { VEHICLE_BODY_STYLES, VEHICLE_MAKES } from "@/data/vehicles";
import { PRICE_STEPS } from "@/lib/vehicle-filters";
import { formatNairaCompact } from "@/lib/formatters";

/**
 * Quick search. A native GET form pointing at /inventory, so it works without
 * JavaScript, produces shareable URLs, and is enhanced only by the styles.
 */
export function VehicleSearch() {
  return (
    <section aria-labelledby="quick-search-heading" className="border-b border-bone-200 bg-bone-50">
      <div className="container-page py-10 sm:py-12">
        <div className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5 shadow-[var(--shadow-panel)] sm:p-7">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 id="quick-search-heading" className="text-lg font-semibold tracking-[-0.015em] text-ink-950">
              Search the inventory
            </h2>
            <p className="text-[13px] text-ink-500">
              Narrow the list by make, budget and body style.
            </p>
          </div>

          <form action="/inventory" method="get" className="mt-6" role="search" aria-labelledby="quick-search-heading">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_auto] lg:items-end">
              <FieldShell id="home-make" label="Make">
                <Select id="home-make" name="make" defaultValue="">
                  <option value="">Any make</option>
                  {VEHICLE_MAKES.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </Select>
              </FieldShell>

              <FieldShell id="home-max-price" label="Maximum price">
                <Select id="home-max-price" name="maxPrice" defaultValue="">
                  <option value="">Any price</option>
                  {PRICE_STEPS.map((price) => (
                    <option key={price} value={price}>
                      Up to {formatNairaCompact(price)}
                    </option>
                  ))}
                </Select>
              </FieldShell>

              <FieldShell id="home-body-style" label="Vehicle type">
                <Select id="home-body-style" name="bodyStyle" defaultValue="">
                  <option value="">Any type</option>
                  {VEHICLE_BODY_STYLES.map((bodyStyle) => (
                    <option key={bodyStyle} value={bodyStyle}>
                      {bodyStyle}
                    </option>
                  ))}
                </Select>
              </FieldShell>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink-950 px-5 text-sm font-medium text-bone-50 transition-colors hover:bg-ink-800 lg:w-auto"
              >
                <Search aria-hidden="true" className="size-4" strokeWidth={1.9} />
                Search cars
              </button>
            </div>
            <p className="mt-3 text-xs text-ink-500">
              Results open on the inventory page with your filters applied, ready to share or
              bookmark.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
