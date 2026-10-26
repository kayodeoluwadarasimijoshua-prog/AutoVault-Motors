"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { useComparison } from "@/components/vehicles/comparison-provider";
import { getVehiclesBySlugs } from "@/data/vehicles";
import { formatVehicleName } from "@/lib/formatters";

/**
 * Sticky summary of the comparison selection. Renders nothing until the client
 * has read localStorage, so the static HTML never mismatches.
 */
export function CompareTray() {
  const { slugs, hydrated, clear, remove, limit } = useComparison();
  const vehicles = getVehiclesBySlugs(slugs);

  if (!hydrated || vehicles.length === 0) return null;

  return (
    <div
      data-compare-tray=""
      className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 sm:px-6 sm:pb-5"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-2.5 rounded-[var(--radius-panel)] border border-ink-700 bg-ink-950/95 p-3 text-ink-100 shadow-[var(--shadow-lift)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:p-3.5">
        <p className="eyebrow shrink-0 text-ink-300">
          Compare {vehicles.length}/{limit}
        </p>

        <ul className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-0.5">
          {vehicles.map((vehicle) => (
            <li key={vehicle.slug} className="shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-700 bg-ink-900 py-1 pl-2.5 pr-1 text-[12px] text-ink-100">
                <Link href={`/inventory/${vehicle.slug}`} className="hover:text-white hover:underline">
                  {formatVehicleName(vehicle)}
                </Link>
                <button
                  type="button"
                  onClick={() => remove(vehicle.slug)}
                  className="flex size-6 items-center justify-center rounded text-ink-300 hover:bg-ink-800 hover:text-white"
                  aria-label={`Remove ${formatVehicleName(vehicle)} from comparison`}
                >
                  <X aria-hidden="true" className="size-3.5" strokeWidth={2} />
                </button>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:shrink-0">
          <Link
            href="/compare"
            className={buttonClasses("primary", "sm", "flex-1 justify-center sm:flex-none")}
          >
            Compare vehicles
          </Link>
          <button type="button" onClick={clear} className={buttonClasses("outlineDark", "sm")}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
